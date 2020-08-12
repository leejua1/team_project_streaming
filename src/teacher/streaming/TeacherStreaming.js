import React, {Component, createRef} from 'react';
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

export class TeacherStreaming extends Component{
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
            videoProps : [{poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 1,fistName : "030501", lastName : "Mary"}, ref : createRef()  },
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 2,fistName : "030502", lastName : "Carrie"}, ref : createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 3,fistName : "030503", lastName : "Dorothy"}, ref : createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 4,fistName : "030504", lastName : "Helen"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 5,fistName : "030505", lastName : "Carol"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 6,fistName : "030506", lastName : "Betty"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 7,fistName : "030507", lastName : "Sally"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 8,fistName : "030508", lastName : "Susan"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 9,fistName : "030509", lastName : "Shirley"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 10,fistName : "030510", lastName : "Diane"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 11,fistName : "030511", lastName : "Anna"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 12,fistName : "030512", lastName : "Elizabeth"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 13,fistName : "030513", lastName : "Margaret"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 14,fistName : "030514", lastName : "Clara"}, ref : createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 15,fistName : "030515", lastName : "Annie"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 16,fistName : "030516", lastName : "Grace"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 17,fistName : "030517", lastName : "Nancy"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 18,fistName : "030518", lastName : "Frank"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 19,fistName : "030519", lastName : "Dennis"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 20,fistName : "030520", lastName : "Donald"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 21,fistName : "030521", lastName : "Athur"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 22,fistName : "030522", lastName : "Edward"}, ref :  createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 23,fistName : "030523", lastName : "Harry"}, ref : createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 24,fistName : "030524", lastName : "Peter"}, ref : createRef()},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 25,fistName : "030525", lastName : "Richard"}, ref : createRef()}],
            nowPageProps : [],
            nowPage : 0,
            noPrev : false,
            noNext : false,
            peers : {peer1 : null, peer2 : null, peer3 :null, peer4 : null, peer5 : null, peer6 : null},
            localStream: null,
            remoteStreams : {remoteStream1 : null, remoteStream2: null, remoteStream3 : null, remoteStream4: null, remoteStream5: null},
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            classCode : "Kor112",
            teacherCode :"100000103" // 1000은 학교코드 00은 선생식별 103은 담당학년반
        }
        this.localVideoRef = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.offer = this.offer.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleIceCandidateMsg = this.handleIceCandidateMsg.bind(this)
        this.iceCandidateHandlerOnPeer1 = this.iceCandidateHandlerOnPeer1.bind(this)
        this.iceCandidateHandlerOnPeer2 = this.iceCandidateHandlerOnPeer2.bind(this)
        this.iceCandidateHandlerOnPeer3 = this.iceCandidateHandlerOnPeer3.bind(this)
        this.iceCandidateHandlerOnPeer4 = this.iceCandidateHandlerOnPeer3.bind(this)
        this.iceCandidateHandlerOnPeer5 = this.iceCandidateHandlerOnPeer3.bind(this)
        this.iceCandidateHandlerOnPeer6 = this.iceCandidateHandlerOnPeer3.bind(this)
        this.setRemoteTrackOnPeer1 = this.setRemoteTrackOnPeer1.bind(this)
        this.setRemoteTrackOnPeer2 = this.setRemoteTrackOnPeer2.bind(this)
        this.setRemoteTrackOnPeer3 = this.setRemoteTrackOnPeer3.bind(this)
        this.setRemoteTrackOnPeer4 = this.setRemoteTrackOnPeer4.bind(this)
        this.setRemoteTrackOnPeer5 = this.setRemoteTrackOnPeer5.bind(this)
        this.setRemoteTrackOnPeer6 = this.setRemoteTrackOnPeer6.bind(this)
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
            console.log(`receive start offer message from server code ${data.studentCode}`)
            const {localStream} = this.state
            switch (data.studentCode) {
                case "100018001":
                    let {peer1} = this.state.peers
                    peer1 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer1.addTrack(track,localStream))
                    peer1.onicecandidate =  (e) => {
                        this.iceCandidateHandlerOnPeer1(e)
                        console.log(`caller send icecandidate message to 100018001`)
                    }
                    peer1.ontrack = e=> {
                        this.setRemoteTrackOnPeer1(e)
                    }
                    this.setState({peers : {peer1}})
                    break;
                case "100018002":
                    let {peer2} = this.state.peers
                    peer2 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer2.addTrack(track,localStream))
                    peer2.onicecandidate =  e => {
                        this.iceCandidateHandlerOnPeer2(e)
                        console.log(`caller send icecandidate message to 100018002`)
                    }
                    peer2.ontrack = e=> {
                        this.setRemoteTrackOnPeer2(e)
                    }
                    this.setState({peers : {peer2}})
                    break;
                case "100018003":
                    let {peer3} = this.state.peers
                    peer3 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer3.addTrack(track,localStream))
                    peer3.onicecandidate =  (e) => {
                        this.iceCandidateHandlerOnPeer3(e)
                        console.log(`caller send icecandidate message to 100018003`)
                    }
                    peer3.ontrack = e=> {
                        this.setRemoteTrackOnPeer3(e)
                    }
                    this.setState({peers : {peer3}})
                    break;
                case "100018004":
                    let {peer4} = this.state.peers
                    peer4 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer4.addTrack(track,localStream))
                    peer4.onicecandidate =  (e) => {
                        this.iceCandidateHandlerOnPeer4(e)
                        console.log(`caller send icecandidate message to 100018004`)
                    }
                    peer4.ontrack = e=> {
                        this.setRemoteTrackOnPeer4(e)
                    }
                    this.setState({peers : {peer4}})
                    break;
                case "100018005":
                    let {peer5} = this.state.peers
                    peer5 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer5.addTrack(track,localStream))
                    peer5.onicecandidate =  (e) => {
                        this.iceCandidateHandlerOnPeer5(e)
                        console.log(`caller send icecandidate message to 100018005`)
                    }
                    peer5.ontrack = e=> {
                        this.setRemoteTrackOnPeer5(e)
                    }
                    this.setState({peers : {peer5}})
                    break;
                case "100018006":
                    let {peer6} = this.state.peers
                    peer6 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer6.addTrack(track,localStream))
                    peer6.onicecandidate =  (e) => {
                        this.iceCandidateHandlerOnPeer6(e)
                        console.log(`caller send icecandidate message to 100018006`)
                    }
                    peer6.ontrack = e=> {
                        this.setRemoteTrackOnPeer6(e)
                    }
                    this.setState({peers : {peer6}})
                    break;
                }
                this.setState({localStream})
            this.offer(data)
        })
        this.socket.on('recAnswer', message=>{
            switch (message.studentCode) {
                case "100018001":
                    let {peer1} = this.state.peers
                    peer1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(r =>
                        console.log(`success remotedescription set on peer1`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer1}})
                    break;
                case "100018002":
                    let {peer2} =  this.state.peers
                    peer2.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                        console.log(`success remotedescription set on peer2`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer2}})
                    break;
                case "100018003":
                    let {peer3} = this.state.peers
                    peer3.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                        console.log(`success remotedescription set on peer3`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer3}})
                    break;
                case "100018004":
                    let {peer4} = this.state.peers
                    peer4.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                        console.log(`success remotedescription set on peer4`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer4}})
                    break;
                case "100018005":
                    let {peer5} = this.state.peers
                    peer5.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                        console.log(`success remotedescription set on peer5`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer5}})
                    break;
                case "100018006":
                    let {peer6} = this.state.peers
                    peer6.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                        console.log(`success remotedescription set on peer6`))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer6}})
                    break;
            }
        })
        this.socket.on('recCandidate', message=>{
            this.handleIceCandidateMsg(message)
            })
    }
    setRemoteTrackOnPeer1(e){
        console.log('peer1 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[0].ref.current.srcObject =e.streams[0]
        }
    }
    setRemoteTrackOnPeer2(e){
        console.log('peer2 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[1].ref.current.srcObject =e.streams[0]
        }
    }
    setRemoteTrackOnPeer3(e){
        console.log('peer3 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[2].ref.current.srcObject =e.streams[0]
        }
    }
    setRemoteTrackOnPeer4(e){
        console.log('peer4 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[3].ref.current.srcObject =e.streams[0]
        }
    }
    setRemoteTrackOnPeer5(e){
        console.log('peer5 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[4].ref.current.srcObject =e.streams[0]
        }
    }
    setRemoteTrackOnPeer6(e){
        console.log('peer6 set remote stream added on track')
        if (e.streams[0]){
            this.state.videoProps[5].ref.current.srcObject =e.streams[0]
        }
    }
    handleIceCandidateMsg(message){
        switch (message.name) {
            case "100018001" :
                const {peer1} = this.state.peers
                peer1.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
                this.setState({peers : {peer1}})
                break;
                case "100018002" :
                    const {peer2} = this.state.peers
                    peer2.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer2}})
                    break;
            case "100018003" :
                const {peer3} = this.state.peers
                peer3.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
                this.setState({peers : {peer3}})
                break;
            case "100018004" :
                const {peer4} = this.state.peers
                peer4.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
                this.setState({peers : {peer4}})
                break;
            case "100018005" :
                const {peer5} = this.state.peers
                peer5.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
                this.setState({peers : {peer5}})
                break;
            case "100018006" :
                const {peer6} = this.state.peers
                peer6.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
                this.setState({peers : {peer6}})
                break;
        }
    }
    sendMessage(message){
        this.socket.emit('message',message)
    }
    iceCandidateHandlerOnPeer1(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018001",
                candidate : e.candidate
            })
        }
    }
    iceCandidateHandlerOnPeer2(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018002",
                candidate : e.candidate
            })
        }
    }
    iceCandidateHandlerOnPeer3(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018003",
                candidate : e.candidate
            })
        }
    }
    iceCandidateHandlerOnPeer4(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018004",
                candidate : e.candidate
            })
        }
    }
    iceCandidateHandlerOnPeer5(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018005",
                candidate : e.candidate
            })
        }
    }
    iceCandidateHandlerOnPeer6(e){
        if (e.candidate){
            this.sendMessage({
                type : "candidate",
                target : "100018006",
                candidate : e.candidate
            })
        }
    }
    offer(data){
        switch (data.studentCode) {
            case "100018001":
                let {peer1} = this.state.peers
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
                this.setState({peers : {peer1}})
                break;
            case "100018002" :
                let {peer2} = this.state.peers
                peer2.createOffer().then(offer=>{
                    peer2.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer2 set local description success")
                        })
                        .catch(e=>{
                            console.log(e)
                        })})
                    .then(()=>{
                        this.sendMessage({
                            name : this.state.teacherCode,
                            target :data.studentCode,
                            type : "offer",
                            sdp : peer2.localDescription
                        })
                    })
                this.setState({peers : {peer2}})
                break
            case "100018003" :
                let {peer3} = this.state.peers
                peer3.createOffer().then(offer=>{
                    peer3.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer3 set local description success")
                        })
                        .catch(e=>{
                            console.log(e)
                        })})
                    .then(()=>{
                        this.sendMessage({
                            name : this.state.teacherCode,
                            target :data.studentCode,
                            type : "offer",
                            sdp : peer3.localDescription
                        })
                    })
                this.setState({peers : {peer3}})
                break
            case "100018004" :
                let {peer4} = this.state.peers
                peer4.createOffer().then(offer=>{
                    peer4.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer4 set local description success")
                        })
                        .catch(e=>{
                            console.log(e)
                        })})
                    .then(()=>{
                        this.sendMessage({
                            name : this.state.teacherCode,
                            target :data.studentCode,
                            type : "offer",
                            sdp : peer4.localDescription
                        })
                    })
                this.setState({peers : {peer4}})
                break
            case "100018005" :
                let {peer5} = this.state.peers
                peer5.createOffer().then(offer=>{
                    peer5.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer5 set local description success")
                        })
                        .catch(e=>{
                            console.log(e)
                        })})
                    .then(()=>{
                        this.sendMessage({
                            name : this.state.teacherCode,
                            target :data.studentCode,
                            type : "offer",
                            sdp : peer5.localDescription
                        })
                    })
                this.setState({peers : {peer5}})
                break
            case "100018006" :
                let {peer6} = this.state.peers
                peer6.createOffer().then(offer=>{
                    peer6.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer6 set local description success")
                        })
                        .catch(e=>{
                            console.log(e)
                        })})
                    .then(()=>{
                        this.sendMessage({
                            name : this.state.teacherCode,
                            target :data.studentCode,
                            type : "offer",
                            sdp : peer6.localDescription
                        })
                    })
                this.setState({peers : {peer6}})
                break
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
                <table className="t-streaming-student-video"> <tr>
                    {this.state.nowPage!==0 ?
                       <td><Button disabled={false} onClick={this.prevPage}>이전</Button></td>:<td><Button disabled={true} onClick={this.prevPage}>이전</Button></td>
                    }
 {/*                <video className="t-streaming-student-video-component" autoPlay ref={this.remoteVideoRef1}/>
                    <video className="t-streaming-student-video-component" autoPlay ref={this.remoteVideoRef2}/>
                    <video className="t-streaming-student-video-component" autoPlay ref={this.remoteVideoRef3}/>*/}
                    {this.state.nowPageProps.map(props=>{
                        return (<td> <Card><p className="t-streaming-student-name">학번 : {props.info.fistName} 이름 : {props.info.lastName}</p></Card>
                            <video className="t-streaming-student-video-component" autoPlay ref={props.ref}/></td>)
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