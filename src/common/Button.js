import styled from 'styled-components';
import { COLOR, FONT_WEIGHT, FONT_SIZE } from '../global.styles';

const Button = styled.button`
  color: ${COLOR.MAIN.MINT};
  background-color: ${COLOR.MAIN.WHITE};
  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: ${FONT_SIZE.SMALL};
  border: 0;
  widht: 100%;
`;

export default Button;
