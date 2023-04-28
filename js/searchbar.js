'use strict';

const searchInput = document.getElementById('search-input');
const results = document.getElementById('npc-results');
const resultsContainer = document.getElementById(
	'npc-search-results-container'
);
let markup = '';
let inputVal;
let resultsList;

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

export const generateResults = async () => {
	try {
		const npcs = await fetchNpcs();
		inputVal = searchInput.value.toLowerCase();
		// console.log(inputVal);
		const filteredData = npcs.filter((npc) => {
			return npc.mainName.toLowerCase().includes(inputVal.toLowerCase());
		});
		// console.log(filteredData);
		markup = filteredData.map((npc) => {
			return `<a class="search-result-text" href="npc-page.html?npc=${npc.id}"><li class="npc-result">${npc.mainName}</li></a>`;
			// <li class="npc-result">
			// 						<a
			// 							class="search-result-text"
			// 							href="npc-page.html?npc=brother-corhyn"
			// 							>brother corhyn test</a
			// 						>
			// 					</li>
		});
		showResults(markup);
	} catch (err) {
		console.log(err);
	}
};

export const showResults = (npcList) => {
	if (!npcList.length) {
		resultsList = '';
	} else {
		resultsList = npcList.join('');
	}
	results.innerHTML = resultsList;
};

export const getExactNpc = (arr, npcName) => {
	return arr.find((el) => {
		// console.log(npcName);
		if (el.id == npcName) return el;
	});
};

//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS BELOW
// displayNpcs(fetchRegions());
// searchInput.addEventListener("input", displayNpcs(fetchRegions()));
//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS ^
export const searchHandler = () => {
	searchInput.addEventListener('input', generateResults);
	searchInput.addEventListener('focus', () => {
		resultsContainer.style.display = 'block';
	});
	searchInput.addEventListener('blur', () => {
		setTimeout(() => {
			resultsContainer.style.display = 'none';
		}, 100);
	});
};
