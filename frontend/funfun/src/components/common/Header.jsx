import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="wid1200">
                    <Link to="/" className="btn logo">
                        로고 들어갈 자리
                    </Link>
                    <Link to="/login" className="btn login">
                        로그인
                    </Link>
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