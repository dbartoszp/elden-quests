'use strict';

const open = document.getElementById('btn-sidebar-open');
const close = document.getElementById('btn-sidebar-close');
const sidebar = document.getElementById('region-sidebar');
const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.npc-search-results-container');

let markup = '';

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

const fetchCorhyn = async () => {
	try {
		const response = await fetch('npc-data.json');
		const data = await response.json();
		markup = `<h1>hello :)</h1>`;
		data.questline2.forEach((e, i) => {
			markup += `<h3>${i + 1}. ${e.step}\n${e.description}</h3>`;
			console.log(`${i + 1}. ${e.step}\n${e.description}`);
		});
		console.log(markup);
		searchInput.insertAdjacentHTML('beforebegin', markup);
	} catch (err) {
		console.log(err);
	}
};

fetchCorhyn();
