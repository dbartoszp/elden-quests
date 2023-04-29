'use strict';

export const fetchRegions = async () => {
	try {
		const res = await fetch('region-data.json');
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const fetchNpcs = async () => {
	try {
		const res = await fetch('npc-data.json');
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const matchArrays = async (regionsArray, npcsArray) => {
	return regionsArray
		.map((regionsArray) => regionsArray.npcs)
		.flat()
		.filter((id) => npcsArray.some((npc) => npc.id === id));
};

export const getExactNpc = (arr, npcName) => {
	return arr.find((el) => {
		// console.log(npcName);
		if (el.id == npcName) return el;
	});
};
