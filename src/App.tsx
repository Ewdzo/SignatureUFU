import { useEffect } from 'react';
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
  const cardTheme = "white"

  useEffect(() => {
    document.getElementById("card")!.style.backgroundImage = `url("src/imgs/background_${cardTheme}.png")`;
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
      
      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App