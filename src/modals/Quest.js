import {
  Link, Flex, FormLabel, Code, Box,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon
} from "@chakra-ui/icons";
import PropTypes from 'prop-types';
import {
  fromNativeToken,
  getAddressUrl
} from '../common/util';
import {
  quests,
} from '../common/mapping';

const Quest = (props) => {
  Quest.propTypes = {
    quest: PropTypes.object.isRequired,
  }
  const quest = props.quest;
  console.log('quest', quest);
  return (
    <>
      <Code mt={2} mb={2}>Quest</Code>
      <Flex>
        <FormLabel width='20%'>Type</FormLabel>
        <Flex width='80%'>{quests[quest.address]}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Status</FormLabel>
        <Flex width='80%'>{quest.status}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Heroes</FormLabel>
        <Flex width='80%'>[{quest.heroes.map(h => `#${h.id}`).join(',')}]</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Attempts</FormLabel>
        <Flex width='80%'>{quest.attempts}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Start Time</FormLabel>
        <Flex width='80%'>{new Date(quest.startTime * 1000).toLocaleString()}</Flex>
      </Flex>
      {
        (quest.status === 'Completed') &&
        <Flex>
          <FormLabel width='20%'>Completed At</FormLabel>
          <Flex width='80%'>{new Date(quest.completeAtTime * 1000).toLocaleString()}</Flex>
        </Flex>
      }
      {
        (quest.status === 'Completed') &&
        <Flex>
          <FormLabel width='20%'>Quest Rewards</FormLabel>
          <Flex width='80%'>
            {
              Object.keys(quest.questRewards).map((heroId) => {
                return (
                  <Box mr={10}>
                    <Flex>Hero#{heroId}</Flex>
                    {
                      quest.questRewards[heroId].map((r) => {
                        return (
                          <Flex>
                            {fromNativeToken(r.itemQuantity, r.item.decimal)}<Link ml={1} color='teal.500' href={getAddressUrl(r.item.id)} isExternal>{r.item.name}<ExternalLinkIcon mx='2px' /></Link>
                          </Flex>
                        )
                      })
                    }
                  </Box>

                )
              })
            }
          </Flex>
        </Flex>
      }
    </>
  )
}

export default Quest
