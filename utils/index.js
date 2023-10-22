// simple caching
const cache = {};

export const checkCache = (city, state) => {
	const key = transformCityState(city, state);
	if (key && cache[key]) {
		return cache[key];
	}
};

export const saveToCache = (city, state, population) => {
	const key = transformCityState(city, state);
	if (key) {
		cache[key] = population;
	}
};

const transformCityState = (city, state) => {
	return `${city}_${state}`;
};
