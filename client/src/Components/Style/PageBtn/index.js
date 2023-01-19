import styled from 'styled-components';

/** 페이지네이션을 구현했을 시 사용할 버튼 css 입니다 */
export const PageBtn = styled.li`
    display: inline;
    list-style: none;
    padding: 5px 10px;
    border: 1px solid rgb(193, 195, 197);
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? 'none' : null)};
    :hover {
        background-color: rgb(159, 207, 243);
    }
`;

/** 페이지네이션을 구현했을 시 사용할 버튼들을 감싸는 ul태그 css 입니다 */
export const PageList = styled.ul`
    display: flex;
    margin-top: 40px;
    .active {
        background-color: #f48225;
        color: white;
    }
`;
