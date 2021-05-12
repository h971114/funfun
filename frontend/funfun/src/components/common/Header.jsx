import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {

    logout = () => {
        axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/member/logout`, {
            }).then(res => {
                console.log(res);
                window.sessionStorage.clear();
                alert("로그아웃 되었습니다.");
                window.location.replace("/");
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })

    }

    render() {
        return (
            <div className="header">
                <Link to="/" className="btn logo">
                </Link>
                <Link to="/game/goGame" className="btn goGame">
                    <span>Go Game</span>
                </Link>
                {sessionStorage.getItem('id') ?
                    <div className="loginWraps">
                        <p className="btn login" onClick={this.logout} style={{ cursor: "pointer" }}>
                            로그아웃
                    </p>
                        <Link to="/mypage" className="btn login">
                            마이 페이지
                    </Link>
                    </div>
                    :
                    <Link to="/login" className="btn login">
                        로그인
                    </Link>
                }
                </div>
        );
    }
}

export default Header;