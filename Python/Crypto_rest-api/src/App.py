import os
from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util
import subprocess
from werkzeug.security import generate_password_hash, check_password_hash  # para hashear contraseñas...

# El programa tarda de 12 a 15 segundos en actualizar los datos

# Flask tiene una version de pymongo pensada para ser usada con flask (flask-pymongo)

# Despues mas tarde, para automatizar el rollo podemos hacer una coleccion de nombres de cryptos
# y k desde la pagina podamos agregar mas por el metodo post y k en la otra app en vez d usar una lista de nombres de cryptos
# que nosotros creamos que lea de la coleccion de nombres de cryptos, asi si sumamos una moneda, en la otra app estara buscando su valor
# y subiendo ese dato a mongo


MONGO_HOST = "localhost"
MONGO_PORT = "27017"  # No necesario pero se pone joder.
DB_NAME = "express"
MONGO_TIMEOUT = 1000

app = Flask(__name__)

# Config for mongo
app.config['MONGO_URI'] = 'mongodb://' + MONGO_HOST + ":" + MONGO_PORT + "/" + DB_NAME

# Making client
client = PyMongo(app)


# Metodo que añade una nueva moneda al programa
@app.route('/addcrypto', methods=['POST'])
def add_crypto():
    # request es un objeto con el que nos dejara gestionar
    # Porcierto, este metodo recive la informacion en formato json

    # Para probar que funcione, usamos por ejemplo el programa postman.
    # Una vez ahi eliges que sera una peticion post y en headers pones, content-type application/json.
    # y luego en body vas a raw y escribe un json. si funciona en la consola se tendria k printearance
    # (Funciona)

    c_name = request.json['Crypto_Name']  # solana
    c_symbol = request.json['Crypto_Symbol']  # sol

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


@app.route('/vcrypto', methods=["GET"])
def showAllCryptos():
    collection = client.db['cryptos']
    cryptos = collection.find()
    cryptoArray = []

    for crypt in cryptos:
        newData = {
            'Crypto_Name': crypt['Crypto_Name'],
            'Crypto_Symbol': crypt['Crypto_Symbol'],
            'Crypto_Price': crypt['Crypto_Price'],
            'Query_Date': crypt['Query_Date']
        }
        cryptoArray.append(newData)

    response = json_util.dumps(cryptoArray)
    return Response(response, mimetype='application/json')  # Para que el cliente sepa que es un json







# Receives json file where you put filter ej:  "Crypto_Name": "bitcoin" will return all documents of bitcoin
@app.route('/crypt', methods=['POST'])
def showCrypto():
    collection = client.db['cryptos']
    criptos = collection.find({'Crypto_Name': request.json['Crypto_Name']})

    response = json_util.dumps(criptos)
    return Response(response, mimetype='application/json')


# para runear el script crypto
def runscript():
    os.system("crypto_exe.exe")


#vamosss porfin funciona. si mandas un json {"command": "run"} will launch the actualizer in the background.
#else if you send {"command": "stop"} it will stop the program
@app.route('/startexe', methods=['POST'])
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
    app.run(debug=True)
