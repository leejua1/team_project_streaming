import React from "react";
import './s-streaming.css'
import {Card, CardBody, CardTitle, Table} from "reactstrap";
import {Link} from "react-router-dom";
import picklelogo from "../../assets/img/logo/Pickle_Logo.png";
import io from 'socket.io-client'

const teacherStudentStreamingTypes = {REQUEST: "teacherStudentStreaming/REQUEST"}
const teacherStudentStreamingRequest = (action) => ({type: teacherStudentStreamingTypes.REQUEST, payload: action.payload})
const teacherStudentStreamingReducer = ( state = {}, action) => {
    switch (action.type){
        case teacherStudentStreamingTypes.REQUEST: return {...state, payload: action.payload}
        default: return state
    }
}

export class TeacherStudentStreaming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peer: null,
            localStream: null,
            remoteStream : null,
            config : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            studentList : [],
            classCode : "Kor112",
            studentCode : "100018002",
            localStreamAdded : false
        }
        this.localVideoRef = React.createRef();
        this.remoteVideoRef = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.sendMessage = this.sendMessage.bind(this)
        this.handleOffer = this.handleOffer.bind(this)
        this.handleNewICECandidateMsg = this.handleNewICECandidateMsg.bind(this)
        this.setRemoteTrack = this.setRemoteTrack.bind(this)
        this.iceCandidateHandler = this.iceCandidateHandler.bind(this)
    }
    componentDidMount() {
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
            this.localVideoRef.current.srcObject = stream
            this.setState({localStream : stream, localStreamAdded : true})
                this.socket.emit('joinRoom', {roomName : this.state.classCode, code : this.state.studentCode})
        })

        this.socket.on('recOffer', message=>{
            console.log(`receive offer from teacher`)
            this.handleOffer(message)
        })
        this.socket.on('recCandidate', message=>{
            this.handleNewICECandidateMsg(message)
        })
    }
    sendMessage(message){
        this.socket.emit('message', message)
    }
    handleOffer(message){
            console.log("callee receive offer")
            let {peer} = this.state
            peer = new RTCPeerConnection(this.state.pcConfig)
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                stream.getTracks().forEach(track=>peer.addTrack(track,stream))})
            peer.onicecandidate = (e)=>{this.iceCandidateHandler(e)}
            peer.ontrack = e =>{this.setRemoteTrack(e)}
            peer.setRemoteDescription(new RTCSessionDescription(message.sdp))
                .then(()=>{
                    console.log(`success set remote description `)
                })
                .then(()=>{
                    peer.createAnswer().then(answer=>{
                        peer.setLocalDescription(answer).then(()=>{
                                    console.log(`peer1 send icecandidate to ${message.teacherCode}`)
                                    this.sendMessage({
                                        name : this.state.studentCode,
                                        target : message.teacherCode,
                                        type : "answer",
                                        sdp : peer.localDescription
                        })
                            })
                    })
                })
            this.setState({peer})

    }
    setRemoteTrack(e){
        console.log(`remote stream added on track`)
        if (e.streams[0]){
            this.remoteVideoRef.current.srcObject  = e.streams[0]
        }
    }
    iceCandidateHandler(e){
        if (e.candidate){
            this.sendMessage({
                name : this.state.studentCode,
                type : "candidate",
                target : "100000103",
                candidate: e.candidate
            })
        }
    }
    handleNewICECandidateMsg(message){
        let {peer} = this.state
        peer.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
            console.log('success icecandidate added'))
        this.setState({peer})
    }
    render() {
        const lectureMeterialList = [{seq : 1,fistName : "현대문학의 이해", lastName : "수정/삭제"},{seq : 2,fistName : "고전문학의 이해", lastName : "수정/삭제"},{seq : 3,fistName : "근대문학의 이해", lastName : "수정/삭제"}]
        return (
                <>
                    <div style={{textAlign : "center"}}>
                    </div>
                    <div className="s-streaming-container">
                        <div className="s-streaming-streaming-container">
                            <div className="s-streaming-video-container" >
                                <video ref={this.remoteVideoRef} className="s-streaming-teacher-video" autoPlay controls/></div>
                                <div className="s-streaming-comment-container">
                                    <Card>
                                        <p>4월 2주차 월요일 1교시 문학<br/>1차시 : 현대 문학의 이해</p>
                                    </Card>
                            </div>
                        </div>
                        <div className="s-streaming-items-container">
                            <div className="s-streaming-member-list-container">
                                <Card>
                                    <CardTitle className="s-streaming-member-list-title">멤버 리스트</CardTitle>
                                                <CardBody>
                                                        <div style={{ width: "100%",
                                                            height: "180px",
                                                            overflow: "auto",
                                                            margin : "auto"}}>
                                                <Table responsive className="s-streaming-member-list-table">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>학번</th>
                                                        <th>이름</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.studentList && this.state.studentList.map(student=><tr>
                                                        <th scope="row">{student.seq}</th>
                                                        <td>{student.fistName}</td>
                                                        <td>{student.lastName}</td>
                                                    </tr>)}
                                                    </tbody>
                                                </Table>
                                                        </div>
                                                </CardBody>
                                </Card>
                            </div>
                            <div className="s-streaming-lecture-meterials-container">
                                <Card>
                                    <CardTitle className="s-streaming-lecture-meterials-title">강의자료</CardTitle>
                                    <CardBody>
                                        <div style={{ width: "100%",
                                            height: "180px",
                                            overflow: "auto",
                                            margin : "auto"}}>
                                                <Table  size="sm" className="s-streaming-lecture-meterials-table">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>파일명</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {lectureMeterialList && lectureMeterialList.map(lectureMeterial=><tr>
                                                        <th scope="row">{lectureMeterial.seq}</th>
                                                        <td>{lectureMeterial.fistName}</td>
                                                        <td>{lectureMeterial.lastName}</td>
                                                    </tr>)}
                                                    </tbody>
                                                </Table>
                                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <video ref={this.localVideoRef} autoPlay controls className="s-streaming-student-video" />
                        </div>

                        </div>


                </>

        )
    }
}

export default teacherStudentStreamingReducer