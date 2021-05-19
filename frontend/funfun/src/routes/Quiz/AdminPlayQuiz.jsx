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
var leftstate = ''
var currentcheck = ''
var perteam = 1;
var sendanswer = false;
var quizsize = 0;
var nextteamchat = ''
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
        return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
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
            const msg = { type: 'CHAT', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname };
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
        socket = new SockJS('http://127.0.0.1:8080/myapp/ws');
        stompClient = Stomp.over(socket);
        isstart = 0;
        ID = ''
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
        if (quiz.type === 2 || quiz.type === 4) {
            if (nextteamchat === '') {
                alert("문제를 풀 팀을 적어주세요!")
            }
        }
        else if (stompClient && stompClient.connected) {
            const msg = { type: 'START', content: "", roomnumber: code };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
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
                axios.get(`http://127.0.0.1:8080/myapp/team/${code}`).then(res => {
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
                axios.get(`http://127.0.0.1:8080/myapp/team/quizsize`, { params: { no: code } }).then(res => {
                    console.log(res.data);
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
                var usernameText = document.createTextNode(message.sender);
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
            }
        }
        else if (message.type === 'START') {
            isstart = 1;
            setSeconds(15);
            isresult = perteam;
            console.log(isresult)
            console.log(perteam)
            axios.get(`http://127.0.0.1:8080/myapp/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
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
                nextteamchat = ''
                switch (quiz.type) {
                    case 0:
                        axios.get(`http://127.0.0.1:8080/myapp/team/OX`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = "남은인원 : " + res.data;
                        })
                        break;
                    case 1:
                        axios.get(`http://127.0.0.1:8080/myapp/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            console.log(res.data);
                            yourstate = "내 점수 : " + res.data;
                        }); // 개인전 자기 자신 점수
                        axios.get(`http://127.0.0.1:8080/myapp/team/personal5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                            console.log(leftstate)
                        }); // 개인전 상위 5명 점수
                        break;
                    case 2:
                        axios.get(`http://127.0.0.1:8080/myapp/team/team`, { params: { no: code, team: team } }).then(res => {
                            console.log(res.data);
                            yourstate = "우리 팀 점수 : " + res.data;
                        }); // 팀전 자기 팀 점수
                        axios.get(`http://127.0.0.1:8080/myapp/team/team5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        }); // 팀전 상위 5팀 점수
                        break;
                    case 3:
                        axios.get(`http://127.0.0.1:8080/myapp/team/personal`, { params: { no: code, ID: ID } }).then(res => {
                            console.log(res.data);
                            yourstate = "내 점수 : " + res.data;
                        }); // 개인전 자기 자신 점수
                        axios.get(`http://127.0.0.1:8080/myapp/team/personal5`, { params: { no: code } }).then(res => {
                            console.log(res.data);
                            leftstate = res.data.map((obj) =>
                                <li>{JSON.stringify(obj)}</li>
                            );
                        }); // 개인전 상위 5명 점수
                        break;
                    case 4:
                        axios.get(`http://127.0.0.1:8080/myapp/team/team`, { params: { no: code, team: team } }).then(res => {
                            console.log(res.data);
                            yourstate = "우리 팀 점수 : " + res.data;
                        }); // 팀전 자기 팀 점수
                        axios.get(`http://127.0.0.1:8080/myapp/team/team5`, { params: { no: code } }).then(res => {
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
                sendanswer = false;
                axios.get(`http://127.0.0.1:8080/myapp/team/quiz`, { params: { no: code, index: index, isresult: isresult } }).then(res => {
                    console.log(res.data);
                    quiz = res.data;
                    index += 1;
                    console.log(index);
                });
                isstart = 1;
                console.log(index)
                console.log(isresult - perteam)
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
            if (parseInt(seconds) > -2) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                clearInterval(countdown)
                if (stompClient && stompClient.connected && isstart === 1) {
                    const msg = { type: 'TOINDEX', content: isresult, roomnumber: props.location.state.code, sender: props.location.state.nickname };
                    stompClient.send("/app/chat", JSON.stringify(msg), {});
                }
            }
            if (parseInt(seconds) === -1) {
                // if (stompClient && stompClient.connected) {
                //     const msg = { type: 'NEXT', content: '', roomnumber: code, sender: nickname, team: team , id : ID};
                //     stompClient.send("/app/chat", JSON.stringify(msg), {});
                // }
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

    const startGame = () => {
        document.getElementsByClassName('gameStart')[0].setAttribute('style', 'display:none');
        start();
        axios.get(`http://127.0.0.1:8080/myapp/team/quiz`, { params: { no: code, index: 0 } }).then(res => {
            console.log(res.data);
        });
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


    const openModal = () => {
        setModalOpen(true);
        console.log('asdf');
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    if (quiz.type === 0) {
        answerbutton1 = <input type="button" className="O" ></input>
        answerbutton2 = <input type="button" className="X" ></input>
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
    }
    else if (quiz.type === 1) {
        answerbutton1 = <button >{1. + quiz.exam1}</button>
        answerbutton2 = <button >{2. + quiz.exam2}</button>
        answerbutton3 = <button >{3. + quiz.exam3}</button>
        answerbutton4 = <button >{4. + quiz.exam4}</button>
        answerbutton5 = <button >{5. + quiz.exam5}</button>
    }
    else if (quiz.type === 2) {
        answerbutton1 = <button >{1. + quiz.exam1}</button>
        answerbutton2 = <button >{2. + quiz.exam2}</button>
        answerbutton3 = <button >{3. + quiz.exam3}</button>
        answerbutton4 = <button >{4. + quiz.exam4}</button>
        answerbutton5 = <button >{5. + quiz.exam5}</button>
    }
    else if (quiz.type === 3) {
        answerbutton1 = ""
        answerbutton2 = ""
        answerbutton3 = ""
        answerbutton4 = ""
        answerbutton5 = ""
    }
    else if (quiz.type === 4) {
        answerbutton1 = ""
        answerbutton2 = ""
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
                    <h3 className="inlineHeader">전 체 목 록 😎</h3>
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
                        <input type="text" className="chatsend" placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
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
                        <input type="button" className="gameStart" value="Start" onClick={startGame}></input>
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
                            <input type="text" className="cloudsend" placeholder="채팅을 입력하세요." onChange={event => setCloud(event.target.value)}></input>
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
                            {leftstate}
                        </div>
                    </div>
                </div>
                <div className="communication">
                    <h3>전 체 목 록 😎</h3>
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
                        <input type="text" className="chatsend" placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                        <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                        <input type="text" className="chatsend" placeholder="다음을 풀 팀 입력." onChange={event => setTeam(event.target.value)}></input>
                        <button onClick={() => sendTeam(nextteam)}>다음 팀 버튼</button>
                    </div>
                    <div className="admin_btn">
                        <input type="button" className="gameStart" value="Start" onClick={startGame}></input>
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
                    <input type="text" className="chatsend" placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                    <input type="button" className="chatsendbtn" onClick={() => send(props, msg)}></input>
                </div>
                <div className="admin_btn">
                    <input type="button" className="gameStart" value="Start" onClick={startGame}></input>
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