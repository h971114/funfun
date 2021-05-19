import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"

function MakeQuiz() {
    const [page, setPage] = useState(1);
    const [OXon, setOXon] = useState(false);
    const [Choiceon, setChoiceon] = useState(false);
    const [Answeron, setAnsweron] = useState(false);

    const [quiztit, setQuiztit] = useState("문제를 입력해주세요.");

    const [c1, setC1] = useState("1번 보기입니다.");
    const [c2, setC2] = useState("2번 보기입니다.");
    const [c3, setC3] = useState("3번 보기입니다.");
    const [c4, setC4] = useState("4번 보기입니다.");
    const [c5, setC5] = useState("5번 보기입니다.");

    const [img, setImg] = useState(true);
    const [youtube, setYoutube] = useState(false);

    const [answer, setAnswer] = useState();

    function twoNum(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    const pagerendering = () => {
        const result = [];
        for (let i = 1; i <= page; i++) {
            result.push(
                <li className="quizlist" key={i}>
                    <div className="quizNum">
                        {twoNum(i, 2)}Q.
                            </div>
                    <div className="quizBtn">
                        <div className="quizType">
                            [객관식]
                                </div>
                        <div className="quizContents">
                            문제내용...
                                </div>
                        <div className="quizDelete">
                            <img src="/img/delete.png" onClick={removePages} />
                        </div>
                    </div>
                </li>
            );
        }
        return result;
    };

    var QInputArr = document.getElementsByClassName("QInput");
    var ChoiceArr = document.getElementsByClassName("ChoiceInput");

    const selectOX = () => {
        setOXon(true);
        setChoiceon(false);
        setAnsweron(false);
        setQuiztit("문제를 입력해주세요.");
        setC1("1번 보기입니다.");
        setC2("2번 보기입니다.");
        setC3("3번 보기입니다.");
        setC4("4번 보기입니다.");
        setC5("5번 보기입니다.");
        for (var i = 0; i < QInputArr.length; i++) {
            QInputArr[i].value = "";
        }
        for (var i = 0; i < ChoiceArr.length; i++) {
            ChoiceArr[i].value = "";
        }
    }

    const selectChoice = () => {
        setOXon(false);
        setChoiceon(true);
        setAnsweron(false);
        setQuiztit("문제를 입력해주세요.");
        for (var i = 0; i < QInputArr.length; i++) {
            QInputArr[i].value = "";
        }
        for (var i = 0; i < ChoiceArr.length; i++) {
            ChoiceArr[i].value = "";
        }
    }

    const selectAnswer = () => {
        setOXon(false);
        setChoiceon(false);
        setAnsweron(true);
        setQuiztit("문제를 입력해주세요.");
        setC1("1번 보기입니다.");
        setC2("2번 보기입니다.");
        setC3("3번 보기입니다.");
        setC4("4번 보기입니다.");
        setC5("5번 보기입니다.");
        for (var i = 0; i < QInputArr.length; i++) {
            QInputArr[i].value = "";
        }
        for (var i = 0; i < ChoiceArr.length; i++) {
            ChoiceArr[i].value = "";
        }
    }

    const addPages = () => {
        setPage(page + 1);
    }
    const removePages = () => {
        if (page > 1)
            setPage(page - 1);
        else {
            alert("최소 한페이지는 존재해야합니다.");
        }
    }

    const QinputChange = (e) => {
        if (e.target.value === "") {
            setQuiztit("문제를 입력해주세요.");
        }
        else
            setQuiztit(e.target.value);
    }

    const C1Change = (e) => {
        setC1(e.target.value);
    }
    const C2Change = (e) => {
        setC2(e.target.value);
    }
    const C3Change = (e) => {
        setC3(e.target.value);
    }
    const C4Change = (e) => {
        setC4(e.target.value);
    }
    const C5Change = (e) => {
        setC5(e.target.value);
    }
    const logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
    }
    return (
        <div className="quiz_contents">
            <div className="wrapContent">
                <div className="header rec_header">
                    <Link to="/" className="btn logo">

                    </Link>
                    <Link to="/game/goGame" className="btn goGame">
                        <span>Go Game</span>
                    </Link>
                    {sessionStorage.getItem('id') ?
                        <a onClick={()=> logout()} className="btn login" href="">로그아웃</a>
                        :
                        <Link to="/login" className="btn login">
                            로그인
                            </Link>
                    }
                </div>
                <div className="quiz_page">
                    <p className="quizCnt">퀴즈 : 총 {page} 문제</p>
                    <ul>
                        {pagerendering()}
                    </ul>
                </div>
                <div className="quiz_preview">
                    <div className={"previews type_ox" + (OXon ? '' : ' hidden')}>
                        <div className="space">

                        </div>
                        <div className="boxes">
                            <div className="ox_frame">
                                <div className="quiz_wrap">
                                    <div className="quiz_title">
                                        {quiztit}
                                    </div>
                                    <div className="quiz_thumb">
                                        <img src="/img/img_content.png" />
                                    </div>
                                    <div className="quiz_youtube">
                                        <iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className="progress">

                                    </div>
                                    <div className="timerNum">
                                        60
                                    </div>
                                    <div className="quiz_btn OXBtn">
                                        <input type="button" className="O"></input>
                                        <input type="button" className="X"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"previews type_choice" + (Choiceon ? '' : ' hidden')}>
                        <div className="space">

                        </div>
                        <div className="boxes">
                            <div className="ox_frame">
                                <div className="quiz_wrap">
                                    <div className="quiz_title">
                                        {quiztit === "" && "asdf"}
                                        {quiztit !== null && quiztit}
                                        {/* {quiztit} */}
                                    </div>
                                    <div className="quiz_thumb">
                                        <img src="/img/img_content.png" />
                                    </div>
                                    <div className="quiz_youtube">
                                        <iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className="progress">

                                    </div>
                                    <div className="timerNum">
                                        60
                                    </div>
                                    <div className="quiz_btn">
                                        <input type="button" className="choice" value={"1. " + c1}></input>
                                        <input type="button" className="choice" value={"2. " + c2}></input>
                                        <input type="button" className="choice" value={"3. " + c3}></input>
                                        <br />
                                        <input type="button" className="choice" value={"4. " + c4}></input>
                                        <input type="button" className="choice" value={"5. " + c5}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"previews type_answer" + (Answeron ? '' : ' hidden')}>
                        <div className="space">

                        </div>
                        <div className="boxes">
                            <div className="ox_frame">
                                <div className="quiz_wrap">
                                    <div className="quiz_title">
                                        {quiztit}
                                    </div>
                                    <div className="quiz_thumb">
                                        <img src="/img/img_content.png" />
                                        {/* <iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                                    </div>
                                    <div className="quiz_youtube">
                                        <iframe className="quiz_video" src="https://www.youtube.com/embed/7j2KMMadI8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className="progress">

                                    </div>
                                    <div className="timerNum">
                                        60
                                    </div>
                                    <div className="quiz_btn answer_Btn">
                                        <input type="text" className="answerTxt" placeholder="정답을 입력하세요."></input>
                                        <input type="button" className="answerBtn" value="제출" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="previews type_default">
                        <div className="space">

                        </div>
                        <div className="boxes">
                            <div className="selectAdvice">
                                문제 Type을 선택해주세요.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz_attr">
                    <div className="typeTitle">
                        Type
                    </div>
                    <div className="typeBtnWrap">
                        <div id="OXBtnDiv" className={"TypeBtns " + (OXon ? 'On' : '')} onClick={selectOX}>
                            <div className="btnName">
                                OX퀴즈
                            </div>
                        </div>
                        <div id="ChoiceBtnDiv" className={"TypeBtns " + (Choiceon ? 'On' : '')} onClick={selectChoice}>
                            <div className="btnName">
                                객관식
                            </div>
                        </div>
                        <div id="AnswerBtnDiv" className={"TypeBtns " + (Answeron ? 'On' : '')} onClick={selectAnswer}>
                            <div className="btnName">
                                주관식
                            </div>
                        </div>
                    </div>

                    <div className={"OXWrap" + (OXon ? '' : ' hidden')}>
                        <div className="QWrap">
                            <div className="Qtitle">
                                Question
                            </div>
                            <textarea className="QInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <input type="radio" name="answerOX" id="Oradio"></input>
                                <label htmlFor="Oradio"><img src="/img/O.png" /></label>
                                <input type="radio" name="answerOX" id="Xradio"></input>
                                <label htmlFor="Xradio"><img src="/img/X.png" /></label>
                            </div>
                        </div>
                        <div className="MWrap">
                            <div className="Mtitle">
                                Media
                            </div>
                            <div className="MradioWrap">
                                <input type="radio" id="MradioImg" name="Mradio"></input>
                                <label htmlFor="MradioImg">이미지 등록</label>
                                <input type="radio" id="MradioYoutube" name="Mradio"></input>
                                <label htmlFor="MradioYoutube">유튜브 링크</label>
                            </div>
                            <div className="MImgWrap">
                                <input className="upload-name" id="upload-name" placeholder="파일선택" disabled="disabled" />
                                <label htmlFor="ex_filename"><img src="/img/input_file_btn.png"></img></label>
                                <input className="MInputImg" id="ex_filename" type="file" accept="image/*" />
                            </div>
                            <div className="MYoutubeWrap">
                                <input className="youtube-link" type="text" id="youtube-link" placeholder="유튜브 링크를 입력하세요." />
                                <label htmlFor="youtube-link"><img src="/img/input_youtube_btn.png"></img></label>
                            </div>
                        </div>
                    </div>

                    <div className={"choiceWrap" + (Choiceon ? '' : ' hidden')}>
                        <div className="QWrap">
                            <div className="Qtitle">
                                Question
                            </div>
                            <textarea className="QInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <ul>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice" id="C1"></input>
                                        1. <input type="text" className="ChoiceInput" id="C1Input" onChange={C1Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice" id="C2"></input>
                                        2. <input type="text" className="ChoiceInput" id="C2Input" onChange={C2Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice" id="C3"></input>
                                        3. <input type="text" className="ChoiceInput" id="C3Input" onChange={C3Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice" id="C4"></input>
                                        4. <input type="text" className="ChoiceInput" id="C4Input" onChange={C4Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice" id="C5"></input>
                                        5. <input type="text" className="ChoiceInput" id="C5Input" onChange={C5Change}></input>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="MWrap">
                            <div className="Mtitle">
                                Media
                            </div>
                            <div className="MradioWrap">
                                <input type="radio" id="MradioImgC" name="Mradio"></input>
                                <label htmlFor="MradioImgC">이미지 등록</label>
                                <input type="radio" id="MradioYoutubeC" name="Mradio"></input>
                                <label htmlFor="MradioYoutubeC">유튜브 링크</label>
                            </div>
                            <div className="MImgWrap">
                                <input className="upload-name" id="upload-name" placeholder="파일선택" disabled="disabled" />
                                <label htmlFor="ex_filenameA"><img src="/img/input_file_btn.png"></img></label>
                                <input className="MInputImg" id="ex_filenameA" type="file" accept="image/*" />
                            </div>
                            <div className="MYoutubeWrap">
                                <input className="youtube-link" type="text" id="youtube-linkA" placeholder="유튜브 링크를 입력하세요." />
                                <label htmlFor="youtube-linkA"><img src="/img/input_youtube_btn.png"></img></label>
                            </div>
                        </div>
                        <div className="TWrap">
                            <div className="Ttitle">
                                Team
                            </div>
                            <div className="TradioWrap">
                                <input type="radio" id="TradioSoloC" name="Tradio"></input>
                                <label htmlFor="TradioSoloC">개인전</label>
                                <input type="radio" id="TradioTeamC" name="Tradio"></input>
                                <label htmlFor="TradioTeamC">팀  전</label>
                            </div>
                        </div>
                    </div>

                    <div className={"answerWrap" + (Answeron ? '' : ' hidden')}>
                        <div className="QWrap">
                            <div className="Qtitle">
                                Question
                            </div>
                            <textarea className="QInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <input className="AanswerWrap" type="text" placeholder="정답을 입력해주세요."></input>
                            </div>
                        </div>
                        <div className="MWrap">
                            <div className="Mtitle">
                                Media
                            </div>
                            <div className="MradioWrap">
                                <input type="radio" id="MradioImgA" name="Mradio"></input>
                                <label htmlFor="MradioImgA">이미지 등록</label>
                                <input type="radio" id="MradioYoutubeA" name="Mradio"></input>
                                <label htmlFor="MradioYoutubeA">유튜브 링크</label>
                            </div>
                            <div className="MImgWrap">
                                <input className="upload-name" id="upload-name" placeholder="파일선택" disabled="disabled" />
                                <label htmlFor="ex_filenameA"><img src="/img/input_file_btn.png"></img></label>
                                <input className="MInputImg" id="ex_filenameA" type="file" accept="image/*" />
                            </div>
                            <div className="MYoutubeWrap">
                                <input className="youtube-linkA" type="text" id="youtube-link" placeholder="유튜브 링크를 입력하세요." />
                                <label htmlFor="youtube-linkA"><img src="/img/input_youtube_btn.png"></img></label>
                            </div>
                        </div>
                        <div className="TWrap">
                            <div className="Ttitle">
                                Team
                            </div>
                            <div className="TradioWrap">
                                <input type="radio" id="TradioSoloA" name="Tradio"></input>
                                <label htmlFor="TradioSoloA">개인전</label>
                                <input type="radio" id="TradioTeamA" name="Tradio"></input>
                                <label htmlFor="TradioTeamA">팀  전</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz_btnMenu">
                    <div className="addPage" onClick={addPages}>
                        + Page
                    </div>
                    <div className="quizTitle">
                        <input type="text" placeholder="퀴즈 제목을 입력해주세요." />
                    </div>
                    <div className="saveQuiz">
                        Save
                    </div>
                </div>
            </div>
        </div >
    );
}

// type 0 => OX 생존형
// type 1 => 객관식 개인전 // 선착순 3명 10 / 7 / 5 점
// type 2 => 객관식 팀전 // 전체 시간이 주어지고 스피드퀴즈
// type 3 => 주관식 개인전 // 선착순 3명 10 / 7 / 5 점
// type 4 => 주관식 팀전 // 전체 시간이 주어지고 스피드퀴즈

export default MakeQuiz;