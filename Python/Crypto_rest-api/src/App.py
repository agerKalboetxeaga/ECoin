from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from bson import json_util

from werkzeug.security import generate_password_hash, check_password_hash  # para hashear contraseñas...

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
@app.route('/ncrypto', methods=['POST'])
def create_crypto():
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
            {'Crypto_name': c_name,
             'Crypto_symbol': c_symbol}
        )
        response = {'id': str(c_id),  # Devolvemos el objeto recientemente creado
                    'Crypto_name': c_name,
                    'Crypto_symbol': c_symbol
                    }

        return response
    else:
        return {'message': 'You must enter valid values'}


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

    response = json_util.dumps(cryptos)
    return Response(response, mimetype='application/json')  # Para que el cliente sepa que es un json


# Receives json file where you put filter ej:  "Crypto_Name": "bitcoin" will return all documents of bitcoin
@app.route('/crypt', methods=['POST'])
def showCrypto():
    collection = client.db['cryptos']
    criptos = collection.find({'Crypto_Name': request.json['Crypto_Name']})

    response = json_util.dumps(criptos)
    return Response(response, mimetype='application/json')

# si ha avido algun cambio se rerunea automatico (creo)
if __name__ == "__main__":
    app.run(debug=True)
