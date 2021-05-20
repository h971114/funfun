import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"
var code = '';
class InputCode extends Component {

    goGame = (e) => {
        this.props.history.push({
            pathname: '/game/setNick',
            state: { code: code }
        });

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