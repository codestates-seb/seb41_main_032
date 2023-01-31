import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
    background: rgb(232, 203, 192);
    background: linear-gradient(0deg, rgba(232, 203, 192, 1) 0%, rgba(99, 111, 164, 1) 100%);
    color: #fff;
    font-weight: 700px;
    text-shadow: 1px 1px 1px black;

    header {
        text-align: center;
        padding-top: 200px;
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
        <Container>
            <header>
                <h1 data-aos="flip-down" data-aos-duration="1000">
                    시가총액 32조
                </h1>
            </header>
            <ol className="cards">
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식이 처음이신가요?
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식으로 손해를 본적이 있으신가요?
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    주식매매가 두려우신가요?
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    그래서 준비했습니다
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    저희는 계좌계설 필요없이 회원가입만 하면
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    모의투자를 위한 1000만원을 지원해드립니다
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    가상의 돈으로 마음껏 매매를 해보세요
                </li>
                <li className="card" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    모의 투자로 자신감과 경험을 얻으세요
                </li>
                <li className="startBtn" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                    <Link to="/stock/top">
                        <button> 시작하기 </button>
                    </Link>
                </li>
            </ol>
        </Container>
    );
};
export default Home;
