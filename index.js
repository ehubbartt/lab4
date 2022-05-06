window.onload = function () {
  mapSelector.reset();
};

const coordinates = [-122.412891, 37.79024];
const zoomLevel = 12;
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw";

let defaultMap = new mapboxgl.Map({
  container: "default",
  style: "mapbox://styles/mapbox/dark-v10",
  center: coordinates,
  zoom: zoomLevel, // starting center
});
const scale = new mapboxgl.ScaleControl({
  maxWidth: 500,
  unit: "imperial",
});
defaultMap.addControl(scale);
defaultMap.addControl(new mapboxgl.NavigationControl(), "top-left");

let baseMap = new mapboxgl.Map({
  container: "base",
  style: "mapbox://styles/mapbox/dark-v10",
  center: coordinates,
  zoom: zoomLevel, // starting center
});

baseMap.on("load", () => {
  //simplifying the function statement: arrow with brackets to define a function
  baseMap.addSource("base-tiles", {
    type: "raster",
    tiles: ["./tiles/tile-set-1/monochrome/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "Map tiles designed by Ethan Hubbartt</a>",
  });

  baseMap.addLayer({
    id: "base",
    type: "raster",
    source: "base-tiles",
  });
});

let thematicMap = new mapboxgl.Map({
  container: "thematic",
  style: "mapbox://styles/mapbox/dark-v10",
  center: coordinates,
  zoom: zoomLevel, // starting center
});

thematicMap.on("load", () => {
  //simplifying the function statement: arrow with brackets to define a function
  thematicMap.addSource("thematic-tiles", {
    type: "raster",
    tiles: ["./tiles/tile-set-2/thematic1/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "Map tiles designed by Ethan Hubbartt</a>",
  });

  thematicMap.addLayer({
    id: "thematic",
    type: "raster",
    source: "thematic-tiles",
  });
});

let bothMap = new mapboxgl.Map({
  container: "both",
  style: "mapbox://styles/mapbox/dark-v10",
  center: coordinates,
  zoom: zoomLevel, // starting center
});

bothMap.on("load", () => {
  //simplifying the function statement: arrow with brackets to define a function
  bothMap.addSource("both-tiles", {
    type: "raster",
    tiles: ["./tiles/tile-set-3/thematic-base/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "Map tiles designed by Ethan Hubbartt</a>",
  });

  bothMap.addLayer({
    id: "both",
    type: "raster",
    source: "both-tiles",
  });
});

let themeMap = new mapboxgl.Map({
  container: "themeMap",
  style: "mapbox://styles/mapbox/dark-v10",
  center: coordinates,
  zoom: zoomLevel, // starting center
});

themeMap.on("load", () => {
  //simplifying the function statement: arrow with brackets to define a function
  themeMap.addSource("theme-tiles", {
    type: "raster",
    tiles: ["./tiles/tile-set-4/space/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "Map tiles designed by Ethan Hubbartt</a>",
  });

  themeMap.addLayer({
    id: "theme",
    type: "raster",
    source: "theme-tiles",
  });
});

const selector = document.querySelector(".selector");
selector.addEventListener("change", (e) => {
  let selector = e.target.value;
  let curMap = document.getElementById(`${selector}`);
  showMapHideOthers(curMap);
  updateTitle(curMap);
  updateDescription(curMap);
});

const updateDescription = (curMap) => {
  const allDescriptions = document.querySelectorAll("p");
  allDescriptions.forEach((description) => {
    if (description.id === curMap.id + "-description") {
      description.classList.remove("hidden");
    } else {
      description.classList.add("hidden");
    }
  });
};

const updateTitle = (curMap) => {
  const title = document.getElementById("title");
  let titleContent;
  if (curMap.id === "default") {
    titleContent = "Default Map Over San Francisco";
  } else if (curMap.id === "base") {
    titleContent = "Custom Base Map Over San Francisco";
  } else if (curMap.id === "thematic") {
    titleContent = "Green Roof Locations in San Francisco";
  } else if (curMap.id === "both") {
    titleContent = "Base Map Displaying Green Roof Locations in San Francisco";
  } else if (curMap.id === "themeMap") {
    titleContent = "Space Theme Map Over San Francisco";
  }
  title.textContent = titleContent;
};

const showMapHideOthers = (curMap) => {
  hideAllMaps();
  curMap.classList.remove("hidden");
};

const hideAllMaps = () => {
  let maps = document.querySelectorAll(".map");
  maps.forEach((map) => {
    map.classList.add("hidden");
  });
};
