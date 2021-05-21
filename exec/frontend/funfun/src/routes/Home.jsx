import React, { useState, useEffect, Component } from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom"

import Slider from "react-slick";
import "./css/Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {

    render() {
        const settings = {
            dots: false,
            fade: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: true
        };

        return (
            <div className="main_contents">
                <div className="top_triangle">
                </div>
                <div className="bot_triangle">
                </div>
                <div className="left_side">
                    <h2>FUNFUN</h2>
                    <h3>퀴즈를 많은 사람들이<br /><span>FunFun</span>하게 즐길 수 있도록!</h3>
                    <div className="btnWrap">
                        <Link to="/game/goGame" className="GGBtn">
                            Go Game
                        </Link>
                    </div>
                </div>
                <div className="right_side">
                    <iframe className="youtube" src="https://www.youtube.com/embed/2_1kIEgSWsw?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                {/* <div className="slick_slider">
                    <div className="main_visual">
                        <Slider {...settings}>
                            <div className="slider1">
                                <div className="wid1200">
                                    <h3>퀴즈를 많은 사람들이<br /><span>FunFun</span>하게 즐길 수 있도록!</h3>
                                    <div className="btnWrap">
                                        <Link to="/" className="GGBtn">
                                            Go Game
                                        </Link>
                                    </div>
                                    <img src="/img/slider/bg1_2.png" />
                                </div>
                            </div>
                            <div className="slider2">
                            </div>
                        </Slider>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Home;