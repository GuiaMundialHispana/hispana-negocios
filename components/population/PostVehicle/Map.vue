<template>
  <div id="map" class="rounded-2xl w-full h-[195px] sm:my-2 my-5"></div>
  <input type="hidden" id="lat" name="lat">
  <input type="hidden" id="lng" name="lng">
</template>

<script setup>
  // Initialize and add the map
  const emit = defineEmits(['sendLocation']);
  let map;
  let marker;
  let position = { lat: 18.45230271854065, lng: -69.9435523321845 }; // Default position (Hispana)

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
          console.error("Error al obtener la ubicación del usuario:", error);
          // If geolocation is not available, is going to use default location (Hispana)
          map.setCenter(new google.maps.LatLng(position.lat, position.lng));
          marker.setPosition(new google.maps.LatLng(position.lat, position.lng));
        }
      );
    } else {
      // If geolocation is not available, is going to use default location (Hispana)
      map.setCenter(new google.maps.LatLng(position.lat, position.lng));
      marker.setPosition(new google.maps.LatLng(position.lat, position.lng));
    };
  }
  initMap();
</script>
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPPtyX8Gz-9kxyUIEJ_ZgXtUgbaC4avk4"></script> -->

<!-- <script>
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="_ib",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>""+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyCPPtyX8Gz-9kxyUIEJ_ZgXtUgbaC4avk4", v: "beta"});
</script> -->