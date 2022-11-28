import styled from "styled-components";

export const InfoInputContainer = styled.div`
height: 80vh; 
min-width: 85vw;

display: flex;
justify-content: center;
align-items: center;

border: solid #0C0C0C 1px;
padding: 10px;
border-radius: 11px;

background-color: #F5F5F5;

position: relative;
scroll-snap-align: center;

margin: 0 10vw;
`

export const InfoCard = styled.div`
width: 50%;
height: 50%;

margin: 2%;
border: solid #0C0C0C 0.5vh;
border-radius: 1vh;


display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InfoCardImage = styled.img`
height: 20vw;
max-height: 200px;
`

export const InfoInputText = styled.input`
background: none;    
text-align: center;    

border: 0;
border-bottom: solid 0.2vh #0C0C0C;

font-size: 1.2vh;
margin: 0.5vh 0;
`