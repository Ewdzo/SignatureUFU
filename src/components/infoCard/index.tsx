import styled from "styled-components";


export const InfoInputContainer = styled.div`
min-height: 500px;
height: 90vh;
min-width: 1500px; 
width: 80vw;

display: flex;
justify-content: center;
align-items: center;

border: solid black 1px;
padding: 10px;
border-radius: 2%;

background-color: #F5F5F5;

position: relative;
scroll-snap-align: start;
`

export const InfoCard = styled.div`
width: 40%;
min-height: 80%;

margin: 5%;
border: solid grey 5px;
border-radius: 2%;


display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InfoCardImage = styled.img`
height: 250px;
`