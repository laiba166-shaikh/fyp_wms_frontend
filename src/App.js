import './App.css';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './styles/globalStyles';
import Routes from './routes';
import { useWeb3React } from '@web3-react/core';
import { injected , network} from './connectors';
function App() {
  const { connector } = useWeb3React();
  console.log('connector > ', connector);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
