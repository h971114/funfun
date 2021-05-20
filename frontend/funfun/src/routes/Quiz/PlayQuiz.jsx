import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from 'axios';
import cookie from 'react-cookies';
var stompClient = '';
var socket = '';
var connected = false;
var ID = '';
var nickname = '';
var code = '';
var team = '0';
var quiz = '';
var index = 0;
var isstart = 0;
var answerbutton1 = ''
var answerbutton2 = ''
var answerbutton3 = ''
var answerbutton4 = ''
var answerbutton5 = ''
var passbutton = ''
var answer = ''
var alive = 'alive';
var isresult = 1;
var yourstate = ''
var leftstate = ''
var currentcheck = ''
var perteam = 1;
var sendanswer = false;
var teammember = [];
var memberview;
var nextteamchat = ''
var turn = ''
var left_member = ''
function PlayQuiz(props) {

    const [seconds, setSeconds] = useState(10);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
    const [cloud, setCloud] = useState('');
    // const [cloudIdx, setCloudIdx] = useState(9);
    let clouds = [];

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomColor() {
        return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
    }

    const sendCloud = (props, msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const cloud = { type: 'CHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(구름), {});
        }
        console.log(stompClient);
        console.log(stompClient.connected);
        console.log("send");
    }
    const send = (props, msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'TEAMCHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        console.log(quiz)
        if (quiz !== '' && (quiz.type === 3 || quiz.type === 4) && sendanswer === false) {
            console.log("in")
            if (msg === quiz.answer) {
                if (stompClient && stompClient.connected) {
                    const msg = { type: 'CHAT', content: "alive", roomnumber: code, sender: nickname, id: ID, team: team };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
                sendanswer = true;
            }
        }
        console.log(stompClient)
        console.log(stompClient.connected)
        console.log("send");
    }
    const appKeyPress = (e) => {
        console.log(e.target.id);
        if (e.key === 'Enter') {
            send(props, msg);
            document.getElementById(e.target.id).value = null;
        }
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
        socket = new SockJS(`${process.env.REACT_APP_SERVER_BASE_URL}/ws`);
        stompClient = Stomp.over(socket);
        isstart = 0;
        stompClient.connect(
            {},
            frame => {
                connected = true;
                ID = cookie.load('ID')
                code = cookie.load('code')
                nickname = cookie.load('nickname')
                if (code === undefined) {
                    code = props.location.state.code
                }
                if (nickname === undefined) {
                    nickname = props.location.state.nickname
                }
                stompClient.subscribe("/topic/" + code, onMessageReceived
                    //   tick => {
                    //   }
                );
                console.log(cookie.load('ID'));
                console.log(cookie.loadAll())
                if (ID === undefined) {
                    const msg = { type: 'JOIN', content: "", roomnumber: props.location.state.code, sender: props.location.state.nickname };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                    nickname = props.location.state.nickname;
                    code = props.location.state.code;
                }
                else {
                    const msg = { type: 'REJOIN', content: "", roomnumber: code, sender: "", id: ID };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/rejoin`, { params: { no: code, id: ID } }).then(res => {
                        console.log(res.data);
                        index = parseInt(res.data.title)
                        team = res.data.team
                        nickname = res.data.sender
                        isresult = parseInt(res.data.content)
                        perteam = parseInt(res.data.toteam)
                        console.log(isresult)
                        console.log(index)
                        if (perteam === 0) {
                            perteam = 1;
                        }
                        if (index === isresult) {
                            isresult += perteam
                        }

                    });

                }


            },
            error => {
                console.log(error);
                connected = false;
            }
        );
    }
    const disconnect = (props) => {
        if (stompClient) {
            const msg = { type: 'LEAVE', content: "", roomnumber: code };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
            stompClient.disconnect();
        }
        connected = false;
    }
    const tickleConnection = () => {
        connected ? disconnect() : connect();
    }
    const onclick1 = () => {
        if (quiz.type === 0) {
            if (quiz.answer === "O" && alive === "alive") {
                answer = 'alive'
            }
            else {
                answer = 'die'
            }
            currentcheck = "O"
        }
        else {
            if (sendanswer === false) {
                if (quiz.answer === "1") {
                    answer = 'alive'
                }
                else {
                    answer = 'die'
                }
                currentcheck = "1." + quiz.exam1
                if (stompClient && stompClient.connected) {
                    const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
                sendanswer = true;
            }

        }
    }
    const onclick2 = () => {
        if (quiz.type === 0) {
            if (quiz.answer === "X" && alive === "alive") {
                answer = 'alive'
            }
            else {
                answer = 'die'
            }
            currentcheck = "X"
        }
        else {
            if (sendanswer === false) {
                if (quiz.answer === "2") {
                    answer = 'alive'
                }
                else {
                    answer = 'die'
                }
                currentcheck = "2." + quiz.exam2
                if (stompClient && stompClient.connected) {
                    const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
                sendanswer = true;
            }
        }
    }
    const onclick3 = () => {
        if (sendanswer === false) {
            if (quiz.answer === "3") {
                answer = 'alive'
            }
            else {
                answer = 'die'
            }
            currentcheck = "3." + quiz.exam3
            if (stompClient && stompClient.connected) {
                const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
            sendanswer = true;
        }
    }
    const onclick4 = () => {
        if (sendanswer === false) {
            if (quiz.answer === "4") {
                answer = 'alive'
            }
            else {
                answer = 'die'
            }
            currentcheck = "4." + quiz.exam4
            if (stompClient && stompClient.connected) {
                const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
            sendanswer = true;
        }
    }
    const onclick5 = () => {
        if (sendanswer === false) {
            if (quiz.answer === "5") {
                answer = 'alive'
            }
            else {
                answer = 'die'
            }
            currentcheck = "5." + quiz.exam5
            if (stompClient && stompClient.connected) {
                const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
            sendanswer = true;
        }
    }
    const onclicknext = () => {
        if (stompClient && stompClient.connected && sendanswer === false) {
            const msg = { type: 'NEXT', content: answer, roomnumber: code, sender: nickname, id: ID, team: team };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
    }
    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
        var messageArea = document.querySelector('#messageArea');
        var messageElement = document.createElement('li');
        var cloudArea = document.querySelector('#cloudArea');
        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            if (message.sender === nickname && ID === undefined) {
                ID = message.id;
                const expires = new Date()
                expires.setDate(expires.getDate() + 14);
                cookie.save('ID', ID, {
                    path: '/',
                    expires,
                });
                cookie.save('code', code, {
                    path: '/',
                    expires,
                })
                cookie.save('nickname', nickname, {
                    path: '/',
                    expires,
                })
            }
            console.log(cookie.loadAll());
            console.log(cookie.load('ID'))
            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else if (message.type === 'CHAT') {
            // messageElement.classList.add('chat-message');
            // var usernameElement = document.createElement('span');
            // var usernameText = document.createTextNode(message.sender);
            // usernameElement.appendChild(usernameText);
            // messageElement.appendChild(usernameElement);
            // console.log("in")
            var textElement = document.createElement('span');
            var messageText = document.createTextNode(message.content);
            var clouds = document.getElementsByClassName('cloud-message');

            textElement.classList.add('cloud-message');
            textElement.appendChild(messageText);
            cloudArea.appendChild(textElement);

            for (var i = 0; i < clouds.length; i++) {
                var thisCloud = clouds[i]
                var randomTop = getRandomNumber(0, 100);
                var randomLeft = getRandomNumber(0, 95);
                var randomColor = getRandomColor();

                thisCloud.style.top = randomTop + "%";
                thisCloud.style.left = randomLeft + "%";
                thisCloud.style.color = randomColor;
                setTimeout(() => {
                    thisCloud.remove();
                }, 5000);
            }
        }
        else if (message.type === 'START') {
            isstart = 1;
            setSeconds(15);
            isresult = perteam;
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                console.log(res.data);
                quiz = res.data;
                index += 1;
                console.log(index);
                if (quiz.type === 2 || quiz.type === 4) {
                    setSeconds(60);
                }
            });

        }
        else if (message.type === 'TEAMCHAT') {
            if (message.team === team) {
                messageElement.classList.add('chat-message');
                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(message.sender + " : ");
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
                var textElement = document.createElement('p');
                var messageText = document.createTextNode(message.content);
                textElement.appendChild(messageText);

                messageElement.appendChild(textElement);

                messageArea.appendChild(messageElement);
                messageArea.scrollTop = messageArea.scrollHeight;
            }
        }
        else if (message.type === 'NEXT') {
            if (index === isresult) {
                switch (quiz.type) {
                    case 0:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/OX`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            left_member = "남은인원 : " + res.data;
                        })
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/OXmembers`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        })
                        break;
                    case 1:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            console.log(res.data);
                            yourstate = "내 점수 : " + res.data;
                        }); // 개인전 자기 자신 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                            console.log(leftstate)
                        }); // 개인전 상위 5명 점수
                        break;
                    case 2:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team`, { params: { no: code, team: team } }).then(res => {
                            console.log(res.data);
                            yourstate = "우리 팀 점수 : " + res.data;
                        }); // 팀전 자기 팀 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        }); // 팀전 상위 5팀 점수
                        break;
                    case 3:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            console.log(res.data);
                            yourstate = "내 점수 : " + res.data;
                        }); // 개인전 자기 자신 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        }); // 개인전 상위 5명 점수
                        break;
                    case 4:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team`, { params: { no: code, team: team } }).then(res => {
                            console.log(res.data);
                            yourstate = "우리 팀 점수 : " + res.data;
                        }); // 팀전 자기 팀 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        }); // 팀전 상위 5팀 점수
                        break;
                }
                currentcheck = ''
                isstart = 2;
                isresult += perteam;
            }
            else {
                if ((quiz.type === 2 || quiz.type === 4)) {
                    if (nextteamchat === team) {
                        sendanswer = false;
                    }
                }
                else {
                    sendanswer = false;
                }
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                    console.log(res.data);
                    quiz = res.data;
                    index += 1;
                    console.log(index);
                });
                isstart = 1;

                if (index === isresult - perteam) {
                    setSeconds(15);
                    if (quiz.type === 2 || quiz.type === 4) {
                        setSeconds(60);
                    }
                }
            }
            console.log(isstart);
        }
        else if (message.type === 'PERTEAM') {
            perteam = parseInt(message.content);
        }
        else if (message.type === 'NEXTTEAM') {
            if (team === message.content) {
                sendanswer = false;
                turn = '당신의 팀 차례입니다.'
            }
            else {
                turn = '다른 팀의 차례입니다.'
                sendanswer = true;
            }
            nextteamchat = message.content
        }
        else if (message.type === 'TOINDEX') {
            index = parseInt(message.content);
        }
        else if (message.type === 'ADMIN') {
            messageElement.classList.add('event-message');
            console.log(message)
            if (message.id === ID) {
                team = message.toteam
                teammember = []
                console.log(team)
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/getteammember`, { params: { no: code, team: message.toteam } }).then(res => {
                    // console.log(res);
                    if (res.data) {
                        res.data.map(obj => {
                            // addmember(obj.title);
                            teammember.push(obj.title);
                        })
                        memberview = teammember.map((obj) =>
                            <li>{obj}</li>
                        )
                    } else {
                    }
                }).catch(err => {
                    console.log(err);
                })

            }
            else if (message.toteam === team) {
                // addmember(message.title)
                teammember.push(message.title);
                memberview = teammember.map((obj) =>
                    <li>{obj}</li>
                )
            }
            else if (message.fromteam === team) {
                teammember = []
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/getteammember`, { params: { no: code, team: message.fromteam } }).then(res => {
                    // console.log(res);
                    if (res.data) {
                        res.data.map(obj => {
                            // addmember(obj.title);
                            teammember.push(obj.title);

                        })
                        memberview = teammember.map((obj) =>
                            <li>{obj}</li>
                        )
                    } else {
                    }
                }).catch(err => {
                    console.log(err);
                })
            }

            console.log(memberview)
        }

    }
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > -2000) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 1) {
                if (quiz.type === 0) { // ox퀴즈
                    if (stompClient && stompClient.connected) {
                        const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, team: team, id: ID };
                        stompClient.send("/app/chat", JSON.stringify(msg), {});
                    }
                    if (answer === 'die' && alive === 'alive') {
                        alive = 'die';
                    }
                    // result 호출
                }
                else if (quiz.type === '2') { // 객관식 팀전
                    // result 호출
                }
                else if (quiz.type === '4') { // 주관식 팀전
                    // result 호출
                }
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
    if (quiz.type === 0) {
        answerbutton1 = <input type="button" className="O" onClick={() => onclick1()}></input>
        answerbutton2 = <input type="button" className="X" onClick={() => onclick2()}></input>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
        passbutton = ""
    }
    else if (quiz.type === 1) {
        answerbutton1 = <button onClick={() => onclick1()}>{1. + quiz.exam1}</button>
        answerbutton2 = <button onClick={() => onclick2()}>{2. + quiz.exam2}</button>
        answerbutton3 = <button onClick={() => onclick3()}>{3. + quiz.exam3}</button>
        answerbutton4 = <button onClick={() => onclick4()}>{4. + quiz.exam4}</button>
        answerbutton5 = <button onClick={() => onclick5()}>{5. + quiz.exam5}</button>
        passbutton = ""
    }
    else if (quiz.type === 2) {
        answerbutton1 = <button onClick={() => onclick1()}>{1. + quiz.exam1}</button>
        answerbutton2 = <button onClick={() => onclick2()}>{2. + quiz.exam2}</button>
        answerbutton3 = <button onClick={() => onclick3()}>{3. + quiz.exam3}</button>
        answerbutton4 = <button onClick={() => onclick4()}>{4. + quiz.exam4}</button>
        answerbutton5 = <button onClick={() => onclick5()}>{5. + quiz.exam5}</button>
        passbutton = <input type="button" className="passBtn" onClick={() => onclicknext()} />
    }
    else if (quiz.type === 3) {
        answerbutton1 = ""
        answerbutton2 = ""
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
        passbutton = ""
    }
    else if (quiz.type === 4) {
        answerbutton1 = ""
        answerbutton2 = ""
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
        passbutton = <input type="button" className="passBtn" onClick={() => onclicknext()} />
    }
    if (isstart === 0) {
        return (
            <div className="quiz_contents">
                <div className="quiz_parts">
                    <div id="cloudArea">

                        <div className="cloud_wrap">
                            <input type="text" className="cloudsend" placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
                            <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                        </div>
                    </div>
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
                            {memberview}
                        </ul>
                    </div>
                    <h3>팀 원 채 팅 🤩</h3>
                    <div className="chat waitingChat">
                        <ul id="messageArea">

                        </ul>
                    </div>
                    <div className="send_wrap">
                        <input type="text" className="chatsend" id="chatMsg1" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                    </div>
                </div>
                <div className="allChat">

                </div>
            </div>
        );
    }
    if (isstart === 2) {
        if (quiz.type === 0) {
            if (alive === 'alive') {
                yourstate = "당신은 살아남았습니다."
            }
            else {
                yourstate = "당신은 죽었습니다."
            }
        }
        return (
            <div className="quiz_contents">
                <div className="quiz_parts">
                    <div id="cloudArea">

                        <div className="cloud_wrap">
                            <input type="text" className="cloudsend" id="chatMsg2" placeholder="채팅을 입력하세요." onKeyPress={appKeyPress} onChange={event => setCloud(event.target.value)}></input>
                            <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                        </div>
                    </div>
                    <div className="quiz_wrap">
                        <div className="quiz_tit">
                            {yourstate}
                        </div>
                        <div className="quiz_etc">
                            {/* <iframe className="quiz_video" src="https://www.youtube.com/embed/F69_yzzCKpA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                            {/*<iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                        </div>
                        <div className="answer_wrap">
                            {left_member}
                            {leftstate}
                        </div>
                    </div>
                </div>
                <div className="communication">
                    <h3>팀 원 목 록 😎</h3>
                    <div className="members">

                        <ul id="memberArea">
                            {memberview}
                        </ul>
                    </div>
                    <h3>팀 원 채 팅 🤩</h3>
                    <div className="chat">
                        <ul id="messageArea">

                        </ul>
                    </div>
                    <div className="send_wrap">
                        <input type="text" className="chatsend" id="chatMsg3" placeholder="채팅을 입력하세요." onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                    </div>
                    <div className="teamPlayer_btn">
                        {passbutton}
                    </div>
                </div>
                <div className="allChat">

                </div>
            </div>
        )
    }
    return (
        <div className="quiz_contents">
            <div className="quiz_parts">
                <div id="cloudArea">

                    <div className="cloud_wrap">
                        <input type="text" className="cloudsend" placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
                        <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                    </div>
                </div>
                <div className="quiz_wrap">
                    <div className="quiz_tit">
                        {quiz.content}
                    </div>
                    <div className="quiz_etc">
                        {/* <iframe className="quiz_video" src="https://www.youtube.com/embed/F69_yzzCKpA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        {/*<iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                    </div>
                    <div className="quiz_progress">
                        <ProgressBar duration={progress} />
                        <div className="left_time">
                            {seconds}
                        </div>
                    </div>
                    <div className="answer_wrap">
                        {answerbutton1}
                        {answerbutton2}
                        {answerbutton3}
                        {answerbutton4}
                        {answerbutton5}
                        <br />
                            현재선택 : {currentcheck}
                        <br />
                            당신은 : team{team} 입니다
                            <br />
                        {turn}
                        <br />
                            총 {perteam} 문제입니다.

                        </div>
                </div>
            </div>
            <div className="communication">
                <h3>팀 원 목 록 😎</h3>

                <div className="members">

                    <ul id="memberArea">
                        {memberview}
                    </ul>
                </div>
                <h3>팀 원 채 팅 🤩</h3>
                <div className="chat">
                    <ul id="messageArea">

                    </ul>
                </div>
                <div className="send_wrap">
                    <input type="text" className="chatsend" id="chatMsg4" placeholder="채팅을 입력하세요." onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
                    <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                </div>
                <div className="teamPlayer_btn">
                    {passbutton}
                </div>
            </div>
            <div className="allChat">

            </div>
        </div>
    );
}

export default PlayQuiz;