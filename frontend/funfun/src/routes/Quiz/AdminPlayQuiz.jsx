import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import Board, { moveCard} from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from 'axios';
var connected = false;
var socket = '';
var stompClient = '';
var ID = '';
var nickname = '';
var code = '';
var team = '0';
function AdminPlayQuiz(props) {
    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
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
    const changeteam = (props, msg, card, source, destination) => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'ADMIN', content: send_message, roomnumber: props.location.state.code, sender: props.location.state.nickname, fromteam: source.fromColumnId, toteam: destination.toColumnId, id: card.id, title : card.title };
            console.log(msg)
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
        console.log(send_message);
        
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
    const addmember = (title) => {
        var memberArea = document.querySelector('#memberArea');
        var infoElement =  document.createElement('li');
        var memberElement = document.createElement('p');
        var memberinfo = title
        var memberText = document.createTextNode(memberinfo);
        memberElement.appendChild(memberText);
        infoElement.appendChild(memberElement);
        memberArea.appendChild(infoElement);
    }
    const start = () => {
        let send_message = msg;
        if (stompClient && stompClient.connected) {
            const msg = { type: 'START', content: "" };
            stompClient.send("/app/chat", JSON.stringify(msg), {});
        }
    }
    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
        var messageArea = document.querySelector('#messageArea');
        var messageElement = document.createElement('li');
        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            if (message.sender === nickname && ID === '') {
                axios.get(`http://127.0.0.1:8080/myapp/team/${code}`).then(res => {
                    // console.log(res);
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
                        console.log(initialBoard);
                        console.log(board);
                    } else {
                        alert("정보와 일치하는 아이디가 존재하지 않습니다.")
                    }
                }).catch(err => {
                    console.log(err);
                    alert("알 수 없는 오류가 발생했습니다.");
                })
                ID = message.id;
                console.log(initialBoard)
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
        } else if(message.type ==='CHAT'){
            messageElement.classList.add('chat-message');
            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(message.sender);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
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
            if (message.id === ID) {
                team = message.team;
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


    const openModal = () => {
        setModalOpen(true);
        console.log('asdf');
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="quiz_contents">
            <div className="quiz_parts">
                <div className="quiz_wrap">
                    <div className="quiz_tit">
                        해당 노래는 이무진님의 과제곡 입니다.<br />
                        이 노래는 진짜 과제였을까요 아니였을까요?<br />
                        맞으면 O, 틀리면 X를 눌러주세요!
                        </div>
                    <div className="quiz_etc">
                        {/* <iframe className="quiz_video" src="https://www.youtube.com/embed/F69_yzzCKpA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        <iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="quiz_progress">
                        <ProgressBar duration={progress} />
                        <div className="left_time">
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                    </div>
                    <div className="answer_wrap">
                        <input type="button" className="O"></input>
                        <input type="button" className="X"></input>
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
                    <input type="button" className="chatsendbtn"onClick={() => send(props, msg)}></input>
                </div>
                <div className="admin_btn">
                    <input type="button" className="gameStart" value="Start" onClick={startGame}></input>
                    <input type="button" className="nextGame" value="결 과"></input>
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