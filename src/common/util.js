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
export const groupByHeroId = (rewards) => {
  return rewards.reduce((acc, r) => {
    if (acc[r.hero.id]) {
      acc[r.hero.id].push(r);
    } else {
      acc[r.hero.id] = [r];
    }
    return acc;
  }, {});
}
