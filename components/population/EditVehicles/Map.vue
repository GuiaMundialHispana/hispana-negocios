<template>
  <div id="map" class="rounded-2xl w-full h-[195px] sm:my-2 my-5"></div>
  <input type="hidden" id="lat" name="lat">
  <input type="hidden" id="lng" name="lng">
</template>

<script setup>
  // Initialize and add the map
  const props = defineProps(['lat', 'long']);
  const emit = defineEmits(['sendLocation']);
  let map;
  let marker;
  let position = { lat: props.lat, lng: props.long }; // Default position (Hispana)

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
    let savedAddress = "Hispana";

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
  }
  initMap();
</script>