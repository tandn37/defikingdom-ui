import PropTypes from 'prop-types'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import TransactionDetail from './TransactionDetail';

const Transaction = (props) => {
  Transaction.propTypes = {
    txs: PropTypes.array.isRequired,
  }
  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>TxHash</Th>
          <Th>Block</Th>
          <Th>Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          props.txs.map((tx, index) => {
            return (
              <Tr key={index}>
                <Td color='green'>
                  {tx.type}
                </Td>
                <Td><TransactionDetail text={tx.txHash} detail={tx} /></Td>
                <Td>{tx.block}</Td>
                <Td>{tx.createdAt}</Td>
              </Tr>
            )
          })
        }
      </Tbody>
    </Table>
  )
}
export default Transaction
