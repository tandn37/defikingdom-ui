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

const HeroTransfer = (props) => {
  HeroTransfer.propTypes = {
    heroTransfer: PropTypes.object.isRequired,
  }
  const heroTransfer = props.heroTransfer;
  return (
    <>
      <Code mt={2} mb={2}>HeroTransfer</Code>
      <Flex>
        <FormLabel width='20%'>From</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(heroTransfer.from.id)} isExternal>{heroTransfer.from.profile.name})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>To</FormLabel>
        <Flex width='80%'><Link color='teal.500' href={getAddressUrl(heroTransfer.to.id)} isExternal>{heroTransfer.to.profile.name})<ExternalLinkIcon mx='2px' /></Link></Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Hero Id</FormLabel>
        <Flex width='80%'>#{heroTransfer.hero.id}</Flex>
      </Flex>
    </>
  )
}

export default HeroTransfer
