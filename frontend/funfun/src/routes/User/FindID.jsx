import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class FindID extends Component {

    getUserByEmail = async (email) => {
        const response = await axios.get(`http://127.0.0.1:8080/myapp/member/find-id`, {
            params: {
                email: email,
            },
        }).then(res => {
            console.log(res)
        });
        return response.data;
    }

    findID = () => {
        let userInfo = this.getUserByEmail("doggydeok2@gmail.com")
        console.log(userInfo)
        // axios.get(`http://127.0.0.1:8080/myapp/member/find-id`, {
        //     params: {
        //         email: "doggydeok2@gmail.com",
        //     },
        //     }).then(res => {
        //         console.log(res);
        //         if (res.data.conclusion === "SUCCESS") {
        //             // window.location.replace("/");
        //         } else {
        //             alert("정보와 일치하는 아이디가 존재하지 않습니다.")
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //         alert("알 수 없는 오류가 발생했습니다.");
        //         window.location.replace("/");
        //     })
    }

    render () {
        return (
            <div className="userContent">
                <div className="wid800 loginWrap">
                    <button onClick={this.findID}>아이디 찾기</button>
                </div>
            </div>
        )
    }
}
export default FindID;