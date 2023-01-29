import styled from 'styled-components';
import white from '../Img/Help/white.png';
import black from '../Img/Help/black.png';
const QuestionMarkImg = styled.img`
    margin-left: 5px;
`;

/**
 * @param {String} color 'white' or 'black'
 */
const QuestionMark = ({ color = 'black' }) => <QuestionMarkImg src={color === 'white' ? white : black} alt="tooltip" />;

export default QuestionMark;
