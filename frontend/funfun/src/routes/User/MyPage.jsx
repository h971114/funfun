import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyPage extends Component {

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

    getUserByID = (member_no) => {
        axios.get(`http://127.0.0.1:8080/myapp/member/${member_no}`, {
            params: {
                no: member_no
            }
        }).then(res => {
            console.log(res)
            this.setState({
                no: res.data.no,
                id: res.data.id,
                nick: res.data.nick,
                email: res.data.email,
            })
        })
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
                            <Link to="/myquiz" className="sideMenuLink">
                                FunFun 목록
                            </Link>
                            <Link to="/myresult" className="sideMenuLink">
                                FunFun 결과
                            </Link>
                            <Link to="/mypage" className="sideMenuLink onLink">
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="input">
                            <h3>Profile</h3>

                            <div className="profileImg">
                                {this.state.photo ? (
                                    <img src={this.state.photo} alt="프로필사진"></img>
                                ) : (<img src="./img/profileSample.png" alt="프로필사진"></img>)}

                            </div>
                            <div className="profileImgLabel">
                                <label className="forProfile" htmlFor="ex_filename">프로필 사진 변경</label>
                                <input type="file" accept="image/*" id="ex_filename" className="upload-hidden" />
                            </div>

                            <label>USERID : dummy2</label>

                            <label htmlFor="userPW">PASSWORD</label>
                            <input type="password" id="userPw" onBlur={this.checkPW} placeholder="비밀번호를 입력하세요." />
                            <div className="availd" id="avalidPW"></div>

                            <label htmlFor="userCPW">Check PASSWORD</label>
                            <input type="password" id="userCPW" onBlur={this.checkCPW} placeholder="다시 비밀번호를 입력하세요." />
                            <div className="availd" id="avalidCPW"></div>

                            <label htmlFor="userNN">NICKNAME</label>
                            <input type="text" id="userNN" onBlur={this.checkNN} placeholder="별명을 입력하세요." />
                            <div className="availd" id="avalidNN"></div>

                            <label htmlFor="userEM">USER E-MAIL</label>
                            <input type="text" id="userEM" onBlur={this.checkEM} placeholder="이메일을 입력하세요." />
                            <div className="availd" id="avalidEM"></div>

                            <input type="button" onClick={this.login} value="수 정" />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyPage