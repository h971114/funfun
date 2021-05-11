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
    //     axios.get(`http://127.0.0.1:8080/myapp/member/${member_no}`, {
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
                        <Link to="/login" className="btn login">
                            로그인
                        </Link>
                    </div>
                    <div className="sideMenu">
                        <img className="profile" src="./img/profileSample.png" />
                        <div className="idWrap">
                            dummy2 / 더미
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
                        <div className="input">

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyQuiz