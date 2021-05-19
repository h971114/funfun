import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
import cookie from 'react-cookies';
var nickname = ''

class SetNick extends Component {
    
    goGame = (e) => {
                cookie.save('ID', "", {
                    path: '/',
                    expires: new Date(Date.now()),
                });
                cookie.save('code', "", {
                    path: '/',
                    expires: new Date(Date.now()),
                });
                cookie.save('nickname', "", {
                    path: '/',
                    expires: new Date(Date.now()),
                });
        this.props.history.push({
            pathname: '/game/PlayQuiz',
            state: {
                nickname: nickname,
                code : this.props.location.state.code
            }
        });
        console.log(this.props.history);
    }
    goAdmin = (e) => {
        this.props.history.push({
            pathname: '/admin/game/PlayQuiz',
            state: {
                nickname: nickname,
                code : this.props.location.state.code
            }
        });
        console.log(this.props.history);
    }
    changenick = (e) => {
        nickname = e;
    }
    render() {
        return (
            <div className="quiz_contents">
                <div className="input_code">
                    <h2>닉네임을 입력하세요.</h2>
                    <input type="text" className="code" onChange={event=>this.changenick(event.target.value)}></input>
                    <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                    <input type="button" value="admin" className="adminbtn" onClick={this.goAdmin}></input>
                </div>
            </div>
        );
    }
}

export default SetNick;