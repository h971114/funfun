import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {

    logout = () => {
        axios.post(`http://127.0.0.1:8080/myapp/member/logout`, {
            }).then(res => {
                console.log(res);
                window.sessionStorage.clear();
                window.location.replace("/");
                alert("로그아웃 되었습니다.");
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })

    }

    render() {
        return (
            <div className="header">
                <div className="wid1200">
                    <Link to="/" className="btn logo">
                        로고 들어갈 자리
                    </Link>
                    {!sessionStorage.getItem("id") ?
                        <Link to="/login" className="btn login">
                            로그인
                        </Link>
                        : 
                        <p className="btn login" onClick={this.logout} style={{ cursor: "pointer" }}>
                            로그아웃
                        </p>
                    }   
                    <Link to="/game/goGame" className="btn goGame">
                        <span>Go Game</span>
                        <div className="transition"></div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;