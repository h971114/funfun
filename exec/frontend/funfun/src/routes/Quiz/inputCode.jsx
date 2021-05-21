import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
import cookie from 'react-cookies';
var code = '';
class InputCode extends Component {

    goGame = (e) => {;
        if (code) {
            console.log(code)
             cookie.save('code', code, {
                path: '/',
                expires: new Date(Date.now() + 14000000),
            });
            this.props.history.push({
                pathname: '/game/setNick',
                state: { code: code }
            });
        } else {
            alert("게임 코드를 입력하세요.")
        }

    }
    changecode = (e) => {
        code = e;
    }
    render() {
        return (
            <div className="quiz_contents codebg">
                <input type="text" className="code" onChange={event => this.changecode(event.target.value)}></input>
                <input type="button" value="접속" className="codebtn" onClick={this.goGame}></input>
                {/* <div className="input_code">
                    <h2>게임 코드를 입력하세요.</h2>
                    
                </div> */}
            </div>
        );
    }
}

export default InputCode;