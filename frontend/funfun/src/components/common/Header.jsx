import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class Header extends Component {

    render() {
        return (
            <div className="header">
                <Link to="/" className="btn logo">

                </Link>
                <Link to="/game/goGame" className="btn goGame">
                    <span>Go Game</span>
                </Link>
                <Link to="/login" className="btn login">
                    로그인
                    </Link>
            </div>
        );
    }
}

export default Header;