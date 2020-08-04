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
            startDisabled: false,
            callDisabled: true,
            hangUpDisabled: true,
            servers: null,
            pc1: null,
            pc2: null,
            localStream: null
        }

        this.localVideoRef = React.createRef();
        this.remoteVideoRef = React.createRef();
        this.socket = null
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
      /*  this.start = this.start.bind(this)*/
        this.gotRemoteStream = this.gotRemoteStream.bind(this)
        this.call = this.call.bind(this)
        this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this)
        this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this)
        this.onIceCandidate = this.onIceCandidate.bind(this)
        this.onIceStateChange = this.onIceStateChange.bind(this)
        this.hangUp = this.hangUp.bind(this)
    }

    componentDidMount() {
        this.socket = io('http://localhost:3100')
        this.socket.emit('joinRoom', {roomName : "Kor0302", userCode: "T170223"}) //props로 들어온다.
        this.setState({
            startDisabled: true
        })
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream;
                this.setState({
                    callDisabled: false,
                    localStream: stream
                })
            })
            .catch(e => alert("getUserMedia() error:" + e.name))
        this.setState({nowPageProps:  this.state.videoProps.slice(0,6)})
        this.socket.on('studentList', ()=>{
            this.addStudentList()
        })
    }

    addStudentList = ()=>{
        console.log("addStudentList 실행")
        this.setState({studentList : [  {seq : 1,fistName : "030501", lastName : "Mary"},{seq : 2,fistName : "030502", lastName : "Carrie"},{seq : 3,fistName : "030503", lastName : "Dorothy"}
                ,{seq : 4,fistName : "030504", lastName : "Helen"},{seq : 5,fistName : "030505", lastName : "Carol"},{seq : 6,fistName : "030506", lastName : "Betty"},{seq : 7,fistName : "030507", lastName : "Sally"}
                ,{seq : 8,fistName : "030508", lastName : "Susan"},{seq : 9,fistName : "030509", lastName : "Shirley"},{seq : 10,fistName : "030510", lastName : "Diane"},{seq : 11,fistName : "030511", lastName : "Anna"},
                {seq : 12,fistName : "030512", lastName : "Elizabeth"},{seq : 13,fistName : "030513", lastName : "Margaret"},{seq : 14,fistName : "030514", lastName : "Clara"}
                ,{seq : 15,fistName : "030515", lastName : "Annie"},{seq : 16,fistName : "030516", lastName : "Grace"},{seq : 17,fistName : "030517", lastName : "Nancy"},
                {seq : 18,fistName : "030518", lastName : "Frank"},{seq : 19,fistName : "030519", lastName : "Dennis"},{seq : 20,fistName : "030520", lastName : "Donald"},
                {seq : 21,fistName : "030521", lastName : "Athur"},{seq : 22,fistName : "030522", lastName : "Edward"},{seq : 23,fistName : "030523", lastName : "Harry"},
                {seq : 24,fistName : "030524", lastName : "Peter"},{seq : 25,fistName : "030525", lastName : "Richard"}]})

    }


    nextPage(){
       this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage+1)*6,(this.state.nowPage+1)*6+6),nowPage : this.state.nowPage+1})
    }

    prevPage(){
        this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage-1)*6,(this.state.nowPage-1)*6+6), nowPage : this.state.nowPage-1})
    }

/*    start = () => {
        this.setState({
            startDisabled: true
        });
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream;
                this.setState({
                    callDisabled: false,
                    localStream: stream
                });
            })
            .catch(e => alert("getUserMedia() error:" + e.name));
    };*/

    gotRemoteStream = event => {
        let remoteVideo = this.remoteVideoRef.current;
        if (remoteVideo.srcObject !== event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
        }
    }


    call = () => {
        this.setState({
            callDisabled: true,
            hangUpDisabled: false
        });
        let { localStream } = this.state;

        let servers = null,
            pc1 = new RTCPeerConnection(servers),
            pc2 = new RTCPeerConnection(servers)
        pc1.onicecandidate = e => this.onIceCandidate(pc1, e)
        pc1.oniceconnectionstatechange = e => this.onIceStateChange(pc1, e)
        pc2.onicecandidate = e => this.onIceCandidate(pc2, e)
        pc2.oniceconnectionstatechange = e => this.onIceStateChange(pc2, e)
        pc2.ontrack = e=>this.gotRemoteStream(e)
        localStream
            .getTracks()
            .forEach(track => pc1.addTrack(track, localStream))
        pc1
            .createOffer({offerToReceiveAudio: 1, offerToReceiveVideo: 1})
            .then(this.onCreateOfferSuccess, error =>
                console.error("Failed to create session description", error.toString()))
        console.log("servers after call", servers)
        this.setState({
            servers,
            pc1,
            pc2,
            localStream
        })
    }

    onCreateOfferSuccess = desc => {
        let { pc1, pc2} = this.state;
        pc1.setLocalDescription(desc)
            .then(
                () =>
                    console.log("pc1 setLocalDescription complete createOffer"),
                error =>
                    console.error(
                        "pc1 Failed to set session description in createOffer",
                        error.toString()
                    )
            )

        pc2.setRemoteDescription(desc).then(
            () => {
                console.log("pc2 setRemoteDescription complete createOffer");
                pc2
                    .createAnswer()
                    .then(this.onCreateAnswerSuccess, error =>
                        console.error(
                            "pc2 Failed to set session description in createAnswer",
                            error.toString()
                        )
                    );
            },
            error =>
                console.error(
                    "pc2 Failed to set session description in createOffer",
                    error.toString()
                )
        )
    }

    onCreateAnswerSuccess = desc => {
        let { pc1, pc2 } = this.state

        pc1.setRemoteDescription(desc).then(
            () => {
                console.log("pc1 setRemoteDescription complete createAnswer");
                console.log("servers after createAnswer", this.state.servers);
            },
            error =>
                console.error(
                    "pc1 Failed to set session description in onCreateAnswer",
                    error.toString()
                )
        )

        pc2.setLocalDescription(desc)
            .then(
                () =>
                    console.log(
                        "pc2 setLocalDescription complete createAnswer"
                    ),
                error =>
                    console.error(
                        "pc2 Failed to set session description in onCreateAnswer",
                        error.toString()
                    )
            )
    }

    onIceCandidate = (pc, event) => {
        let { pc1, pc2 } = this.state;
        let otherPc = pc === pc1 ? pc2 : pc1;
        otherPc.addIceCandidate(event.candidate)
            .then(
                () => console.log("addIceCandidate success"),
                error =>
                    console.error(
                        "failed to add ICE Candidate",
                        error.toString()
                    )
            )
    }

    onIceStateChange = (pc, event) => {
        console.log("ICE state:", pc.iceConnectionState)
    }

    hangUp = () => {
        let { pc1, pc2 } = this.state;
        pc1.close();
        pc2.close();
        this.setState({
            pc1: null,
            pc2: null,
            hangUpDisabled: true,
            callDisabled: false
        })
    }

    render() {
        return (
            <>
                <div style={{textAlign : "center"}}>
            <Link to="/home"><img src={picklelogo}/></Link>
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
                            <video className="t-streaming-student-video-component" poster={props.poster} ref={this.remoteVideoRef} autoPlay/></td>)
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