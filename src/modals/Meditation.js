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

const Meditation = (props) => {
  Meditation.propTypes = {
    meditation: PropTypes.object.isRequired,
  }
  const meditation = props.meditation;
  return (
    <>
      <Code mt={2} mb={2}>Meditation</Code>
      <Flex>
        <FormLabel width='20%'>Hero Id</FormLabel>
        <Flex width='80%'>#{meditation.hero.id}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Status</FormLabel>
        <Flex width='80%'>{meditation.status}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Primary Stat</FormLabel>
        <Flex width='80%'>{meditation.primaryStat}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Bonus Stat</FormLabel>
        <Flex width='80%'>{meditation.primaryStat} | {meditation.tertiaryStat}</Flex>
      </Flex>
      {
        meditation.attunementCrystal &&
        <Flex>
          <FormLabel width='20%'>Bonus Stat</FormLabel>
          <Flex width='80%'><Link color='teal.500' href={getAddressUrl(meditation.attunementCrystal)} isExternal>{meditation.attunementCrystal}<ExternalLinkIcon mx='2px' /></Link></Flex>
        </Flex>
      }
    </>
  )
}

export default Meditation
