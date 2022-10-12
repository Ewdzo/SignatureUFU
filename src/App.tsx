import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/card';

function App() {
  const userName = "Enzo Weder";
  const userType = "Alun"
  const userPronouns = "o/a/e";
  const userMajor = "Sistemas de Informação";
  const userPhone = "(85) 99421-6158";
  const userEmail = "enzoweder@ufu.br"
  const userURL = "www.ufu.com.br"
  const userLocation = "UFU - Monte Carmelo - Unidade Araras"
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
    .then(result => console.log(result))
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
      <div className="container" id='user-type-picker' >
        <button>Aluno</button>
        <button>Professor</button>
        <button>Outro</button>
      </div>

      <div className="container" id='card-theme-picker' >
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