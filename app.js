var map = L.map('map').setView([48.862, 2.3064], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var modal = document.querySelector('#modal');
var inputTitre = document.querySelector('#titre');
var inputImage = document.querySelector('#image');
var inputInfo = document.querySelector('#info');
var coordonnée

//(e) est un objet
function onMapClick(e) {
    modal.showModal()
    var marker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);    
    coordonnée = e.latlng;
    marker.bindPopup("<strong>" + e.latlng.lat + "</strong><p>" + e.latlng.lng + "</p>").openPopup();
}

map.on('click', onMapClick);

modal.addEventListener('close', function(){
    console.log(modal.returnValue);
    if(modal.returnValue == 'oui')
        ajoutMarker(inputTitre.value, inputImage.value, inputInfo.value, coordonnée);
})

var tableauMarker = [];
function ajoutMarker(x, y, z, coord) {
    tableauMarker.push({
        titre : x,
        image : y,
        info : z,
        coord : coord
    })
    console.log(tableauMarker);
    // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
    localStorage.setItem('savetableauMarker', JSON.stringify(tableauMarker));
}

function ajoutMarker(x, y, z, coordonée) {
    tableauMarker.push({
        titre : x,
        image : y,
        info : z,
        coordonée : coordonée
    })
    console.log(tableauMarker);
    // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
    localStorage.setItem('savetableauMarker', JSON.stringify(tableauMarker));
}

//il va chercher ds le local storage le tableau OU tu mets un tableau vide
var tableauMarker = JSON.parse(localStorage.getItem('savetableauMarker')) || [];
var savedMarkers = localStorage.getItem('savetableauMarker');
// si saveMarker est true
if (savedMarkers) {
    savedMarkers = JSON.parse(savedMarkers);
    // Ajoute chaque marker à la carte
    savedMarkers.forEach(function(marker) {
        var newMarker = new L.marker(marker.coordonée).addTo(map);
        newMarker.bindPopup("<strong>" + marker.titre + "</strong><br><img src='" + marker.image + "'><br>" + marker.info);
    });
}

