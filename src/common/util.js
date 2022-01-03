import {
  toBech32,
  fromBech32,
  HarmonyAddress,
} from '@harmony-js/crypto';
import defaults from './defaults';
import { isAddress } from '@harmony-js/utils';

export const isValidAddress = (address) => {
  if (address.length !== 42) {
    return false;
  }
  if (isAddress(address)) {
    return true;
  }
  try {
    const res = HarmonyAddress.isValidBech32(address);
    return res;
  } catch (err) {
    return false;
  }
};

export const toONEAddress = (address) => {
  try {
    if (HarmonyAddress.isValidBech32(address)) {
      return address;
    }
    if (isAddress(address)) {
      return toBech32(address);
    }
    return null;
  } catch(err) {
    return null;
  }
}

export const toETHAddress = (address) => {
  try {
    if (isAddress(address)) {
      return address.toLowerCase();
    }
    if (HarmonyAddress.isValidBech32(address)) {
      return fromBech32(address).toLowerCase();
    }
    return null;
  } catch (err) {
    return null;
  }
} 

export const getTxUrl = (txHash) => `${defaults.explorerEndpoint}/tx/${txHash}`;
export const getAddressUrl = (address) => `${defaults.explorerEndpoint}/address/${address}`;
export const fromNativeToken = (number, decimal = 18) => number / (10**decimal);
export const formatQuestRewards = (rewards) => {
  return rewards.reduce((acc, r) => {
    r.jewelPrice = fromNativeToken(r.itemQuantity, r.item.decimal) * (r.priceAsGovernanceToken || 0);
    if (acc[r.hero.id]) {
      acc[r.hero.id].push(r);
    } else {
      acc[r.hero.id] = [r];
    }
    return acc;
  }, {});
}

export const getJewelPrice = (tx) => {
  const pair = tx.governanceUSDPair;
  if (!pair) {
    return 0;
  }
  const reserve0 = fromNativeToken(pair.reserve0, pair.token0.decimal);
  const reserve1 = fromNativeToken(pair.reserve1, pair.token1.decimal);
  if (defaults.contractAddresses.jewel === pair.token0.id) {
    return reserve1 / reserve0;
  }
  return reserve0 / reserve1;
}
export const getONEPrice = (tx) => {
  const jewelPrice = tx.jewelPrice;
  const pair = tx.gasPair;
  const reserve0 = fromNativeToken(pair.reserve0, pair.token0.decimal);
  const reserve1 = fromNativeToken(pair.reserve1, pair.token1.decimal);
  if (defaults.contractAddresses.one === pair.token0.id) {
    return (reserve1 / reserve0) * jewelPrice;
  }
  return (reserve0 / reserve1) * jewelPrice;
}

export const getTokenPrice = (token, amount, priceAsGovernanceToken, jewelPrice) => {
  if (!jewelPrice) {
    return 0;
  }
  const tokenAmt = fromNativeToken(amount, token.decimal);
  if (token.id === defaults.contractAddresses.jewel) {
    return tokenAmt * jewelPrice;
  }
  if (!priceAsGovernanceToken) {
    return 0;
  }
  return tokenAmt * priceAsGovernanceToken * jewelPrice;
}
