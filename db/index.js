import 'dotenv/config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL);

/**
 * 
 * @param {*} city 
 * @param {*} state 
 * @returns an object containing the population for the city, state that was passed in
 */
export const getPopulation = async (city, state) => {
	try {
		const results = await db.any(`SELECT population FROM population WHERE LOWER(city)=$1 AND LOWER(state)=$2`, [city, state]);
		if (results.length > 0) {
			const parsed = parseInt(results[0].population);
			return { population: parsed };
		} else {
			throw new Error('The population could not be found.');
		}
  } catch (err) {
    console.error("error getting the population:", err);
		return err;
  }
};

/**
 * 
 * @param {*} city 
 * @param {*} state 
 * @param {*} population
 * @returns a string indicating whether the population was updated, created or errored out 
 */
export const updatePopulation = async (city, state, pop) => {
	try {
		const results1 = await db.any(`SELECT id FROM population WHERE LOWER(city)=$1 AND LOWER(state)=$2`, [city, state]);
		if (results1.length > 0) {
			const updateResponse = await db.any(`UPDATE population SET population=$1 WHERE LOWER(city)=$2 AND LOWER(state)=$3`, [pop, city, state]);
			if (updateResponse.length === 0) {
				return 200;
			} else {
				throw new Error('there was an error updating the record.');
			}
		} else if (results1.length === 0) {
			const insertRes = await insertCityStatePop(city, state, pop);
			if (insertRes.length === 0) {
				return 201;
			} else {
				throw new Error('there was an error inserting the new record.');
			}
		}
  } catch (err) {
    console.error("error executing query:", err);
		return err;
  }
};

const insertCityStatePop = async (city, state, population) => {
	try {
		return await db.any(`INSERT INTO population (city, state, population) VALUES($1, $2, $3)`, [city, state, population]);
	} catch (err) {
		console.error('an error occurred inserting the record: ', err);
		throw new Error(err);
	}
};