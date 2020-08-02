import React, {Component} from 'react'
import StudentVideo from "./StudentVideo"
import {Button} from 'reactstrap'
import './t-streaming.css'
import {Link} from 'react-router-dom'
import picklelogo from "../../assets/img/logo/Pickle_Logo.png";
const studentStreamingTypes = {REQUEST: "studentStreaming/REQUEST"}
const studentStreamingRequest = (action) => ({type: studentStreamingTypes.REQUEST, payload: action.payload})
const studentStreamingReducer = ( state = {}, action ) => {
    switch (action.type){
        case studentStreamingTypes.REQUEST: return {...state, payload: action.payload}
        default: return state
    }
}
export class StudentStreaming extends Component {
    render() {
        return (
            <>
                <div style={{textAlign : "center"}}>
                    <Link to="/home"><img src={picklelogo}/></Link>
                </div>
                <div className="t-streaming-student-container">
                    <table className="t-streaming-student-video">
                        <tr><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td></tr>
                        <tr><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td></tr>
                        <tr><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td></tr>
                        <tr><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td></tr>
                        <tr><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td><td><StudentVideo/></td></tr>
                    </table>
                   <Link to="/teacherstreaming"><Button className="t-streaming-button-to-teacher-streaming">선생화면으로 돌아가기</Button>
                   </Link>          </div>
            </>
        )
    }
}


export default studentStreamingReducer