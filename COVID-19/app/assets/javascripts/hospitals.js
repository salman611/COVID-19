// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


function initMap(lat, lng) {
    let myCoords = new google.maps.LatLng(lat, lng);
    let mapOptions = {
    center: myCoords,
    zoom: 14
    };
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    let marker = new google.maps.Marker({
        position: myCoords,
        map: map
    });
}



function initMap2() {
    let lat = document.getElementById('hospital_latitude').value;
    let lng = document.getElementById('hospital_longitude').value;
    
    // if not defined create default position
    if (!lat || !lng){
        lat=51.5;
        lng=-0.125;
        document.getElementById('hospital_latitude').value = lat;
        document.getElementById('hospital_longitude').value = lng;
    }
    let myCoords = new google.maps.LatLng(lat, lng);
    let mapOptions = {
    center: myCoords,
    zoom: 14
    };
    let map = new google.maps.Map(document.getElementById('map2'), mapOptions);
    let marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });
    // refresh marker position and recenter map on marker
    function refreshMarker(){
        let lat = document.getElementById('hospital_latitude').value;
        let lng = document.getElementById('hospital_longitude').value;
        let myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());   
    }
    // when input values change call refreshMarker
    document.getElementById('hospital_latitude').onchange = refreshMarker;
    document.getElementById('hospital_longitude').onchange = refreshMarker;
    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
        document.getElementById('hospital_latitude').value = newlat;
        document.getElementById('hospital_longitude').value = newlng;
    });
    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());   
    });
}