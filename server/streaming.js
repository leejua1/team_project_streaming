const io = require('socket.io').listen(3100)

let users = []

io.on('connection', socket=>{
    console.log(`socket is connected with client id ${socket.id}`)

    socket.on('joinRoom', data=>{ //join할 roomName과 userCode를 보낸다.
        console.log(`client join roomName ${data.roomName} userCode ${data.userCode}`)
        socket.join(data.roomName) //각자 data로 가지고 온 roomName에 join된다.
        users.push({socketId : data.socketId, userCode : data.userCode, roomName : data.roomName})

        })


    })//users에 socket과 연결된 user의 목록이 모두 들어간다. roomName으로 구분할 수 있기 때문에 다 들어가도 문제없음




        /*    socket.on('studentList',data=>{ //data로 현재 속한 roomName을 보낸다.
                const connectedUser = []
                for (let user in users){
                    if (user.roomName ===data.roomName){
                        connectedUser.push(user.userCode)
                    }
                } //전역으로 저장된 user목록에서 data로 받아온 roomName과 일치하는 user를 connectedUser에 담아서 보낸다.
                socket.emit('studentList', connectedUser)// 이 데이터는 학생과 선생 모두에게 갈 것이다.
            })*/
/*

    socket.on('reqMsg', data=>{
        console.log(data)
        io.emit('recMsg',data)
    })

})*/
