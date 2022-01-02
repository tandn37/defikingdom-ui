import PropTypes from 'prop-types'
import {
  Text,
  Box, Flex, Alert, AlertIcon, AlertDescription
} from "@chakra-ui/react"
import {
  toONEAddress,
  toETHAddress
} from '../common/util';
import CopyableAddress from './CopyableAddress';

const Profile = (props) => {
  Profile.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
  }
  return (
    <Box ml={20} mt={5} mb={5}>
      <Flex>
        <Text lineHeight='30px' fontWeight={500} mr={5}>ETH Format:</Text><CopyableAddress address={toETHAddress(props.address)}/>
      </Flex>
      <Flex>
        <Text lineHeight='30px' fontWeight={500} mr={5}>ONE Format:</Text><CopyableAddress address={toONEAddress(props.address)} />
      </Flex>
      <Flex>
        {
          !props.name ?
          <Alert status='error'>
            <AlertIcon />
              <AlertDescription>This address has not been created a profile yet</AlertDescription>
          </Alert> :
          <>
            <Text fontWeight={500} mr={2}>Profile Name:</Text>{props.name}
          </>
        }
      </Flex>
    </Box>
  )
}
export default Profile
