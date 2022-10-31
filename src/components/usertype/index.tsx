import styled from "styled-components";

const InfoInputContainer = styled.div`
min-height: 500px;
width: 80%;

display: flex;
justify-content: center;
align-items: center;

border: solid black 1px;
padding: 10px;
border-radius: 2%;

position: relative;
`

export function TypePicker() {

    return (
        <InfoInputContainer id='user-type-picker' >
            <div className="info-card"><input type="radio" name="user-type" id="student-teacher-type" value="student-teacher" /><label htmlFor="student-teacher-type"><img src="./src/imgs/student-fill.svg" alt="" /></label></div>
            <div className="info-card"><input type="radio" name="user-type" id="other-type" value="other" /><label htmlFor="other-type"><img src="./src/imgs/user-gear-fill.svg" alt="" /></label></div>
            <div id='page-button'><button id='previous-page'><img src="./src/imgs/arrow-circle-left-fill.svg" alt="" /></button><button id='next-page'><img src="./src/imgs/arrow-circle-right-fill.svg" alt="" /></button></div>
        </InfoInputContainer>
    )
}