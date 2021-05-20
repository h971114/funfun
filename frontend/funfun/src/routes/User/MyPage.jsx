import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyPage extends Component {

    constructor() {
        super();
        this.state = {
            checkPW: false,
            checkCPW: false,
            checkNN: false,
            checkEM: false,
            no: "",
            id: "",
            nick: "",
            email: "",
        }
    }

    componentDidMount() {
        this.getUserByID(sessionStorage.getItem('id'))
    }

    getUserByID = (member_id) => {
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/byid/${member_id}`, {
            id: member_id
        }).then(res => {
            console.log(res)
            this.setState({
                no: res.data.member_no,
                id: res.data.id,
                nick: res.data.nick,
                email: res.data.email,
            })
        })
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
            document.getElementById("avalidCPW").innerText = "일치하는 비밀번호가 입력되었습니다.";
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

    updateUser = () => {
        if (this.state.checkPW === true && this.state.checkCPW === true && this.state.checkEM === true && this.state.checkNN === true) {
            axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/member/`, {
                member_no: this.state.no,
                id: this.state.id,
                pw: document.getElementById("userPW").value,
                nick: document.getElementById("userNN").value,
                email: document.getElementById("userEM").value,
            }).then(res => {
                // console.log(res);
                alert("회원정보 수정이 완료되었습니다.")
                window.location.replace("/mypage");
            }).catch(err => {
                // console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                // window.location.replace("/");
            })

        }
    }

    logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
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
                            <Link to="/myquiz" className="sideMenuLink">
                                FunFun 목록
                            </Link>
                            <Link to="/mypage" className="sideMenuLink onLink">
                                Profile
                            </Link>
                            <Link to="/game/makeQuiz" className="sideMenuLink">
                                문제 만들기
                            </Link>
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="input">
                            <h3>Profile</h3>

                            <label>USERID : {sessionStorage.getItem('id')}</label>

                            <label htmlFor="userPW">PASSWORD</label>
                            <input type="password" id="userPW" onBlur={this.checkPW} placeholder="비밀번호를 입력하세요." />
                            <div className="availd" id="avalidPW"></div>

                            <label htmlFor="userCPW">Check PASSWORD</label>
                            <input type="password" id="userCPW" onBlur={this.checkCPW} placeholder="다시 비밀번호를 입력하세요." />
                            <div className="availd" id="avalidCPW"></div>

                            <label htmlFor="userNN">NICKNAME</label>
                            <input type="text" id="userNN" onBlur={this.checkNN} placeholder="별명을 입력하세요." defaultValue={sessionStorage.getItem('nick')} />
                            <div className="availd" id="avalidNN"></div>

                            <label htmlFor="userEM">USER E-MAIL</label>
                            <input type="text" id="userEM" onBlur={this.checkEM} placeholder="이메일을 입력하세요." defaultValue={this.state.email} />
                            <div className="availd" id="avalidEM"></div>

                            <input type="button" onClick={this.updateUser} value="수 정" />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyPage