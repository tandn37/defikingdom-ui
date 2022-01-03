import PropTypes from 'prop-types'
import {
  Text, Link, Flex, FormLabel,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon
} from "@chakra-ui/icons";
import {
   getTxUrl,
   getAddressUrl,
} from '../common/util';

const TransactionCommon = (props) => {
  TransactionCommon.propTypes = {
    tx: PropTypes.object.isRequired,
  }
  const tx = props.tx;
  return (
    <>
      <Flex>
        <FormLabel width='20%'>TxHash</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getTxUrl(tx.txHash)} isExternal>{tx.txHash} <ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Type</FormLabel>
        <Flex width='80%'><Text color='green'>{tx.type}</Text></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Block Number</FormLabel>
        <Flex width='80%'>{tx.block}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Block Time</FormLabel>
        <Flex width='80%'>{tx.createdAt}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Contract Address</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(tx.contractAddress)} isExternal>{tx.contractAddress} <ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Gas</FormLabel>
        <Flex width='80%'>{tx.gasFee} ONE ({tx.gasFeeUSD} USD)</Flex>
      </Flex>
      {
        tx.jewelPrice > 0 &&
        <Flex>
          <FormLabel width='20%'>Jewel Price</FormLabel>
          <Flex width='80%'>{tx.jewelPrice} USD</Flex>
        </Flex>
      }
    </>
  )
}

export default TransactionCommon;
