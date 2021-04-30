import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class FindPW extends Component {

    findPW = () => {
        axios.get(`http://127.0.0.1:8080/myapp/member/find-pw`, {
            params: {
                id: "dummy3",
                email: "doggydeok2@gmail.com",
            }
            }).then(res => {
                console.log(res);
                if (res.data.conclusion === "SUCCESS") {
                    // window.location.replace("/");
                } else {
                    alert("정보와 일치하는 아이디가 존재하지 않습니다.")
                }
            }).catch(err => {
                console.log(err);
                alert("알 수 없는 오류가 발생했습니다.");
                window.location.replace("/");
            })
    }

    render () {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    <button onClick={this.findPW}>비밀번호 찾기</button>
                </div>
            </div>
        )
    }
}
export default FindPW;