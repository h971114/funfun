import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyQuiz extends Component {

    constructor() {
        super();
        this.state = {
            no: "",
            id: "",
            nick: "",
            email: "",
            myRooms: [],
        }
    }

    getUserByID = (member_id) => {
        axios.get(`http://127.0.0.1:8080/myapp/member/byid/${member_id}`, {
            id: member_id
        }).then(res => {
            console.log(res)
            this.setState({
                no: res.data.member_no,
                id: res.data.id,
                nick: res.data.nick,
                email: res.data.email,
            })
            this.getRoomsByMemberNo(res.data.member_no)
        })
    }

    getRoomsByMemberNo (member_no) {
        axios.get(`http://127.0.0.1:8080/myapp/room/room_memberno`, {
            params: {
                no: member_no,
            }
        }).then(res => {
            console.log(res)
            this.setState({ myRooms: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount () {
        this.getUserByID(sessionStorage.getItem('id'));
    }

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

                                    {this.state.myRooms.map((room, index) => (
                                        (
                                        <Link to={{
                                            pathname: `./game/playQuiz`,
                                            state: {
                                                code: room.code,
                                                nick: this.state.nick, 
                                            }
                                        }}>
                                        <div className="quizLists" >
                                            <img src="./img/noImage.png" />
                                            <div className="quizData">
                                                <div className="quizTitle">
                                                    {room.quiz_title}
                                                </div>
                                                <div className="quizDetail">
                                                    <span className="quizCnt">{room.quiz_cnt}문제 / </span>
                                                    <span className="quizDate">{room.quiz_date} /</span>
                                                    <span className="quizTeam">{room.team_cnt}팀 / </span>
                                                    <span className="quizRoomCode">{room.code} </span>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                        ))
                                    )}


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