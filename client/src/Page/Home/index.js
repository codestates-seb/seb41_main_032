import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import background from './img/background.png';

const Main = styled.main`
    background: url(${background}) fixed;
    color: #fff;
    font-weight: 700px;

    header {
        text-align: center;
        padding-top: 00px;
        h1 {
            font-size: 3em;
        }
    }

    .cards {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: center;
    }

    .card {
        font-size: 2em;
        margin: 100px 10px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .startBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
        padding-bottom: 400px;
        button {
            padding: 10px 20px;
            border-radius: 15px;
            border: 1px solid gray;
            margin-right: 10px;
            cursor: pointer;
            font-weight: 600;
            color: #fff;
            background-color: #f48225;

            :hover {
                transform: scale(1.1);
            }
        }
    }
`;

const Home = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <Main>
            <header>
                <h1 data-aos="flip-down" data-aos-duration="1000">
                    시가총액 32조
                </h1>
            </header>
            <div class="cards">
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식이 처음이신가요?
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식으로 손해를 본적이 있으신가요?
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식매매가 두려우신가요?
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    그래서 준비했습니다
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    저희는 계좌계설 필요없이 회원가입만 하면
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    모의투자를 위한 1000만원을 지원해드립니다
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    가상의 돈으로 마음껏 매매를 해보세요
                </div>
                <div class="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    모의 투자로 자신감과 경험을 얻으시면 그때 진짜 실전투자를 하세요!
                </div>
                <div class="startBtn" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    <Link to="/stock/top">
                        <button> 시작하기 </button>
                    </Link>
                </div>
            </div>
        </Main>
    );
};
export default Home;
