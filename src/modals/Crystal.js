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
import defaults from '../common/defaults';

const Crystal = (props) => {
  Crystal.propTypes = {
    crystal: PropTypes.object.isRequired,
  }
  const crystal = props.crystal;
  return (
    <>
      <Code mt={2} mb={2}>Crystal</Code>
      <Flex>
        <FormLabel width='20%'>Hero Id</FormLabel>
        <Flex width='80%'>#{crystal.hero.id}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Summoner Hero</FormLabel>
        <Flex width='80%'>#{crystal.summoner.id}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Assistant Hero</FormLabel>
        <Flex width='80%'>#{crystal.assistant.id}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Hero Gen</FormLabel>
        <Flex width='80%'>{crystal.generation}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Summoner Tears</FormLabel>
        <Flex width='80%'>{crystal.summonerTears}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Assistant Tears</FormLabel>
        <Flex width='80%'>{crystal.assistantTears}</Flex>
      </Flex>
      {
        (crystal.bonusItem !== defaults.zeroAddress) &&
        <Flex>
          <FormLabel width='20%'>Bonus Item</FormLabel>
          <Flex width='80%'><Link color='teal.500' href={getAddressUrl(crystal.bonusItem)} isExternal>{crystal.bonusItem}<ExternalLinkIcon mx='2px' /></Link></Flex>
        </Flex>
      }
    </>
  )
}

export default Crystal
