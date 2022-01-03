import {
  Flex, FormLabel, Code,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const Profile = (props) => {
  Profile.propTypes = {
    profile: PropTypes.object.isRequired,
  }
  const profile = props.profile;
  return (
    <>
      <Code mt={2} mb={2}>Profile</Code>
      <Flex>
        <FormLabel width='20%'>Name</FormLabel>
        <Flex width='80%'>{profile.name}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Profile Id</FormLabel>
        <Flex width='80%'>#{profile.profileId}</Flex>
      </Flex>
      <Flex>
        <FormLabel width='20%'>Avatar Id</FormLabel>
        <Flex width='80%'>{profile.picId}</Flex>
      </Flex>
      {
        profile.heroId &&
        <Flex>
          <FormLabel width='20%'>Hero Id</FormLabel>
          <Flex width='80%'>#{profile.heroId}</Flex>
        </Flex>
      }
    </>
  )
}

export default Profile
