import PropTypes from 'prop-types'
import {
  useClipboard, IconButton, Text,
  Flex, useToast
} from "@chakra-ui/react"
import {
  CopyIcon
} from "@chakra-ui/icons";

const CopyableAddress = (props) => {
  CopyableAddress.propTypes = {
    address: PropTypes.string.isRequired,
  }
  const { onCopy } = useClipboard(props.address)
  const toast = useToast()
  return (
    <>
      <Flex mb={2}>
        <Text lineHeight='30px'>{props.address}</Text>
        <IconButton size='sm' icon={<CopyIcon></CopyIcon>} onClick={(data) => {
          onCopy(data)
          toast({
            description: "Copied",
            position: "top",
            status: 'success',
            duration: 1000,
          })
        }} ml={2}>
        </IconButton>
      </Flex>
    </>
  )
}
export default CopyableAddress
