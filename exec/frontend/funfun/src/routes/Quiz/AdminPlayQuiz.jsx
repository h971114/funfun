import React, { useState, useEffect, Component, useRef } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
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
var quiz = '';
var index = 0;
var isstart = 0;
var answerbutton1 = ''
var answerbutton2 = ''
var answerbutton3 = ''
var answerbutton4 = ''
var answerbutton5 = ''
var alive = 'alive';
var isresult = 1;
var yourstate = ''
var yourTstate = ''
var teamnum = 1;
var leftstate = ''
var currentcheck = ''
var perteam = 1;
var sendanswer = false;
var quizsize = 0;
var nextteamchat = '';
var left_member = '';
function AdminPlayQuiz(props) {
    const [seconds, setSeconds] = useState(10);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
    const [perteamset, setQuiz] = useState('');
    const [nextteam, setTeam] = useState('');
    const [copycode, setCopyCode] = useState(props.location.state.code);
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const initialBoard = {
        columns: [
            {
                id: 0,
                title: "대기자들",
                cards: [
                ]
            },
            {
                id: 1,
                title: "team1",
                cards: [
                ]
            },
            {
                id: 2,
                title: "team2",
                cards: [

                ]
            },
            {
                id: 3,
                title: "team3",
                cards: [

                ]
            },
            {
                id: 4,
                title: "team4",
                cards: [
                ]
            },
            {
                id: 5,
                title: "team5",
                cards: [

                ]
            }
        ]
    };
    const [board, setBoard] = useState(initialBoard);
    const [cloud, setCloud] = useState('');

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomColor() {
        return '#fff';
    }

    const sendCloud = (props, msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const cloud = { type: 'CHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, team: team };
            stompClient.send("/app/chat", JSON.stringify(cloud), {});
        }
        console.log(stompClient)
        console.log(stompClient.connected)
        console.log("send");
    }
    const send = (props, msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'TEAMCHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        console.log(stompClient)
        console.log(stompClient.connected)
        console.log("send");

    }
    const sendQuiz = (msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'PERTEAM', content: send_message, roomnumber: code, sender: nickname };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
    }
    const sendTeam = (msg) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'NEXTTEAM', content: send_message, roomnumber: code, sender: nickname };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        nextteamchat = send_message;
    }
    const changeteam = (props, msg, card, source, destination) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'ADMIN', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, fromteam: source.fromColumnId, toteam: destination.toColumnId, id: card.id, title: card.title };
            console.log(msg)
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        console.log(send_message);

    }
    const connect = (props) => {
        socket = new SockJS(`${process.env.REACT_APP_SERVER_BASE_URL}/ws`);
        stompClient = Stomp.over(socket);
        isstart = 0;
        ID = ''
        index = 0;
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
    const start = () => {
        console.log(quizsize);
        console.log(perteam)
        if (quizsize % perteam !== 0) {
            alert(`총 퀴즈 문제수가 팀당 문제수로 나누어지지 않습니다. 총 문제 수는 ${quizsize} 문제입니다.`)
        }
        else {
            if (quiz.type === 2 || quiz.type === 4) {
                if (nextteamchat === '') {
                    alert("문제를 풀 팀을 적어주세요!")
                }
                else if (stompClient && stompClient.connected) {
                    const msg = { type: 'START', content: "", roomnumber: code };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
            }
            else if (stompClient && stompClient.connected) {
                const msg = { type: 'START', content: "", roomnumber: code };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
        }
    }
    const next = () => {
        if (quizsize === index && isstart === 2) {
            alert("마지막 문제입니다")
        }
        else if (isresult - perteam === index) {
            if (nextteamchat === '' && (quiz.type === 2 || quiz.type === 4)) {
                alert("문제를 풀 팀을 정해주세요")
            }
            else if (stompClient && stompClient.connected) {
                const msg = { type: 'NEXT', content: "", roomnumber: code };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
        }
        else if (stompClient && stompClient.connected) {
            const msg = { type: 'NEXT', content: "", roomnumber: code };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
    }
    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
        var messageArea = document.querySelector('#messageArea');
        var cloudArea = document.querySelector('#cloudArea');
        var messageElement = document.createElement('li');
        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            if (message.sender === nickname && ID === '') {
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                    quiz = res.data;
                });
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/${code}`).then(res => {
                    if (res.data) {
                        initialBoard.columns.map(obj => {
                            if (obj.id === 0) {
                                res.data.team0.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                            else if (obj.id === 1) {
                                res.data.team1.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                            else if (obj.id === 2) {
                                res.data.team2.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                            else if (obj.id === 3) {
                                res.data.team3.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                            else if (obj.id === 4) {
                                res.data.team4.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                            else if (obj.id === 5) {
                                res.data.team5.map(result => {
                                    obj.cards.push({ id: result.id, title: result.title })
                                    addmember(result.title)
                                })
                            }
                        })
                        setBoard(initialBoard);
                        console.log(res.data);
                        console.log(initialBoard);
                        console.log(board);
                    } else {
                    }
                }).catch(err => {
                    console.log(err);
                })
                ID = message.id;
                console.log(initialBoard)
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quizsize`, { params: { no: code } }).then(res => {
                    quizsize = parseInt(res.data);
                });
            }
            else {
                initialBoard.columns.map(obj => {
                    if (obj.id === 0) {
                        obj.cards.push({ id: message.id, title: message.sender });
                    }
                });
                addmember(message.sender);
                console.log(board);
                console.log(initialBoard)
                setBoard(initialBoard);
            };

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
        else if (message.type === 'TEAMCHAT') {
            if (message.team === team) {
                messageElement.classList.add('chat-message');
                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(message.sender + " : ");
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
            }
        }
        else if (message.type === 'START') {
            isstart = 1;
            setSeconds(50000);
            setProgress(50000 * 1000);
            isresult = perteam;
            console.log(isresult)
            console.log(perteam)
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                console.log(res.data);
                quiz = res.data;
                index += 1;
                console.log(index);
                if (quiz.type === 2 || quiz.type === 4) {
                    setSeconds(60);
                    setProgress(60 * 1000);
                }
            });

        }
        else if (message.type === 'TEAMCHAT') {
            if (message.team === team) {
                messageElement.classList.add('chat-message');
                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(message.sender);
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
            console.log(isresult)
            console.log(index)
            if (index === isresult) {
                // if (stompClient && stompClient.connected) {
                //     const msg = { type: 'OVER', content: send_message, roomnumber: code, sender: nickname };
                //     stompClient.send("/app/chat", JSON.stringify(msg), {});
                // }
                nextteamchat = ''
                switch (quiz.type) {
                    case 0:

                        break;
                    case 1:
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            yourstate = res.data;
                            yourTstate = "내 점수";
                        }); // 개인전 자기 자신 점수
                        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/personal5`, { params: { no: code } }).then(res => {
                            leftstate = res.data.map((obj, key) =>
                                <li>
                                    <img src={"/img/medal" + (key + 1) + ".png"} className={"medalImg" + (key + 1)} />
                                    <img src={"/img/team" + (key + 1) + ".png"} className={"profileImg" + (key + 1)} />
                                    <p>{(JSON.stringify(obj).split(":"))[0].substring(1, (JSON.stringify(obj).split(":"))[0].length)}<span>{(JSON.stringify(obj).split(":"))[1].substring(0, (JSON.stringify(obj).split(":"))[1].length - 1)}점</span></p>
                                </li>
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
                                <li>
                                    <img src={"/img/medal" + (key + 1) + ".png"} className={"medalImg" + (key + 1)} />
                                    <img src={"/img/team" + (key + 1) + ".png"} className={"profileImg" + (key + 1)} />
                                    <p>{(JSON.stringify(obj).split(":"))[0].substring(1, (JSON.stringify(obj).split(":"))[0].length)}<span>{(JSON.stringify(obj).split(":"))[1].substring(0, (JSON.stringify(obj).split(":"))[1].length - 1)}점</span></p>
                                </li>
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
                axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/team/quiz`, { params: { no: code, index: index, isresult: isresult + perteam } }).then(res => {
                    isresult += perteam
                    quiz = res.data;
                })
                currentcheck = ''
                isstart = 2;

            }

            else {
                sendanswer = false;
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
            }
            else {
                sendanswer = true;
            }
        }
        else if (message.type === 'TOINDEX') {
            index = parseInt(message.content);
            if (stompClient && stompClient.connected) {
                const msg = { type: 'NEXT', content: '', roomnumber: props.location.state.code, sender: props.location.state.nickname };
                stompClient.send("/app/chat", JSON.stringify(msg), {});
            }
        }
        else {
            messageElement.classList.add('event-message');
            if (message.id === ID) {
                team = message.team;
            }
        }

    }
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > -2000) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 1) {
                clearInterval(countdown)
                if (stompClient && stompClient.connected && isstart === 1) {
                    const msg = { type: 'TOINDEX', content: isresult, roomnumber: props.location.state.code, sender: props.location.state.nickname };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
            }
            if (parseInt(seconds) <= 0) {
                setSeconds(0);
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
    function onCardMove(card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);
        changeteam(props, "", card, source, destination);
    }

    const startGame = (e, g) => {
        sendQuiz(e);
        sendTeam(g);
        start();
        console.log("start")
        //게임 시작 부 소스 ★
    }

    const textInput = React.useRef();
    const copyCode = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = textInput.current.value;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("방코드가 복사 되었습니다.");
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

    const openModal = () => {
        setModalOpen(true);
        console.log('asdf');
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    if (quiz.type === 0) {
        answerbutton1 = <input type="button" className={"O" + (currentcheck == "O" ? ' on' : '')} ></input>
        answerbutton2 = <input type="button" className={"X" + (currentcheck == "X" ? ' on' : '')} ></input>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
    }
    else if (quiz.type === 1) {
        answerbutton1 = <button className="choice" >{"1. " + quiz.exam1}</button>
        answerbutton2 = <button className="choice" >{"2. " + quiz.exam2}</button>
        answerbutton3 = <button className="choice" >{"3. " + quiz.exam3}</button>
        answerbutton4 = <button className="choice" >{"4. " + quiz.exam4}</button>
        answerbutton5 = <button className="choice" >{"5. " + quiz.exam5}</button>
    }
    else if (quiz.type === 2) {
        answerbutton1 = <button className="choice" >{"1. " + quiz.exam1}</button>
        answerbutton2 = <button className="choice" >{"2. " + quiz.exam2}</button>
        answerbutton3 = <button className="choice" >{"3. " + quiz.exam3}</button>
        answerbutton4 = <button className="choice" >{"4. " + quiz.exam4}</button>
        answerbutton5 = <button className="choice" >{"5. " + quiz.exam5}</button>
    }
    else if (quiz.type === 3) {
        answerbutton1 = <input type="text" className="answerSend" placeholder="정답을 입력해주세요." id="answerMsg1" />
        answerbutton2 = <button type="button" className="answersendBtn" value="전송"  >전송</button>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
    }
    else if (quiz.type === 4) {
        answerbutton1 = <input type="text" className="answerSend" placeholder="정답을 입력해주세요." id="answerMsg1" />
        answerbutton2 = <button type="button" className="answersendBtn" >전송</button>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
    }
    if (isstart === 0) {
        return (
            <div className="quiz_contents">
                <div className="quiz_parts">
                    <div id="cloudArea">

                        <div className="cloud_wrap">
                            <input type="text" className="cloudsend" id="clodMsg1" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
                            <button type="button" className="cloudsendbtn" id="clodBtn1" onClick={() => sendCloud(props, cloud)}></button>
                        </div>
                    </div>
                </div>
                <div className="communication">
                    <h3 className="inlineHeader">전 체 목 록 😎</h3>
                    <input type="text" className="copycode" value={copycode} ref={textInput} disabled />
                    <input type="button" className="copy" value="방 코드 복사" onClick={copyCode}></input>
                    <div className="members_admin">
                        <ul id="memberArea">

                        </ul>
                    </div>
                    <input className="tcBtn" type="button" value="팀 재분배" onClick={openModal} />
                    <h3>대 기 자 채 팅 🤩</h3>
                    <div className="chat_admin">
                        <ul id="messageArea">

                        </ul>
                    </div>
                    <div className="send_wrap">
                        <input type="text" className="chatsend" placeholder="채팅을 입력하세요." id="sendMsg1" onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" id="chatBtn1" onClick={() => send(props, msg)}></input>
                        <div className="nextQuizWrap">
                            <input type="text" className="chatsend teamQuizCnt" placeholder="팀당 문제 수 입력" onChange={event => setQuiz(event.target.value)}></input>
                            <button className="nextBtn" onClick={() => sendQuiz(perteamset)}>다음 문제</button>
                        </div>
                        <div className="nextTeamWrap">
                            <input type="text" className="chatsend teamNum" placeholder="다음을 풀 팀 입력" onChange={event => setTeam(event.target.value)}></input>
                            <button className="nextBtn" onClick={() => sendTeam(nextteam)}>다음 팀</button>
                        </div>
                    </div>
                    <div className="admin_btn">
                        <input type="button" className="gameStart" value="Start" onClick={() => startGame(perteamset, nextteam)}></input>
                    </div>
                </div>
                <div className="allChat">

                </div>
                <Modal open={modalOpen} close={closeModal} header="팀 분배">
                    <div className="allMembers">

                    </div>
                    <div className="ctBtnsWrap">

                    </div>
                    <div className="teams">

                    </div>
                    <Board
                        onCardDragEnd={onCardMove}
                        disableColumnDrag
                    >
                        {board}
                    </Board>
                </Modal>
            </div>
        );
    }
    if (isstart === 2) {
        if (quiz.type === 0) {
            if (alive === 'alive') {
                yourstate = "당신은 관리자입니다."
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
        if ((quiz.type === 2 || quiz.type === 4) && teamnum.slice(0, 1) !== 'T') {
            teamnum = "Team " + teamnum;
        }
        else if ((quiz.type !== 2 && quiz.type !== 4)) {
            teamnum = "";
            team = 1;
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
                            <div className={('hidden')}>
                                {/* <p>{yourTstate}</p> */}
                                <div className="preMyScore">
                                    {/* <div className="preMyImgWrap">
                                        <img src={"/img/team" + team + ".png"} />
                                    </div> */}
                                    <div className="preMyDataWrap">
                                        {teamnum}<br />
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
                            <h3>전체 점수</h3>
                            {leftstate}
                        </div>
                    </div>
                </div>
                <div className="communication">
                    <h3>전 체 목 록 😎</h3>
                    <input type="text" className="copycode" value={copycode} ref={textInput} disabled />
                    <input type="button" className="copy" value="방 코드 복사" onClick={copyCode}></input>
                    <div className="members_admin">
                        <ul id="memberArea">

                        </ul>
                    </div>
                    <input className="tcBtn" type="button" value="팀 재분배" onClick={openModal} />
                    <h3>팀 원 채 팅 🤩</h3>
                    <div className="chat_admin">
                        <ul id="messageArea">

                        </ul>
                    </div>
                    <div className="send_wrap">
                        <input type="text" className="chatsend" placeholder="채팅을 입력하세요." id="sendMsg2" onKeyPress={appKeyPress} onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" id="chatBtn2" onClick={() => send(props, msg)}></input>
                        <input type="text" className="chatsend teamNum" placeholder="다음을 풀 팀 입력" onChange={event => setTeam(event.target.value)}></input>
                        <button className="nextBtn" onClick={() => sendTeam(nextteam)}>다음 팀</button>
                    </div>
                    <div className="admin_btn">
                        <input type="button" className="nextGame" value="결 과" onClick={next}></input>
                    </div>
                </div>
                <div className="allChat">

                </div>
                <Modal open={modalOpen} close={closeModal} header="팀 분배">
                    <div className="allMembers">

                    </div>
                    <div className="ctBtnsWrap">

                    </div>
                    <div className="teams">

                    </div>
                    <Board
                        onCardDragEnd={onCardMove}
                        disableColumnDrag
                    >
                        {board}
                    </Board>
                </Modal>
            </div>
        )
    }
    return (
        <div className="quiz_contents">
            <div className="quiz_parts gameplaying">
                <div id="cloudArea">

                    <div className="cloud_wrap">
                        <input type="text" className="cloudsend" id="clodMsg3" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
                        <button type="button" className="cloudsendbtn" id="clodBtn3" onClick={() => sendCloud(props, cloud)}></button>
                    </div>
                </div>
                <div className="quiz_wrap">
                    <div className="quiz_tit">
                        {quiz.content}
                    </div>
                    <div className="quiz_progress">
                        <ProgressBar duration={progress} />
                        <div className="left_time">
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                    </div>
                    <div className="answer_wrap">
                        {answerbutton1}
                        {answerbutton2}
                        {answerbutton3}
                        {answerbutton4}
                        {answerbutton5}
                        <br />
                                전체문제 : {quizsize}
                        <br />
                                현재문제 : {index}
                    </div>
                </div>
            </div>
            <div className="communication">
                <h3>전 체 목 록 😎</h3>
                <input type="text" className="copycode" value={copycode} ref={textInput} disabled />
                <input type="button" className="copy" value="방 코드 복사" onClick={copyCode}></input>

                <div className="members_admin">
                    <ul id="memberArea">

                    </ul>
                </div>
                <input className="tcBtn" type="button" value="팀 재분배" onClick={openModal} />
                <h3>팀 원 채 팅 🤩</h3>
                <div className="chat_admin">
                    <ul id="messageArea">

                    </ul>
                </div>
                <div className="send_wrap">
                    <input type="text" className="chatsend" id="sendMsg3" onKeyPress={appKeyPress} placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                    <input type="button" className="chatsendbtn" id="sendBtn3" onClick={() => send(props, msg)}></input>
                </div>
                <div className="admin_btn">
                    <input type="button" className="nextGame" value="결 과" onClick={next}></input>
                </div>
            </div>
            <div className="allChat">

            </div>
            <Modal open={modalOpen} close={closeModal} header="팀 분배">
                <div className="allMembers">

                </div>
                <div className="ctBtnsWrap">

                </div>
                <div className="teams">

                </div>
                <Board
                    onCardDragEnd={onCardMove}
                    disableColumnDrag
                >
                    {board}
                </Board>
            </Modal>
        </div>
    );
}

export default AdminPlayQuiz;