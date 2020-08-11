
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
            values.forEach(value => {
                console.log(`roomName : ${value.roomName} , value.code ${value.code}`)
                if ( value.roomName===data.roomName && value.code.substring(4,6)==='00'){
                    socket.to(value.id).emit('letOffer',{studentCode : data.code})
                }
            })
        }
    })
    socket.on('message',message=>{
        if (message.type==='offer'){ //offer를 제공하는 대상... 접속해서 connect된  학생. 그 학생의 socketid에 대한 정보를 알고있으려면 letOffer할  때 자신의 학생의 socketId를 전달해야된다.
            console.log(`client send message type offer target ${message.target}`)
            //offer로 왔을 때 socketid는 선생의 socketid겠지??
            values.forEach(value=>{
                if (value.code===message.target)
                    socket.to(value.id).emit('recOffer',{teacherCode : message.name, studentCode : message.target, type :message.type, sdp : message.sdp})
            })
         //그 소켓아이디를 저격해서 message 보낸다.
        }else if (message.type ==='answer'){//offer를 전달받은 학생이 answer를 보낸다.
            //answer로 왔을 때 socketid는 학생의 socketid겠지??
            values.forEach(value=>{
                if (value.code===message.target)
                    console.log(`client send message type answer target ${message.target}` )
                    socket.to(value.id).emit('recOffer',{teacherCode : message.name, studentCode : message.target, type :message.type, sdp : message.sdp})
            })
        }else if (message.type ==='candidate'){ //학생과 선생만 camdidate를 교환하고 학생끼리는 교환하지 않아도 되는데
            console.log(`client send message type candidate target ${message.target}`)
            values.forEach(value=>{
                if (value.code===message.target)
                    console.log(`client send message type answer target ${message.target}` )
                socket.to(value.id).emit('recCandidate',message)
            })
        }

    })
})