import './App.css'

function App() {
  const userName = "Enzo Weder";
  const userType = "Alun"
  const userPronouns = "o/a/e";
  const userMajor = "Sistemas de Informação";
  const userPhone = "(85) 99421-6158";
  const userEmail = "enzoweder@ufu.br"
  const userURL = "www.ufu.com.br"
  const userLocation = "UFU - Monte Carmelo - Unidade Araras"

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

      <div className='container' id='card'>

        <table>
          <h4>Universidade Federal de</h4>
          <h2>Uberlândia</h2>
        </table>
        

        <table id='userInfo'>
          <tr><h1>{userName}</h1></tr>
          <tr><h2>{userType}{userPronouns} de {userMajor}</h2></tr>
          <tr><img src="src\imgs\mail_icon.png" alt="Mail Icon" />{userEmail}</tr>
          <tr><img src="src\imgs\phone_icon.png" alt="Phone Icon" />{userPhone}</tr>
          <tr><img src="src\imgs\person_icon.png" alt="Person Icon" />{userURL}</tr>
          <tr><img src="src\imgs\location_icon.png" alt="Location Icon" />{userLocation}</tr>
        </table>
      </div>

    </>

  )
}

export default App