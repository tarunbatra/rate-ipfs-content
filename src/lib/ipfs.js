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
		const dataPointsTimeout = createTimeout(2 * 60) // timeout of 2 minutes
		for await (let d of data) {
			dataPoints++;
			console.log(`Got datapoint #${dataPoints} for cid: ${cid}`, d)
			if (dataPoints >= 50) {
				console.log(`Enough datapoints collected for cid: ${cid}`)
				break;
			} else if (dataPointsTimeout.triggered) {
				console.log(`Datapoints collection timedout for cid: ${cid}`)
				break;
			}
		}
		await sleep(5); // sleep for 5 seconds
		const providerTimeout = createTimeout(2 * 60) // timeout of 2 minutes
		const res = this.ipfsInstance.dht.findProvs(cid);
		console.log(`Getting providers for cid: ${cid}...`)
		const peers = []
		for await (let peer of res) {
			peers.push(peer)
			console.log(`Got provider #${peers.length}: ${peer.id}`)
			if (providerTimeout.triggered) {
				console.log(`Getting providers timedout for cid: ${cid}`)
				break;
			}
		}
		console.log(`Total providers for cid: ${cid}`, peers)
		return peers
	}
}
