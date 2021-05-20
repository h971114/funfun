import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom"
import axios from "axios"

function MakeQuiz({ history }) {
    const [member_no, setMemberNo] = useState(1);
    const [roomtit, setRoomtit] = useState('임시 저장');
    const [roomcode, setRoomCode] = useState('');
    const [page, setPage] = useState(1);
    const [nowpage, setNowPage] = useState(1);

    const [quiztype, setQuiztype] = useState(99);
    const [OXon, setOXon] = useState(false);
    const [Choiceon, setChoiceon] = useState(false);
    const [Answeron, setAnsweron] = useState(false);

    const [quiztit, setQuiztit] = useState("문제를 입력해주세요.");

    const [c1, setC1] = useState("1번 보기입니다.");
    const [c2, setC2] = useState("2번 보기입니다.");
    const [c3, setC3] = useState("3번 보기입니다.");
    const [c4, setC4] = useState("4번 보기입니다.");
    const [c5, setC5] = useState("5번 보기입니다.");

    const [answer, setAnswer] = useState("");

    const [quizset, setQuizset] = useState([{
        Sorder: 0,
        Squiztitle: quiztit,
        Squiztype: quiztype,
        SC1: c1,
        SC2: c2,
        SC3: c3,
        SC4: c4,
        SC5: c5,
        SChoice: null,
        SAnswer: answer,
        Sromm: roomcode
    }])
    const quizs = [{}];

    useEffect(() => {
        var memberid = sessionStorage.getItem('id');
        axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/room/make/quiz/temp`, {
            memberid: memberid,
            quiz_title: roomtit
        }).then(res => {
            // // console.log(res);
            setRoomCode(res.data);
        })
    }, []);

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
                    <div className="quizBtn" id={"quizBtn_" + i}>
                        <div className="quizType" id={"quizType_" + i} onClick={quizChange}>
                            [미선택]
                        </div>
                        <div className="quizContents" id={"quizContents_" + i} onClick={quizChange}>
                            문제를 입력해주세요...
                        </div>
                        <div className="quizDelete">
                            <img src="/img/delete.png" id={"quizDelBtn_" + i} onClick={removePages} />
                        </div>
                    </div>
                </li>
            );
        }
        return result;
    };

    var QInputArr = document.getElementsByClassName("QInput");
    var ChoiceArr = document.getElementsByClassName("ChoiceInput");
    var radioBtnArr = document.getElementsByClassName("radioBtn");

    const selectOX = () => {
        setQuiztype(0);
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
        for (var i = 0; i < radioBtnArr.length; i++) {
            radioBtnArr[i].checked = false;
        }
        // quizset[nowpage].Squiztype = 1;
        // console.log("nowpage : " + nowpage);
        console.log("quiztype : " + quiztype);
        document.getElementById("quizType_" + nowpage).innerHTML = "[OX퀴즈]";
    }

    const selectChoice = () => {
        setQuiztype(1);
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
        for (var i = 0; i < radioBtnArr.length; i++) {
            radioBtnArr[i].checked = false;
        }
        console.log("quiztype : " + quiztype);
        document.getElementById("quizType_" + nowpage).innerHTML = "[객관식]";
    }

    const selectAnswer = () => {
        setQuiztype(3);
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
        for (var i = 0; i < radioBtnArr.length; i++) {
            radioBtnArr[i].checked = false;
        }
        console.log("quiztype : " + quiztype);
        document.getElementById("quizType_" + nowpage).innerHTML = "[주관식]";
    }

    const logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
    }

    const addPages = () => {
        console.log("quiztype : " + quiztype);
        var quiz = {
            Sorder: Number(nowpage),
            Squiztitle: quiztit,
            Squiztype: quiztype,
            SC1: c1,
            SC2: c2,
            SC3: c3,
            SC4: c4,
            SC5: c5,
            SChoice: null,
            SAnswer: answer,
            Sromm: roomcode
        }
        quizset[nowpage] = quiz;
        setPage(page + 1);
        setNowPage(page + 1);
        setOXon(false);
        setChoiceon(false);
        setAnsweron(false);
        setQuiztype(99);
        setQuiztit("문제를 입력해주세요.");
        setC1("1번 보기입니다.");
        setC2("2번 보기입니다.");
        setC3("3번 보기입니다.");
        setC4("4번 보기입니다.");
        setC5("5번 보기입니다.");
        setAnswer("");
        // console.log(page);
        // console.log(nowpage);
        var quiz = {
            Sorder: quizset.length,
            Squiztitle: quiztit,
            Squiztype: 99,
            SC1: c1,
            SC2: c2,
            SC3: c3,
            SC4: c4,
            SC5: c5,
            SChoice: null,
            SAnswer: answer,
            Sromm: roomcode
        }
        // quizs = quizs.concat(quiz);
        setQuizset(quizset.concat(quiz));
        console.log(quizset);
        console.log(quiz);

        for (var i = 0; i < radioBtnArr.length; i++) {
            radioBtnArr[i].checked = false;
        }

        for (let i = 0; i < quizset.length; i++) {
            // console.log("[추가] " + i + " : " + quizset[i].Squiztype);
        }
        console.log("----------");
    }
    const removePages = (e) => {
        var order = e.target.id;
        order = order.charAt(order.length - 1);
        // order = order - 1;
        var totlength = quizset.length;
        var deleteidx = 0;
        // console.log("order : " + order);
        // console.log(quizset.length);
        if (page > 1) {
            setPage(page - 1);
            setNowPage(page - 1);
            for (var i = 0; i < totlength; i++) {
                if (quizset[i].Sorder == order) {
                    quizset[i].Sorder = 99;
                }
                else if (quizset[i].Sorder > order) {
                    quizset[i].Sorder = quizset[i].Sorder - 1;
                    var type = quizset[i].Squiztype;
                    console.log("i : " + (i - 1) + " ::" + type);
                    var typeTxt = "";
                    if (type == 0) {
                        typeTxt = "[OX퀴즈]";
                    } else if (type == 1 || type == 2) {
                        typeTxt = "[객관식]";
                    } else if (type == 3 || type == 4) {
                        typeTxt = "[주관식]";
                    } else {
                        typeTxt = "[미선택]";
                    }
                    document.getElementById("quizType_" + (i - 1)).innerHTML = typeTxt;
                }
            }
            sortArr();
            quizset.pop();
            console.log(quizset);
            totlength = quizset.length;
        }
        else {
            alert("최소 한페이지는 존재해야합니다.");
        }
    }
    const sortArr = () => {
        quizset.sort(function (a, b) {
            return a["Sorder"] - b["Sorder"];
        });
    }

    const QinputChange = (e) => {
        var qInput = "문제를 입력해주세요";
        if (e.target.value === "") {
            setQuiztit("문제를 입력해주세요.");
        }
        else {
            qInput = e.target.value;
            setQuiztit(qInput);
        }
        var qtit = qInput;
        if (qtit.length < 10) {
        } else {
            qtit = qtit.substr(0, 10);
        }
        qtit = qtit + "...";
        document.getElementById('quizContents_' + nowpage).innerHTML = qtit;
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

    const quizChange = (e) => {
        console.log("quiztype : " + quiztype);
        var order = e.target.id;
        order = order.charAt(order.length - 1);
        console.log(order);
        console.log(nowpage);
        const quiz = {
            Sorder: Number(nowpage),
            Squiztitle: quiztit,
            Squiztype: quiztype,
            SC1: c1,
            SC2: c2,
            SC3: c3,
            SC4: c4,
            SC5: c5,
            SChoice: null,
            SAnswer: answer,
            Sromm: roomcode
        }
        console.log("nowpage : " + nowpage + " :: type : " + quiztype);
        if (nowpage == order) {
        }
        else {
            quizset[nowpage] = quiz;
            var type = quizset[nowpage].Squiztype;
            if (type == 0) {
                typeTxt = "[OX퀴즈]";
            } else if (type == 1 || type == 2) {
                typeTxt = "[객관식]";
            } else if (type == 3 || type == 4) {
                typeTxt = "[주관식]";
            } else {
                typeTxt = "[미선택]";
            }
            document.getElementById("quizType_" + nowpage).innerHTML = typeTxt;
            setNowPage(order);
            var type = quizset[order].Squiztype;
            var Squiztitle = quizset[order].Squiztitle;
            var SC1 = quizset[order].SC1;
            var SC2 = quizset[order].SC2;
            var SC3 = quizset[order].SC3;
            var SC4 = quizset[order].SC4;
            var SC5 = quizset[order].SC5;
            var SAnswer = quizset[order].SAnswer;
            var typeTxt = "";
            // console.log(order + " : " + type);
            setQuiztype(type);
            console.log("order : " + order + " :: type : " + type);
            if (type == 0) {
                setOXon(true);
                setChoiceon(false);
                setAnsweron(false);
                document.getElementById("oxQInput").value = Squiztitle;
                if (SAnswer == "X") {
                    document.getElementById("Xradio").checked = true;
                } else if (SAnswer == "O") {
                    document.getElementById("Oradio").checked = true;
                }
            } else if (type == 1 || type == 2) {
                setOXon(false);
                setChoiceon(true);
                setAnsweron(false);
                document.getElementById("choiceQInput").value = Squiztitle;
                document.getElementById("C1Input").value = SC1;
                document.getElementById("C2Input").value = SC2;
                document.getElementById("C3Input").value = SC3;
                document.getElementById("C4Input").value = SC4;
                document.getElementById("C5Input").value = SC5;
                if (SAnswer == "1") {
                    document.getElementById("C1").checked = true;
                } else if (SAnswer == "2") {
                    document.getElementById("C2").checked = true;
                } else if (SAnswer == "3") {
                    document.getElementById("C3").checked = true;
                } else if (SAnswer == "4") {
                    document.getElementById("C4").checked = true;
                } else if (SAnswer == "5") {
                    document.getElementById("C5").checked = true;
                }
            } else if (type == 3 || type == 4) {
                setOXon(false);
                setChoiceon(false);
                setAnsweron(true);
                document.getElementById("answerQInput").value = Squiztitle;
            } else {
                setOXon(false);
                setChoiceon(false);
                setAnsweron(false);
            }
        }
        for (let i = 0; i < quizset.length; i++) {
            console.log("[다른거 클릭] " + i + " : " + quizset[i].Squiztype);
        }
        console.log("----------");

        // console.log("order : " + order);
        // console.log("quiztit : " + quiztit);
        // console.log("quiztype : " + quiztype);
        // console.log("c1 : " + c1);
        // console.log("c2 : " + c2);
        // console.log("c3 : " + c3);
        // console.log("c4 : " + c4);
        // console.log("c5 : " + c5);
        // console.log("answer : " + answer);
        // console.log("roomcode : " + roomcode);



        // quizs = quizs.concat(quiz);
        // setQuizset(quizs.concat(quiz));

        // // setQuizset(quizs.concat(quiz));

        // // console.log(quiz);
    }


    // @Id @GeneratedValue
    // @Column(name = "room_no")
    // private int room_no;
    // @Column(name = "room_code")
    // private String code;
    // @Column(name = "room_member_no")
    // private int member_no;
    // @Column(name = "room_team_cnt")
    // private int team_cnt;
    // @Column(name ="room_quiz_cnt")
    // private int quiz_cnt;
    // @Column(name ="quiz_title")
    // private String quiz_title;
    // @Column(name ="quiz_date")
    // private String quiz_date;

    const OXRadio = (e) => {
        setAnswer("");
        var OXAnswer = e.target.id;
        OXAnswer = OXAnswer.charAt(0);
        // // console.log(OXAnswer);
        setAnswer(OXAnswer);
    }

    const ChoiceChange = (e) => {
        setAnswer("");
        var choiceAnswer = e.target.id;
        choiceAnswer = choiceAnswer.charAt(choiceAnswer.length - 1);
        // // console.log(choiceAnswer);
        setAnswer(choiceAnswer);
    }

    const AnswerChange = (e) => {
        setAnswer("");
        // // console.log(e.target.value);
        setAnswer(e.target.value);
    }

    const teamSet = (e) => {
        // console.log(e.target.id);
        var teamset = e.target.id;
        teamset = teamset.charAt(teamset.length - 1);
        if (teamset === "T") {
            if (quiztype % 2 === 1) {
                setQuiztype(quiztype + 1);
            }
        }
        else if (teamset === "S") {
            if (quiztype % 2 !== 1) {
                setQuiztype(quiztype - 1);
            }
        }
    }

    const quiztitChange = (e) => {
        setRoomtit(e.target.value);
    }


    const lastSave = () => {
        var memberid = sessionStorage.getItem('id');
        var memberno = 13;

        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/byid/${memberid}`, {
            id: memberid
        }).then(res => {
            setMemberNo(res.data.member_no);
            memberno = res.data.member_no;
            console.log(memberno);
        });

        var answerCnt = 0;
        var typeCnt = 0;
        var go = false;

        if (page == 1) {
            if (quiztit == "문제를 입력해주세요.") {
                alert("완성되지 않은 문제가 있습니다. 확인해주세요");
            } else if (quiztype == 99) {
                alert("완성되지 않은 문제가 있습니다. 확인해주세요");
            } else if (answer == "") {
                alert("완성되지 않은 문제가 있습니다. 확인해주세요");
            }
            else {
                axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/quiz`, {
                    memberno: memberno,
                    order: nowpage - 1,
                    content: quiztit,
                    type: quiztype,
                    exam1: c1,
                    exam2: c2,
                    exam3: c3,
                    exam4: c4,
                    exam5: c5,
                    answer: answer,
                    room_no: roomcode
                }).then(res => {
                    alert("문제 등록이 완료 되었습니다.");

                    history.push('/myquiz');
                });
            }
        }
        else {
            for (let i = 1; i < quizset.length; i++) {
                if (quizset[i].SAnswer === "") {
                    answerCnt++;
                }
                if (quizset[i].Squiztype == 99) {
                    typeCnt++;
                }
            }

            if (typeCnt == 1) {
                console.log(nowpage);
                quizset[nowpage].Sorder = nowpage;
                quizset[nowpage].Squiztitle = quiztit;
                quizset[nowpage].Squiztype = quiztype;
                quizset[nowpage].SC1 = c1;
                quizset[nowpage].SC2 = c2;
                quizset[nowpage].SC3 = c3;
                quizset[nowpage].SC4 = c4;
                quizset[nowpage].SC5 = c5;
                quizset[nowpage].SAnswer = answer;
                go = true;
            }
            else if (typeCnt >= 1) {
                alert("완성되지 않은 문제가 있습니다. 확인해주세요");
            }
            else if (answerCnt > 1) {
                alert("정답을 입력하지 않은 문제가 있습니다. 확인해주세요");
            } else if (answerCnt == 1) {
                quizset[nowpage].Sorder = nowpage;
                quizset[nowpage].Squiztitle = quiztit;
                quizset[nowpage].Squiztype = quiztype;
                quizset[nowpage].SC1 = c1;
                quizset[nowpage].SC2 = c2;
                quizset[nowpage].SC3 = c3;
                quizset[nowpage].SC4 = c4;
                quizset[nowpage].SC5 = c5;
                quizset[nowpage].SAnswer = answer;
                go = true;
            }

            if (go) {
                axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/room/`, {
                    // memberid: memberid,
                    code: roomcode,
                    quiz_cnt: quizset.length,
                    quiz_title: roomtit
                }).then(res => {
                    console.log("asdf");
                })
                for (let i = 1; i < quizset.length; i++) {
                    var sorder = quizset[i].Sorder - 1;
                    var tit = quizset[i].Squiztitle;
                    var type = quizset[i].Squiztype;
                    var sc1 = quizset[i].SC1;
                    var sc2 = quizset[i].SC2;
                    var sc3 = quizset[i].SC3;
                    var sc4 = quizset[i].SC4;
                    var sc5 = quizset[i].SC5;
                    var answers = quizset[i].SAnswer;

                    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/quiz`, {
                        memberno: memberno,
                        order: sorder,
                        content: tit,
                        type: type,
                        exam1: sc1,
                        exam2: sc2,
                        exam3: sc3,
                        exam4: sc4,
                        exam5: sc5,
                        answer: answers,
                        room_no: roomcode
                    }).then(res => {
                        // console.log(res);
                    });
                }
                alert("문제 등록이 되었습니다.");
                history.push('/myquiz');
            }
        }

        // console.log(quizset);
        // console.log(quizset.length);


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
                        <a onClick={logout} className="btn login" href="">로그아웃</a>
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
                {/* {previewRendering()} */}
                <div className="quiz_preview">
                    <div className={"previews type_ox" + (OXon ? '' : ' hidden')}>
                        <div className="space">

                        </div>
                        <div className="boxes">
                            <div className="ox_frame">
                                <div className="quiz_wrap">
                                    <div className="quiz_title">
                                        <pre>{quiztit}</pre>
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
                                        <pre>{quiztit}</pre>
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
                                        <pre>{quiztit}</pre>
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
                            <textarea className="QInput" id="oxQInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <input className="radioBtn" type="radio" name="answerOX" id="Oradio" onClick={OXRadio}></input>
                                <label htmlFor="Oradio"><img src="/img/O.png" /></label>
                                <input className="radioBtn" type="radio" name="answerOX" id="Xradio" onClick={OXRadio}></input>
                                <label htmlFor="Xradio"><img src="/img/X.png" /></label>
                            </div>
                        </div>

                    </div>

                    <div className={"choiceWrap" + (Choiceon ? '' : ' hidden')}>
                        <div className="QWrap">
                            <div className="Qtitle">
                                Question
                            </div>
                            <textarea className="QInput" id="choiceQInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <ul>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice radioBtn" id="C1" onChange={ChoiceChange}></input>
                                        1. <input type="text" className="ChoiceInput" placeholder="1번 보기입니다." id="C1Input" onChange={C1Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice radioBtn" id="C2" onChange={ChoiceChange}></input>
                                        2. <input type="text" className="ChoiceInput" placeholder="2번 보기입니다." id="C2Input" onChange={C2Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice radioBtn" id="C3" onChange={ChoiceChange}></input>
                                        3. <input type="text" className="ChoiceInput" placeholder="3번 보기입니다." id="C3Input" onChange={C3Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice radioBtn" id="C4" onChange={ChoiceChange}></input>
                                        4. <input type="text" className="ChoiceInput" placeholder="4번 보기입니다." id="C4Input" onChange={C4Change}></input>
                                    </li>
                                    <li>
                                        <input type="radio" name="answerChoice" className="answerChoice radioBtn" id="C5" onChange={ChoiceChange}></input>
                                        5. <input type="text" className="ChoiceInput" placeholder="5번 보기입니다." id="C5Input" onChange={C5Change}></input>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="TWrap">
                            <div className="Ttitle">
                                Team
                            </div>
                            <div className="TradioWrap">
                                <input type="radio" id="TradioSoloCS" className="radioBtn" name="Tradio" onClick={teamSet}></input>
                                <label htmlFor="TradioSoloCS">개인전</label>
                                <input type="radio" id="TradioTeamCT" className="radioBtn" name="Tradio" onClick={teamSet}></input>
                                <label htmlFor="TradioTeamCT">팀  전</label>
                            </div>
                        </div>
                    </div>

                    <div className={"answerWrap" + (Answeron ? '' : ' hidden')}>
                        <div className="QWrap">
                            <div className="Qtitle">
                                Question
                            </div>
                            <textarea className="QInput" id="answerQInput" placeholder="내용을 입력해주세요." onChange={QinputChange}></textarea>
                        </div>
                        <div className="AWrap">
                            <div className="Atitle">
                                Answer
                            </div>
                            <div className="AradioWrap">
                                <input className="AanswerWrap" type="text" placeholder="정답을 입력해주세요." onChange={AnswerChange}></input>
                            </div>
                        </div>
                        <div className="TWrap">
                            <div className="Ttitle">
                                Team
                            </div>
                            <div className="TradioWrap">
                                <input type="radio" id="TradioSoloAS" name="Tradio" className="radioBtn" onClick={teamSet}></input>
                                <label htmlFor="TradioSoloAS">개인전</label>
                                <input type="radio" id="TradioTeamAT" name="Tradio" className="radioBtn" onClick={teamSet}></input>
                                <label htmlFor="TradioTeamAT">팀  전</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz_btnMenu">
                    <div className="addPage" onClick={addPages}>
                        + Page
                    </div>
                    <div className="quizTitle">
                        <input type="text" placeholder="퀴즈 제목을 입력해주세요." onChange={quiztitChange} />
                    </div>
                    <div className="saveQuiz" onClick={lastSave}>
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