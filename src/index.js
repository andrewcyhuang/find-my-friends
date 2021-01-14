const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')

const locations = new Map()

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, '/../client')))

app.get('/', (req, res) => {
    res.send('Hello world')
})

io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('locationPing', pos => {
        locations.set(socket.id, pos)
        console.log(pos)
    })

    socket.on('disconnect', () => {
        locations.delete(socket.id)
    })
})

server.listen(3000, err => {
    if (err) {
        throw err
    }

    console.log('server started on port 3000')
})