import './App.css'

function App() {
  const userName = "Enzo Weder";
  const userMajor = "Sistemas de Informação";
  const userPhone = "(85) 99421-6158";
  const userEmail = "enzoweder@ufu.br"
  const userURL = "www.ufu.com.br"
  const userLocation = "UFU - Monte Carmelo - Unidade Araras"

  return (
    <>
      <div className="container" id='user-type' >
        <button>Aluno</button>
        <button>Professor</button>
        <button>Outro</button>
        <div className='container' id='card'>
          <h4>Universidade Federal de</h4>
          <h2>Uberlândia</h2>

          <table>
            <tr><h1>{userName}</h1></tr>
            <tr><h2>Aluno de {userMajor}</h2></tr>
            <tr><img src="src\imgs\mail_icon.png" alt="Mail Icon" />{userEmail}</tr>
            <tr><img src="src\imgs\phone_icon.png" alt="Phone Icon" />{userPhone}</tr>
            <tr><img src="src\imgs\person_icon.png" alt="Person Icon" />{userURL}</tr>
            <tr><img src="src\imgs\location_icon.png" alt="Location Icon" />{userLocation}</tr>
          </table>
        </div>
      </div>
    </>

  )
}

export default App
