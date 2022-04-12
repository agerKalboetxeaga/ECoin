// Conexion con la API con JS sin Frameworks (en simple vamos)

const API_URL = 'http://127.0.0.1:5000';  //Ruta al Servidor

const HTMLResponse = document.querySelector("#app");


fetch(`${API_URL}/vcrypto`)
.then((response) => response.json())
.then((cryptos) => {
    const template = cryptos.map((crypto) => `<li>${crypto.Crypto_Name} => ${crypto.Crypto_Price}€ \n <br>date: ${crypto.Query_Date}</li>`);

    HTMLResponse.innerHTML = `<ul>${template}</ul>`
}).catch((err) => alert(`Ha habido un error conectandose al servidor: ${API_URL} \n Error: ${err.message}`));
