import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class Join extends Component {

    constructor() {
        super();
        this.state = {
            checkID: false,
            checkPW: false,
            checkCPW: false,
            checkNN: false,
            checkEM: false,
        }
    }

    checkID = () => {
        var text = document.getElementById('userID').value;
        var idReg = /^[A-za-z]+[A-za-z0-9]{5,15}$/g;
        // console.log(text.length);
        if (!idReg.test(text)) {
            document.getElementById("avalidID").setAttribute('style', 'color:#f91c37');
            if (text.length < 5) {
                document.getElementById("avalidID").innerText = "아이디는 5~15의 길이여야 합니다.";
            }
            else if (text.length > 15) {
                document.getElementById("avalidID").innerText = "아이디는 5~15의 길이여야 합니다.";
            } else {
                document.getElementById("avalidID").innerText = "아이디는 영문으로 시작하여 숫자와 영어로 이루어져 있어야합니다.";
            }
        }
        else {
            this.setState({
                checkID: true
            })
            document.getElementById("avalidID").setAttribute('style', 'color:#73a1ff');
            document.getElementById("avalidID").innerText = "사용가능한 아이디입니다.";
            // 여기 아이디 중복검사 소스 넣기
        }
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

    checkNN = () => {
        var nickname = document.getElementById('userNN').value;

        // 중복 닉네임 여부 확인하기

        // 맞을 때

        this.setState({
            checkNN: true
        })
        // document.getElementById("avalidNN").setAttribute('style', 'color:#f91c37');
        // document.getElementById("avalidNN").innerText = "사용할 수 없는 닉네임입니다.";

        // 틀릴 때
        // document.getElementById("avalidNN").setAttribute('style', 'color:#73a1ff');
        // document.getElementById("avalidNN").innerText = "사용가능한 닉네임입니다.";

    }

    checkEM = () => {
        var email = document.getElementById('userEM').value;
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;

        if (!emailReg.test(email)) {
            document.getElementById("avalidEM").setAttribute('style', 'color:#f91c37');
            document.getElementById("avalidEM").innerText = "양식에 맞게 이메일을 입력해주세요.";
        }
        else {
            this.setState({
                checkEM: true
            })
            document.getElementById("avalidEM").setAttribute('style', 'color:#73a1ff');
            document.getElementById("avalidEM").innerText = "사용가능한 이메일입니다.";
        }
    }

    join = () => {
        if (this.state.checkID === true && this.state.checkPW === true &&
            this.state.checkCPW === true && this.state.checkNN === true &&
            this.state.checkEM === true) {
            // 등록 진행
            axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/member/join`, {
                id: document.getElementById("userID").value,
                pw: document.getElementById("userPW").value,
                nick: document.getElementById("userNN").value,
                email: document.getElementById("userEM").value,
            }).then(res => {
                // console.log(res)
                alert("회원가입이 완료되었습니다.\n 로그인 페이지로 이동합니다.");
                window.location.replace("/login");
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                // window.location.replace("/");
            })
        }
        else {
            alert("모든 정보를 정확히 입력해주시기 바랍니다.");
        }
    }

    render() {

        return (
            <div className="userContent">
                <div className="wid800 joinWrap">
                    <div className="title">
                        <img className="loginImg" src="/img/login.png" />
                        <br />
                        <span>회원가입</span>
                        <img className="loginBar" src="/img/loginbar.png" />
                    </div>
                    <div className="input">
                        <label htmlFor="userID">USERID</label><br />
                        <input type="text" id="userID" onBlur={this.checkID} placeholder="아이디를 입력하세요." />
                        <div className="availd" id="avalidID"></div>

                        <label htmlFor="userPW">PASSWORD</label><br />
                        <input type="password" id="userPW" onBlur={this.checkPW} placeholder="비밀번호를 입력하세요." />
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

                        <input type="button" onClick={this.join} value="회 원 가 입" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Join;