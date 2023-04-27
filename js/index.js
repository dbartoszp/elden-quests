"use strict";
import * as searchbar from "./searchbar.js";

const open = document.getElementById("btn-sidebar-open");
const close = document.getElementById("btn-sidebar-close");
const sidebar = document.getElementById("region-sidebar");
const searchInput = document.getElementById("search-input");

const npcsTableContainer = document.getElementById("npcs-table-container");
const npcTemplate = document.querySelector("[npc-template]");

let allNpcs = await searchbar.fetchNpcs();
let availableNpcs = await searchbar.fetchNpcs();
let allRegionNpcs = await searchbar.fetchRegions();
allRegionNpcs.forEach((e) => console.log(e.npcs));
const availableNpcsArray = availableNpcs.map((el) => el.id);
const allNpcsArray = allRegionNpcs.map((el) => el.npcs);
console.log(allNpcsArray);
console.log(availableNpcsArray);

// const mergedArray =

searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredNpcs = allNpcs.filter((npc) =>
    npc.mainName.toLowerCase().includes(searchString)
  );
  console.log("filtered:", filteredNpcs);
  displayNpcs(filteredNpcs);
  // console.log(filteredNpcs);
});

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

const displayNpcs = async (npcsParam) => {
  console.log("param:", npcsParam);
  const regionsArr = await searchbar.fetchRegions();
  const npcsArr = await searchbar.fetchNpcs();
  // console.log(matching);
  // console.log(npcsArr);
  // console.log(getExactNpc(npcsArr, "fia"));
  console.log(regionsArr);
  let htmlString = ``;
  let exactNpc = ``;
  let currentNpc;
  const givenNpcs = npcsParam.map((npc) => npc.id);
  console.log("given:", givenNpcs);
  regionsArr.forEach((region, index) => {
    let columnCount = 0;
    let rowCount = 0;
    let npcCount = 0;
    const merged = allNpcsArray[index].filter((npc) => {
      return givenNpcs.includes(npc);
    });
    if (
      region.npcs.some((el) => {
        return merged.includes(el);
      })
    ) {
      htmlString += `<div class="npcs-table-region-name" id="region-${region.id}">
      <h2>${region.name}</h2>`;
      if (columnCount % 3 === 0) {
        htmlString += `<div class="row">`;
        rowCount += 1;
      }
      merged.forEach((npc) => {
        currentNpc = searchbar.getExactNpc(npcsArr, merged[npcCount]);
        htmlString += `<div class="column-1-of-3">
          <div class="npc-container">
            <a class="img-link" href="npc-page.html?npc=${
              merged[npcCount]
            }"><img src="${
          searchbar.getExactNpc(npcsArr, merged[npcCount]).mainImage
        }" /></a>
            <a class="text-link" href="npc-page.html?npc=${merged[npcCount]}">${
          searchbar.getExactNpc(npcsArr, merged[npcCount]).mainName
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
  // console.log(htmlString);
  npcsTableContainer.innerHTML = htmlString;
};

//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS BELOW
// displayNpcs(searchbar.fetchRegions());
// searchInput.addEventListener("input", displayNpcs(searchbar.fetchRegions()));
//TO SHOW NPCS NOT IMPLEMENTED UNCOMMENT THIS ^
