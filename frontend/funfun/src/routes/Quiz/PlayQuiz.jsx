import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"

import ProgressBar from '../../components/common/ProgressBar';

function PlayQuiz() {
    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(seconds * 1000);

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
                    </div>
                <div className="send_wrap">
                    <input type="text" className="chatsend" placeholder="채팅을 입력하세요." ></input>
                    <input type="button" className="chatsendbtn"></input>
                </div>
            </div>
            <div className="allChat">

            </div>
        </div>
    );
}

export default PlayQuiz;