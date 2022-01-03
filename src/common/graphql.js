import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import defaults from './defaults';
import { handle } from './handle-transactions';

const getProfile = async (address) => {
	const query = `
	{
		account(id: "${address}") {
			profile {
				name
			}
			totalTxs
		}
	}
	`;
	try {
		const result = await queryGraphQL(query, defaults.graphqlEndpoint)
		if (result) {
			return result.account
		}
	}
	catch (err) {
		console.error('GET_PROFILE', err);
	}
}

const getAccountTransactions = async (address, first, skip) => {
	const query = `
		{
			transactions(first: ${first}, skip: ${skip}, orderBy: block, orderDirection: desc, where:{ player:"${address}" }) {
				type
				hash
				block
				timestamp
				gasPrice
				gasUsed
				contractAddress
				value
				gasPair {
					token0 {
						id
						name
						decimal
					}
					token1 {
						id
						name
						decimal
					}
					reserve0
					reserve1
				}
				governanceUSDPair {
					token0 {
						id
						name
						decimal
					}
					token1 {
						id
						name
						decimal
					}
					reserve0
					reserve1
				}
				quest {
					address
					heroes {
						id
					}
					startTime
					startBlock
					completeAtTime
					attempts
					questRewards {
						hero {
							id
						}
						item {
							id
							name
							decimal
						}
						itemQuantity
						priceAsGovernanceToken
					}
				}
				auction {
					id
					hero {
						id
					}
					status
					owner {
						id
						profile {
							name
						}
					}
					type
					startingPrice
					endingPrice
					duration
					totalPrice
					winner {
						profile {
							name
						}
					}
				}
				meditation {
					hero {
						id
					}
					player {
						id
						profile {
							name
						}
					}
					status
					primaryStat
					secondaryStat
					tertiaryStat
					attunementCrystal
				}
				crystal {
					hero {
						id
					}
					summoner {
						id
					}
					assistant {
						id
					}
					generation
					createdBlock
					summonerTears
					assistantTears
					bonusItem
				}
				tokenTransfer {
					token {
						id
						name 
						decimal
						symbol
					}
					from {
						id
						profile {
							name
						}
					}
					to {
						id
						profile {
							name
						}
					}
					priceAsGovernanceToken
					value
				}
				heroTransfer {
					from {
						id
						profile {
							name
						}
					}
					to {
						profile {
							name
						}
					}
					hero {
						id
					}
				}
				itemsTrading {
					type
					token {
						id
						name
						symbol 
					}
					quantity
					gold
				}
				gardenInfo {
					poolId
					type
					amount
					lockAmount
				}
				pairChange {
					pair {
						id
						token0 {
							id
							name
							decimal
						}
						token1 {
							id
							name
							decimal
						}
					}
					type
					amount0
					amount1
					amount0In
					amount1In
					amount0Out
					amount1Out
				}
				profile {
					profileId
					name
					picId
				}
				tokenApproval {
					token {
						id
						name
						symbol
						decimal
					}
					owner {
						id
					}
					spender
					amount
				}
				heroApproval {
					token
					owner {
						id
					}
					spender {
						id
					}
					tokenId
					approvedAll
				}
			}
		}
	`;
	try {
		const result = await queryGraphQL(query, defaults.graphqlEndpoint);
		if (result) {
			return handle(result.transactions || []);
		}
	}
	catch (err) {
		console.error('GET_ACCOUNT_TRANSACTIONS', err);
	}
}
const queryGraphQL = async (query, uri) => {
	try {
		const client = new ApolloClient({
			uri: uri,
			cache: new InMemoryCache(),
		})
		const result = await client.query({ query: gql(query) })
		if (result && result.data) {
			return result.data
		}
	}
	catch (err) {
		console.log(`Failed to get data from GraphQL: ${err}`)
	}
}

export {
	getProfile,
	getAccountTransactions,
}
