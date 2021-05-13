import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from 'axios';
var stompClient = '';
var socket = '';
var connected = false;
var ID = '';
var nickname = '';
var code = '';
var team = '0';
function WaitingRoom(props) {

    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
    const send = (props, msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'TEAMCHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        console.log(stompClient)
        console.log(stompClient.connected)
        console.log("send");
    }
    const addmember = (title) => {
        var memberArea = document.querySelector('#memberArea');
        var infoElement = document.createElement('li');
        var memberElement = document.createElement('p');
        var memberinfo = title
        var memberText = document.createTextNode(memberinfo);
        memberElement.appendChild(memberText);
        infoElement.appendChild(memberElement);
        memberArea.appendChild(infoElement);
    }
    const connect = (props) => {
        socket = new SockJS('http://127.0.0.1:8080/myapp/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            frame => {
                connected = true;
                stompClient.subscribe("/topic/" + props.location.state.code, onMessageReceived
                    //   tick => {
                    //   }
                );
                const msg = { type: 'JOIN', content: "", roomnumber: props.location.state.code, sender: props.location.state.nickname };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
                nickname = props.location.state.nickname;
                code = props.location.state.code;
            },
            error => {
                console.log(error);
                connected = false;
            }
        );
    }
    const disconnect = (props) => {
        if (stompClient) {
            const msg = { type: 'LEAVE', content: "", roomnumber: props.location.state.code };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
            stompClient.disconnect();
        }
        connected = false;
    }
    const tickleConnection = () => {
        connected ? disconnect() : connect();
    }
    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
        var messageArea = document.querySelector('#messageArea');
        var messageElement = document.createElement('li');
        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            if (message.sender === nickname && ID === '') {
                ID = message.id;
            }
            console.log(ID);
            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else if (message.type === 'CHAT') {
            messageElement.classList.add('chat-message');
            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(message.sender);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
            console.log("in")
        }
        else if (message.type === 'TEAMCHAT') {
            if (message.team === team) {
                messageElement.classList.add('chat-message');
                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(message.sender);
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
            }
        }
        else {
            messageElement.classList.add('event-message');
            console.log(message)
            if (message.id === ID) {
                team = message.toteam
                axios.get(`http://127.0.0.1:8080/myapp/team`, { params: { no: code, team: message.toteam } }).then(res => {
                    // console.log(res);
                    if (res.data) {
                        res.data.map(obj => {
                            addmember(obj.title);
                        })
                    } else {
                        alert("정보와 일치하는 아이디가 존재하지 않습니다.")
                    }
                }).catch(err => {
                    console.log(err);
                    alert("알 수 없는 오류가 발생했습니다.");
                })

            }
            if (message.toteam === team) {
                addmember(message.title)
            }
        }

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                clearInterval(countdown)
            }
        }, 1000);
        return () => clearInterval(countdown);

    }, [seconds]);
    useEffect(() => {
        connect(props);
        console.log("연결");
        console.log(stompClient);
        return () => {
            disconnect(props);
            console.log("완료");
        }
    }, []);
    return (
        <div className="quiz_contents">
            <div className="quiz_parts">
                <label className="waiting">대기중입니다!</label>
                <div className="loading dot">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="communication">
                <h3>팀 원 목 록 😎</h3>
                <div className="members">
                    <ul id="memberArea">

                    </ul>
                </div>
                <h3>팀 원 채 팅 🤩</h3>
                <div className="chat waitingChat">
                    <ul id="messageArea">

                    </ul>
                </div>
                <div className="send_wrap">
                    <input type="text" className="chatsend" placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                    <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                </div>
            </div>
            <div className="allChat">

            </div>
        </div>
    );
}

export default WaitingRoom;