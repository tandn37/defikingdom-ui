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

const Auction = (props) => {
  Auction.propTypes = {
    auction: PropTypes.object.isRequired,
  }
  const auction = props.auction;
  return (
    <>
      <Code mt={2} mb={2}>Auction</Code>
      <Flex>
        <FormLabel width='20%'>Hero Id</FormLabel>
        <Flex width='80%'>#{auction.hero.id}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Status</FormLabel>
        <Flex width='80%'>{auction.status}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Owner</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(auction.owner.id)} isExternal>{auction.owner.profile.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Price</FormLabel>
        <Flex width='80%'>{fromNativeToken(auction.totalPrice)} JEWEL</Flex>
      </Flex>
      {
        (auction.status === 'Sold' || auction.status === 'Rent') &&
          <Flex>
            <FormLabel width='20%'>{auction.status === 'Sold' ? 'Buyer' : 'Renter'}</FormLabel>
            <Flex width='80%'><Link color='teal.500' href={getAddressUrl(auction.winner.id)} isExternal>{auction.winner.profile.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
          </Flex>
      }
    </>
  )
}

export default Auction
