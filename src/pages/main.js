
import {
  Flex, Container, Input, FormControl, FormLabel, FormHelperText, FormErrorMessage
} from "@chakra-ui/react"
import { useState } from "react"
import { isValidAddress } from "../common/util";
import Result from "../components/Result";

const Main = (props) => {
  const [isError, setError] = useState(false);
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const handleInputChange = (e) => {
    if (isValidAddress(e.target.value)) {
      setInput(e.target.value);
      setIsValid(true);
      setError(false);
    } else {
      setInput(e.target.value);
      setIsValid(false);
      setError(true)
    }
  }
  return (
    <>
      <Container>
        <FormControl isInvalid={isError}>
          <FormLabel htmlFor='address'>Your Address</FormLabel>
          <Input
            id='address'
            type='text'
            value={input}
            onChange={handleInputChange}
          />
          {!isError ? (
            <FormHelperText>
              Enter your address in one or eth format.
            </FormHelperText>
          ) : (
              <FormErrorMessage>Please enter a valid address</FormErrorMessage>
          )}
        </FormControl>
      </Container>
      <Flex>
        {
          isValid && input &&
          <Result
            address={input}
            name=''
          ></Result>
        }
      </Flex>
    </>
  )
}
export default Main
