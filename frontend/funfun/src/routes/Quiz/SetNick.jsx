import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
import cookie from 'react-cookies';
import axios from 'axios';
var nickname = ''
var beforeid = ''
var code = ''
var checkNick = false

class SetNick extends Component {

    goGame = (e) => {
        if (checkNick) {
            if (cookie.load('ID') !== undefined) {
                beforeid = cookie.load('ID');
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/isbefore`, { params: { no: cookie.load('code'), id: cookie.load('ID') } }).then(res => {
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
                cookie.save('beforeid', beforeid, {
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
                alert("닉네임을 확인해 주세요.")
            }
        } else {
            alert("닉네임을 확인해 주세요.")
        }
    }
    changenick = (e) => {
        nickname = e;
        this.checkNick();
    }

    checkNick = () => {
        var nick = document.getElementById('inputNick').value;
        if (!nick) {
            checkNick = false;
            document.getElementById("avalidNN").setAttribute('style', 'color:#f91c37');
            document.getElementById("avalidNN").innerText = "닉네임을 입력해주세요.";
        }
        else if (nick.length > 10) {
            checkNick = false;
            document.getElementById("avalidNN").setAttribute('style', 'color:#f91c37');
            document.getElementById("avalidNN").innerText = "닉네임은 최대 10글자까지 가능합니다.";
        } else {
            checkNick = true;
            document.getElementById("avalidNN").style.display = 'none';
        }
    }

    render() {
        return (
            <div className="quiz_contents nickbg">
                <input id="inputNick" type="text" className="code" onChange={event => this.changenick(event.target.value)}></input>
                <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                <div className="availd" id="avalidNN"></div>
                {/* <div className="input_code">
                    <h2>닉네임을 입력하세요.</h2>
                </div> */}
            </div>
        );
    }
}

export default SetNick;