import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

function AdminPlayQuiz(props) {
    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(seconds * 1000);
    const [msg, setMsg] = useState('');
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const initialBoard = {
        columns: [
            {
                id: 1,
                title: "프론트엔드팀",
                cards: [
                    {
                        id: 1,
                        title: "정현모"
                    },
                    {
                        id: 2,
                        title: "이홍덕"
                    }
                ]
            },
            {
                id: 2,
                title: "백엔드팀",
                cards: [
                    {
                        id: 3,
                        title: "현수진"
                    },
                    {
                        id: 4,
                        title: "천영재"
                    },
                    {
                        id: 5,
                        title: "한진영"
                    }
                ]
            }
        ]
    };
    const [board, setBoard] = useState(initialBoard);

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

    function onCardMove(card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);

        console.log("----------");
        console.log(card);
        console.log(source);
        console.log(destination);
        console.log(updatedBoard);
    }

    const startGame = () => {
        document.getElementsByClassName('gameStart')[0].setAttribute('style', 'display:none');
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
                    테스트_현수진<br />
                    테스트_한진영<br />
                    테스트_천영재<br />
                    테스트_정현모<br />
                    테스트_이홍덕
                </div>
                <input className="tcBtn" type="button" value="팀 재분배" onClick={openModal} />
                <h3>팀 원 채 팅 🤩</h3>
                <div className="chat_admin">
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
                    <input type="button" className="chatsendbtn"></input>
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