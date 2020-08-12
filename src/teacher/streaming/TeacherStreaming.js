import React, {Component} from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import {Table, Card, CardBody, CardTitle, Button} from "reactstrap";
import './t-streaming.css'
import {Link} from 'react-router-dom'
import picklelogo from '../../assets/img/logo/Pickle_Logo.png'
import io from 'socket.io-client'


const teacherStreamingTypes = {REQUEST: "teacherScreen/REQUEST"}
const teacherStreamingRequest = (action) => ({type: teacherStreamingTypes.REQUEST, payload: action.payload})
export const teacherStreamingReducer = ( state = {}, action ) => {
    switch (action.type){
        case teacherStreamingTypes.REQUEST: return {...state, payload: action.payload}
        default: return state
    }
}

export class TeacherStreaming extends Component{ //필요한것... 수업코드, 학생코드, 선생코드, 수업디테일이 일단 들어왔다고 생각하자.
    constructor(props) {
        super(props);
        this.state = {
            lectureMeterialList :  [{seq : 1,fistName : "현대문학의 이해", lastName : "수정/삭제"},{seq : 2,fistName : "고전문학의 이해", lastName : "수정/삭제"},{seq : 3,fistName : "근대문학의 이해", lastName : "수정/삭제"}],
            studentList :  [{seq : 1,fistName : "030501", lastName : "Mary"},{seq : 2,fistName : "030502", lastName : "Carrie"},{seq : 3,fistName : "030503", lastName : "Dorothy"}
                ,{seq : 4,fistName : "030504", lastName : "Helen"},{seq : 5,fistName : "030505", lastName : "Carol"},{seq : 6,fistName : "030506", lastName : "Betty"},{seq : 7,fistName : "030507", lastName : "Sally"}
                ,{seq : 8,fistName : "030508", lastName : "Susan"},{seq : 9,fistName : "030509", lastName : "Shirley"},{seq : 10,fistName : "030510", lastName : "Diane"},{seq : 11,fistName : "030511", lastName : "Anna"},
                {seq : 12,fistName : "030512", lastName : "Elizabeth"},{seq : 13,fistName : "030513", lastName : "Margaret"},{seq : 14,fistName : "030514", lastName : "Clara"}
                ,{seq : 15,fistName : "030515", lastName : "Annie"},{seq : 16,fistName : "030516", lastName : "Grace"},{seq : 17,fistName : "030517", lastName : "Nancy"},
                {seq : 18,fistName : "030518", lastName : "Frank"},{seq : 19,fistName : "030519", lastName : "Dennis"},{seq : 20,fistName : "030520", lastName : "Donald"},
                {seq : 21,fistName : "030521", lastName : "Athur"},{seq : 22,fistName : "030522", lastName : "Edward"},{seq : 23,fistName : "030523", lastName : "Harry"},
                {seq : 24,fistName : "030524", lastName : "Peter"},{seq : 25,fistName : "030525", lastName : "Richard"}],
            videoProps : [{poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 1,fistName : "030501", lastName : "Mary"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 2,fistName : "030502", lastName : "Carrie"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 3,fistName : "030503", lastName : "Dorothy"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 4,fistName : "030504", lastName : "Helen"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 5,fistName : "030505", lastName : "Carol"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 6,fistName : "030506", lastName : "Betty"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 7,fistName : "030507", lastName : "Sally"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 8,fistName : "030508", lastName : "Susan"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 9,fistName : "030509", lastName : "Shirley"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 10,fistName : "030510", lastName : "Diane"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 11,fistName : "030511", lastName : "Anna"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 12,fistName : "030512", lastName : "Elizabeth"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 13,fistName : "030513", lastName : "Margaret"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 14,fistName : "030514", lastName : "Clara"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 15,fistName : "030515", lastName : "Annie"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 16,fistName : "030516", lastName : "Grace"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 17,fistName : "030517", lastName : "Nancy"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 18,fistName : "030518", lastName : "Frank"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 19,fistName : "030519", lastName : "Dennis"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 20,fistName : "030520", lastName : "Donald"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 21,fistName : "030521", lastName : "Athur"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 22,fistName : "030522", lastName : "Edward"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 23,fistName : "030523", lastName : "Harry"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 24,fistName : "030524", lastName : "Peter"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 25,fistName : "030525", lastName : "Richard"}}],
            nowPageProps : [],
            nowPage : 0,
            noPrev : false,
            noNext : false,
            peer1: null,
            peer2: null,
            localStream: null,
            remoteStream1 : null,
            remoteStream2 : null,
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            count : 0,
            classCode : "Kor112",
            teacherCode :"100000103" // 1000은 학교코드 00은 선생식별 103은 담당학년반
        }
        this.localVideoRef = React.createRef();
        this.remoteVideoRef1 = React.createRef();
        this.remoteVideoRef2 = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.offer = this.offer.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleIceCandidateMsg = this.handleIceCandidateMsg.bind(this)
        this.addIceCandidateHandler = this.addIceCandidateHandler.bind(this)
        this.setRemoteTrack = this.setRemoteTrack.bind(this)
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream;
                this.setState({localStream: stream})
            })
        this.setState({nowPageProps:  this.state.videoProps.slice(0,6)})


        this.socket.emit('joinRoom', {roomName : this.state.classCode, code: this.state.teacherCode}) //state에 저장된 classCode와 teacherCode가 서버로 보내진다.


        this.socket.on('letOffer',data=>{
            console.log('receive start offer message from server')
            console.log("offer")
            let {peer1, localStream} = this.state
            peer1 = new RTCPeerConnection(this.state.pcConfig)
            localStream.getTracks().forEach(track=>peer1.addTrack(track,localStream))
            peer1.onicecandidate =  e => {
                this.addIceCandidateHandler(e)
                console.log(`caller send icecandidate message to 100018002`)
            }
            peer1.ontrack = e=> {
                this.setRemoteTrack(e)
            }
            this.setState({peer1})
            this.offer(data)
        })
        this.socket.on('recAnswer', message=>{
            if(message.studentCode ==="100018002") {
                let {peer1} = this.state
                peer1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(r =>
                    console.log(`success remotedescription set on peer1`))
                    .catch(e=>console.log(e))
                this.setState({peer1})
            }else if (message.studentCode === "???"){
                let {peer2} = this.state
                peer2.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                    console.log(`remoteDescription setting success`))
                    .catch(e=>console.log(e))
                this.setState({peer2})
            }
        })
        this.socket.on('recCandidate', message=>{
            this.handleIceCandidateMsg(message)
            })
    }
    offer(data){
        let {peer1} = this.state
        peer1.createOffer().then(offer=>{
            peer1.setLocalDescription(offer)
                .then(()=>{
                    console.log("peer1 set local description success")
                })
                .catch(e=>{
                    console.log(e)
                })})
            .then(()=>{
                this.sendMessage({
                    name : this.state.teacherCode,
                    target :data.studentCode,
                    type : "offer",
                    sdp : peer1.localDescription
                })

            })
        this.setState({peer1})
    }
    addIceCandidateHandler(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018002",
                candidate : e.candidate
            })
        }
    }
    setRemoteTrack(e){
        console.log('peer1 set remote stream added on track')
        if (e.streams[0]){
            this.remoteVideoRef1.current.srcObject =e.streams[0]
        }
        this.setState(this.remoteVideoRef1)
    }
    sendMessage(message){
        this.socket.emit('message',message)
    }
    handleIceCandidateMsg(message){
        if(message.name ==="100018002") {
            const {peer1} = this.state
            peer1.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                console.log('success icecandidate added'))
                .catch(e=>console.log(e))
            this.setState(peer1)
        }else if(message.name ==="???"){
            const {peer2} = this.state
            peer2.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                console.log('success icecandidate added'))
                .catch(e=>console.log(e))
            this.setState(peer2)
        }
    }



    nextPage(){
       this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage+1)*6,(this.state.nowPage+1)*6+6),nowPage : this.state.nowPage+1})
    }
    prevPage(){
        this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage-1)*6,(this.state.nowPage-1)*6+6), nowPage : this.state.nowPage-1})
    }


    render() {
        return (
            <>
                <div style={{textAlign : "center"}}>
                </div>
                <button onClick={this.call} disabled={this.state.callDisabled}>
                    Call{" "}
                </button>{" "}
                <table className="t-streaming-student-video"> <tr>
                    {this.state.nowPage!==0 ?
                       <td><Button disabled={false} onClick={this.prevPage}>이전</Button></td>:<td><Button disabled={true} onClick={this.prevPage}>이전</Button></td>
                    }
                    {this.state.nowPageProps.map(props=>{
                        return (<td> <Card><p className="t-streaming-student-name">학번 : {props.info.fistName} 이름 : {props.info.lastName}</p></Card>
                            <video className="t-streaming-student-video-component" autoPlay  ref={this.remoteVideoRef1}/></td>)
                        })}
                    {this.state.nowPage!==4 ?
                        <td><Button disabled={false} onClick={this.nextPage}>다음</Button></td>:<td><Button disabled={true} onClick={this.nextPage}>다음</Button></td>
                    }

                       </tr>
                </table>

                <div className="t-streaming-container">
                    <div className="t-streaming-streaming-container">
                        <div className="t-streaming-video-container" >
                            <video ref={this.localVideoRef} className="t-streaming-video-component" autoPlay controls/>
                            <div className="t-streaming-comment-container">
                                <Card>
                                    <p>4월 2주차 월요일 1교시 문학<br/>1차시 : 현대 문학의 이해</p>
                                </Card></div>
                        </div>
                    </div>
                    <div className="t-streaming-items-container">
                        <div className="t-streaming-member-list-container">
                            <Card>
                                <CardTitle className="t-streaming-member-list-title">멤버 리스트</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "550px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table responsive className="t-streaming-member-list-table">
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
                        <div className="t-streaming-lecture-meterials-container">
                            <Card>
                                <CardTitle  className="t-streaming-lecture-meterials-title">강의자료</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "80px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table  size="sm" className="t-streaming-lecture-meterials-table">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>파일명</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.lectureMeterialList && this.state.lectureMeterialList.map(lectureMeterial=><tr>
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
                    </div>

                </div>

            </>
        );
    }
}

export default teacherStreamingReducer;