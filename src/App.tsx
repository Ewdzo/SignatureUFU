import './App.css'
import axios from 'axios';
import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import images from './imgs/index.jsx';
import { useEffect, useState } from 'react';
import { Card } from './components/card';
import { InfoRadioButton } from './components/infoRadioButton';
import { PageTurnerButton, PageTurnerIcon } from './components/pageTurners';
import { InfoCard, InfoCardImage, InfoInputContainer } from './components/infoCard';

function App() {
  const [userName, setUserName] = useState(String);
  const [userType, setUserType] = useState(String);
  const [userPronouns, setUserPronouns] = useState(String);
  const [userMajor, setUserMajor] = useState(String);
  const [userPhone, setUserPhone] = useState(String);
  const [userEmail, setUserEmail] = useState(String);
  const [userURL, setUserURL] = useState("www.ufu.com.br");
  const [userLocation, setUserLocation] = useState(String);
  const [cardTheme, setCardTheme] = useState("blue" as string);

  const printCard = async () => {

    await new Promise(r => setTimeout(r, 1000));

    (document.getElementById("card") as HTMLElement).style.display = 'flex'  

    html2canvas((document.querySelector("#card") as HTMLElement), {scale: 2}).then(canvas => {
      document.body.appendChild(canvas)
    });

    (document.getElementById("card") as HTMLElement).style.display = 'none' 
  };

  const scanQRInput = (qrInput: HTMLInputElement) => {
    const qrCode = qrInput.files![0];
    if (!qrCode) {
      return;
    }

    QrScanner.scanImage(qrCode, { returnDetailedScanResult: true })
    .then(result => result.data.slice(-14))
    .then(result => 
      axios.get(`https://www.sistemas.ufu.br/valida-gateway/id-digital/buscarDadosIdDigital?idIdentidade=${result}`) 
      .then(response => response.data.identidadeDigital)
      .then((response) => {
        if(response.vinculo == "aluno"){
          const userMajorFull = response.informacao.split(" ");
          const userMajorGraduation = userMajorFull[2] + " " + userMajorFull[3] + " " + userMajorFull[4].replace(":", "");
          setUserMajor(userMajorGraduation);
          setUserType("Alun");
        }
        else {
          setUserType("Professor");
        }

        const fullName = response.nome.split(" ");
        const nameSurname = fullName[0] + " " + fullName[1];
        setUserName(nameSurname);  

      })
      .catch(function (error) {
        console.log(error);
      })
    )
    .catch(e => console.log('No QR code found.'));
  };

  useEffect(() => {

    const qrInput = document.getElementById("qr-code-submit") as HTMLInputElement;
    qrInput.onchange = () => {  
      scanQRInput(qrInput);
    }

    (document.getElementById("card") as HTMLElement).style.display = 'none';  

    const printButton = document.getElementById("print-button");
    (printButton as HTMLInputElement).onclick = () => { printCard() };

    const userTypeButtons = document.getElementsByName("user-type");
    const TeacherFacultyInput = (document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement);
    const userPronounsInput = document.querySelectorAll('input[name="user-gender"]');
    const userEmailInput = (document.querySelector('input[name="user-email"]') as HTMLInputElement);
    const userPhoneInput = (document.querySelector('input[name="user-phone"]') as HTMLInputElement);
    const userLocationInput = document.querySelectorAll('input[name="user-location"]');
    const teacherRoomInput = (document.querySelector('input[name="teacher-room"]') as HTMLInputElement);


    TeacherFacultyInput.onchange = () => { 
      if(userType == "Professor") {setUserMajor(((document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement).value) as unknown as string)};
    };

    userPronounsInput.forEach((element) => {(element as HTMLInputElement).onclick = () => {
      setUserPronouns((document.querySelector('input[name="user-gender"]:checked') as HTMLInputElement).value)
    }});

    userEmailInput.onchange = () => {
      setUserEmail((userEmailInput.value) as unknown as string);
    };

    userPhoneInput.onchange = () => {
      setUserPhone((userPhoneInput.value) as unknown as string);
    };

    userLocationInput.forEach((element) => {(element as HTMLInputElement).onclick = () => {
      setUserLocation((document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value)
    }});

    teacherRoomInput.onchange = () => {
      setUserLocation(teacherRoomInput.value + " - " + ((document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value))
    };

    const cardThemePickers = document.querySelectorAll('input[name="card-theme"]');
    cardThemePickers.forEach((element) => {(element as HTMLInputElement).onclick = () => {
      setCardTheme((document.querySelector('input[name="card-theme"]:checked') as HTMLInputElement).value)
    }});

  });


  return (
    <>
      <div id='main-container'>
      
        <div id='nav-buttons-container'><a href="user-type-picker">AAAA</a></div>
        <InfoInputContainer id='user-type-picker' >
            <InfoCard><InfoRadioButton name="user-type" id="student-teacher-type" value="student-teacher" /><label htmlFor="student-teacher-type"><InfoCardImage src={images[0]} alt="" /></label></InfoCard>
            <InfoCard><InfoRadioButton name="user-type" id="other-type" value="other" /><label htmlFor="other-type"><InfoCardImage src={images[1]} alt="" /></label></InfoCard>
        </InfoInputContainer>

        <InfoInputContainer id='user-qr-submitter'>
          <input type="file" id="qr-code-submit" name="" />
        </InfoInputContainer>

        <InfoInputContainer>
          <div className='info-type-container'>
            <InfoCardImage src={images[10]} alt="" />
            <input type="text" name="user-name" id="user-name" placeholder='Ex: Enzo Weder' />
            <input type="text" name="user-title" id="user-title" placeholder='Ex: Aluno de Sistemas de Informação' />
            <input type="text" name="user-title" id="user-location" placeholder='Ex: Monte Carmelo - Unidades Araras' />
            <input type="text" name="user-site" id="user-site" placeholder='Ex: www.github.com/Ewdzo' />
          </div>         
        </InfoInputContainer>
        
        <InfoInputContainer id='teacher-faculty-container'>
          <div className='info-type-container'><InfoCardImage src={images[4]} alt="" /><input type="text" name="teacher-faculty" id="teacher-faculty" placeholder='Ex: FACOM' /></div>          
        </InfoInputContainer>

        <InfoInputContainer id='user-pronouns-picker'>
          <InfoCard><InfoRadioButton name="user-gender" id="male-gender" value="o" /><label htmlFor="male-gender"><InfoCardImage src={images[5]} /></label></InfoCard>
          <InfoCard><InfoRadioButton name="user-gender" id="female-gender" value="a" /><label htmlFor="female-gender"><InfoCardImage src={images[6]} alt="" /></label></InfoCard>
          <InfoCard><InfoRadioButton name="user-gender" id="other-gender" value="e" /><label htmlFor="other-gender"><InfoCardImage src={images[7]} alt="" /></label></InfoCard>           
        </InfoInputContainer>

        <InfoInputContainer id='user-contact-picker'>
          <InfoCard><InfoCardImage src={images[8]} alt="" /><input type="email" name="user-email" id="user-email" placeholder='Ex: aluno@ufu.br' /></InfoCard>
          <InfoCard><InfoCardImage src={images[9]} alt="" /><input type="tel" name="user-phone" id="user-phone" placeholder='Ex: (34) 3810-1010' /></InfoCard>          
        </InfoInputContainer>
        
        <InfoInputContainer id='user-location-container'>
          <InfoCard><InfoRadioButton name="user-location" id="araras-campus" value="Monte Carmelo - Unidades Araras" /><label htmlFor="araras-campus">Monte Carmelo - Araras</label></InfoCard>
          <InfoCard><InfoRadioButton name="user-location" id="boa-vista-campus" value="Monte Carmelo - Unidades Boa Vista" /><label htmlFor="boa-vista-campus">Monte Carmelo - Boa Vista</label></InfoCard>        
        </InfoInputContainer>

        <InfoInputContainer id='teacher-location-container'>
          <InfoCard><input type="text" name="teacher-room" placeholder='Ex: A201' /></InfoCard>
        </InfoInputContainer>

        <InfoInputContainer id='card-theme-picker'>
          <InfoCard><InfoRadioButton name="card-theme" id="blue-theme" value="blue" /><label htmlFor="blue-theme">Blue</label></InfoCard>
          <InfoCard><InfoRadioButton name="card-theme" id="white-theme" value="white" /><label htmlFor="white-theme">White</label></InfoCard>     
        </InfoInputContainer>

        <InfoInputContainer id='print-container'>
          <input type="button" value="print" id="print-button" />
        </InfoInputContainer>   
      </div>

      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App