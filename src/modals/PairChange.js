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

const PairChange = (props) => {
  PairChange.propTypes = {
    pairChange: PropTypes.object.isRequired,
  }
  const pairChange = props.pairChange;
  return (
    <>
      <Code mt={2} mb={2}>{pairChange.type === 'Swap' ? 'Swap' : 'Liquidity'}</Code>
      <Flex>
        <FormLabel width='20%'>LP Token</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(pairChange.pair.id)} isExternal>{pairChange.pair.token0.name} / {pairChange.pair.token1.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Type</FormLabel>
        <Flex width='80%'>{pairChange.type === 'Mint' ? 'Add Liquidity' : (pairChange.type === 'Burn' ? 'Remove Liquidity' : 'Swap Token')}</Flex>
      </Flex>
      {
        pairChange.type !== 'Swap' ?
        <>
          <Flex>
            <FormLabel width='20%'>{pairChange.type === 'Mint' ? 'Token0 Used' : 'Token0 Received'}</FormLabel>
              <Flex width='80%'>{fromNativeToken(pairChange.amount0, pairChange.pair.token0.decimal)}<Link ml={1} color='teal.500' href={getAddressUrl(pairChange.pair.token0.id)} isExternal>{pairChange.pair.token0.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
          </Flex>
          <Flex>
            <FormLabel width='20%'>{pairChange.type === 'Mint' ? 'Token1 Used' : 'Token1 Received'}</FormLabel>
            <Flex width='80%'>{fromNativeToken(pairChange.amount1, pairChange.pair.token1.decimal)}<Link ml={1} color='teal.500' href={getAddressUrl(pairChange.pair.token1.id)} isExternal>{pairChange.pair.token1.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
          </Flex>
        </> :
        <>
          <Flex>
            <FormLabel width='20%'>Amount Spent</FormLabel>
            <Flex width='80%'>{fromNativeToken(+pairChange.amount0In > 0 ? pairChange.amount0In : pairChange.amount1In, +pairChange.amount0In > 0 ? pairChange.pair.token0.decimal : pairChange.pair.token1.decimal)}<Link ml={1} color='teal.500' href={getAddressUrl(+pairChange.amount0In > 0 ? pairChange.pair.token0.id : pairChange.pair.token1.id)} isExternal>{+pairChange.amount0In > 0 ? pairChange.pair.token0.name : pairChange.pair.token1.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
          </Flex>
          <Flex>
            <FormLabel width='20%'>Amount Received</FormLabel>
            <Flex width='80%'>{fromNativeToken(+pairChange.amount0Out > 0 ? pairChange.amount0Out : pairChange.amount1Out, +pairChange.amount0Out > 0 ? pairChange.pair.token0.decimal : pairChange.pair.token1.decimal)}<Link ml={1} color='teal.500' href={getAddressUrl(+pairChange.amount0Out > 0 ? pairChange.pair.token0.id : pairChange.pair.token1.id)} isExternal>{+pairChange.amount0Out > 0 ? pairChange.pair.token0.name : pairChange.pair.token1.name}<ExternalLinkIcon mx='2px' /></Link></Flex>
          </Flex>
        </>
      }
    </>
  )
}

export default PairChange
