// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
    };
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFya3Bob2VuaXgiLCJhIjoiY2p4bDB5ZXh0MDFiMjN4b2NqMzF2MWxhNyJ9.mRf6FWgxWAPogEREQRRVWg';

  
  // This adds the map
  let map = new mapboxgl.Map({
    // container id specified in the HTML
    container: '#map',
    // style URL
    style: 'mapbox://styles/mapbox/light-v10',
    // initial position in [long, lat] format
    center: [-112.074036, 33.448376],
    // initial zoom
    zoom: 10,
    scrollZoom: false
  });

  const stores = {
    "type": "FeatureCollection",
    "features": [
        //Block Start
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -112.0167272,
            33.5843774
          ]
        },
        "properties": {
          "businessName": "Paradise Valley Emergency Food Bank",
          "phoneFormatted": "(602) 867-9228",
          "phone": "6028679228",
          "address": "10862 N 32nd Street",
          "city": "Phoenix",
          "country": "United States",
          "postalCode": "85028",
          "state": "AZ"
        }
        },
        //Block End
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -112.1266739,
                33.4797562
              ]
            },
            "properties": {
                "businessName": "St. Mary's Food Bank Alliance",
                "phoneFormatted": "(602) 242-3663",
                "phone": "6022423663",
                "address": "3003 W Thomas Rd",
                "city": "Phoenix",
                "country": "United States",
                "postalCode": "85017",
                "state": "AZ"
              }
            },

            {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -112.0702722,
                    33.5705429
                  ]
                },
                "properties": {
                  "businessName": "Desert Mission Food Bank",
                  "phoneFormatted": "(602) 870-6062",
                  "phone": "6028706062",
                  "address": "19229 N 4th St",
                  "city": "Phoenix",
                  "country": "United States",
                  "postalCode": "85020",
                  "state": "AZ"
                }
                },

                {
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -112.0698298,
                        33.4805736
                      ]
                    },
                    "properties": {
                      "businessName": "Cultral Cup Food Bank",
                      "phoneFormatted": "(602) 266-8370",
                      "phone": "6022668370",
                      "address": "342 E Thomas Rd",
                      "city": "Phoenix",
                      "country": "United States",
                      "postalCode": "85012",
                      "state": "AZ"
                    }
                    },

                    {
                        "type": "Feature",
                        "geometry": {
                          "type": "Point",
                          "coordinates": [
                            -112.0924418,
                            33.4391585
                          ]
                        },
                        "properties": {
                          "businessName": "Valley Christian Centers Food Pantry",
                          "phoneFormatted": "(602) 258-5163",
                          "phone": "6022585163",
                          "address": "1326 W. Hadley St",
                          "city": "Phoenix",
                          "country": "United States",
                          "postalCode": "85007",
                          "state": "AZ"
                        }
                        },
                    
                    {
                            "type": "Feature",
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                -111.9635902,
                                33.473524
                              ]
                            },
                            "properties": {
                              "businessName": "St Stephen's Episcopal Church Food Pantry",
                              "phoneFormatted": "(602) 840-0437",
                              "phone": "6028400437",
                              "address": "2310 N 56th St.",
                              "city": "Phoenix",
                              "country": "United States",
                              "postalCode": "85008",
                              "state": "AZ"
                            }
                            },

                            {
                                "type": "Feature",
                                "geometry": {
                                  "type": "Point",
                                  "coordinates": [
                                    -112.0661013,
                                    33.4474876
                                  ]
                                },
                                "properties": {
                                  "businessName": "Tanner Chapel A.M.E. Church Food Pantry",
                                  "phoneFormatted": "(602) 253-8426",
                                  "phone": "6022538426",
                                  "address": "20 S. 8th St.",
                                  "city": "Phoenix",
                                  "country": "United States",
                                  "postalCode": "85034",
                                  "state": "AZ"
                                }
                                },

                                {
                                    "type": "Feature",
                                    "geometry": {
                                      "type": "Point",
                                      "coordinates": [
                                        -111.9159186,
                                        33.4588843
                                      ]
                                    },
                                    "properties": {
                                      "businessName": "Vista del Camino Food Pantry",
                                      "phoneFormatted": "(480) 312-2323",
                                      "phone": "4803122323",
                                      "address": "7700 E Roosevelt St",
                                      "city": "Scottsdale",
                                      "country": "United States",
                                      "postalCode": "85257",
                                      "state": "AZ"
                                    }
                                    },

          ]
        };


  // This adds the data to the map
  map.on('load', function (e) {
    // This is where your '.addLayer()' used to be, instead add only the source without styling a layer
    map.addSource("places", {
      "type": "geojson",
      "data": stores
    });
    // Initialize the list
    buildLocationList(stores);

  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  // This is where your interactions with the symbol layer used to be
  // Now you have interactions with DOM markers instead
  stores.features.forEach(function(marker, i) {
    // Create an img element for the marker
    const el = document.createElement('div');
    el.id = "marker-" + i;
    el.className = 'marker';
    // Add markers to the map at all points
    new mapboxgl.Marker(el, {offset: [0, -23]})
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

    el.addEventListener('click', function(e){
        // 1. Fly to the point
        flyToStore(marker);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(marker);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        const activeItem = document.getElementsByClassName('active');

        e.stopPropagation();
        if (activeItem[0]) {
           activeItem[0].classList.remove('active');
        }

        const listing = document.getElementById('listing-' + i);
        listing.classList.add('active');

    });
  });


  function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      });
  }

  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();


    const popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>' + currentFeature.properties.businessName + '</h3>' +
            '<h4>' + currentFeature.properties.address + '</h4>')
          .addTo(map);
  }


  function buildLocationList(data) {
    for (i = 0; i < data.features.length; i++) {
      const currentFeature = data.features[i];
      const prop = currentFeature.properties;

      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = "listing-" + i;

      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.businessName + '<div>' + prop.address + '</div>';

      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.city;
      if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      }



      link.addEventListener('click', function(e){
        // Update the currentFeature to the store associated with the clicked link
        const clickedListing = data.features[this.dataPosition];

        // 1. Fly to the point
        flyToStore(clickedListing);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(clickedListing);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        const activeItem = document.getElementsByClassName('active');

        if (activeItem[0]) {
           activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');

      });
    }
  }
