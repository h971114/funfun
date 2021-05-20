import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class FindID extends Component {

    constructor() {
        super();
        this.state = {
            checkEmail: false,
            id: "",
            email: "",
            resultMessage: "",
        }
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    findID = () => {
        if (this.state.email) {
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/find-id`, {
                params: {
                    email: this.state.email,
                },
            }).then(res => {
                // console.log(res);
                if (res.data) {
                    // console.log(res.data)
                    this.setState({
                        checkEmail: true,
                        id: res.data,
                        resultMessage: `이메일 ${this.state.email}로 가입된 아이디는 다음과 같습니다.`
                    });
                } else {
                    this.setState({
                        checkEmail: true,
                        resultMessage: `이메일 ${this.state.email}로 가입된 아이디가 존재하지 않습니다.`
                    })
                }
            }).catch(err => {
                // console.log(err);
                this.setState({
                    checkEmail: true,
                    resultMessage: `이메일 ${this.state.email}로 가입된 아이디가 존재하지 않습니다.`
                })
                // alert("알 수 없는 오류가 발생했습니다.");
                // window.location.replace("/");
            })
        } else {
            alert('주어진 양식에 맞게 입력을 완료해 주세요!')
        }
    }

    render() {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    <div className="title">
                        <img className="loginImg" src="/img/login.png" alt="로그인 이미지" />
                        <br />
                        <span>아이디 찾기</span>
                        <img className="loginBar" src="/img/loginbar.png" alt="로그인바 이미지" />
                    </div>
                    {this.state.checkEmail ?
                        <div className="input">
                            <p>{this.state.resultMessage}</p>
                            <br />
                            <p>{this.state.id}</p>
                            <ul>
                                <li>
                                    <Link to="/login">
                                        로그인
                                        </Link>
                                </li>
                                <li>|</li>
                                <li>
                                    <Link to="/join">
                                        회원가입
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
                        :
                        <div className="input">
                            <label htmlFor="userEmail">USER E-MAIL</label><br />
                            <input type="text" id="userEmail" placeholder="이메일을 입력하세요." onChange={this.emailChange} />

                            <input type="button" onClick={this.findID} value="아이디 찾기" />

                            <ul>
                                <li>
                                    <Link to="/login">
                                        로그인
                                        </Link>
                                </li>
                                <li>|</li>
                                <li>
                                    <Link to="/join">
                                        회원가입
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
                    }
                </div>
            </div>
        )
    }
}
export default FindID;