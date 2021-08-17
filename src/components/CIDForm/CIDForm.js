import './CIDForm.css'
import React, { useState, useEffect } from 'react'
import IpfsLib from '../../lib/ipfs';
import Rating from '../Rating/Rating';

export default function CIDForm (props) {
  const [cid, setCid] = useState('');
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (!global.ipfs) {
      const ipfs = new IpfsLib()
      global.ipfs = ipfs
      ipfs.init().catch((err) => {
        console.error('Error in inititalizing IPFS', err)
        alert('Oops! Something went wrong.')
      })
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProviders([])
      const peers = await global.ipfs.getSources(cid)
      setProviders(peers)
    } catch (err) {
      console.error('Error in getting sources', err)
      alert('Oops! Something went wrong.')
    }
  }
  return (
    <div>
    <form className='cidForm' onSubmit={handleSubmit}>
      <input className='cidInput' placeholder='Enter CID' type='text' value={cid} onChange={e => setCid(e.target.value)} />
      <input className='cidBtn' type='submit' value='Check'/>
    </form>
    <Rating providers={providers} />
    </div>
  );
}
