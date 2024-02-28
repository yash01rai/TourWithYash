export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieWFzaHJhaTAxIiwiYSI6ImNreHd5b25wZzF4ZnUyb3BjcGszcmozdnMifQ.gQaIrouUQMHFAnLq3E0JrQ';

  var map = new mapboxgl.Map({
    container: 'map', // need an element id map
    style: 'mapbox://styles/yashrai01/ckxx037pod6h915qztiy6uwz6',
    scrollZoom: false
    //   center: [-118.113491, 34.111745]
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates); // zoom and fit
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });
};
