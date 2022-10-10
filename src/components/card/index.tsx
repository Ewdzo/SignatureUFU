export function Card(props : any) {

    return (
        <>
            <div className='container' id='card'>

                <table id="universityInfo">
                    <tbody>
                        <tr><td><h4>Universidade Federal de</h4></td></tr>
                        <tr><td><h2>Uberlândia</h2></td></tr>
                    </tbody>           
                </table>

                <table id='userInfo'>
                    <tbody>
                        <tr><td><h1>{props.userName}</h1></td></tr>
                        <tr><td><h2>{props.userType}{props.userPronouns} de {props.userMajor}</h2></td></tr>
                        <tr><td><img src="src\imgs\mail_icon.png" alt="Mail Icon" />{props.userEmail}</td></tr>
                        <tr><td><img src="src\imgs\phone_icon.png" alt="Phone Icon" />{props.userPhone}</td></tr>
                        <tr><td><img src="src\imgs\person_icon.png" alt="Person Icon" />{props.userURL}</td></tr>
                        <tr><td><img src="src\imgs\location_icon.png" alt="Location Icon" />{props.userLocation}</td></tr>
                    </tbody>
                </table>
            </div>
            <link rel="stylesheet" href={`./src/components/card/${props.cardTheme}Card.css`} />
        </>

    )
}