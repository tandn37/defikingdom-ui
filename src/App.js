import Main from './pages/main';
import Header from './components/Header';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Header>
      </Header>
      <Main></Main>
    </ChakraProvider>
  );
}

export default App;
