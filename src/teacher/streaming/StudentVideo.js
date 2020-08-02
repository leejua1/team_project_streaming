import React, {Component} from 'react';
import './t-streaming.css'
import {Card} from 'reactstrap'

export class StudentVideo extends Component {
    render() {
        return (
            <div>
                <Card><p className="t-streaming-student-name">학번 : 030223 이름 : Mark</p></Card>
                <video className="t-streaming-student-video-component" controls/>
            </div>
        );
    }

}


export default StudentVideo