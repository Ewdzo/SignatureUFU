import './App.css'
import axios from 'axios';
import html2canvas from 'html2canvas';
import QrScanner from 'qr-scanner';
import images from './imgs/index.jsx';
import { useEffect, useState } from 'react';
import { Card } from './components/card';
import { InfoRadioButton } from './components/infoRadioButton';
import { InfoCard, InfoCardImage, InfoInputContainer, InfoInputText } from './components/infoCard';

function App() {
  const [userName, setUserName] = useState<String>();
  const [userType, setUserType] = useState<String>();
  const [userPronouns, setUserPronouns] = useState<String>();
  const [userMajor, setUserMajor] = useState<String>();
  const [userPhone, setUserPhone] = useState<String>();
  const [userEmail, setUserEmail] = useState<String>();
  const [userURL, setUserURL] = useState<String>("www.ufu.com.br");
  const [userLocation, setUserLocation] = useState<String>();
  const [cardTheme, setCardTheme] = useState<String>("blue");

  const printCard = async () => {

    if(document.getElementsByTagName("canvas")[0] as HTMLElement){
      (document.getElementsByTagName("canvas")[0] as HTMLElement).remove();
    };

    await new Promise(r => setTimeout(r, 1000));
    
    (document.getElementById("card") as HTMLElement).style.display = 'flex'  

    html2canvas((document.querySelector("#card") as HTMLElement), {scale: 2}).then(canvas => {
      const canvasStyle = (canvas as HTMLElement).style;
      
      canvasStyle.height = "40vh";
      canvasStyle.width = "";
      canvasStyle.border= "solid #0C0C0C 0.5vh";
      canvasStyle.borderRadius = "1vh";
      canvasStyle.padding = "3vh";
      

      (document.querySelector("#final-container") as HTMLDivElement).appendChild(canvas);
    });

    (document.getElementById("card") as HTMLElement).style.display = 'none';
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
          setInputs("Alun")
        }
        else {
          setUserType("Professor");
          setInputs("Professor")
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

  const scrollTo = (index: number) => {
    const navButtons = document.getElementsByClassName("nav-button");
    for(let i=0; i< navButtons.length; i++){
      (navButtons[i] as HTMLElement).classList.remove("selected");
    }

    (navButtons[index] as HTMLElement).classList.add("selected");

    const infoContainers = document.querySelectorAll(".infoContainer");

    (infoContainers[index] as HTMLElement).scrollIntoView({behavior: 'smooth'})
  };

  const selectCard = (classElements: NodeListOf<Element>, index: number) => {
    for(let i=0; i< classElements.length; i++){
      (classElements[i] as HTMLElement).classList.remove("selected-card");
    }

    (classElements[index] as HTMLElement).classList.add("selected-card");
  };

  const setUseState = (element: HTMLInputElement, useStateFunction: Function) => { element.onchange = () => { useStateFunction((element.value) as unknown as string) } };
  
  const setOnClickListener = (elements: NodeListOf<Element>, listenerFunction: Function) => { elements.forEach( (element, index) => {(element as HTMLElement).onclick = () => { listenerFunction(elements, index)}}) };
  
  const setInputs = (type: String) => {
    const userNameManualInput = (document.querySelector('input[name="user-name"]') as HTMLInputElement);
    const userTitleManualInput = (document.querySelector('input[name="user-title"]') as HTMLInputElement);
    const userLocationManualInput = (document.querySelector('input[name="user-location"]') as HTMLInputElement);
    const userSiteManualInput = (document.querySelector('input[name="user-site"]') as HTMLInputElement);

    const userTextInputs = [userNameManualInput, userTitleManualInput, userLocationManualInput, userSiteManualInput];
    
    if(type == "Professor"){
      const teacherFacultyInput = (document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement);
      const teacherRoomInput = (document.querySelector('input[name="teacher-room"]') as HTMLInputElement);
      
      teacherFacultyInput.removeAttribute("disabled");
      teacherRoomInput.removeAttribute("disabled");

      teacherFacultyInput.onchange = () => { if(userType == "Professor") {setUserMajor(((document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement).value) as unknown as string)}};
      teacherRoomInput.onchange = () => {setUserLocation(teacherRoomInput.value + " - " + ((document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value))};
    }
    else if(type == "Manual"){
      userTextInputs.forEach((element) => { element.removeAttribute("disabled")});

      setUseState(userNameManualInput, setUserName);
      setUseState(userTitleManualInput, setUserMajor);
      setUseState(userLocationManualInput, setUserLocation);
      setUseState(userSiteManualInput, setUserURL);
    }
    
    const userPronounsInput = document.querySelectorAll('input[name="user-gender"]');
    const userEmailInput = (document.querySelector('input[name="user-email"]') as HTMLInputElement);
    const userPhoneInput = (document.querySelector('input[name="user-phone"]') as HTMLInputElement);
    const userLocationInput = document.querySelectorAll('input[name="user-location"]');
    const userGenderCards = document.querySelectorAll(".info-radio-gender");
    const userLocationCards = document.querySelectorAll(".info-radio-location");
    
    userEmailInput.removeAttribute("disabled");
    userPhoneInput.removeAttribute("disabled");
    setUseState(userEmailInput, setUserEmail);
    setUseState(userPhoneInput, setUserPhone);
    
    setOnClickListener(userGenderCards, selectCard);
    setOnClickListener(userLocationCards, selectCard);
    
    userPronounsInput.forEach((element) => { (element as HTMLInputElement).onclick = () => {setUserPronouns((document.querySelector('input[name="user-gender"]:checked') as HTMLInputElement).value)}});
    userLocationInput.forEach((element) => {(element as HTMLInputElement).onclick = () => {setUserLocation((document.querySelector('input[name="user-location"]:checked') as HTMLInputElement).value)}});
  };
  
  useEffect(() => {
    const printButton = document.getElementById("print-button");
    const navButtons = document.querySelectorAll(".nav-button");
    const cardThemePickers = document.querySelectorAll(".info-radio-theme");
    const qrInput = document.getElementById("qr-code-submit") as HTMLInputElement;

    const userTypeCards = document.querySelectorAll(".info-radio-type");
    const userTypeInputs = document.querySelectorAll('input[name="user-type"]');
    const userNameManualInput = (document.querySelector('input[name="user-name"]') as HTMLInputElement);
    const userTitleManualInput = (document.querySelector('input[name="user-title"]') as HTMLInputElement);
    const userLocationManualInput = (document.querySelector('input[name="user-location"]') as HTMLInputElement);
    const userSiteManualInput = (document.querySelector('input[name="user-site"]') as HTMLInputElement);
    const teacherFacultyInput = (document.querySelector('input[name="teacher-faculty"]') as HTMLInputElement);
    const teacherRoomInput = (document.querySelector('input[name="teacher-room"]') as HTMLInputElement);
    const userEmailInput = (document.querySelector('input[name="user-email"]') as HTMLInputElement);
    const userPhoneInput = (document.querySelector('input[name="user-phone"]') as HTMLInputElement);
    
    setOnClickListener(userTypeCards, selectCard);
    setOnClickListener(cardThemePickers, selectCard);

    const textInputs = [userNameManualInput, userTitleManualInput, userLocationManualInput, userSiteManualInput, teacherFacultyInput, teacherRoomInput, userEmailInput, userPhoneInput];
    textInputs.forEach((element) => { element.setAttribute("disabled", "")});

    (userTypeInputs[1] as HTMLInputElement).onclick = () => { setUserType("Manual"); setInputs("Manual"); scrollTo(1);};

    (userTypeInputs[0] as HTMLInputElement).onclick = () => { (document.getElementById("qr-code-submit") as HTMLInputElement).removeAttribute("disabled"); scrollTo(1); };

    cardThemePickers.forEach((element) => {(element as HTMLInputElement).onclick = () => {setCardTheme((document.querySelector('input[name="card-theme"]:checked') as HTMLInputElement).value)}});
    
    navButtons.forEach( (element, index) => {(element as HTMLElement).onclick = () => {scrollTo(index)}});
    
    qrInput.onchange = () => {scanQRInput(qrInput)};
    
    (printButton as HTMLInputElement).onclick = () => { printCard(); scrollTo(10);};
    
    (document.getElementById("card") as HTMLElement).style.display = 'none';  
    (document.getElementById("qr-code-submit") as HTMLInputElement).setAttribute("disabled", "");
  });
  
  
  return (
    <>
      <div id='nav-buttons-container'>
        <ul>
          <li><a className='nav-button selected'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
          <li><a className='nav-button'></a></li>
        </ul>        
      </div>
      
      <div id='main-container'>
        <InfoInputContainer className="infoContainer" id='user-type-picker' >
            <InfoCard className='info-radio-type'>
              <InfoRadioButton name="user-type" id="student-teacher-type" value="student-teacher" />
              <label htmlFor="student-teacher-type"><InfoCardImage src={images[0]} alt="Ícone de Estudante ou Professor" title='Estudante ou Professor' /></label>
                <p>Estudante ou Professor</p> 
            </InfoCard>
            <InfoCard className='info-radio-type'>
              <InfoRadioButton name="user-type" id="other-type" value="other" />
              <label htmlFor="other-type"><InfoCardImage src={images[1]} alt="Ícone de Configuração Manual" title='Configuração Manual'/></label>
              <p>Configuração Manual</p> 
            </InfoCard>
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='user-qr-submitter'>
          <InfoCard>
            <InfoCardImage src={images[17]} alt="Ícone de QrCode" title='QrCode'/>
              <input type="file" id="qr-code-submit" accept=".png, .jpg, .jpeg" style={{margin: "5%"}} />
            </InfoCard>
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id="user-information-submitter">
          <InfoCard className='info-type-container' style={{display: "flex", flexDirection: "column"}}>
            <InfoCardImage src={images[11]} alt="" />
            <InfoInputText name="user-name" id="user-name" placeholder='Ex: Enzo Weder' />
            <InfoInputText name="user-title" id="user-title" placeholder='Ex: Aluno de Sistemas de Informação' />
            <InfoInputText name="user-location" id="user-location" placeholder='Ex: Monte Carmelo - Unidades Araras' />
            <InfoInputText name="user-site" id="user-site" placeholder='Ex: www.github.com/Ewdzo' />
          </InfoCard>         
        </InfoInputContainer>
        
        <InfoInputContainer className="infoContainer" id='teacher-faculty-container'>
          <InfoCard>
            <InfoCardImage src={images[4]} alt="Ícone de Crachá" title='Crachá de Identificação' />
            <p>Faculdade do Professor</p>
            <InfoInputText name="teacher-faculty" id="teacher-faculty" placeholder='Ex: FACOM' />
          </InfoCard>          
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='user-pronouns-picker'>
          <InfoCard className='info-radio-gender'><InfoRadioButton name="user-gender" id="male-gender" value="o" /><label htmlFor="male-gender"><InfoCardImage src={images[5]} /></label><p>Masculino</p></InfoCard>
          <InfoCard className='info-radio-gender'><InfoRadioButton name="user-gender" id="female-gender" value="a" /><label htmlFor="female-gender"><InfoCardImage src={images[6]} alt="" /></label><p>Feminino</p></InfoCard>
          <InfoCard className='info-radio-gender'><InfoRadioButton name="user-gender" id="other-gender" value="e" /><label htmlFor="other-gender"><InfoCardImage src={images[7]} alt="" /></label><p>Não-Binário</p></InfoCard>           
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='user-contact-picker'>
          <InfoCard><InfoCardImage src={images[8]} alt="Ícone de E-mail" title='Email' /><p>Email</p><InfoInputText type="email" name="user-email" id="user-email" placeholder='Ex: aluno@ufu.br' /></InfoCard>
          <InfoCard><InfoCardImage src={images[9]} alt="Ícone de Telefone" title='Telefone'/><p>Telefone</p><InfoInputText type="tel" name="user-phone" id="user-phone" placeholder='Ex: (34) 3810-1010' /></InfoCard>          
        </InfoInputContainer>
        
        <InfoInputContainer className="infoContainer" id='user-location-container'>
          <InfoCard className='info-radio-location'>
            <InfoCardImage src={images[15]} alt="Ícone de Pino de Localização" title='Localização' />
            <InfoRadioButton name="user-location" id="araras-campus" value="Monte Carmelo - Unidades Araras" />
            <label htmlFor="araras-campus" style={{textAlign: "center"}}>Monte Carmelo - Araras</label>
          </InfoCard>
          <InfoCard className='info-radio-location'>
            <InfoCardImage src={images[15]} alt="Ícone de Pino de Localização" title='Localização' />
            <InfoRadioButton name="user-location" id="boa-vista-campus" value="Monte Carmelo - Unidades Boa Vista" />
            <label htmlFor="boa-vista-campus" style={{textAlign: "center"}}> Monte Carmelo - Boa Vista </label>
          </InfoCard>        
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='teacher-location-container'>
          <InfoCard>
            <InfoCardImage src={images[15]} alt="Ícone de Pino de Localização" title='Localização' />
            <p>Sala do Professor</p>
            <InfoInputText name="teacher-room" placeholder='Ex: A201' />
          </InfoCard>
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='card-theme-picker'>
          <InfoCard className='info-radio-theme'><InfoRadioButton name="card-theme" id="blue-theme" value="blue" /><label htmlFor="blue-theme">Blue</label></InfoCard>
          <InfoCard className='info-radio-theme'><InfoRadioButton name="card-theme" id="white-theme" value="white" /><label htmlFor="white-theme">White</label></InfoCard>     
        </InfoInputContainer>

        <InfoInputContainer className="infoContainer" id='print-container'>
          <InfoCard><InfoCardImage src={images[16]} alt="Ícone de Impressora" title='Imprimir' id="print-button"/><p>Imprimir Assinatura</p></InfoCard>
        </InfoInputContainer>  
        
        <InfoInputContainer className="infoContainer">
          <div id='final-container'></div>
        </InfoInputContainer>  
         
      </div>

      <Card userName={userName} userType={userType} userPronouns={userPronouns} userMajor={userMajor} userPhone={userPhone} userEmail={userEmail} userURL={userURL} userLocation={userLocation} cardTheme={cardTheme} />
    </>

  )
}

export default App