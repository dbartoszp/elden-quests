'use strict';
import * as searchbar from './searchbar.js';

const open = document.getElementById('btn-sidebar-open');
const close = document.getElementById('btn-sidebar-close');
const sidebar = document.getElementById('region-sidebar');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('npc-results');
const resultsContainer = document.getElementById(
	'npc-search-results-container'
);

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
