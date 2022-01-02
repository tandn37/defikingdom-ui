
import {
  groupByHeroId,
} from './util';

const handle = (txs) => {
  return txs.map((tx) => {
    const newTx = {
      type: tx.type,
      txHash: tx.hash,
      block: tx.block,
      createdAt: new Date(tx.timestamp * 1000).toLocaleString(),
      contractAddress: tx.contractAddress,
      ...tx,
    }
    if (newTx.quest) {
      newTx.quest = tx.quest;
      if (tx.quest.questRewards) {
        console.log('tx.quest.questRewards', tx.quest.questRewards);
        newTx.quest.questRewards = groupByHeroId(tx.quest.questRewards);
      }
    }
    return newTx;
  })
}

export {
  handle,
}
