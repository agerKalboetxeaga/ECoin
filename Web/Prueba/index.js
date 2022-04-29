// Conexion con la API con JS sin Frameworks (en simple vamos)

const API_URL = 'http://127.0.0.1:5000';  //Ruta al Servidor

const HTMLResponse = document.querySelector("#app");

//El fetch te devuelve promises (que es como un async task) then es cuando tiene respuesta de esa url y podemos convertirlo en json y luego al hacer map, iterar por cada objeto dentro del array (cryptos)
fetch(`${API_URL}/vcrypto`)
.then((response) => response.json())
.then((cryptos) => {
    const template = cryptos.map((crypto) => `<li>${crypto.Crypto_Name} => ${crypto.Crypto_Price}€ \n <br>date: ${crypto.Query_Date}</li>`);   // las `` sirven pa meter variables pam, èro taen se puede:  "<li>", crypto.Crypto_Name, " => ", crypto.Crypto_Price, "\n", "<br>date: ", crypto.Query_Date, "</li>";

    HTMLResponse.innerHTML = `<ul>${template}</ul>`
}).catch((err) => alert(`Ha habido un error conectandose al servidor: ${API_URL} \n Error: ${err.message}`));

/* POST DATA Send:

let hashedpass: string;
sha256(password).then(p => hashedpass = p);
let xhr = new XMLHttpRequest();
xhr.open("POST", API_URL + /register");

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = () => console.log(xhr.responseText);
 
let data = `{
  "Id": random,
  "Username": username,
  "Email": "Jason Sweet@gmail",
  "password": hashedpass
}`;

xhr.send(data);

// encriptador se puede borrar, no hace falta
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  console.log(hashHex);
  return hashHex;
}
*/


