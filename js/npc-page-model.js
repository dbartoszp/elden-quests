'use strict';

const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.npc-search-results-container');
const npcContainer = document.getElementById('npc-info-container');
const table = document.getElementById('table-of-contents');

let markup = '';

const fetchNPC = async () => {
	try {
		const response = await fetch('npc-data.json');
		const npc = await response.json();
		return npc;
	} catch (err) {
		console.log(err);
	}
};

const generateMarkup = (npc, where) => {
	switch (where) {
		case 'title':
			{
				markup = `<div class="npc-info-name"><h1>${
					npc.mainName
				}'s questline</h1></div>
                         <h2>Also involved: ${npc.alsoInvolved}</h2>
                         <h3>${npc.questLocations.join(', ')}</h3>`;
				// <div class="npc-info-name"><h1>main npc in quest</h1></div>
				// 		<h2>other npcs involved in quest</h2>
				// 		<h3>quest locations</h3>
			}
			break;
		case 'table': {
			markup = `${npc.questline.forEach((quest, i) => {
				i + 1;
			})}`;
			// <h2>Table of contents</h2>
			// 				<!-- 1. steps to complete quest<br />
			// 				2. steps to complete quest<br />
			// 				8. steps to complete quest<br />
			// 				9. steps to complete quest<br /> -->
		}
	}
	return markup;
};

const insertMarkup = async (npc) => {
	try {
		const alsoInvolved = npc.alsoInvolved;
		markup = `<div class="npc-info-name"><h1>${
			npc.mainName
		}'s questline</h1></div>
                 <h2>Also involved: ${alsoInvolved}</h2>
                 <h3>${npc.questLocations.join(', ')}</h3>`;

		npcContainer.insertAdjacentHTML('afterbegin', markup);

		npc.questline.forEach((e, i) => {
			markup += `<h3>${i + 1}. ${e.step}\n${e.description}</h3>`;
		});
	} catch (err) {
		console.log(err);
	}
};

const titleMarkup = generateMarkup(await fetchNPC(), 'title');
const npcFetched = await fetchNPC();

const insert = (markup, where) => {
	where.insertAdjacentHTML('afterbegin', markup);
};

npcContainer.insertAdjacentHTML(
	'afterbegin',
	generateMarkup(npcFetched, 'title')
);
