import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class SetNick extends Component {
    
    goGame = (e) => {
        this.props.history.push({
            pathname: '/game/PlayQuiz',
            state: {
                nickname: "nickname",
                code : this.props.location.state.code
            }
        });
        console.log(this.props.history);
    }
    goAdmin = (e) => {
        this.props.history.push({
            pathname: '/admin/game/PlayQuiz',
            state: {
                nickname: "admin",
                code : this.props.location.state.code
            }
        });
        console.log(this.props.history);
    }

    render() {
        return (
            <div className="quiz_contents">
                <div className="input_code">
                    <h2>닉네임을 입력하세요.</h2>
                    <input type="text" className="code"></input>
                    <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                    <input type="button" value="admin" className="adminbtn" onClick={this.goAdmin}></input>
                </div>
            </div>
        );
    }
}

export default SetNick;