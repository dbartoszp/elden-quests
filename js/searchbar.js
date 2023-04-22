'use strict';

const searchInput = document.getElementById('search-input');
const results = document.getElementById('npc-results');
const resultsContainer = document.getElementById(
	'npc-search-results-container'
);
let markup = '';
let inputVal;

const fetchData = async () => {
	const res = await fetch('npc-data.json');
	const data = await res.json();
	return data;
};

export const generateResults = async () => {
	const npcs = await fetchData();
	inputVal = searchInput.value.toLowerCase();
	console.log(inputVal);
	const filteredData = npcs.filter((npc) => {
		return npc.mainName.toLowerCase().includes(inputVal.toLowerCase());
	});
	console.log(filteredData);
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
};

export const showResults = (npcList) => {
	let resultsList;
	if (!npcList.length) {
		resultsList = '';
	} else {
		resultsList = npcList.join('');
	}
	results.innerHTML = resultsList;
};
searchInput.addEventListener('input', generateResults);
// searchInput.addEventListener('blur', () => {
// 	console.log('koksu');
// 	resultsContainer.style.display = 'none';
// });
searchInput.addEventListener('focus', () => {
	resultsContainer.style.display = 'block';
});
