import logo from './logo.svg';
import './App.css';
function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function App() {
    const handleOpenPopUp = (url) => () => {
        window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    }

    const testLoginMicrosoft = () => {
        window.open("https://login.microsoftonline.com", "PopUpMicrosoft", "width=800, height=600, top=100, left=100");
    }

    //ESTE ARREGLA TU PROBLEM
    const ajaxTestLoginDiff = () => {
        // Primero abre una que no tenga contentido pero tienens que tener un target name definido
        window.open("about:blank", "PopUpMicrosoft", "width=800, height=600, top=100, left=100");
        const request = new XMLHttpRequest();
        request.open('GET', 'https://graph.microsoft.com/1.0/me', true);
        // una vez que vayas hacer el verdadero window.open debes usar el mismo target (mira la linea 20)
        request.onload = testLoginMicrosoft;
        request.send();
    }

    const ajaxTestLogin = () => {
        const request = new XMLHttpRequest();
        // si es async no funciona en safari
        request.open('GET', 'https://graph.microsoft.com/1.0/me', true);
        request.onload = testLoginMicrosoft;
        request.send();
    }

    const handleSpotifyAuth = () => {
        const  state = generateRandomString(16);
        const scope = 'user-read-private user-read-email';
        const clientId = "ask charly"
        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: "http://lvh.me:3001",
            state: state
        }
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const url = 'https://accounts.spotify.com/authorize?' + queryString

        window.open(url,'Login with Spotify', 'width=800,height=600');
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={handleOpenPopUp("https://www.google.com/")}>Regular pop up</button>
                <button onClick={handleOpenPopUp("https://sso.maxlifeinsurance.com/sso/securityChallangeemp.jsp")}>Login pop up</button>
                <button onClick={handleSpotifyAuth}>Login pop up</button>
                <button onClick={testLoginMicrosoft}>Login Microsoft</button>
                <button onClick={ajaxTestLogin}>Ajax Login Microsoft (BLOCKED)</button>
                <button onClick={ajaxTestLoginDiff}>Ajax Login Microsoft (FIXED)</button>
            </header>
        </div>
    );
}

export default App;
