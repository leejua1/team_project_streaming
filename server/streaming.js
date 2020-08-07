const express = require('express')
const app =express()
const server =require('http').createServer(app)
const io = require('socket.io')(server)
server.listen(3100 ,()=>{
    console.log('server is running on port 3100')
})
io.on('connection', socket=>{
    console.log(`socket is connected with client id ${socket.id}`)
    socket.on('joinRoom', data=>{ //room네임(수업코드)와 학생정보 등
        console.log(`client join room ${socket.id}`)
        socket.to(data.room).emit('joinStudent',data.student)
    })

    socket.on('message', data=>{ //join할 roomName과 userCode를 보낸다.
        console.log("server recieve message", data)
        socket.emit('message', data) //각자 data로 가지고 온 roomName에 join된다.

        })


    })