import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class Login extends Component {

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

                        <input type="button" value="로 그 인" />

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