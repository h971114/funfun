import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyResult extends Component {

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
                            <Link to="/myquiz" className="sideMenuLink">
                                FunFun 목록
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
export default MyResult