/* eslint-disable react/jsx-no-target-blank */
import './App.css';
import CIDForm from '../CIDForm/CIDForm';
import { getRandomBetween } from '../../lib/utils';
import { useEffect, useState } from 'react'
import info from '../../../package.json'
const titles = [
  'de-centralized ?',
  'p2p ?',
  'web3 ?',
  'distributed ?',
  'censorship-resistant ?'
]
let timeout = null

function updateTitleRegularly (setTitle) {
  if (timeout) return
  timeout = setInterval(() => {
    const randomIndex = getRandomBetween(0, titles.length)
    setTitle(titles[randomIndex] || titles[0])
  }, 10 * 1000)
}

function App() {
  const [title, setTitle] = useState(titles[0])
  useEffect(() => {
    updateTitleRegularly(setTitle)
  }, [])
  return (
    <div className='App App-header'>
      <h1 className='head'>{title}</h1>
      <h1>Check distribution rating of any IPFS content</h1>
      <p>
        <strong>What makes data on a p2p network distibuted?</strong> Is it still p2p if
        there's only one <em>peer</em> server acting as the source for the data?
        This portal checks number of servers providing the data (and
        <abbr title='JS-IPFS currently does not provide IP addresses of providers'> in future </abbr>
        other things like countries, pinning, etc.) to rate the content right from your browser tab.
      </p>
      <CIDForm />

      <footer>
        <sub>
          © {new Date().getFullYear()} <a href='https://tarunbatra.com' target='_blank' rel='author'>Tarun Batra</a>&nbsp;
          | v{info.version}&nbsp;
          | <a href={info.repository} target='_blank' rel=''>Source code</a>&nbsp;
        </sub>
      </footer>
    </div>
  );
}

export default App;
