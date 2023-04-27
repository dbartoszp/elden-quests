"use strict";
import * as searchbar from "./searchbar.js";

const open = document.getElementById("btn-sidebar-open");
const close = document.getElementById("btn-sidebar-close");
const sidebar = document.getElementById("region-sidebar");
const searchInput = document.getElementById("search-input");
const results = document.getElementById("npc-results");
const resultsContainer = document.getElementById(
  "npc-search-results-container"
);
const npcsTableContainer = document.getElementById("npcs-table-container");
const npcTemplate = document.querySelector("[npc-template]");

open.onclick = () => {
  sidebar.style.left = 0;
  open.style.display = "none";
  close.style.display = "block";
};
close.onclick = () => {
  sidebar.style.left = "-12rem";
  close.style.display = "none";
  open.style.display = "block";
};

export const displayNpcs = async () => {
  const regionsArr = await searchbar.fetchRegions();
  const npcsArr = await searchbar.fetchNpcs();
  // console.log(npcsArr);
  // console.log(getExactNpc(npcsArr, "fia"));
  // console.log(regionsArr);
  let htmlString = ``;
  let exactNpc = ``;
  let matchingNpcsArr;
  let currentNpc;
  regionsArr.forEach((region) => {
    let columnCount = 0;
    let rowCount = 0;
    let npcCount = 0;
    matchingNpcsArr = region.npcs.filter((npc) => {
      if (
        npcsArr.some((el) => {
          return el.id === npc;
        })
      )
        return npc;
    });
    // console.log(region.npcs);
    // console.log(matchingNpcsArr);
    if (
      region.npcs.some((el) => {
        return matchingNpcsArr.includes(el);
      })
    ) {
      htmlString += `<div class="npcs-table-region-name" id="region-${region.id}">
      <h2>${region.name}</h2>`;
      if (columnCount % 3 === 0) {
        htmlString += `<div class="row">`;
        rowCount += 1;
      }
      matchingNpcsArr.forEach((npc) => {
        currentNpc = searchbar.getExactNpc(npcsArr, matchingNpcsArr[npcCount]);
        htmlString += `<div class="column-1-of-3">
          <div class="npc-container">
            <a class="img-link" href="npc-page.html?npc=${
              matchingNpcsArr[npcCount]
            }"><img src="${
          searchbar.getExactNpc(npcsArr, matchingNpcsArr[npcCount]).mainImage
        }" /></a>
            <a class="text-link" href="npc-page.html?npc=${
              matchingNpcsArr[npcCount]
            }">${
          searchbar.getExactNpc(npcsArr, matchingNpcsArr[npcCount]).mainName
        }</a>
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
  console.log(htmlString);
  npcsTableContainer.innerHTML = htmlString;
};

//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS BELOW
// displayNpcs(searchbar.fetchRegions());
// searchInput.addEventListener("input", displayNpcs(searchbar.fetchRegions()));
//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS ^
