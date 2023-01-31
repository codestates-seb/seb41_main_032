import styled from 'styled-components';
import loadingImg from '../../Img/loading.gif';

const LoadingView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    img {
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
    }
`;

export const Loading = () => {
    return (
        <LoadingView>
            <img src={loadingImg} alt="Loading..." />
        </LoadingView>
    );
};

export default Loading;
