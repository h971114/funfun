import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
import cookie from 'react-cookies';
import axios from 'axios';
var nickname = ''
var beforeid = ''
var code = ''
class SetNick extends Component {

    goGame = (e) => {
        if (cookie.load('ID') !== undefined) {
            beforeid = cookie.load('ID');
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/isbefore`, { params: { no: cookie.load('code'),  id : cookie.load('ID') } }).then(res => {
                console.log(res);
            });
        }
        code = cookie.load('code');
        console.log(code);
        if (nickname) {
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
            cookie.save('beforeid', beforeid,{
                path: '/',
                expires: new Date(Date.now())
            })
            this.props.history.push({
                pathname: '/game/PlayQuiz',
                state: {
                    nickname: nickname,
                    code: code,
                }
            });
            console.log(this.props.history);
        } else {
            alert("닉네임을 입력하세요.")
        }
    }
    changenick = (e) => {
        nickname = e;
    }
    render() {
        return (
            <div className="quiz_contents nickbg">
                <input type="text" className="code" onChange={event => this.changenick(event.target.value)}></input>
                <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                {/* <div className="input_code">
                    <h2>닉네임을 입력하세요.</h2>
                </div> */}
            </div>
        );
    }
}

export default SetNick;