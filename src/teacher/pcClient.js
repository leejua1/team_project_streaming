import React, {Component, createRef} from 'react';
import io from 'socket.io-client'
class PcClient extends Component {
    constructor(props) {
        super(props);
        this.state={
            remoteStream : null,
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            pc : null
        }
        this.localVideo = createRef()
        this.remoteVideo = createRef()
        this.maybeStart = this.maybeStart.bind(this)
        this.createPeerConnection = this.createPeerConnection.bind(this)
        this.handleIceCandidate = this.handleIceCandidate.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.doCall = this.doCall.bind(this)
        this.setLocalAndSendMessage = this.setLocalAndSendMessage.bind(this)
        this.onCreateSessionDescriptionError = this.onCreateSessionDescriptionError.bind(this)
        this.doAnswer = this.doAnswer.bind(this)
        this.handleCreateOfferError = this.handleCreateOfferError.bind(this)
        this.socket = io.connect("https://secret-dawn-11778.herokuapp.com/")
        this.socket.on('message',(message)=>{
           //여기서 받은 메세지에 offer과 answer과 candidate와 bye 유형이 있는데
            //일단...  candidate만 해보자
            if (message.type ==='offer'){
                this.maybeStart()
                let {pc } = this.state
                pc.setRemoteDescription(new RTCSessionDescription(message))
                this.doAnswer()
            }
            else if (message.type ==='answer'){
                let {pc } = this.state
                pc.setRemoteDescription(new RTCSessionDescription(message))
            }
           else if (message.type === 'candidate'){
               console.log('message recieve candidate')
                const candidate = new RTCIceCandidate({
                    sdpMLineIndex : message.label,
                    candidate : message.candidate
                })
                let {pc, localStream } = this.state
                pc.addIceCandidate(candidate)
                localStream.getTracks().forEach(track => pc.addTrack(track, localStream))
                this.doCall()
            }

        })
    }
    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            video : true
        })
            .then(stream=>{
                this.setState({localStream : stream})
                this.localVideo.current.srcObject= stream
                this.maybeStart()
            })
        //서버에서 받아온다.
    }
    maybeStart(){
        console.log("maybeStart")
        this.createPeerConnection()
    }
    createPeerConnection(){
        try {
            let pc = new RTCPeerConnection(this.state.pcConfig)
            pc.onicecandidate = e => this.handleIceCandidate(pc,e); //여기서 문제있음 비동기처리??

        }
        catch (e) {
            console.log(`Failed to create PeerConnection, exception ${e.message}` )
        }
    }
    handleIceCandidate(pc,event){
        console.log("handleIceCandidate")
        if (event.candidate){
            this.sendMessage({
                type : 'candidate',
                label : event.candidate.sdpMLineIndex,
                id : event.candidate.sdpMid,
                candidate : event.candidate.candidate
            })
        }
    }
    handleRemoteStreamAdded(pc,event){
        this.setState({remoteStream : event.stream})
        this.remoteVideo.srcObject = this.state.remoteStream
    }
    doCall(){
        let {pc} = this.state
        pc.createOffer().then(
            this.setLocalAndSendMessage,
            this.handleCreateOfferError
        )
    }
    doAnswer(){
        let {pc} = this.state
        pc.createAnswer().then(
            this.setLocalAndSendMessage,
            this.onCreateSessionDescriptionError
        )
    }
    setLocalAndSendMessage(sessionDescription){
        let {pc} = this.state
        pc.setLocalDescription(sessionDescription)
        this.sendMessage(sessionDescription) //여기에서 offer message를 보낸다.
    }
    handleCreateOfferError(error){
        console.log("error in handleCreateOfferError")
    }
    onCreateSessionDescriptionError(error){
        console.log("error in onCreateSessionDescriptionError")
    }



    sendMessage(message){
        console.log("sendMessage")
        this.socket.emit('message', message) //서버로 icecandidate 를 보낸다?
    }



    render() {
        return (
            <>
                <video ref={this.localVideo} autoPlay/>
                <video ref={this.remoteVideo} autoPlay/>
            </>
        );
    }
}

export default PcClient;