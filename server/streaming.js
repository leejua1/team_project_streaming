
const io = require('socket.io').listen(process.env.PORT ,(res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log('server is running on port 3100')
})
let roomName = ""
io.on('connection', socket=> {
    console.log(`socket is connected with client id ${socket.id}`)

    socket.on('joinRoom', room=> {
        //client에서 넘어온 data에서
        console.log("client connect")
        const clientsInRoom = io.sockets.adapter.rooms[room];
        const numClient = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        console.log(`client num + ${numClient}`)
        if (numClient === 0) {
            socket.join(room)
            console.log(`first client join roomName ${room} socketid ${socket.id}`)
        } else { //학생이 한명씩 들어올 때마다
            socket.join(room) //room에 join 되고
            console.log(`second client join roomName ${room} socketid ${socket.id}`)
            socket.to(`선생님 소켓 아이디`).emit('letOffer')// caller에게 offer를 하라고 시킨다. 그러려면 선생님의 소켓아이디를 서버에서 가지고 있어야한다...
        }
    })
    socket.on('message',message=>{
        if (message.type==='offer'){ //offer를 제공하는 대상... 접속해서 connect된  학생. 그 학생의 socketid에 대한 정보를 알고있으려면 letOffer할  때 자신의 학생의 socketId를 전달해야된다.
            console.log('client send message type offer')
            socket.broadcast.to("room").emit('recOffer',message)//그 소켓아이디를 저격해서 message 보낸다.
        }else if (message.type ==='answer'){//offer를 전달받은 학생이 answer를 보낸다.
            console.log('client send message type answer')
            socket.to('선생님 소켓 아이디').emit('recAnswer',message) //선생님에게만 전달...
        }else if (message.type ==='candidate'){ //학생과 선생만 camdidate를 교환하고 학생끼리는 교환하지 않아도 되는데
            console.log('client send message type candidate')
            socket.broadcast.to("room").emit('recCandidate', message)
        }

    })
})