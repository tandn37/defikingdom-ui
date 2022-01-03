
import {
  formatQuestRewards,
  fromNativeToken,
  getJewelPrice,
  getONEPrice,
  getTokenPrice,
} from './util';

const calculateTxUSD = (tx) => {
  try {
    switch (tx.type) {
      case 'ProfileCreated':
      case 'ProfileUpdated':
      case 'TokenApproved':
      case 'QuestStarted':
      case 'QuestCanceled':
      case 'NFTTokenApproved':
      case 'HeroCrystalOpen':
      case 'HeroCrystalSummoned':
      case 'HeroSaleCancelled':
      case 'HeroSaleCreated':
      case 'HeroRentalCancelled':
      case 'HeroRentalCreated':
      case 'HeroSent':
      case 'HeroReceived':
      case 'HeroMeditationBegun':
      case 'HeroMeditationCompleted':
      case 'ItemBought':
      case 'ItemSold':
      case 'GardenDeposited':
      case 'GardenWithdrawn':
      case 'LiquidityAdded':
      case 'LiquidityRemoved':
        return -tx.gasFeeUSD;
      case 'TokenSent':
      case 'BankDeposited':
        return -getTokenPrice(tx.tokenTransfer.token, tx.tokenTransfer.value, tx.tokenTransfer.priceAsGovernanceToken, tx.jewelPrice) - tx.gasFeeUSD;
      case 'TokenReceived':
      case 'BankWithdrawn':
        return getTokenPrice(tx.tokenTransfer.token, tx.tokenTransfer.value, tx.tokenTransfer.priceAsGovernanceToken, tx.jewelPrice) - tx.gasFeeUSD;
      case 'HeroSaleBuySuccessful':
        return -(fromNativeToken(tx.auction.totalPrice) * tx.jewelPrice) - tx.gasFeeUSD;
      case 'HeroSaleSellSuccessful':
        return fromNativeToken(tx.auction.totalPrice) * tx.jewelPrice
      case 'HeroRentSuccessful':
        return -(fromNativeToken(tx.auction.totalPrice) * tx.jewelPrice)
      case 'HeroRentOutSuccessful':
        return fromNativeToken(tx.auction.totalPrice) * tx.jewelPrice;
      case 'GardenHarvested':
        return fromNativeToken(tx.gardenInfo.amount - tx.gardenInfo.lockAmount) * tx.jewelPrice - tx.gasFeeUSD;
      case 'TokenSwapped': {
        // swap has 0.3% fee
        if (tx.pairChange.amount0In > 0) {
          return -0.003 * getTokenPrice(tx.pairChange.pair.token0, tx.pairChange.amount0In, tx.pairChange.token0PriceAsGovernanceToken, tx.jewelPrice) - tx.gasFeeUSD;
        }
        return -0.003 * getTokenPrice(tx.pairChange.pair.token1, tx.pairChange.amount1In, tx.pairChange.token1PriceAsGovernanceToken, tx.jewelPrice) - tx.gasFeeUSD;
      }
      case 'QuestCompleted':
        const usdTotal = tx.quest.questRewards((q, acc) => {
          return acc + (q.jewelPrice * tx.jewelPrice);
        }, 0);
        return usdTotal - tx.gasFeeUSD;
      default: {
        return -tx.gasFeeUSD;
      }
    }
  } catch (err) {
    console.error('Calculate USD', err);
    return 0;
  }
}

const handle = (txs) => {
  return txs.map((tx) => {
    const newTx = {
      type: tx.type,
      txHash: tx.hash,
      block: tx.block,
      createdAt: new Date(tx.timestamp * 1000).toLocaleString(),
      contractAddress: tx.contractAddress,
      jewelPrice: getJewelPrice(tx),
      gasFee: fromNativeToken(tx.gasPrice * tx.gasUsed),
      ...tx,
    }
    newTx.onePrice = getONEPrice(newTx);
    newTx.gasFeeUSD = newTx.gasFee * newTx.onePrice;
    if (newTx.quest) {
      newTx.quest = tx.quest;
      if (tx.quest.questRewards) {
        newTx.quest.questRewards = formatQuestRewards(tx.quest.questRewards);
      }
    }
    newTx.usd = calculateTxUSD(newTx);
    return newTx;
  })
}

export {
  handle,
}
