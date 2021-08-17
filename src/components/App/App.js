import './App.css';
import CIDForm from '../CIDForm/CIDForm';

function App() {
  return (
    <div className='App App-header'>
      <h1 className='head'> de-centralized?</h1>
      <h1>Check the distribution of your IPFS content</h1>
      <p>
        Your can be distributed but if not done rightly it becomes another form
        of centralized data. This portal checks the degree of decentralization
        of an IPFS content. It examines how many clients serve the content,
        across how many continents and how many of them have pinned the said
        content.
      </p>
      <CIDForm />

      <footer>
        <sub>© Tarun Batra</sub>
      </footer>
    </div>
  );
}

export default App;
