import './App.css';
import CIDForm from '../CIDForm/CIDForm';

function App() {
  return (
    <div className='App App-header'>
      <h1 className='head'> de-centralized?</h1>
      <h1>Check distribution rating of any IPFS content</h1>
      <p>
        <strong>What makes data on a p2p network distibuted?</strong> Is it still p2p if
        there's only one <em>peer</em> server acting as the source for the data?
        We consider number of servers providing the data (and
        <abbr title='JS-IPFS currently does not provide IP addresses of providers'> in future </abbr>
        other things like countries, pinning, etc.) to rate the content.
      </p>
      <CIDForm />

      <footer>
        <sub>© Tarun Batra</sub>
      </footer>
    </div>
  );
}

export default App;
