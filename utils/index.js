// simple caching
const cache = {};

export const checkCache = (city, state) => {
	const key = transformCityState(city, state);
	if (key && cache[key]) {
		return cache[key];
	}
	console.log('cache ', cache);
};

export const saveToCache = (city, state, population) => {
	const key = transformCityState(city, state);
	if (key) {
		cache[key] = population;
	}
	console.log('cache ', cache)
};

const transformCityState = (city, state) => {
	return `${city}_${state}`;
};
