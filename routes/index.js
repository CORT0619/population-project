import Fastify from 'fastify';
import { getPopulation, updatePopulation } from '../db/index.js';
import * as utils from '../utils/index.js';
const fastify = Fastify();

async function plugin(fastify, opts) {
	fastify.get('/state/:state/city/:city', async (req, res) => {
		const city = req.params.city.toLowerCase();
		const state = req.params.state.toLowerCase();
		if (!city || !state) {
			return res.code(400).send('Please provide a city and state.');
		}

		const cached = utils.checkCache(city, state);
		if (cached) return cached;
	
		const response = await getPopulation(city, state);
		if (response instanceof Error) {
			return res.code(400).send({ msg: response.message });
		}

		// store in cache
		utils.saveToCache(city, state, response.population);
		return res.code(200).send(response);
	
	});

	fastify.put('/state/:state/city/:city', async (req, res) => {
		const city = req.params.city.toLowerCase();
		const state = req.params.state.toLowerCase();
		let population = req.body.trim();
		population = parseInt(population);

		if (!city || !state || !population) {
			return res.code(400).send('Please provide a city, state and population.');
		}

		utils.checkCache(city, state);
		const response = await updatePopulation(city, state, population);

		// update cache
		utils.saveToCache(city, state, population);

		if (response instanceof Error) {
			return res.code(400).send({ msg: response.message });
		} else if (response === 201) {
			return res.code(201).send({ msg: 'record was inserted successfully.'});
		} else if (response === 200) {
			return res.code(200).send({ msg: 'record was updated successfully.'});
		} else {
			return res.code(400).send({ msg: 'an error occurred.'});
		}
		
	})
}

export default plugin;