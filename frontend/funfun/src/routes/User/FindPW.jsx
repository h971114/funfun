import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class FindPW extends Component {

    constructor() {
        super();
        this.state = {
            checkIDnEmail: false,
            checkPW: false,
            checkCPW: false,
            no: "",
            id: "",
            nick: "",
            email: "",
        }
    }

    findPW = () => {
        axios.get(`http://127.0.0.1:8080/myapp/member/find-pw`, {
            params: {
                id: "dummy2",
                email: "doggydeok2@gmail.com",
            }
            }).then(res => {
                console.log(res);
                if (res.data.conclusion === "SUCCESS") {
                    // window.location.replace("/");
                    alert('성공')
                    this.setState({
                        checkIDnEmail: true,
                        id: res.data.id,
                        nick: res.data.nick,
                        no: res.data.member_no * 1,
                    })
                    console.log(this.state)
                } else {
                    alert("정보와 일치하는 아이디가 존재하지 않습니다.")
                }
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })
    }

    changePW = () => {
        axios.put(`http://127.0.0.1:8080/myapp/member/`, {
            member_no: this.state.no,
            id: this.state.id,
            pw: "q1w2e3r4!",
            nick: this.state.nick,
            email: "doggydeok2@gmail.com",
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            // alert("알 수 없는 오류가 발생했습니다.");
            // window.location.replace("/");
        })
    }

    render () {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    {this.state.checkIDnEmail ?
                        <button onClick={this.changePW}>비밀번호 수정</button>
                    :
                        <button onClick={this.findPW}>비밀번호 찾기</button>
                    }
                </div>
            </div>
        )
    }
}
export default FindPW;