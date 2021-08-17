import './CIDForm.css'
import React, { useState, useEffect } from 'react'
import IpfsLib from '../../lib/ipfs';
import Rating from '../Rating/Rating';

export default function CIDForm (props) {
  const [cid, setCid] = useState('');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    try {
      setProviders([])
      const peers = await global.ipfs.getSources(cid)
      setProviders(peers)
      setLoading(false)
    } catch (err) {
      console.error('Error in getting sources', err)
      alert('Oops! Something went wrong.')
      setLoading(false)
    }
  }
  return (
    <div>
    <form className='cidForm' onSubmit={handleSubmit}>
      <input className='cidInput' placeholder='Enter CID' type='text' value={cid} onChange={e => setCid(e.target.value)} />
      <input className='cidBtn' type='submit' value='Check'/>
    </form>
    <Rating providers={providers} loading={loading} />
    </div>
  );
}
