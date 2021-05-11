import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class Login extends Component {

    login = () => {
        axios.post(`http://127.0.0.1:8080/myapp/member/login`, {
                id: document.getElementById("userID").value,
                pw: document.getElementById("userPW").value,
            }).then(res => {
                // console.log(res);
                if (res.data.conclusion === "SUCCESS") {
                    sessionStorage.setItem("id", res.data.id);
                    sessionStorage.setItem("nick", res.data.nick);
                    sessionStorage.setItem("token", res.data.token);
                    window.location.replace("/");
                } else {
                    alert("아이디와 비밀번호를 확인해주세요.")
                }
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })
    }

    render() {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    <div className="title">
                        <img className="loginImg" src="/img/login.png" />
                        <br />
                        <span>로 그 인</span>
                        <img className="loginBar" src="/img/loginbar.png" />
                    </div>
                    <div className="input">
                        <label htmlFor="userID">USERID</label><br />
                        <input type="text" id="userID" placeholder="아이디를 입력하세요." />

                        <label htmlFor="userPW">PASSWORD</label><br />
                        <input type="password" id="userPW" placeholder="비밀번호를 입력하세요." />

                        <input type="button" onClick={this.login} value="로 그 인" />

                        <ul>
                            <li>
                                <Link to="/join">
                                    회원가입
                                    </Link>
                            </li>
                            <li>|</li>
                            <li>
                                <Link to="/findid">
                                    아이디 찾기
                                    </Link>
                            </li>
                            <li>|</li>
                            <li>
                                <Link to="/findpw">
                                    비밀번호 찾기
                                    </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;