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
var yourTstate = ''
var teamnum = 1;
var leftstate = ''
var currentcheck = ''
var perteam;
var sendanswer;
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
    const [inputanswer, setInputAnswer] = useState('');
    // const [cloudIdx, setCloudIdx] = useState(9);
    let clouds = [];

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomColor() {
        return '#fff';
    }

    // const sendCloud = (props, msg) => {
    //     var cloudsendArr = document.getElementsByClassName("cloudsend");
    //     let send_message = msg;
    //     if (stompClient && stompClient.connected) {
    //         const cloud = { type: 'CHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
    //         stompClient.send("/app/chat", JSON.stringify(cloud), {});
    //     }
    //     for (let i = 0; i < cloudsendArr.length; i++) {
    //         cloudsendArr[i].value = '';
    //     }
    //     setCloud('');
    //     console.log(stompClient);
    //     console.log(stompClient.connected);
    //     console.log("send");
    // }
    const sendAnswer = (props, msg) => {
        console.log(quiz);
        console.log(msg);
        console.log(sendanswer)
        if (quiz !== '' && (quiz.type === 3 || quiz.type === 4) && sendanswer === false) {
            if (msg === quiz.answer) {
                if (stompClient && stompClient.connected) {
                    const msg = { type: 'ANSWER', content: "alive", roomnumber: code, sender: nickname, id: ID, team: team };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
                sendanswer = true;
            }
        }
    }
    const sendCloud = (props, msg) => {
        var cloudsendArr = document.getElementsByClassName("cloudsend");
        let send_message = msg;
        // if (quiz !== '' && (quiz.type === 3 || quiz.type === 4) && sendanswer === false) {
        //     if (msg === quiz.answer) {
        //         if (stompClient && stompClient.connected) {
        //             const msg = { type: 'ANSWER', content: "alive", roomnumber: code, sender: nickname, id: ID, team: team };
        //             stompClient.send("/app/chat", JSON.stringify(msg), {});
        //         }
        //         sendanswer = true;
        //     }
        // }
        // else
        if (stompClient && stompClient.connected) {
            const cloud = { type: 'CHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(cloud), {});
        }
        for (let i = 0; i < cloudsendArr.length; i++) {
            cloudsendArr[i].value = '';
        }
        setCloud('');
    }
    const send = (props, msg) => {
        var chatsendArr = document.getElementsByClassName("chatsend");
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'TEAMCHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        for (let i = 0; i < chatsendArr.length; i++) {
            chatsendArr[i].value = '';
        }
        setMsg('');
    }

    const appKeyPress = (e) => {
        // console.log(e.target.id.charAt(0, 1));
        if (e.key === 'Enter') {
            if (e.target.id.charAt(0, 1) == "s") {
                send(props, msg);
            } else if (e.target.id.charAt(0, 1) == "c") {
                sendCloud(props, cloud);
            }
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
        index = 0;
        answer = ""
        memberview = ""
        alive = "alive"
        team = '0'
        quiz = ""
        isresult = 1;
        sendanswer = false;
        perteam = 1;
        stompClient.connect(
            {},
            frame => {
                connected = true;
                ID = cookie.load('ID')
                code = cookie.load('code')
                nickname = cookie.load('nickname')
                console.log(cookie.load('ID'))
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
                if (ID === undefined) {
                    const msg = { type: 'JOIN', content: "", roomnumber: props.location.state.code, sender: props.location.state.nickname };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                    nickname = props.location.state.nickname;
                    code = props.location.state.code;
                }
                else {
                    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/isquiz`, { params: { no: code } }).then(res => {
                        if (res.data === "ison") {
                            const msg = { type: 'REJOIN', content: "", roomnumber: code, sender: "", id: ID };
                            stompClient.send("/app/chat", JSON.stringify(msg), {});
                            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/rejoin`, { params: { no: code, id: ID } }).then(res => {
                                index = parseInt(res.data.title)
                                team = res.data.team
                                nickname = res.data.sender
                                isresult = parseInt(res.data.content)
                                perteam = parseInt(res.data.toteam)
                                if (perteam === 0) {
                                    perteam = 1;
                                }

                                if (res.data.fromteam == "yes") {
                                    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                                        quiz = res.data;
                                    });
                                }
                                teammember = []
                                console.log(team)
                                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/getteammember`, { params: { no: code, team: team } }).then(res => {
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
                                })
                            });
                        }
                        else {
                            const msg = { type: 'JOIN', content: "", roomnumber: code, sender: nickname };
                            stompClient.send("/app/chat", JSON.stringify(msg), {});
                            nickname = props.location.state.nickname;
                            code = props.location.state.code;
                        }
                    })
                    // const msg = { type: 'REJOIN', content: "", roomnumber: code, sender: "", id: ID };
                    // stompClient.send("/app/chat", JSON.stringify(msg), {});
                    // axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/rejoin`, { params: { no: code, id: ID } }).then(res => {
                    //     index = parseInt(res.data.title)
                    //     team = res.data.team
                    //     nickname = res.data.sender
                    //     isresult = parseInt(res.data.content)
                    //     perteam = parseInt(res.data.toteam)
                    //     if (perteam === 0) {
                    //         perteam = 1;
                    //     }
                    //     if (index === isresult) {
                    //         isresult += perteam
                    //     }

                    // });

                }


            },
            error => {
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
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/rejoin`, { params: { no: code, id: ID } }).then(res => {
                    index = parseInt(res.data.title)
                    team = res.data.team
                    nickname = res.data.sender
                    isresult = parseInt(res.data.content)
                    perteam = parseInt(res.data.toteam)
                    if (perteam === 0) {
                        perteam = 1;
                    }
                    if (res.data.fromteam == "yes") {
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                            quiz = res.data;
                        });
                    }
                });

            }
            teammember = []
            console.log(team)
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/getteammember`, { params: { no: code, team: team } }).then(res => {
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
            })
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
            setProgress(15 * 1000);
            isresult = perteam;

            // 채팅 변환 알림 출력
            messageElement.classList.add('chat-message');
            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode('알림');
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
            var textElement = document.createElement('p');
            var messageText = document.createTextNode('퀴즈가 시작되어 팀원 간의 채팅만 가능합니다.');
            textElement.appendChild(messageText);

            messageElement.appendChild(textElement);

            messageArea.appendChild(messageElement);
            messageArea.scrollTop = messageArea.scrollHeight;
            // 채팅 변환 알림 출력 끝

            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                quiz = res.data;
                index += 1;
                if (quiz.type === 2 || quiz.type === 4) {
                    setSeconds(60);
                    setProgress(60 * 1000);
                }
            });

        }
        else if (message.type === 'TEAMCHAT') {
            console.log(message.team)
            console.log(team)
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
            console.log(index)
            console.log(isresult)
            if (quiz == '') {
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                    quiz = res.data;
                });
            }
            if (index === isresult) {
                switch (quiz.type) {
                    case 0:
                        if (alive === 'die') {
                            answer = "";
                        }
                        else if (answer === "") {
                            answer = "die"
                        }
                        if (stompClient && stompClient.connected) {
                            const msg = { type: 'ANSWER', content: answer, roomnumber: code, sender: nickname, team: team, id: ID };
                            stompClient.send("/app/chat", JSON.stringify(msg), {});
                        }
                        if ((answer === 'die' || answer === '') && alive === 'alive') {
                            alive = 'die';
                        }

                        // result 호출
                        answer = "";
                        break;
                    case 1:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            yourstate = res.data;
                            yourTstate = "내 점수";
                        }); // 개인전 자기 자신 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal5`, { params: { no: code } }).then(res => {
                            leftstate = res.data.map((obj, key) =>
                                <li><img src={"medal" + (key + 1) + ".png"} /> {JSON.stringify(obj)}</li>
                            );
                        }); // 개인전 상위 5명 점수
                        break;
                    case 2:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team`, { params: { no: code, team: team } }).then(res => {
                            yourstate = res.data;
                            yourTstate = "우리 팀 점수";
                            teamnum = team;
                        }); // 팀전 자기 팀 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team5`, { params: { no: code } }).then(res => {
                            leftstate = res.data.map((obj, key) =>
                                <li><img src={"/img/medal" + (key + 1) + ".png"} className={"medalImg" + (key + 1)} />
                                    <img src={"/img/team" + (key + 1) + ".png"} className={"profileImg" + (key + 1)} />
                                    <p>Team {JSON.stringify(obj).substr(6, 1)}<span>{(JSON.stringify(obj).split(":"))[1].substr(0, (JSON.stringify(obj).split(":"))[1].length - 1)}점</span></p>
                                </li>
                            );
                        }); // 팀전 상위 5팀 점수
                        break;
                    case 3:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            yourstate = res.data;
                            yourTstate = "내 점수";
                        }); // 개인전 자기 자신 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal5`, { params: { no: code } }).then(res => {
                            leftstate = res.data.map((obj, key) =>
                                <li><img src={"medal" + (key + 1) + ".png"} /> {JSON.stringify(obj)}</li>
                            );
                        }); // 개인전 상위 5명 점수
                        break;
                    case 4:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team`, { params: { no: code, team: team } }).then(res => {
                            yourstate = res.data;
                            yourTstate = "우리 팀 점수";
                            teamnum = team;
                        }); // 팀전 자기 팀 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/team5`, { params: { no: code } }).then(res => {
                            leftstate = res.data.map((obj, key) =>
                                <li><img src={"/img/medal" + (key + 1) + ".png"} className={"medalImg" + (key + 1)} />
                                    <img src={"/img/team" + (key + 1) + ".png"} className={"profileImg" + (key + 1)} />
                                    <p>Team {JSON.stringify(obj).substr(6, 1)}<span>{(JSON.stringify(obj).split(":"))[1].substr(0, (JSON.stringify(obj).split(":"))[1].length - 1)}점</span></p>
                                </li>
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
                    quiz = res.data;
                    index += 1;
                });
                isstart = 1;

                if (index === isresult - perteam) {
                    setSeconds(15);
                    setProgress(15 * 1000);
                    if (quiz.type === 2 || quiz.type === 4) {
                        setSeconds(60);
                        setProgress(60 * 1000);
                    }
                }
            }
        }
        else if (message.type === 'PERTEAM') {
            perteam = parseInt(message.content);
        }
        else if (message.type === 'NEXTTEAM') {
            if (team === message.content) {
                sendanswer = false;
                turn = '당신의 팀 차례입니다.'
            }
            else if (quiz.type === 2 || quiz.type === 4) {
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
                })

            }
            else if (message.toteam === team) {
                // addmember(message.title)
                teammember = []
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
                })
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
                })
            }

        }

    }
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > -2000) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) <= 0) {
                setSeconds(0);
            }
        }, 1000);
        return () => clearInterval(countdown);

    }, [seconds]);
    useEffect(() => {
        connect(props);
        return () => {
            disconnect(props);
        }
    }, []);
    if (quiz.type === 0) {
        answerbutton1 = <input type="button" className={"O" + (currentcheck == "O" ? ' on' : '')} onClick={() => onclick1()}></input>
        answerbutton2 = <input type="button" className={"X" + (currentcheck == "X" ? ' on' : '')} onClick={() => onclick2()}></input>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
        passbutton = ""
    }
    else if (quiz.type === 1) {
        answerbutton1 = <button className="choice" onClick={() => onclick1()}>{"1. " + quiz.exam1}</button>
        answerbutton2 = <button className="choice" onClick={() => onclick2()}>{"2. " + quiz.exam2}</button>
        answerbutton3 = <button className="choice" onClick={() => onclick3()}>{"3. " + quiz.exam3}</button>
        answerbutton4 = <button className="choice" onClick={() => onclick4()}>{"4. " + quiz.exam4}</button>
        answerbutton5 = <button className="choice" onClick={() => onclick5()}>{"5. " + quiz.exam5}</button>
        passbutton = ""
    }
    else if (quiz.type === 2) {
        answerbutton1 = <button className="choice" onClick={() => onclick1()}>{"1. " + quiz.exam1}</button>
        answerbutton2 = <button className="choice" onClick={() => onclick2()}>{"2. " + quiz.exam2}</button>
        answerbutton3 = <button className="choice" onClick={() => onclick3()}>{"3. " + quiz.exam3}</button>
        answerbutton4 = <button className="choice" onClick={() => onclick4()}>{"4. " + quiz.exam4}</button>
        answerbutton5 = <button className="choice" onClick={() => onclick5()}>{"5. " + quiz.exam5}</button>
        passbutton = <input type="button" className="passBtn" onClick={() => onclicknext()} />
    }
    else if (quiz.type === 3) {
        answerbutton1 = <input type="text" className="answerSend" placeholder="정답을 입력해주세요." id="answerMsg1" onChange={event => setInputAnswer(event.target.value)} />
        answerbutton2 = <button type="button" className="answersendBtn" value="전송" onClick={() => sendAnswer(props, inputanswer)} />
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
        passbutton = ""
    }
    else if (quiz.type === 4) {
        answerbutton1 = <input type="text" className="answerSend" placeholder="정답을 입력해주세요." id="answerMsg1" onChange={event => setInputAnswer(event.target.value)} />
        answerbutton2 = <button type="button" className="answersendBtn" onClick={() => sendAnswer(props, inputanswer)} >전송</button>
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
                            <input type="text" className="cloudsend" placeholder="채팅을 입력하세요." id="cloudMsg1" onKeyPress={appKeyPress} onChange={event => setCloud(event.target.value)}></input>
                            <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                        </div>
                    </div>
                </div>
                <div className="communication">
                    <h3>대 기 자 목 록 😎</h3>
                    <div className="members">

                        <ul id="memberArea">
                            {memberview}
                        </ul>
                    </div>
                    <h3>대 기 자 채 팅 🤩</h3>
                    <div className="chat waitingChat">
                        <ul id="messageArea">

                        </ul>
                    </div>
                    <div className="send_wrap">
                        <input type="text" className="chatsend" id="sendMsg1" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
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
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/OX`, { params: { no: code } }).then(res => {
                left_member = "남은인원 : " + res.data;
            })
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/OXmembers`, { params: { no: code } }).then(res => {
                leftstate = res.data.map((obj) =>
                    <li>{JSON.stringify(obj)}</li>
                );
            })
        }
        return (
            <div className="quiz_contents">
                <div className="quiz_parts gameplaying">
                    <div id="cloudArea">

                        <div className="cloud_wrap">
                            <input type="text" className="cloudsend" id="cloudMsg2" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
                            <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                        </div>
                    </div>
                    <div className="quiz_wrap">
                        <div className="quiz_tit myScore">
                            {/* {yourstate} */}
                            <div className={(quiz.type != 0 ? 'myteamScore' : 'hidden')}>
                                <p>{yourTstate}</p>
                                <div className="preMyScore">
                                    <div className="preMyImgWrap">
                                        <img src={"/img/team" + teamnum + ".png"} />
                                    </div>
                                    <div className="preMyDataWrap">
                                        Team {teamnum}<br />
                                        <span>{yourstate}점</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="quiz_etc">
                            {/* <iframe className="quiz_video" src="https://www.youtube.com/embed/F69_yzzCKpA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                            {/*<iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                        </div>
                        <div className={"answer_wrap" + (quiz.type != 0 ? ' allteamScore' : '')}>
                            {left_member}
                            <div ></div>
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
                        <input type="text" className="chatsend" id="sendMsg2" placeholder="채팅을 입력하세요." onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                    </div>
                    <div className="teamPlayer_btn">
                    </div>
                </div>
                <div className="allChat">

                </div>
            </div>
        )
    }
    return (
        <div className="quiz_contents">
            <div className="quiz_parts gameplaying">
                <div id="cloudArea">

                    <div className="cloud_wrap">
                        <input type="text" className="cloudsend" placeholder="채팅을 입력하세요." id="cloudMsg3" onKeyPress={appKeyPress} onChange={event => setCloud(event.target.value)}></input>
                        <button type="button" className="cloudsendbtn" onClick={() => sendCloud(props, cloud)}></button>
                    </div>
                </div>
                <div className="quiz_wrap">
                    <div className="quiz_num">
                        <p className={(perteam == 1 ? 'hidden' : '')}>총 {perteam}문제</p>
                    </div>
                    <div className="quiz_tit">
                        Q{index}. {quiz.content}
                    </div>
                    <div className="quiz_etc">
                        <img src="/img/progressbar.gif" />
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
                        {answerbutton3}<br />
                        {answerbutton4}
                        {answerbutton5}
                        {/* <br />
                                    현재선택 : {currentcheck} */}
                        {/* <br />
                                    당신은 : team{team} 입니다
                                    <br />
                        {turn}
                        <br />
                                    총 {perteam} 문제입니다. */}

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
                    <input type="text" className="chatsend" id="sendMsg3" placeholder="채팅을 입력하세요." onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
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