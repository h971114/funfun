import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
import cookie from 'react-cookies'
class Header extends Component {

    logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
    }
    click = () => {
        console.log(cookie.loadAll())
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
                        <a onClick={this.logout} className="btn login" style={{ cursor: "pointer" }}>로그아웃</a>

                        <Link to="/mypage" className="btn login">
                            마이 페이지
                        </Link>
                    </div>
                    :
                    <Link to="/login" className="btn login">
                        로그인
                    </Link>
                }
                {cookie.load('ID') !== undefined ?
                    <div className="loginWraps">
                        <Link to="/game/PlayQuiz" className="btn login">
                            이전 퀴즈로 접속
                    </Link>
                    </div>
                    :

                    <div>

                    </div>
                }
            </div>
        );
    }
}

export default Header;