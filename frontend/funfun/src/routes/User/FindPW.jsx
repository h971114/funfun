import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class FindPW extends Component {

    constructor() {
        super();
        this.state = {
            checkIDnEmail: false,
            isCorrectIDnEmail: false,
            checkPW: false,
            checkCPW: false,
            no: "",
            id: "",
            nick: "",
            email: "",
            resultMessage: "",
        }
    }

    idChange = (e) => {
        this.setState({
            id: e.target.value,
        });
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    checkPW = () => {
        var pw = document.getElementById('userPW').value;
        var cpw = document.getElementById('userCPW').value;
        var pwReg = /^(?=.*[A-Za-z])(?=.*[$@$!%*#^?&])[A-Za-z\d$@$!%*^#?&]{8,15}$/g;
        var pwSReg = /^(?=.*[$@$!%*#^?&])[A-Za-z\d$@$!%*^#?&]{8,15}$/g;
        if (!pwReg.test(pw)) {
            document.getElementById("avalidPW").setAttribute('style', 'color:#f91c37');
            if (pw.length < 8) {
                document.getElementById("avalidPW").innerText = "비밀번호는 8~15의 길이여야 합니다.";
            }
            else if (pw.length > 15) {
                document.getElementById("avalidPW").innerText = "비밀번호는 8~15의 길이여야 합니다.";
            } else if (!pwSReg.test(pw)) {
                document.getElementById("avalidPW").innerText = "비밀번호는 특수문자가 포함되어야합니다.";
            } else {
                document.getElementById("avalidPW").innerText = "비밀번호에는 문자가 포함되어야합니다.";
            }
        } else {
            this.setState({
                checkPW: true
            })
            document.getElementById("avalidPW").setAttribute('style', 'color:#73a1ff');
            document.getElementById("avalidPW").innerText = "사용가능한 비밀번호입니다.";
        }
    }

    checkCPW = () => {
        var pw = document.getElementById('userPW').value;
        var cpw = document.getElementById('userCPW').value;

        if (pw !== cpw) {
            document.getElementById("avalidCPW").setAttribute('style', 'color:#f91c37');
            document.getElementById("avalidCPW").innerText = "앞의 비밀번호와 동일한 비밀번호를 입력해주세요.";
        } else {
            this.setState({
                checkCPW: true
            })
            document.getElementById("avalidCPW").setAttribute('style', 'color:#73a1ff');
            document.getElementById("avalidCPW").innerText = "사용가능한 비밀번호입니다.";
        }
    }

    findPW = () => {
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/find-pw`, {
            params: {
                id: this.state.id,
                email: this.state.email,
            }
        }).then(res => {
            // console.log(res);
            if (res.data.conclusion === "SUCCESS") {
                // alert('성공')
                this.setState({
                    checkIDnEmail: true,
                    nick: res.data.nick,
                    no: res.data.member_no * 1,
                    resultMessage: `사용할 비밀번호를 입력해주세요.`,
                    isCorrectIDnEmail: true,
                })
            } else {
                this.setState({
                    checkIDnEmail: true,
                    resultMessage: `정보와 일치하는 결과가 존재하지 않습니다. 아이디 찾기나 회원가입을 이용해주세요.`,
                    isCorrectIDnEmail: false,
                })
                // alert("정보와 일치하는 결과가 존재하지 않습니다.")
            }
        }).catch(err => {
            console.log(err);
            alert("알 수 없는 오류가 발생했습니다.");
            window.location.replace("/");
        })
    }

    updatePW = () => {
        if (this.state.checkPW === true && this.state.checkCPW === true) {
            axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/member/`, {
                member_no: this.state.no,
                id: this.state.id,
                pw: document.getElementById("userPW").value,
                nick: this.state.nick,
                email: this.state.email,
            }).then(res => {
                // console.log(res);
                alert("비밀번호 수정이 완료되었습니다. 로그인 창으로 이동합니다.")
                window.location.replace("/login");
            }).catch(err => {
                // console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })

        }
    }

    render() {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    <div className="title">
                        <img className="loginImg" src="/img/login.png" alt="로그인 이미지" />
                        <br />
                        <span>비밀번호 찾기</span>
                        <img className="loginBar" src="/img/loginbar.png" alt="로그인바 이미지" />
                    </div>
                    {this.state.checkIDnEmail ?
                        <div className="input">
                            <p>{this.state.resultMessage}</p>
                            {this.state.isCorrectIDnEmail ?
                                <div>
                                    <label htmlFor="userPW">PASSWORD</label><br />
                                    <input type="password" id="userPW" onBlur={this.checkPW} placeholder="비밀번호를 입력하세요." />
                                    <div className="availd" id="avalidPW"></div>

                                    <label htmlFor="userCPW">Check PASSWORD</label><br />
                                    <input type="password" id="userCPW" onBlur={this.checkCPW} placeholder="다시 비밀번호를 입력하세요." />
                                    <div className="availd" id="avalidCPW"></div>

                                    <input type="button" onClick={this.updatePW} value="비밀번호 수정" />
                                </div>
                                : null}
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
                                    <Link to="/findid">
                                        아이디 찾기
                                        </Link>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="input">
                            <label htmlFor="userID">USERID</label><br />
                            <input type="text" id="userID" placeholder="아이디를 입력하세요." onChange={this.idChange} />
                            <label htmlFor="userEmail">USER E-MAIL</label><br />
                            <input type="text" id="userEmail" placeholder="이메일을 입력하세요." onChange={this.emailChange} />

                            <input type="button" onClick={this.findPW} value="비밀번호 찾기" />

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
                                    <Link to="/findid">
                                        아이디 찾기
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
export default FindPW;