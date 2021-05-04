import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class SetNick extends Component {

    goGame = (e) => {
        this.props.history.push('/game/PlayQuiz');
    }

    render() {
        return (
            <div className="quiz_contents">
                <div className="input_code">
                    <h2>닉네임을 입력하세요.</h2>
                    <input type="text" className="code"></input>
                    <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                </div>
            </div>
        );
    }
}

export default SetNick;