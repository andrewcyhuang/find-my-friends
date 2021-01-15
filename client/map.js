let map

let markers = []
let vectorSource
let vectorLayer
const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    scale: 0.1,
    src: '/assets/pin.png'
  })
})

$(function() {
    initMap()

    const socket = io()
    
    socket.on('locationsPong', locations => {
      markers = []

      locations.forEach(([id, pos]) => {
        if (pos.longitude && pos.latitude) {
          console.log(`Lon added: ${pos.longitude}`)
          console.log(`Lat added: ${pos.latitude}`)
          markers.push(new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([pos.longitude, pos.latitude])
            )
          }))
        }
      })

      if (map && markers.length > 0) {
        addLocationPin()
      }
    })

    setInterval(() => {
      socket.emit('locationsPing')
    }, 2000)
})

function initMap() {

  const positionOptions = {
    enableHighAccuracy: true
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords

    map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude, latitude]),
          zoom: 15
        })
      });

      console.log('map created')
    }, err => {
        console.log(err)
    }, positionOptions)
}

function addLocationPin() {
  vectorSource = new ol.source.Vector({ features: markers })
  vectorLayer = new ol.layer.Vector({ source: vectorSource, style: iconStyle })

  map.addLayer(vectorLayer)
} 