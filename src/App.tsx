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
          <h1>{userName}</h1>
          <h2>Aluno de {userMajor}</h2>
          <table>
            <tr>{userEmail}</tr>
            <tr>{userPhone}</tr>
            <tr>{userURL}</tr>
            <tr>{userLocation}</tr>
          </table>
        </div>
      </div>
    </>

  )
}

export default App
