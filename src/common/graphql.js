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
			transactions {
				id
			}
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
	console.log('address', address);
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
			const r ={
					type: 'Quest',
					txHash: '0x1238109381209380918590829058',
					block: 19360752,
					contractAddress: "0x3e81154912e5e2cc9b10ad123bf14aeb93ae5318",
					createdAt: "11/12/2021, 11:41:07 PM",
					quest: {
						type: 'Quest',
						startTime: 1641143419,
						status: 'Completed',
						completeAtTime: 1641143419,
						attempts: 5,
						address: '0x3132c76acf2217646fb8391918d28a16bd8a8ef4',
						heroes: [{ id: '2323' }, {id: '23235' }],
						questRewards: [{
							hero: {
								id: 10
							},
							item: {
								id: '0x95d02c1dc58f05a015275eb49e107137d9ee81dc',
								name: 'Bloater',
								decimal: 0
							},
							itemQuantity: 10
						},
						{
							hero: {
								id: 10
							},
							item: {
								id: '0x9678518e04fe02fb30b55e2d0e554e26306d0892',
								name: 'GreyEgg',
								decimal: 0
							},
							itemQuantity: 2
						},
						{
							hero: {
								id: 11
							},
							item: {
								id: '0x9678518e04fe02fb30b55e2d0e554e26306d0892',
								name: 'YelloEgg',
								decimal: 0
							},
							itemQuantity: 5
						},
						{
							hero: {
								id: 11
							},
							item: {
								id: '0x9678518e04fe02fb30b55e2d0e554e26306d0892',
								name: 'GreeEgg',
								decimal: 0
							},
							itemQuantity: 1
						}
						]
					},
					
				}
			;
			const a = result.transactions.concat(r);
			return handle(a || []);
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
