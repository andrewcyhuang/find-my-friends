let map

$(function() {
    const socket = io()

    const positionOptions = {
        enableHighAccuracy: true
    }

    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords
        
        initMap([longitude, latitude])
    }, err => {
        console.log(err)
    }, positionOptions)
})

function initMap(lonLat) {
    const proj = ol.proj.fromLonLat(lonLat)
    map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: proj,
          zoom: 12
        })
      });
}