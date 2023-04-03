import styled, {createGlobalStyle} from 'styled-components'
import BGImage from './images/background.jpg'


export const GlobalStyle = createGlobalStyle`
html {
  height:100%;
}
body {
  background-image:url(${BGImage});
  background-size:cover;
  margin:0;
  padding 0 20px;
  display:flex;
  justify-content:center;
}
*{
box-sizing:border-box;
font-family:'Catamaran', sans-serif;
}

`

export const QuestionCardStyle = styled.div`
.number {
  font-weight:bold;
  font-size: 1.5em;
}
.question{
  text-decoration:underline;
  font-size: 1.5em;
}
> div > div > button {
  border:none
  display:flex;
  padding: .25rem;
  width:100%
}

> div > div > button:hover {
  background-color:#CCCCCC;
}
}
`
export const Button = styled.button`
  font-size: 1.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


export const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
> p {
  color:#fff;
}
.score {
  color :#fff;
  font-size: 35px;
  background-color:#CCCCCC;
  padding: 1rem;

}

`