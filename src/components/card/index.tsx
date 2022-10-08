export function Card(props : any) {

    return (
        <>
            <div className='container' id='card'>

            <table>
            <h4>Universidade Federal de</h4>
            <h2>Uberlândia</h2>
            </table>


            <table id='userInfo'>
            <tr><h1>{props.userName}</h1></tr>
            <tr><h2>{props.userType}{props.userPronouns} de {props.userMajor}</h2></tr>
            <tr><img src="src\imgs\mail_icon.png" alt="Mail Icon" />{props.userEmail}</tr>
            <tr><img src="src\imgs\phone_icon.png" alt="Phone Icon" />{props.userPhone}</tr>
            <tr><img src="src\imgs\person_icon.png" alt="Person Icon" />{props.userURL}</tr>
            <tr><img src="src\imgs\location_icon.png" alt="Location Icon" />{props.userLocation}</tr>
            </table>
            </div>
            <link rel="stylesheet" href={`card${props.cardTheme}.css`} />
        </>

    )
}