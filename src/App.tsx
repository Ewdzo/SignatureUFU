import axios from 'axios';
import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/card';

function App() {
  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();
  const [userPronouns, setUserPronouns] = useState();
  const [userMajor, setUserMajor] = useState();
  const [userPhone, setUserPhone] = useState();;
  const [userEmail, setUserEmail] = useState();
  const [userURL, setUserURL] = useState();
  const [userLocation, setUserLocation] = useState();
  const [cardTheme, setCardTheme] = useState("blue" as string);


  const setCard = () => {

    const checkedTheme = (document.querySelector('input[name="card-theme"]:checked') as HTMLInputElement).value ;
    
    if(checkedTheme && checkedTheme != null) {
      setCardTheme(checkedTheme as any);
    }
  }

  const printCard = () => {
    html2canvas((document.querySelector("#card") as HTMLElement), {scale: 2}).then(canvas => {
      document.body.appendChild(canvas)
    });
  }

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
        setUserName(nameSurname as any);  
        
        if(response.vinculo == "aluno") { 
          setUserType("Alun" as any) 

          const userMajorFull = response.informacao.split(" ");
          const userMajorGraduation = userMajorFull[2] + " " + userMajorFull[3] + " " + userMajorFull[4].replace(":", "");
          setUserMajor(userMajorGraduation as any);
        }
        
        else if(response.vinculo) { setUserType("Professor" as any) }
      })
      .catch(function (error) {
        console.log(error);
      })
    )
    .catch(e => console.log('No QR code found.'));
  };


  useEffect(() => {
    const cardThemePickers = document.querySelectorAll('input[name="card-theme"]');
    cardThemePickers.forEach( element => element.addEventListener('click', setCard) )

    const submitButton = document.getElementById("submit-button");
    (submitButton as HTMLInputElement).onclick = () => {scanQR()}
  })

  
  return (
    <>
      <div className="info-card" id='user-type-picker'>
        <input type="radio" name="user-type" id="student-type" value="student" /><label htmlFor="student-type">Aluno</label>
        <input type="radio" name="user-type" id="teacher-type" value="teacher" /><label htmlFor="teacher-type">Professor</label>
        <input type="radio" name="user-type" id="other-type" value="other" /><label htmlFor="other-type">Outro</label>
      </div>

      <div className="info-card" id='user-pronouns-picker'>
        <input type="radio" name="user-gender" id="male-gender" value="male" /><label htmlFor="male-gender">Masculino</label>
        <input type="radio" name="user-gender" id="female-gender" value="female" /><label htmlFor="female-gender">Feminino</label>
        <input type="radio" name="user-gender" id="other-gender" value="other" /><label htmlFor="other-gender">Neutro / Outro</label>
      </div>

      <div className="info-card" id='user-contact'>
        <input type="text" name="user-email" id="user-email" placeholder='Ex: aluno@ufu.br' /> 
        <input type="text" name="user-phone" id="user-phone" placeholder='Ex: (34) 3810-1010' /> 
        <input type="radio" name="user-location" id="araras-campus" value="araras" /><label htmlFor="araras-campus">Monte Carmelo - Araras</label>
        <input type="radio" name="user-location" id="boa-vista-campus" value="boa vista" /><label htmlFor="boa-vista-campus">Monte Carmelo - Boa Vista</label>
      </div>

      <div className="info-card" id='card-theme-picker' >
        <input type="radio" name="card-theme" id="blue-theme" value="blue" />
        <label htmlFor="blue-theme">Blue</label>
        <input type="radio" name="card-theme" id="white-theme" value="white" />
        <label htmlFor="white-theme">White</label>
      </div>

      <input type="file" id="qr-code-submit" name="" />
      <input type="button" value="submit" id='submit-button'/>
  
      
      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App