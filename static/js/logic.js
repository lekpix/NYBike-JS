// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;
// var myMap = L.map("map", {
//   center: [40.7128, -74.0059],
//   zoom: 12
// });



const url="https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

//createMap();
// Create the createMap function.
function createMap(bikeStations){

  // d3.json(url).then(function(data){
  //   console.log(data);
  // });

  // Create the tile layer that will be the background of our map.

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// Define variables for our tile layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// Create the map object with options.

var myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [street,bikeStations]
});


// Create a baseMaps object to hold the lightmap layer.

var baseMaps = {
  Street: street//,
  //Topography: topo
}; 
  // Create an overlayMaps object to hold the bikeStations layer.

  var overlayMaps = {
    BikeStations: bikeStations
  };
  
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  //L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  L.control.layers(baseMaps,overlayMaps,{
    collapsed:false
  }).addTo(myMap);
}
//createMarkers();
// Create the createMarkers function.
function createMarkers(response){

  // Pull the "stations" property from response.data.
  
    var stations=response.data.stations;
    //console.log(stationName);
  
  // Initialize an array to hold the bike markers.
  var stationMarkers=[];

  // Loop through the stations array.
  for (var i=0; i<stations.length ;i++){
    var station=stations[i];
  
    // For each station, create a marker, and bind a popup with the station's name.
    var stationmark=L.marker([station.lat,station.lon])
    .bindPopup(`<h3>${station.name}</h3><hr><h4>Capacity:${station.capacity}</h4>`);
    // Add the marker to the bikeMarkers array.
    stationMarkers.push(stationmark);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.

  var stationsLayerGroup=L.layerGroup(stationMarkers);
  createMap(stationsLayerGroup);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);