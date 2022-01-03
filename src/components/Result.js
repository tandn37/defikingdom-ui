
import {
  Box
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { toETHAddress } from "../common/util";
import PropTypes from 'prop-types'
import Profile from "../components/Profile";
import { getProfile } from '../common/graphql';
import PaginateTransaction from "./PaginateTransaction";

const Result = (props) => {
  Result.propTypes = {
    address: PropTypes.string.isRequired,
  }
  const [name,setName] = useState('');
  const [totalTxs, setTotalTxs] = useState(0);
  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfile(toETHAddress(props.address));
      setName(res?.profile?.name);
      setTotalTxs(res?.totalTxs);
    }
    fetchProfile();
  }, [props.address]);

  return (
    <Box>
      <Profile
        address={props.address}
        name={name}
      ></Profile>
      { 
        props.address && totalTxs &&
        <PaginateTransaction
          address={toETHAddress(props.address)}
          total={totalTxs}
          itemsPerPage={10}
        ></PaginateTransaction>
      }
    </Box>
  )
}
export default Result
