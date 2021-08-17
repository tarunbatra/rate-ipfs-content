import IPFS from 'ipfs-core';
import CID from 'cids';

export default class IpfsLib {
	constructor() {
		this.options = {
			libp2p: {
				config: {
					dht: {
						enabled: true
					}
				}
			}
		}
	}

	async init () {
    console.log('Initializing IPFS node...')
		this.ipfsInstance = await IPFS.create(this.options)
    return this
	}

	async getSources (input) {
		const cid = new CID(input)
		console.log(`Getting structure of the content for cid: ${cid}...`)
		const data = this.ipfsInstance.ls(input, {});
		for await (let d of data) {
			console.log(`Got structure for cid: ${cid}`, d)
		}
		const res = this.ipfsInstance.dht.findProvs(cid);
		console.log(`Getting providers for cid: ${cid}...`)
		const peers = []
		for await (let peer of res) {
			peers.push(peer)
			console.log(`Got provider #${peers.length}: ${peer.id}`)
		}
		console.log(`Total providers for cid: ${cid}`, peers)
		return peers
	}
}
