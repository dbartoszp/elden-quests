'use strict';
import { fetchNpcs, fetchRegions, getExactNpc } from './searchbar.js';

const open = document.getElementById('btn-sidebar-open');
const close = document.getElementById('btn-sidebar-close');
const sidebar = document.getElementById('region-sidebar');
const searchInput = document.getElementById('search-input');
const searchbarText = document.getElementById('header-text-search');

const npcsTableContainer = document.getElementById('npcs-table-container');

let columnCount = 0;
let rowCount = 0;
let npcCount = 0;
let htmlString = ``;
let exactNpc = ``;
let currentNpc;
let href = ``;

let availableNpcs = await fetchNpcs();
let allRegionNpcs = await fetchRegions();
const allNpcsArray = allRegionNpcs.map((el) => el.npcs);

searchInput.addEventListener('keyup', (e) => {
	const searchString = e.target.value.toLowerCase();
	const filteredNpcs = availableNpcs.filter((npc) =>
		npc.mainName.toLowerCase().includes(searchString)
	);
	displayNpcs(filteredNpcs);
});

open.onclick = () => {
	sidebar.style.left = 0;
	open.style.display = 'none';
	close.style.display = 'block';
};
close.onclick = () => {
	sidebar.style.left = '-12rem';
	close.style.display = 'none';
	open.style.display = 'block';
};

const displayNpcs = async (npcsParam) => {
	npcsParam = npcsParam.map((npc) => npc.id);
	htmlString = ``;
	allRegionNpcs.forEach((region, index) => {
		columnCount = 0;
		rowCount = 0;
		npcCount = 0;
		const filtered = allNpcsArray[index].filter((npc) => {
			return npcsParam.includes(npc);
		});
		if (
			region.npcs.some((el) => {
				return filtered.includes(el);
			})
		) {
			htmlString += `<div class="npcs-table-region-name" id="region-${region.id}">
      <h2>${region.name}</h2>`;
			if (columnCount % 3 === 0) {
				htmlString += `<div class="row">`;
				rowCount += 1;
			}
			filtered.forEach((npc) => {
				currentNpc = getExactNpc(availableNpcs, filtered[npcCount]);
				href = currentNpc.hasOwnProperty('todo')
					? 'not-found.html'
					: `npc-page.html?npc=${currentNpc.id}`;
				htmlString += `<div class="column-1-of-3">
          <div class="npc-container">
            <a class="img-link" href="
            ${href}"><img src="${currentNpc.mainImage}" /></a>
            <a class="text-link" href="=${href}">${currentNpc.mainName}</a>
          </div>
        </div>`;
				columnCount++;
				npcCount++;
			});
		}
		for (let i = 0; i < rowCount; i++) {
			htmlString += `</div>`;
		}
	});
	if (!htmlString) {
		htmlString = `<h2>Why is it always not found? </br>
    No matching NPCs found!</h2>`;
	}
	npcsTableContainer.innerHTML = htmlString;
};

searchInput.addEventListener('focus', (e) => {
	e.preventDefault;
	searchbarText.scrollIntoView({ behavior: 'smooth' });
});

//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS BELOW
displayNpcs(availableNpcs);
// searchInput.addEventListener('input', displayNpcs(fetchRegions()));
//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS ^
