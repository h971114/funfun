import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyQuiz extends Component {

    constructor() {
        super();
        this.state = {
            checkIDnEmail: false,
            checkPW: false,
            checkCPW: false,
            no: "",
            id: "",
            nick: "",
            email: "",
        }
    }

    // getUserByID = (member_no) => {
    //     axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${member_no}`, {
    //         params: {
    //             no: member_no
    //         }
    //     }).then(res => {
    //         console.log(res)
    //         this.setState({
    //             no: res.data.no,
    //             id: res.data.id,
    //             nick: res.data.nick,
    //             email: res.data.email,
    //         })
    //     })
    // }

    render() {
        return (
            <div className="myPageContent">
                <div className="wrapContent">
                    <div className="header rec_header">
                        <Link to="/" className="btn logo">

                        </Link>
                        <Link to="/game/goGame" className="btn goGame">
                            <span>Go Game</span>
                        </Link>
                        {sessionStorage.getItem('id') ?
                            <a onClick={this.logout} className="btn login" href="">로그아웃</a>
                            :
                            <Link to="/login" className="btn login">
                                로그인
                        </Link>
                        }
                    </div>
                    <div className="sideMenu">
                        <img className="profile" src="./img/profileSample.png" />
                        <div className="idWrap">
                            {sessionStorage.getItem('id')} / {sessionStorage.getItem('nick')}
                        </div>
                        <div className="sideMenuWrap">
                            <Link to="/myquiz" className="sideMenuLink onLink">
                                FunFun 목록
                            </Link>
                            <Link to="/myresult" className="sideMenuLink">
                                FunFun 결과
                            </Link>
                            <Link to="/mypage" className="sideMenuLink">
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="quizWrap">
                            <div className="quizList">
                                <label className="scrollAlert">※ 스크롤하시면 리스트를 볼 수 있습니다.</label>
                                <div className="quizLists">
                                    <img src="./img/noImage.png" />
                                    <div className="quizData">
                                        <div className="quizTitle">
                                            퀴즈 제목
                                        </div>
                                        <div className="quizDetail">
                                            <span className="quizCnt">Q. 6문제 /</span>
                                            <span className="quizDate">2021-05-12 /</span>
                                            <span className="quizTeam">6 team /</span>
                                            <span className="quizRoomCode">123 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizLists">
                                    <img src="./img/noImage.png" />
                                    <div className="quizData">
                                        <div className="quizTitle">
                                            퀴즈 제목
                                        </div>
                                        <div className="quizDetail">
                                            <span className="quizCnt">Q. 6문제 /</span>
                                            <span className="quizDate">2021-05-12 /</span>
                                            <span className="quizTeam">6 team /</span>
                                            <span className="quizRoomCode">123 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizLists">
                                    <img src="./img/noImage.png" />
                                    <div className="quizData">
                                        <div className="quizTitle">
                                            퀴즈 제목
                                        </div>
                                        <div className="quizDetail">
                                            <span className="quizCnt">Q. 6문제 /</span>
                                            <span className="quizDate">2021-05-12 /</span>
                                            <span className="quizTeam">6 team /</span>
                                            <span className="quizRoomCode">123 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizLists">
                                    <img src="./img/noImage.png" />
                                    <div className="quizData">
                                        <div className="quizTitle">
                                            퀴즈 제목
                                        </div>
                                        <div className="quizDetail">
                                            <span className="quizCnt">Q. 6문제 /</span>
                                            <span className="quizDate">2021-05-12 /</span>
                                            <span className="quizTeam">6 team /</span>
                                            <span className="quizRoomCode">123 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizLists">
                                    <img src="./img/noImage.png" />
                                    <div className="quizData">
                                        <div className="quizTitle">
                                            퀴즈 제목
                                        </div>
                                        <div className="quizDetail">
                                            <span className="quizCnt">Q. 6문제 /</span>
                                            <span className="quizDate">2021-05-12 /</span>
                                            <span className="quizTeam">6 team /</span>
                                            <span className="quizRoomCode">123 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="quizDetailWrap">
                                <div className="quizPre">

                                </div>
                                <div className="quizBtnWrap">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyQuiz