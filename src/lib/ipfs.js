import IPFS from 'ipfs-core';
import CID from 'cids';
import { createTimeout, sleep } from './utils';

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
		console.log(`Collecting datapoints of the content for cid: ${cid}...`)
		const data = this.ipfsInstance.ls(input, {});
		let dataPoints = 0;
		const timeout = createTimeout(1120)
		for await (let d of data) {
			console.log(`Got datapoint #${dataPoints} for cid: ${cid}`, d)
			dataPoints++;
			if (dataPoints >= 500) {
				console.log(`Enough datapoints collected for cid: ${cid}`)
				break;
			} else if (timeout.triggered) {
				console.log(`Datapoints collection timedout for cid: ${cid}`)
				break;
			}
		}
		await sleep(5);
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
