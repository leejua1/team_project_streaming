
const io = require('socket.io').listen(process.env.PORT ,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
let values = []
io.on('connection', socket=> {
    console.log(`socket is connected with client id ${socket.id}`)

    socket.on('joinRoom', data=> {
        console.log("client connect")
        const clientsInRoom = io.sockets.adapter.rooms[data.roomName];
        const numClient = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        console.log(`client num + ${numClient}`)
        if (numClient === 0) {
            socket.join(data.roomName)
            console.log(`first client join roomName ${data.roomName} socketid ${socket.id}`)
            values.push({id : socket.id, roomName : data.roomName, code : data.code})
        } else { //학생이 한명씩 들어올 때마다
            socket.join(data.roomName)
            console.log(`second client join roomName ${data.roomName} socketid ${socket.id}`)
            values.push({id : socket.id, roomName : data.roomName, code : data.code})
            for (let value in values){
                if ( value.roomName===data.roomName && data.code.charAt(0)==='T')
                    console.log(value.id)
                socket.to(value.id).emit('letOffer',{teacher : value.id,student : socket.id})// caller에게 offer를 하라고 시킨다.  전역으로 저장된 선생님의 socket id를 이용
            }
        }
    })
    socket.on('message',message=>{
        if (message.type==='offer'){ //offer를 제공하는 대상... 접속해서 connect된  학생. 그 학생의 socketid에 대한 정보를 알고있으려면 letOffer할  때 자신의 학생의 socketId를 전달해야된다.
            console.log('client send message type offer')

            //offer로 왔을 때 socketid는 선생의 socketid겠지??
            socket.to(message.target).emit('recOffer',{teacher : message.name, student : message.target, type : 'offer', sdp : message.sdp})//그 소켓아이디를 저격해서 message 보낸다.
        }else if (message.type ==='answer'){//offer를 전달받은 학생이 answer를 보낸다.

            //answer로 왔을 때 socketid는 학생의 socketid겠지??
            console.log('client send message type answer')
            socket.to(message.target).emit('recAnswer',{teacher : message.target, student : message.name, type : 'answer', sdp : message.sdp}) //선생님에게만 전달...
        }else if (message.type ==='candidate'){ //학생과 선생만 camdidate를 교환하고 학생끼리는 교환하지 않아도 되는데
            console.log('client send message type candidate')
            socket.to("room").emit('recCandidate', message)
        }

    })
})