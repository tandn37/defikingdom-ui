import { Flex, Link, Image } from "@chakra-ui/react";

const Header = (props) => {
  return (
    <Flex
      style={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Link style={{ alignSelf: 'center' }} to='/'>
        <Image
          width={250}
          src="https://defikingdoms.com/img/defi-kingdoms-logo.png"
        />
      </Link>
    </Flex>
  )
}
export default Header
