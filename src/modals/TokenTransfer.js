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

const TokenTransfer = (props) => {
  TokenTransfer.propTypes = {
    tokenTransfer: PropTypes.object.isRequired,
  }
  const tokenTransfer = props.tokenTransfer;
  return (
    <>
      <Code mt={2} mb={2}>TokenTransfer</Code>
      <Flex>
        <FormLabel width='20%'>Token</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(tokenTransfer.token.id)} isExternal>{tokenTransfer.token.name} ({tokenTransfer.token.symbol})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>From</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(tokenTransfer.from.id)} isExternal>{tokenTransfer.from.profile ? tokenTransfer.from.profile.name : tokenTransfer.from.id}<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>To</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(tokenTransfer.to.id)} isExternal>{tokenTransfer.to.profile ? tokenTransfer.to.profile.name : tokenTransfer.to.id}<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Value</FormLabel>
        <Flex width='80%'>{fromNativeToken(tokenTransfer.value, tokenTransfer.token.decimal)} {tokenTransfer.token.name}</Flex>
      </Flex>
    </>
  )
}

export default TokenTransfer
