import PropTypes from 'prop-types'
import {
  Box
} from '@chakra-ui/react'
import { getAccountTransactions } from '../common/graphql';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Transaction from './Transaction';

const PaginateTransaction = (props) => {
  PaginateTransaction.propTypes = {
    address: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
  }
  const [txs, setTxs] = useState([]);
  const pageCount = Math.ceil(props.total / props.itemsPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    async function fetchTxs(first, skip) {
      const res = await getAccountTransactions(props.address, first, skip);
      setTxs(res);
    }
    fetchTxs(props.itemsPerPage, itemOffset);
  }, [itemOffset, props.address, props.itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.total;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Box float='right'>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </Box>
      <Transaction txs={txs}></Transaction>
    </>
  )
}
export default PaginateTransaction
