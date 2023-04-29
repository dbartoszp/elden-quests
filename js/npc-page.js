'use strict';
import * as searchbar from './searchbar.js';

const params = new URLSearchParams(window.location.search);
const npcName = params.get('npc');

const npcContainer = document.getElementById('npc-info-container');
const table = document.getElementById('table-of-contents');
const generalInfo = document.getElementById('npc-info-general');
const mainInfo = document.getElementById('npc-info-main');
const rewards = document.getElementById('rewards');

let markup = '';

const fetchNPCID = async (name) => {
	try {
		const response = await fetch('npc-data.json');
		const npc = await response.json();
		const tmp = npc.find((el) => el.id === name);

		if (tmp.hasOwnProperty('todo')) {
			window.location.href = 'not-found.html';
			return;
		}
		return (
			npc.find((el) => el.id === name) ||
			(window.location.href = 'not-found.html')
		);
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
                         <h2>Also involved: ${npc.alsoInvolved.join(', ')}</h2>
                         <h3>${npc.questLocations.join(', ')}</h3>`;
				// <div class="npc-info-name"><h1>main npc in quest</h1></div>
				// 		<h2>other npcs involved in quest</h2>
				// 		<h3>quest locations</h3>
			}
			break;
		case 'table':
			{
				markup = `<h2>Table of contents</h2>`;
				npc.questline.forEach((el, i) => {
					markup += `<a href="#${el.step}">${i + 1}. ${
						el.step
					}</a></br>`;
				});
				// <!-- <h2>Table of contents</h2> -->
				// 			<!-- 1. steps to complete quest<br />
				// 			2. steps to complete quest<br />
				// 			3. steps to complete quest<br />
				// 			4. steps to complete quest<br />
			}
			break;
		case 'general':
			{
				markup = `<img class="npc-info-img" src="${
					npc.mainImage
				}"/><span>${npc.mainName}</span></br>First encounter: ${
					npc.firstAppearance
				}</br>Found later in: ${npc.questLocations.join(', ')}`;
				// <!-- <img
				// 	class="npc-info-img"
				// 	src="/vendors/img/npc/limgrave/varre.png"
				// 	/>image of the main npc<br />
				// 	first encounter: location1<br />
				// 	ound later in: location2, location3<br /> -->
			}
			break;
		case 'main':
			{
				let tmp;
				markup = `<h2>${npc.mainName}'s questline step by step</h2>`;
				npc.questline.forEach((el, i) => {
					markup += `<h3 id="${el.step}"><span>${i + 1}. ${
						el.step
					}</span></br> ${el.description}
                ${
					el.mapLink
						? `</br><a href="${el.mapLink}" target="_blank" rel="noopener noreferrer">[Fextralife map link]</a></h3>`
						: ``
				}
                    `;
				});
				// <h2>npcs questline step by step</h2>
				// 		<h3>
				// 			1. Lorem ipsum dolor sit amet, consectetur adipiscing
				// 			elit. Morbi facilisis, eros id tristique tristique,
				// 			ligula lacus congue risus, eu gravida metus libero in
				// 			mauris. Mauris ullamcorper metus dui, at egestas odio
				// 			euismod ut. Phasellus lacinia ac erat vel consequat.
				// 			Integer auctor nec dui id fringilla. Suspendisse aliquam
				// 			aliquam erat eu blandit. Nulla facilisi. Nulla facilisi.
				// 			Sed efficitur dui sed magna convallis accumsan. Donec
				// 			aliquet, odio nec efficitur finibus, orci mi euismod
				// 			lorem, non varius neque erat in sem. Morbi turpis metus,
				// 			sodales at tempor at, venenatis nec leo. Morbi mattis
				// 			diam hendrerit ligula hendrerit fringilla. Integer purus
				// 			ligula, vestibulum in porttitor nec, consequat in quam.
				// 			Nunc posuere dolor in purus tincidunt posuere.
				// 		</h3>
				// 		<img src="/vendors/img/bgs/caelid-background.png" />
				// 		<h3>
				// 			2. Mauris dui lacus, consequat sed vehicula a, pharetra
				// 			sed ligula. Cras suscipit sem id hendrerit cursus. Sed
				// 			cursus malesuada purus vel aliquam. Nullam mollis
			}
			break;
		case 'rewards':
			{
				markup = `<h2>Rewards</h2><h3>`;
				npc.rewards.forEach((el, i) => {
					markup += '- ' + el + '</br>';
				});

				// <h2>Rewards</h2>
				// 				<h3>
				// 					2. steps to complete questl<br />
				// 					3. steps to complete quest<br />
				// 					4. steps to complete quest<br />
				// 				</h3>
			}
			break;
	}
	return markup;
};

const insertMarkup = (markup, where) => {
	where.insertAdjacentHTML('afterbegin', markup);
};

const npcFetched = await fetchNPCID(npcName);

const generatePage = () => {
	if (npcFetched) {
		const titleMarkup = generateMarkup(npcFetched, 'title');
		const tableMarkup = generateMarkup(npcFetched, 'table');
		const generalMarkup = generateMarkup(npcFetched, 'general');
		const mainMarkup = generateMarkup(npcFetched, 'main');
		const rewardsMarkup = generateMarkup(npcFetched, 'rewards');

		insertMarkup(titleMarkup, npcContainer);
		insertMarkup(tableMarkup, table);
		insertMarkup(generalMarkup, generalInfo);
		insertMarkup(mainMarkup, mainInfo);
		insertMarkup(rewardsMarkup, rewards);
	}
};
searchbar.searchHandler();
generatePage();
