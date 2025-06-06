<template>
  <div id="map" class="rounded-2xl w-full h-[195px] sm:my-2 my-5"></div>
  <input type="hidden" id="lat" name="lat">
  <input type="hidden" id="lng" name="lng">
</template>

<script lang="ts" setup>
// Initialize and add the map
const emit = defineEmits(['sendLocation', 'mapNotSupported']);
let map;
let marker;
let position;
if (import.meta.client) {
  console.log('Client side code running');
  if (navigator.geolocation) {
    console.log('Geolocation is supported');
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos:GeolocationPosition) {
      const crd = pos.coords;
      position = {
        lat: crd.latitude,
        lng: crd.longitude
      }
    }

    function error() {
      console.log('Geolocation could not be loaded');
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  } else {
    console.log('Geolocation is not supported by this browser.');
    emit('mapNotSupported');
  }
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  // The map, centered at the initial position
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false,
    mapTypeControl: false,
  });

  // Create a marker at the initial position
  marker = new google.maps.Marker({
    position: position,
    map: map,
    draggable: true,
    title: "Mueva el indicador en a la ubicación de la propiedad",
  });

  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  let savedAddress = "";

  function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
    const latlng = {
      lat,
      lng
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(15);
          savedAddress = response.results[0].formatted_address;
          infowindow.setContent(savedAddress);
          infowindow.open(map, marker);
        } else {
          window.alert("No se encontraron resultados");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  };

  // Dragend event listener for the marker
  google.maps.event.addListener(marker, 'dragend', function() {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
    geocodeLatLng(geocoder, map, infowindow, lat, lng);
    setTimeout(() => {
      emit('sendLocation', lat, lng, savedAddress);
    }, 500);
  });

  // Get the user's location and set it as the initial position of the marker
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (userPosition) {
        let userLatLng = new google.maps.LatLng(
          userPosition.coords.latitude,
          userPosition.coords.longitude
        );
        map.setCenter(userLatLng);
        marker.setPosition(userLatLng);
      },
      function (error) {
        emit('mapNotSupported');
      }
    );
  } else {
    emit('mapNotSupported');
  };
}
initMap();
</script>