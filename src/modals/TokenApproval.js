import {
  Link, Flex, FormLabel, Code,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {
  ExternalLinkIcon
} from "@chakra-ui/icons";
import {
  fromNativeToken,
  getAddressUrl,
} from '../common/util';

const TokenApproval = (props) => {
  TokenApproval.propTypes = {
    tokenApproval: PropTypes.object.isRequired,
  }
  const tokenApproval = props.tokenApproval;
  return (
    <>
      <Code mt={2} mb={2}>TokenApproval</Code>
      <Flex>
        <FormLabel width='20%'>Token</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(tokenApproval.token.id)} isExternal>{tokenApproval.token.name || tokenApproval.token.id} {tokenApproval.token.symbol && `(${tokenApproval.token.symbol})`}<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Amount</FormLabel>
        <Flex width='80%'>{tokenApproval.amount.length > 50 ? 'Infinity' : fromNativeToken(tokenApproval.amount, tokenApproval.token.decimal)}</Flex>
      </Flex>
    </>
  )
}

export default TokenApproval
