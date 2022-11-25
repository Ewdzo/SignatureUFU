import styled from "styled-components";


export const InfoInputContainer = styled.div`
height: 80vh; 
min-width: 80vw;

display: flex;
justify-content: center;
align-items: center;

border: solid black 1px;
padding: 10px;
border-radius: 11px;

background-color: #F5F5F5;

position: relative;
scroll-snap-align: center;

margin: 0 10vw;
`

export const InfoCard = styled.div`
width: 40%;
height: 30%;

margin: 2%;
border: solid grey 5px;
border-radius: 2%;


display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InfoCardImage = styled.img`
height: 20vw;
max-height: 200px;
`