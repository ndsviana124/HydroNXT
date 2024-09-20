// // 1. Menambahkan Elemen Dasar Peta Pada Halaman HTML
    // 1.1 Membuat Variabel Peta dan Melakukan Set View Halaman Peta di Lokasi Tertentu
    const map = L.map('map')
    map.setView([-8.6882179, 121.4720448], 9);
    // 1.2 Menambahkan Basemap OSM
    const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
    // 1.3 Menambahkan Basemap OSM HOT
    const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});
    // 1.4 Menambahkan Basemap Google
    const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
        subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);
    // 1.5 Menambahkan Fitur Fullscreen Peta
    map.addControl(new L.Control.Fullscreen());
    // 1.6 Menambahkan Tombol Home (Zoom to Extent)
    const home = {
        lat: -8.6882179,
        lng: 121.4720448,
        zoom: 9
    };
    L.easyButton('fa-home', function (btn, map) {
        map.setView([home.lat, home.lng], home.zoom);
    }, 'Zoom To Home').addTo(map)
    // 1.7 Menambahkan Fitur My Location
    map.addControl(
        L.control.locate({
            locateOptions: {
                enableHighAccuracy: true
            }
        })
    );
    // // 2.2 Data Sungai (Line)
    //     const curahAR = new L.LayerGroup();
    //     $.getJSON("./asset/data-spasial/Curah Hujan.geojson", function (OBJECTID) {
    //         L.geoJSON(OBJECTID, {
    //             style: {
    //                 color : "blue",
    //                 weight : 2,
    //                 opacity : 1,
    //                 dashArray: '3,3,20,3,20,3,20,3,20,3,20',
    //                 lineJoin: 'round'
    //             }
    //         }).addTo(curahAR);
    //     });
    //     curahAR.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja
  // 2.1.2 Pemanggilan Data sumur
  var symbologyPoint = {
    radius: 2,
    fillColor: "##100a61",
    color: "#000",
    opacity: 1,
    fillOpacity: 0.8
}
  const sumur = new L.LayerGroup();
  $.getJSON("./asset/data-spasial/SumurNTTNTB.geojson", function (objectid) {
      L.geoJSON(objectid, {
              pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, symbologyPoint);}
          }).addTo(sumur);
      });
  sumur.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

    // 2.2 Data Administrasi (Line)
    const batas = new L.LayerGroup();
    $.getJSON("./asset/data-spasial/batas.geojson", function (Kabupaten) {
        L.geoJSON(Kabupaten, {
            style: {
                color : "black",
                weight : 2,
                opacity : 5,
                dashArray: '3,3,20,3,20,3,20,3,20,3,20',
                lineJoin: 'round'
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<b>batas: </b>' + feature.properties.Kabupaten)
            }
        }).addTo(batas);
    });
    batas.addTo(map);

       // 2.3 Data Curah Hujan (Polygon)
        const curah = new L.LayerGroup();
        $.getJSON("./asset/data-spasial/curah.geojson", function (klasifikas) {
            L.geoJson(klasifikas, {
                style: function (feature) {
                    switch (feature.properties.klasifikas) {
                        case '726-1115':
                            return { fillColor: "#eff0f9", fillOpacity: 0.8, weight: 0.5,};
                        case '1115-1328':
                            return { fillColor: "#dad8ed", fillOpacity: 0.8, weight: 0.5,};
                        case '1328-1525':
                            return { fillColor: "#b4b1dc", fillOpacity: 0.8, weight: 0.5,};
                        case '1525-1738':
                            return { fillColor: "#8f8aca", fillOpacity: 0.8, weight: 0.5,};
                        case '1738-1993':
                            return { fillColor: "#6963b8", fillOpacity: 0.8, weight: 0.5,};
                        case '1993-2465':
                            return { fillColor: "#443da7", fillOpacity: 0.8, weight: 0.5,};
                        case '2465-3455':
                            return { fillColor: "#1e1695", fillOpacity: 0.8, weight: 0.5,};
                        default:
                            return { fillColor: "#FFFFFF", fillOpacity: 0.8, weight: 0.5,};
                    }
                },

                onEachFeature: function (feature, layer) {
                    layer.bindPopup('<b>Curah Hujan: </b>' + feature.properties.klasifikas)
                }
            }).addTo(curah);
        });
        curah.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

 // 2.3 Data tuplah ntt (Polygon)
 const tuplahntt = new L.LayerGroup();
 $.getJSON("./asset/data-spasial/tuplahntt.geojson", function (Legenda) {
     L.geoJson(Legenda, {
         style: function (feature) {
             switch (feature.properties.Legenda) {
                 default:
                     return { fillColor: "#85c169", fillOpacity: 0.8, weight: 0.5,};
             }
         },

         onEachFeature: function (feature, layer) {
             layer.bindPopup('<b>Tuplah NTT: </b>' + feature.properties.Legenda)
         }
     }).addTo(tuplahntt);
 });
 tuplahntt.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

 // 2.3 Data tuplah ntb (Polygon)
 const tuplahntb = new L.LayerGroup();
 $.getJSON("./asset/data-spasial/tuplahntt.geojson", function (Legenda) {
     L.geoJson(Legenda, {
         style: function (feature) {
             switch (feature.properties.Legenda) {
                 default:
                     return { fillColor: "#85c169", fillOpacity: 0.8, weight: 0.5,};
             }
         },

         onEachFeature: function (feature, layer) {
             layer.bindPopup('<b>Tuplah NTB: </b>' + feature.properties.Legenda)
         }
     }).addTo(tuplahntb);
 });
 tuplahntb.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

  // 2.1.2 Pemanggilan Data sungai
  const sungai = new L.LayerGroup();
  $.getJSON("./asset/data-spasial/Sungai NT.geojson", function (OBJECTID) {
      L.geoJSON(OBJECTID, {
            color : "blue",
            weight : 1,
            opacity : 5,
            lineJoin: 'round'
          }).addTo(sungai);
      });
  sungai.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

// 2.3 Data Curah Hujan (Polygon)
const kepadatan = new L.LayerGroup();
$.getJSON("./asset/data-spasial/batas.geojson", function (klasifikas) {
    L.geoJson(klasifikas, {
        style: function (feature) {
            switch (feature.properties.klasifikas) {
                case 'Tidak Padat':
                    return { fillColor: "#65fc1e", fillOpacity: 0.8, weight: 0.5,};
                case 'Kurang Padat':
                    return { fillColor: "#fce51e", fillOpacity: 0.8, weight: 0.5,};
                case 'Cukup Padat':
                    return { fillColor: "#fc881e", fillOpacity: 0.8, weight: 0.5,};
                case 'Sangat Padat':
                    return { fillColor: "#f92b1e", fillOpacity: 0.8, weight: 0.5,};
                default:
                    return { fillColor: "#FFFFFF", fillOpacity: 0.8, weight: 0.5,};
            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup('<b>Kepadatan: </b>' + feature.properties.klasifikas)
        }
    }).addTo(kepadatan);
});
kepadatan.addTo(map); // Apabila tidak dibutuhkan jadikan komen saja

    // 3.1 Basemap
    const baseMaps = {
        "Openstreetmap" : basemapOSM,
        "OSM HOT" : osmHOT,
        "Google" : baseMapGoogle
    };

    // 3.2 Layer Data GEOJSON
    const overlayMaps = {
        "sumur" : sumur,
        "Curah Hujan": curah,
        "batas" : batas,
        "sungai" : sungai,
        "kepadatan" : kepadatan,
        "tuplah NTT" : tuplahntt,
        "tuplah NTB" : tuplahntb,
    };

    // 3.3 Memanggil Fungsi Layer Control
    L.control.layers(baseMaps,overlayMaps).addTo(map);

    // 3.4 Menambahkan Legenda Pada Peta
    let legend = L.control({ position: "topright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML =
            // Judul Legenda
            '<p style= "font-size: 18px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Legenda</p>' +
            '<p style= "font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Infrastruktur</p>' +
            '<div><svg style="display:block;margin:auto;text-align:center;stroke-width:1;stroke:rgb(0,0,0);"><circle cx="15" cy="8" r="5" fill="#100a61" /></svg></div>Sumur<br>' +
            // Legenda Layer Batas Administrasi
            '<p style= "font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Batas Administrasi</p>'+
            '<div><svg><line x1="0" y1="11" x2="23" y2="11" style="stroke-width:2;stroke:rgb(0,0,0);stroke-dasharray:10 1 1 1 1 1 1 1 1 1"/></svg></div>Batas Kabupaten/Kota<br>'+
            '<p style= "font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Aliran Sungai</p>'+
            '<div><svg><line x1="0" y1="11" x2="23" y2="11" style="stroke-width:2;stroke:rgb(0,0,255)"/></svg></div>Aliran Sungai<br>'+
            // Legenda Layer Tutupan Lahan
            '<p style= "font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Curah Hujan (mm)</p>' +
            '<div style="background-color: #eff0f9"></div>726-1115<br>' +
            '<div style="background-color: #dad8ed"></div>1115-1328<br>' +
            '<div style="background-color: #b4b1dc"></div>1328-1525<br>' +
            '<div style="background-color: #8f8aca"></div>1525-1738<br>' +
            '<div style="background-color: #6963b8"></div>1738-1993<br>' +
            '<div style="background-color: #443da7"></div>1993-2465<br>' +
            '<div style="background-color: #1e1695"></div>2465-3455<br>' +
             // Legenda Layer Kepadatan Penduduk
             '<p style= "font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Kepadatan Penduduk</p>' +
            '<div style="background-color: #65fc1e"></div>Tidak Padat<br>' +
            '<div style="background-color: #fce51e"></div>Kurang Padat<br>' +
            '<div style="background-color: #fc881e"></div>Cukup Padat<br>' +
            '<div style="background-color: #f92b1e"></div>Sangat Padat<br>' ;
            return div;
        };
        legend.addTo(map);