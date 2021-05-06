import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
var connected =false;
var socket ='';
var stompClient = '';
var messageArea = document.querySelector('#messageArea');

const  send = (props, msg)=> {
    let send_message = msg;
    if (stompClient && stompClient.connected) {
      const msg = {type : 'CHAT', content: send_message, roomnumber:props.location.state.code, sender: props.location.state.nickname };
      stompClient.send("/app/chat", JSON.stringify(msg), {});
  }
  console.log(send_message);
  }
  const connect =(props)=> {
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
        const msg = {type : 'JOIN', content: "", roomnumber: props.location.state.code, sender : props.location.state.nickname};
        stompClient.send("/app/chat", JSON.stringify(msg), {});
      },
      error => {
        console.log(error);
        connected = false;
      }
      );
  }
  const disconnect =(props)=> {
      if (stompClient) {
        const msg = {type : 'LEAVE', content: "", roomnumber:props.location.state.code };
        stompClient.send("/app/chat", JSON.stringify(msg), {});
      stompClient.disconnect();
    }
    connected = false;
  }
  const tickleConnection =()=> {
    connected ? disconnect() : connect();
}
function onclick() {
    console.log("???");
}
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    console.log(message);
}
function PlayQuiz(props) {
    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
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
    },[props.location.state.nickname])
    
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
                <h3>팀 원 목 록 😎</h3>
                <div className="members">
                    1. 테스트_현수진<br />
                        2. 테스트_한진영<br />
                        3. 테스트_천영재<br />
                        4. 테스트_정현모<br />
                        5. 테스트_이홍덕
                    </div>
                <h3>팀 원 채 팅 🤩</h3>
                <div className="chat">
                    테스트_이홍덕 : 테스트 진행중입니다<br />
                        테스트_정현모 : 테스트 진행중입니다<br />
                        테스트_천영재 : 테스트 진행중입니다<br />
                        테스트_한진영 : 테스트 진행중입니다<br />
                        테스트_현수진 : 테스트 진행중입니다
                    <ul id="messageArea">
                        
                    </ul>
                    </div>
                <div className="send_wrap">
                    <input type="text" className="chatsend" placeholder="채팅을 입력하세요." onChange={event => setMsg(event.target.value)}></input>
                    <input type="button" className="chatsendbtn" onClick={() =>send(props, msg)}></input>
                </div>
            </div>
            <div className="allChat">

            </div>
        </div>
    );
}

export default PlayQuiz;