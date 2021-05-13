import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';


function ResultQuiz(props) {

    // const result = () => {
    //     axios.get(`http://127.0.0.1:8080/myapp/team/personal`, { params: { no: code, id: ID } }).then(res => {
    //         console.log(res.data);
    //     }); // 개인전 자기 자신 점수
    //     axios.get(`http://127.0.0.1:8080/myapp/team/personal5`, { params: { no: code } }).then(res => {
    //         console.log(res.data);
    //     }); // 개인전 상위 5명 점수
    //     axios.get(`http://127.0.0.1:8080/myapp/team/team`, { params: { no: code, team: team } }).then(res => {
    //         console.log(res.data);
    //     }); // 팀전 자기 팀 점수
    //     axios.get(`http://127.0.0.1:8080/myapp/team/team5`, { params: { no: code } }).then(res => {
    //         console.log(res.data);
    //     }); // 팀전 상위 5팀 점수
    // }

    return (
        <div className="resultWrap">
            <div className="main_content">
                <h2>결 과</h2>
            </div>
        </div>
    );
}

export default ResultQuiz;