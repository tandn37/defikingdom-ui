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

const ItemTrading = (props) => {
  ItemTrading.propTypes = {
    itemTrading: PropTypes.object.isRequired,
  }
  const itemTrading = props.itemTrading;
  return (
    <>
      <Code mt={2} mb={2}>ItemTrading</Code>
      <Flex>
        <FormLabel width='20%'>Token</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(itemTrading.token.id)} isExternal>{itemTrading.token.name} ({itemTrading.token.symbol})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Type</FormLabel>
        <Flex width='80%'>{itemTrading.type}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>To</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(itemTrading.to.id)} isExternal>{itemTrading.to.profile.name})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Quantity</FormLabel>
        <Flex width='80%'>{itemTrading.quantity}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>{itemTrading.type === 'Sell' ? 'Gold Received' : 'Gold Spent'}</FormLabel>
        <Flex width='80%'>{fromNativeToken(itemTrading.gold, 3)}</Flex>
      </Flex>
    </>
  )
}

export default ItemTrading
