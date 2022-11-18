import axios from 'axios';
import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/card';
import { InfoInputContainer } from './components/infoCard';
import { PageTurnerButton, PageTurnerIcon } from './components/pageTurners';
import images from './imgs/index.jsx';

function App() {
  const [userName, setUserName] = useState(String);
  const [userType, setUserType] = useState(String);
  const [userPronouns, setUserPronouns] = useState(String);
  const [userMajor, setUserMajor] = useState(String);
  const [userPhone, setUserPhone] = useState(String);
  const [userEmail, setUserEmail] = useState(String);
  const [userURL, setUserURL] = useState(String);
  const [userLocation, setUserLocation] = useState(String);
  const [cardTheme, setCardTheme] = useState("blue" as string);

  const setCard = () => {
    const checkedTheme = (document.querySelector('input[name="card-theme"]:checked') as HTMLInputElement).value ;
    
    if(checkedTheme != null) {
      setCardTheme(checkedTheme);
    }
  };

  const printCard = async () => {

    fillUserInfo(userType);

    await new Promise(r => setTimeout(r, 1000));

    (document.getElementById("card") as HTMLElement).style.display = 'flex'  

    html2canvas((document.querySelector("#card") as HTMLElement), {scale: 2}).then(canvas => {
      document.body.appendChild(canvas)
    });

    (document.getElementById("card") as HTMLElement).style.display = 'none' 
  };

  const scanQR = () => {
    const qrCodeSubmit = document.getElementById("qr-code-submit") as HTMLInputElement;
    const qrCode = qrCodeSubmit.files![0];
    if (!qrCode) {
      return;
    }

    QrScanner.scanImage(qrCode, { returnDetailedScanResult: true })
    .then(result => result.data.slice(-14))
    .then(result => 
      axios.get(`https://www.sistemas.ufu.br/valida-gateway/id-digital/buscarDadosIdDigital?idIdentidade=${result}`) 
      .then(response => response.data.identidadeDigital)
      .then((response) => {
        setUserType(response.vinculo);

        const fullName = response.nome.split(" ");
        const nameSurname = fullName[0] + " " + fullName[1];
        setUserName(nameSurname);  

        if(response.vinculo == "aluno"){
          const userMajorFull = response.informacao.split(" ");
          const userMajorGraduation = userMajorFull[2] + " " + userMajorFull[3] + " " + userMajorFull[4].replace(":", "");
          setUserMajor(userMajorGraduation);
        }
        

      })
      .catch(function (error) {
        console.log(error);
      })
    )
    .catch(e => console.log('No QR code found.'));
  };

  const fillUserInfo = (type: string) => {
    
    const checkedPronouns = (document.querySelector('input[name="user-gender"]:checked') as HTMLInputElement).value;
    const inputEmail = (document.querySelector('input[name="user-email"]') as HTMLInputElement).value;
    const inputPhone = (document.querySelector('input[name="user-phone"]') as HTMLInputElement).value;

    if(type == "aluno") {
      const checkedLocation = (document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value;

      setUserType("Alun") 
      setUserPronouns(checkedPronouns);
      setUserLocation(checkedLocation);
    }
    else if(type == "docente"){
      const teacherLocation = (document.querySelector('input[name="teacher-room"]') as HTMLInputElement).value + " - " + (document.querySelector('input[name="teacher-location"]:checked') as HTMLInputElement).value;
      const teacherFaculty = (document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement).value;
      setUserType("Professor") 
      
      if(checkedPronouns == "o"){
        setUserPronouns("")
      } 
      else {
        setUserPronouns(checkedPronouns)
      };

      setUserType("Professor") 
      setUserLocation(teacherLocation);
      setUserMajor(teacherFaculty)
    }

    setUserEmail(inputEmail);
    setUserPhone(inputPhone);
    setUserURL("www.ufu.com.br");
  };

  const previousPage = (index: number) => {
    if(index > 0){
      (document.querySelector('#main-container')?.childNodes[(index - 1)] as HTMLElement).style.display = 'flex';
      (document.querySelector('#main-container')?.childNodes[(index)] as HTMLElement).style.display = 'none';
    }
  }

  const nextPage = (index: number) => {
    if(index < (( Number(document.querySelector('#main-container')?.childNodes.length as Number)) - 1) ) {
      (document.querySelector('#main-container')?.childNodes[(index + 1)] as HTMLElement).style.display = 'flex';
      (document.querySelector('#main-container')?.childNodes[(index)] as HTMLElement).style.display = 'none';
    }
  }

  document.body.onload = () => { document.querySelector('#main-container')?.childNodes.forEach( (element: any, index) => { if(index > 0) {element.style.display = "none"; }}); };

  useEffect(() => {
    const cardThemePickers = document.querySelectorAll('input[name="card-theme"]');
    cardThemePickers.forEach( element => element.addEventListener('click', setCard) )

    const qrInput = document.getElementById("qr-code-submit");
    (qrInput as HTMLInputElement).onchange = () => {  
      scanQR();
    }

    (document.getElementById("card") as HTMLElement).style.display = 'none';  

    const printButton = document.getElementById("print-button");
    (printButton as HTMLInputElement).onclick = () => { printCard() };

    const previousPageButton = document.querySelectorAll('#previous-page');
    previousPageButton.forEach( (element, index) => {(element as HTMLButtonElement).onclick = () => { previousPage((index + 1));}});
    
    const nextPageButton = document.querySelectorAll('#next-page');
    nextPageButton.forEach( (element, index) => {(element as HTMLButtonElement).onclick = () => { nextPage(index);}});

  });


  return (
    <>
      <div id='main-container'>
      <InfoInputContainer id='user-type-picker' >
            <div className="info-card"><input type="radio" name="user-type" id="student-teacher-type" value="student-teacher" /><label htmlFor="student-teacher-type"><img src={images[0]} alt="" /></label></div>
            <div className="info-card"><input type="radio" name="user-type" id="other-type" value="other" /><label htmlFor="other-type"><img src={images[1]} alt="" /></label></div>
            <div id='page-button'><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer>
          <input type="file" id="qr-code-submit" name="" />
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>
        
        <InfoInputContainer id='teacher-faculty-container'>
          <div className='info-type-container'><img src={images[4]} alt="" /><input type="text" name="teacher-faculty" id="teacher-faculty" placeholder='Ex: FACOM' /></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer id='user-pronouns-picker'>
          <div className="info-card"><input type="radio" name="user-gender" id="male-gender" value="o" /><label htmlFor="male-gender"><img src={images[5]} /></label></div>
          <div className="info-card"><input type="radio" name="user-gender" id="female-gender" value="a" /><label htmlFor="female-gender"><img src={images[6]} alt="" /></label></div>
          <div className="info-card"><input type="radio" name="user-gender" id="other-gender" value="e" /><label htmlFor="other-gender"><img src={images[7]} alt="" /></label></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer>
          <div className='info-type-container'><img src={images[8]} alt="" /><input type="email" name="user-email" id="user-email" placeholder='Ex: aluno@ufu.br' /></div>
          <div className='info-type-container'><img src={images[9]} alt="" /><input type="tel" name="user-phone" id="user-phone" placeholder='Ex: (34) 3810-1010' /></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>
        
        <InfoInputContainer id='user-location-container'>
          <div className="info-card"><input type="radio" name="user-location" id="araras-campus" value="Monte Carmelo - Unidades Araras" /><label htmlFor="araras-campus">Monte Carmelo - Araras</label></div>
          <div className="info-card"><input type="radio" name="user-location" id="boa-vista-campus" value="Monte Carmelo - Unidades Boa Vista" /><label htmlFor="boa-vista-campus">Monte Carmelo - Boa Vista</label></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer id='teacher-location-container'>
          <div className="info-card"><input type="radio" name="teacher-location" id="araras-campus-teacher" value="Monte Carmelo - Unidades Araras" /><label htmlFor="araras-campus-teacher">Monte Carmelo - Araras</label></div>
          <div className="info-card"><input type="radio" name="teacher-location" id="boa-vista-campus-teacher" value="Monte Carmelo - Unidades Boa Vista" /><label htmlFor="boa-vista-campus-teacher">Monte Carmelo - Boa Vista</label></div>
          <div className="info-card"><input type="text" name="teacher-room" placeholder='Ex: A201' /></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer id='card-theme-picker'>
          <div className="info-card"><input type="radio" name="card-theme" id="blue-theme" value="blue" /><label htmlFor="blue-theme">Blue</label></div>
          <div className="info-card"><input type="radio" name="card-theme" id="white-theme" value="white" /><label htmlFor="white-theme">White</label></div>
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton><PageTurnerButton className='off' id='next-page'><PageTurnerIcon src={images[3]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>

        <InfoInputContainer>
          <input type="button" value="print" id="print-button" />
          <div id='page-button'><PageTurnerButton id='previous-page'><PageTurnerIcon src={images[2]} alt="" /></PageTurnerButton></div>
        </InfoInputContainer>
        
      </div>

      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App