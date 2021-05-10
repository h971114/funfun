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

    render () {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                        <div className="title">
                        <img className="loginImg" src="/img/login.png" />
                        <br />
                        <span>왼쪽 레이아웃</span>
                        <img className="loginBar" src="/img/loginbar.png" />
                    </div>
                    <div className="input">
                        <label htmlFor="userID">USERID</label><br />
                        <input type="text" id="userID" onBlur={this.checkID} placeholder="아이디를 입력하세요." />
                        <div className="availd" id="avalidID"></div>

                        <label htmlFor="userPW">PASSWORD</label><br />
                        <input type="password" id="userPw" onBlur={this.checkPW} placeholder="비밀번호를 입력하세요." />
                        <div className="availd" id="avalidPW"></div>

                        <label htmlFor="userCPW">Check PASSWORD</label><br />
                        <input type="password" id="userCPW" onBlur={this.checkCPW} placeholder="다시 비밀번호를 입력하세요." />
                        <div className="availd" id="avalidCPW"></div>

                        <label htmlFor="userNN">NICKNAME</label><br />
                        <input type="text" id="userNN" onBlur={this.checkNN} placeholder="별명을 입력하세요." />
                        <div className="availd" id="avalidNN"></div>

                        <label htmlFor="userEM">USER E-MAIL</label><br />
                        <input type="text" id="userEM" onBlur={this.checkEM} placeholder="이메일을 입력하세요." />
                        <div className="availd" id="avalidEM"></div>

                        <input type="button" onClick={this.login} value="수정" />
                </div>
                </div>
            </div>
        )
    }
}
export default MyPage