$(function() {
    const socket = io()

    const positionOptions = {
        enableHighAccuracy: true
    }

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const {latitude, longitude} = pos.coords
            socket.emit('locationPing', { latitude, longitude })
            console.log('sent ping')
        }, err => {
            console.log(err)
        }, positionOptions)
    }, 2000)
})