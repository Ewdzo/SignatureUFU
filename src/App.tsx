import axios from 'axios';
import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/card';

function App() {
  const [userName, setUserName] = useState(String);
  const [userType, setUserType] = useState(String);
  const [userPronouns, setUserPronouns] = useState(String);
  const [userMajor, setUserMajor] = useState(String);
  const [userPhone, setUserPhone] = useState(String);;
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

  const printCard = () => {

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
        const fullName = response.nome.split(" ");
        const nameSurname = fullName[0] + " " + fullName[1];
        setUserName(nameSurname);  
        
        if(response.vinculo == "aluno") { 
          setUserType("Alun") 

          const userMajorFull = response.informacao.split(" ");
          const userMajorGraduation = userMajorFull[2] + " " + userMajorFull[3] + " " + userMajorFull[4].replace(":", "");
          setUserMajor(userMajorGraduation);
        }
        else{ setUserType("Professor") }
      })
      .catch(function (error) {
        console.log(error);
      })
    )
    .catch(e => console.log('No QR code found.'));
  };

  const fillUserInfo = () => {
    const checkedPronouns = (document.querySelector('input[name="user-gender"]:checked') as HTMLInputElement).value;
    const inputEmail = (document.querySelector('input[name="user-email"]') as HTMLInputElement).value;
    const inputPhone = (document.querySelector('input[name="user-phone"]') as HTMLInputElement).value;
    const checkedLocation = (document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value;
        
    if(checkedPronouns != null && userType != "Other") {
      setUserPronouns(checkedPronouns);
      setUserEmail(inputEmail);
      setUserPhone(inputPhone);
      setUserLocation(checkedLocation);
      setUserURL("www.ufu.com.br")
    };
  };

  useEffect(() => {
    const cardThemePickers = document.querySelectorAll('input[name="card-theme"]');
    cardThemePickers.forEach( element => element.addEventListener('click', setCard) )

    const submitButton = document.getElementById("submit-button");
    (submitButton as HTMLInputElement).onclick = () => {
      scanQR();
      fillUserInfo();
    }

    const printButton = document.getElementById("print-button");
    (printButton as HTMLInputElement).onclick = () => { printCard() };

    (document.getElementById("card") as HTMLElement).style.display = 'none' 

  });


  return (
    <>
      <div id='user-type-picker' className='info-input-container'>
        <div className="info-card"><input type="radio" name="user-type" id="student-teacher-type" value="student-teacher" /><label htmlFor="student-teacher-type">Aluno / Professor</label></div>
        <div className="info-card"><input type="radio" name="user-type" id="other-type" value="other" /><label htmlFor="other-type">Outro</label></div>
      </div>

      <div id='user-pronouns-picker' className='info-input-container'>
        <div className="info-card"><input type="radio" name="user-gender" id="male-gender" value="o" /><label htmlFor="male-gender">Masculino</label></div>
        <div className="info-card"><input type="radio" name="user-gender" id="female-gender" value="a" /><label htmlFor="female-gender">Feminino</label></div>
        <div className="info-card"><input type="radio" name="user-gender" id="other-gender" value="e" /><label htmlFor="other-gender">Neutro / Outro</label></div>
      </div>

      <div className='info-input-container'>
        <input type="email" name="user-email" id="user-email" placeholder='Ex: aluno@ufu.br' /> 
        <input type="tel" name="user-phone" id="user-phone" placeholder='Ex: (34) 3810-1010' />
      </div>
      
      <div className='info-input-container'>
        <div className="info-card"><input type="radio" name="user-location" id="araras-campus" value="Monte Carmelo - Unidades Araras" /><label htmlFor="araras-campus">Monte Carmelo - Araras</label></div>
        <div className="info-card"><input type="radio" name="user-location" id="boa-vista-campus" value="Monte Carmelo - Unidades Boa Vista" /><label htmlFor="boa-vista-campus">Monte Carmelo - Boa Vista</label></div>
      </div>

      <div id='card-theme-picker' className='info-input-container'>
        <div className="info-card"><input type="radio" name="card-theme" id="blue-theme" value="blue" /><label htmlFor="blue-theme">Blue</label></div>
        <div className="info-card"><input type="radio" name="card-theme" id="white-theme" value="white" /><label htmlFor="white-theme">White</label></div>
      </div>

      <input type="file" id="qr-code-submit" name="" />
      <input type="button" value="submit" id='submit-button'/>
      <input type="button" value="print" id="print-button" />
  
      
      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App