import os

import flask_pymongo
from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from bson import json_util
from flask_cors import CORS
import subprocess
from datetime import datetime

from werkzeug.security import generate_password_hash, check_password_hash  # para hashear contraseñas...

# El programa tarda de 12 a 15 segundos en actualizar los datos

# Flask tiene una version de pymongo pensada para ser usada con flask (flask-pymongo)

# Despues mas tarde, para automatizar el rollo podemos hacer una coleccion de nombres de cryptos
# y k desde la pagina podamos agregar mas por el metodo post y k en la otra app en vez d usar una lista de nombres de cryptos
# que nosotros creamos que lea de la coleccion de nombres de cryptos, asi si sumamos una moneda, en la otra app estara buscando su valor
# y subiendo ese dato a mongo




# GET TRANSACTIONS, ADD TRANSACTIONS, SET NFTS(PARA AÑADIR, COMPRAR, VENDER)

MONGO_HOST = "127.0.0.1"
MONGO_PORT = "27017"  # No necesario pero se pone joder.
DB_NAME = "express"
MONGO_TIMEOUT = 1000

app = Flask(__name__)

# Config for mongo
app.config['MONGO_URI'] = 'mongodb://' + MONGO_HOST + ":" + MONGO_PORT + "/" + DB_NAME

# Making client
client = PyMongo(app)


@app.route('/register', methods=['POST'])
def register():
    _username = request.json['username']
    _password = request.json['pass']
    _email = request.json['email']
    _name = request.json['name']
    _rol = request.json['role']

    collection = client.db['users']
    _id = collection.insert_one({
        'username': _username,
        'email': _email,
        'name': _name,
        'pass': _password,
        'role': _rol,
        'NFT': [{
        }],
        'Cryptos': [{

        }]
    })
    response = {
        'message': "Username added succesfully",
        'user': _username
    }
    return response


@app.route('/login', methods=['POST'])
def login():

    _email = request.json["email"]
    _passHash = request.json["pass"]

    collection = client.db["users"]

    result = collection.find({"email": _email})

    sendData = {}
    if result is not None:
        for user in result:
            if user["pass"] == _passHash:
                payload_data = {
                    "email": user["email"],
                    "username": user["username"],
                    "role": user["role"]
                }
                token = user['username']

                sendData = {
                    "data": {
                        "user": payload_data,
                        "token": token
                    }
                }
    response = json_util.dumps(sendData)
    return Response(response, mimetype='application/json')


# Para compras cryptos
@app.route('/setUser', methods=['POST'])
def setUser():

    _username = request.json["user"]
    _cryptoos = request.json["cryptos"]
    _cryptoBalance = request.json['resta']
    _price = request.json['price']

    collection = client.db['users']
    _previousUsers = collection.find({"username": _username})

    # Second part

    for u in _previousUsers:
        previousCryptos = u["Cryptos"]

    _currentUsers = collection.find({"username":_username})
    currentCryptos = _cryptoos

    count = 0
    for crypto in currentCryptos:

        now = datetime.now()
        # dd/mm/YY H:M:S
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        previousVal = crypto['quantity']
        crypto['quantity'] = _cryptoBalance

        # Third part
        collection = client.db['transactions']
        _id = collection.insert_one({
            "user": _username,
            "crypto": crypto,
            "price": _price,
            "date": dt_string
        })

        count = count + 1
        crypto['quantity'] = previousVal
    collection = client.db['users']
    user = collection.find_one_and_update(
        {"username": _username},
        {
            "$set": {"Cryptos": _cryptoos}
        }
    )
    response = {
        "message": "update succeed"
    }
    return response


@app.route('/getCryptoTransactions', methods=['GET'])
def getCTransactions():
    collection = client.db['transactions']
    transactions = collection.find({}).sort("date")
    transactionArray = []

    for transaction in transactions:
        _id = str(transaction['_id'])
        data = {
            "id": _id,
            "user": transaction['user'],
            "crypto": transaction['crypto']['name'],
            "price": transaction['price'],
            "date": transaction['date']
        }
        transactionArray.append(data)
    response = json_util.dumps(transactionArray)
    return Response(response, mimetype='application/json')


@app.route('/getNFTTransactions', methods=['GET'])
def getNTransactions():
    collection = client.db['NFTtransactions']
    transactions = collection.find({}).sort("date")

    for transaction in transactions:
        _id = str(transaction['_id'])
        data = {
            "id": _id,
            "buyer": transaction['buyer'],
            "seller": transaction['seller'],
            "NFT": transaction['NFT'],
            "price": transaction['price'],
            "date": transaction['date']
        }
    response = json_util.dumps(data)
    return Response(response, mimetype='application/json')

@app.route('/getNFTs', methods=['GET'])
def getNFTs():
    collection = client.db['nfts']
    nfts = collection.find()
    nftArray = []

    for nft in nfts:
        data = {
        "id": nft['id'],
        "name": nft['name'],
        "creator": nft['creator'],
        "price": nft['price'],
        "symbol": nft['symbol'],
        "img": nft['img']
        }
        nftArray.append(data)

    response = json_util.dumps(nftArray)
    return Response(response, mimetype='application/json')

@app.route('/getNFT/<nft_id>', methods=['GET'])
def getNFT(nft_id):
    collection= client.db['nfts']
    nft = collection.find({"id":nft_id})
    for n in nft:
        data = {
            "id": n['id'],
            "name": n['name'],
            "creator": n['creator'],
            "price": n['price'],
            "symbol": n['symbol'],
            "img" : n['img']
        }
    response = json_util.dumps(data)

    return Response(response, mimetype='application/json')


@app.route('/getUser/<_u_username>', methods=['GET'])
def getUser(_u_username):
    collection = client.db['users']
    user = collection.find({"username": _u_username})
    response = {}
    for u in user:
        response = {
            "email": u['email'],
            "username": u['username'],
            "name": u['name'],
            "role": u['role'],
            "nft": u['NFT'],
            "cryptos": u['Cryptos']
        }
    reresponse = json_util.dumps(response)
    return Response(reresponse, mimetype='application/json')


@app.route('/changePassword', methods=['POST'])
def changePassword():
    _email = request.json['email']
    _newPass = request.json['newPass']

    collection = client.db['users']

    user = collection.find_one_and_update(
        {"email": _email},
        {
            "$set": {"pass": _newPass}
        }
    )
    message = {
        "message": "password changed successfully"
    }
    response = json_util.dumps(message)
    return Response(response, mimetype='application/json')


#   Para las compras
@app.route('/setNFT', methods=['POST'])
def setNFT():
    _username = request.json['user']['email']
    _NFT = request.json['user']['nft']
    _nft = request.json['nft']

    collection = client.db['users']

    user = collection.find_one_and_update(
        {"email":_username},
        {
            "$set": {"NFT": _NFT}
        }
    )
    collection = client.db['nfts']

    nft = collection.insert_one(
        _nft
    )
    response ={
        "guud":"shit"
    }
    return response


@app.route('/buyNFT', methods=['POST'])
def buyNFT():
    _user = request.json['user']
    _nft = request.json['nft']

    # find nft owner
    collection = client.db['users']
    users = collection.find()

    for user in users:
        if user['username'] != _user['username']:

            userNFT = []

            for nft in user['NFT']:
                if nft["id"] != _nft['id']:     # Con esto quitamos el nft del sitio anterior en donde estaba
                    userNFT.append(nft)
                else:
                    seller = user['username']   # if nft matches means that this user is the current owner
            _insertion = collection.find_one_and_update(
                {"username": user['username']},
                {
                    "$set": {"NFT": userNFT}        # guardamos los nft sin el que se ha vendido
                }
            )
        else:
            _insertion = collection.find_one_and_update(
                {"username": _user['username']},
                {
                    "$set": {"NFT":_user['nft']}# Teniendo en cuenta que el array de nfts del usuario ya tiene el nuevo nft
                }
            )
            _insertion = collection.find_one_and_update(
                {"username": _user['username']},
                {
                    "$set": {"Cryptos": _user['cryptos']}       #El valor de las cryptos despues de la compra

                }
            )

            # Ahora hacemos una transaccion donde se reflejan los datos que hemos manejado
    now = datetime.now()
    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    collection = client.db['NFTtransactions']
    _insertion = collection.insert_one(
        {
            "buyer" : _user['username'],
            "seller": seller,
            "NFT": _nft,
            "price": _nft['price'],
            "date": dt_string
        }
    )
    response = {
        "message": "todo a funcionau?"

    }
    return response


@app.route('/createNFTTransaction', methods=['POST'])
def createNFTTransaction():
    _b_username = request.json['buyer']     # Buyer´s username
    _s_username = request.json['seller']    # Seller´s username
    _NFT = request.json['NFT']
    _value = request.json['price']          # Buy Value

    now = datetime.now()
    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    collection = client.db['NFTtransactions']
    _id = collection.insert_one(
        {
            "buyer": _b_username,
            "seller": _s_username,
            "NFT": _NFT,
            "price": _value,
            "date": dt_string
        }
    )
    response = {
        "message": "transaction made succesfully"
    }
    return response


# Metodo que añade una nueva moneda al programa
@app.route('/addcrypto', methods=['POST'])
def add_crypto():
    # request es un objeto con el que nos dejara gestionar
    # Porcierto, este metodo recive la informacion en formato json

    # Para probar que funcione, usamos por ejemplo el programa postman.
    # Una vez ahi eliges que sera una peticion post y en headers pones, content-type application/json.
    # y luego en body vas a raw y escribe un json. si funciona en la consola se tendria k printearance
    # (Funciona)

    c_name = request.json['name']  # solana
    c_symbol = request.json['symbol']  # sol

    if c_name and c_symbol:

        # si hubiera que hashear: hashed_pass = generate_password_hash(password)
        collection = client.db['coinNames']
        c_id = collection.insert_one(
            {'Crypto_Name': c_name,
             'Crypto_Symbol': c_symbol}
        )
        response = {'id': str(c_id),  # Devolvemos el objeto recientemente creado
                    'Crypto_Name': c_name,
                    'Crypto_Symbol': c_symbol
                    }

        return response
    else:
        return {'message': 'You must enter valid values'}


# Method to delete sent crypto from de db
@app.route('/deletecrypto', methods=['POST'])
def deletecrypto():
    c_name = request.json['Crypto_Name']  # solana

    response = {'message': 'Error deleting, please enter valid name'}

    if c_name:
        collection = client.db['coinNames']

        query = {
            "Crypto_Name": c_name
        }
        try:
            collection.delete_one(query)

            response = {
                'message': 'Crypto deleted successfully'
            }

        except Exception:
            response = {
                'message': "An error has ocurring during delete" + str(Exception)
            }
    return response


@app.errorhandler(404)
def not_found(error=None):
    response = jsonify({
        'message': 'Error, Resource not Found:' + request.url,
        'status': 404
    })
    response.status_code = 404
    return response


@app.route('/getcryptos', methods=["GET"])
def showAllCryptos():
    collection = client.db['cryptos']
    cryptos = collection.find()
    cryptoArray = []

    for crypt in cryptos:
        _myid = str(crypt['_id'])
        newData = {
            'id': _myid,
            'name': crypt['Crypto_Name'],
            'symbol': crypt['Crypto_Symbol'],
            'Crypto_Price': crypt['Crypto_Price'],
            'Query_Date': crypt['Query_Date']
        }
        cryptoArray.append(newData)

    response = json_util.dumps(cryptoArray)
    return Response(response, mimetype='application/json')  # Para que el cliente sepa que es un json


@app.route('/getcryptosymbol', methods=["GET"])
def getAllCrypts():
    collection = client.db['coinNames']
    cryptos = collection.find()
    cryptoArray = []

    for crypt in cryptos:
        _myid = str(crypt['_id'])
        newData = {
            'id': _myid,
            'name': crypt['Crypto_Name'],
            'symbol': crypt['Crypto_Symbol'],
        }
        cryptoArray.append(newData)

    response = json_util.dumps(cryptoArray)
    return Response(response, mimetype='application/json')  # Para que el cliente sepa que es un json


@app.route('/getSymbol/<CryptoSymbol>', methods=['GET'])
def getSymbol(CryptoSymbol):
    collection = client.db['coinNames']
    symbols = collection.find({"symbol": CryptoSymbol})

    for symbol in symbols:
        _id = str(symbol['_id'])
        data = {
            "id" : _id,
            "name" : symbol['Crypto_Name'],
            "symbol" : symbol['Crypto_Symbol']
        }
    response = json_util.dumps(data)

    return Response(response, mimetype='application/json')


# Receives json file where you put filter ej:  "Crypto_Name": "bitcoin" will return all documents of bitcoin
@app.route('/crypto/<Crypto_Name>', methods=['GET'])
def showCrypto(Crypto_Name):
    collection = client.db['cryptos']
    criptos = collection.find({'Crypto_Name': Crypto_Name})

    cryptoArray = []

    for crypt in criptos:
        _myid = str(crypt['_id'])
        newData = {
            'id': _myid,
            'name': crypt['Crypto_Name'],
            'symbol': crypt['Crypto_Symbol'],
            'price': crypt['Crypto_Price'],
            'date': crypt['Query_Date']
        }
        cryptoArray.append(newData)

    response = json_util.dumps(cryptoArray)
    return Response(response, mimetype='application/json')


# para runear el script crypto
def runscript():
    os.system("crypto_exe.exe")


#vamosss porfin funciona. si mandas un json {"command": "run"} will launch the actualizer in the background.
#else if you send {"command": "stop"} it will stop the program
@app.route('/startprogram', methods=['POST'])
def runEXE():
    response = {'message': ''}
    global process
    if request.json['command'] == 'run':
        process = subprocess.Popen("crypto_exe.exe", stdout=subprocess.PIPE, shell=True)

        response = {
            'message': 'app started'
        }

    elif request.json['command'] == 'stop':
        subprocess.Popen("TASKKILL /F /IM " + "crypto_exe.exe")
        response = {
            'message': 'app suspended'
        }
    return response


# si ha avido algun cambio se rerunea automatico (creo)
if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, host="0.0.0.0")

