import {
  Link, Flex, FormLabel, Code,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {
  ExternalLinkIcon
} from "@chakra-ui/icons";
import {
  getAddressUrl,
} from '../common/util';

const HeroApproval = (props) => {
  HeroApproval.propTypes = {
    heroApproval: PropTypes.object.isRequired,
  }
  const heroApproval = props.heroApproval;
  return (
    <>
      <Code mt={2} mb={2}>HeroApproval</Code>
      <Flex>
        <FormLabel width='20%'>Spender</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(heroApproval.spender.id)} isExternal>{heroApproval.spender.profile?.name || heroApproval.spender.id})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      {
        heroApproval.approvedAll ?
        <Flex>
          <FormLabel width='20%'>Approved</FormLabel>
          <Flex width='80%'>All</Flex>
        </Flex> :
        <Flex>
          <FormLabel width='20%'>Hero Id</FormLabel>
          <Flex width='80%'>#{heroApproval.tokenId}</Flex>
        </Flex>
      }
    </>
  )
}

export default HeroApproval
