import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types';
import TransactionCommon from '../modals/TransactionCommon';
import Auction from '../modals/Auction';
import Meditation from '../modals/Meditation';
import Crystal from '../modals/Crystal';
import TokenTransfer from '../modals/TokenTransfer';
import HeroTransfer from '../modals/HeroTransfer';
import ItemTrading from '../modals/ItemTrading';
import PairChange from '../modals/PairChange';
import Profile from '../modals/Profile';
import GardenInfo from '../modals/GardenInfo';
import TokenApproval from '../modals/TokenApproval';
import HeroApproval from '../modals/HeroApproval';
import Quest from '../modals/Quest';

const TransactionDetail = (props) => {
  TransactionDetail.propTypes = {
    text: PropTypes.string.isRequired,
    detail: PropTypes.object,
  }
  const tx = props.detail;
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link color='teal.500' onClick={onOpen}>{props.text}</Link>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TransactionCommon tx={tx} />
            {
              tx.auction &&
              <Auction auction={tx.auction}></Auction>
            }
            {
              tx.meditation &&
              <Meditation meditation={tx.meditation}></Meditation>
            }
            {
              tx.crystal &&
              <Crystal crystal={tx.crystal}></Crystal>
            }
            {
              tx.tokenTransfer &&
              <TokenTransfer tokenTransfer={tx.tokenTransfer}></TokenTransfer>
            }
            {
              tx.heroTransfer &&
              <HeroTransfer heroTransfer={tx.heroTransfer}></HeroTransfer>
            }
            {
              tx.itemTrading &&
              <ItemTrading itemTrading={tx.itemTrading}></ItemTrading>
            }
            {
              tx.gardenInfo &&
              <GardenInfo gardenInfo={tx.gardenInfo}></GardenInfo>
            }
            {
              tx.pairChange &&
              <PairChange pairChange={tx.pairChange}></PairChange>
            }
            {
              tx.profile &&
              <Profile profile={tx.profile}></Profile>
            }
            {
              tx.tokenApproval &&
              <TokenApproval tokenApproval={tx.tokenApproval}></TokenApproval>
            }
            {
              tx.heroApproval &&
              <HeroApproval heroApproval={tx.heroApproval}></HeroApproval>
            }
            {
              tx.quest &&
              <Quest quest={tx.quest} jewelPrice={tx.jewelPrice}></Quest>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransactionDetail;
