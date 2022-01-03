import {
  Flex, FormLabel, Code,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {
  fromNativeToken,
} from '../common/util';
import {
  pools
} from '../common/mapping';

const GardenInfo = (props) => {
  GardenInfo.propTypes = {
    gardenInfo: PropTypes.object.isRequired,
  }
  const gardenInfo = props.gardenInfo;
  return (
    <>
      <Code mt={2} mb={2}>GardenInfo</Code>
      <Flex>
        <FormLabel width='20%'>Type</FormLabel>
        <Flex width='80%'>{gardenInfo.type}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Pool</FormLabel>
        <Flex width='80%'>{pools[gardenInfo.poolId]}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Amount</FormLabel>
        <Flex width='80%'>{fromNativeToken(gardenInfo.amount - (gardenInfo.lockAmount || 0))} {gardenInfo.type === 'Harvest' ? 'Jewel' : 'LP Token'}</Flex>
      </Flex>
      {
        gardenInfo.lockAmount &&
        <Flex>
          <FormLabel width='20%'>Locked Amount</FormLabel>
          <Flex width='80%'>{fromNativeToken(gardenInfo.lockAmount)} Jewel</Flex>
        </Flex>
      }
    </>
  )
}

export default GardenInfo
