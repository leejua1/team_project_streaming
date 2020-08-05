import React, {Component, createRef} from 'react';

class NewPc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localStream : null
        }
        this.localVideo = createRef()
        this.remoteVideo = createRef()

    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            video : true
        })
            .then(stream=>{
                this.setState({localStream : stream})
                this.localVideo.current.srcObject= stream
            })
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

export default NewPc;