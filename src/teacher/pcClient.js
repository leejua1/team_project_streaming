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
        this.handleIceCandidate = this.handleIceCandidate.bind(this)
        this.createPeerConnection = this.createPeerConnection.bind(this)
       /*   this.sendMessage = this.sendMessage.bind(this)*/
        this.doCall = this.doCall.bind(this)
        this.setLocalAndSendMessage = this.setLocalAndSendMessage.bind(this)
        this.onCreateSessionDescriptionError = this.onCreateSessionDescriptionError.bind(this)
        this.doAnswer = this.doAnswer.bind(this)
        this.handleCreateOfferError = this.handleCreateOfferError.bind(this)
       this.socket = io('https://secret-dawn-11778.herokuapp.com/')
       /* this.socket.on('message',(message)=>{
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

        })*/
    }

    componentDidMount() {
   /*     this.socket = io('http://localhost:3100/')*/
        navigator.mediaDevices.getUserMedia({
            video : true
        })
            .then(stream=>{
                this.setState({localStream : stream})
                this.localVideo.current.srcObject= stream
                /*(1)*/
                this.sendMessage('got user media')
            })


        //서버에서 받아온다.
       this.socket.on('message',(message)=>{
           /*(2)*/
           if (message ==='got user media'){
               console.log("client receive message got user media from server ")
               this.maybeStart()
           } else if (message.type ==='offer'){
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
                let {pc} = this.state
                pc.addIceCandidate(candidate)

            }

        })
    }
    sendMessage(message){
        console.log('client sending message ', message)
        this.socket.emit('message', message)
    }
/*(3)*/
    maybeStart(){
        let {pc, localStream} = this.state
        console.log("maybeStart")
        if (typeof localStream !== 'undefined'){
            pc = new RTCPeerConnection(this.state.pcConfig)
            localStream
                .getTracks()
                .forEach(track => pc.addTrack(track, localStream))
        }
        this.setState({pc})
        this.createPeerConnection()
        this.doCall()
        }

    createPeerConnection(){
        try {
            let {pc} = this.state
            console.log("createPeerConnection")
            pc.onicecandidate = e => this.handleIceCandidate(e); //여기서 문제있음 비동기처리??
            pc.ontrack = e => this.handleRemoteStreamAdded(e)
        }
        catch (e) {
            console.log(`Failed to create PeerConnection, exception ${e.message}` )
        }
    }
    handleIceCandidate(event){
        let {pc} = this.state
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