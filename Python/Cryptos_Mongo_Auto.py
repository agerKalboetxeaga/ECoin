from bs4 import BeautifulSoup
from requests_html import HTMLSession
from datetime import datetime
import pymongo as mongo
import time
from termcolor import colored

# Observacion: en 1 hora tengo mas de 4304 entradas en mongo
# abra k subir el tiempo ke tarda entre las subidas

# Mongo conection variables:
MONGO_HOST = "localhost"  # Probamos si poniendo mi ip o yo el tuyo nos podemos comunicar entre nosotros
MONGO_PORT = "27017"
MONGO_TIMEOUT = 1000

MONGO_URI = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/"




# Esto es un sistema para crear un diccionario de precios relativos a las monedas de la otra lista. a la ora de poner el valor da biende problemass xd

# crypto_pricess = {}
# for coin in range(len(crypto_list)):
#    name = [i for i, a in locals().items() if a == crypto_list[coin]][0]

#    crypto_pricess[name+"Price"] = 0


# Will return current value of entered crypto

def getCryptoPrice(coin):
    text = ''
    # The url
    try:
        if len(coin) > 2:
            url = "https://es.investing.com/crypto/" + coin
            # Make request
            session = HTMLSession()
            headers = {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}
            HTML = session.get(url, headers=headers).content

            # Parse html
            soup = BeautifulSoup(HTML, 'html.parser')

            # find the price
            text = soup.find("span", attrs={'id': 'last_last'}).text

        else:
            url = "https://es.investing.com/crypto/" + coin[0] + "/" + coin[1] + "-eur"
            # Make a request
            session = HTMLSession()
            headers = {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}
            HTML = session.get(url, headers=headers).content

            # Parse html
            soup = BeautifulSoup(HTML, 'html.parser')

            # find the price
            text = soup.find("span", attrs={'data-test': 'instrument-price-last'}).text

    except Exception as e:
        print(e)

    text = text.replace('.', '')  # antes: btc= 34.432,54
    text = text.replace(',', '.')  # despues: btc= 34432.54
    return float(text)


# Method to update data into MongoDB
def updateDataBase(crypto_list, crypto_prices):
    # Look if both arrays are ready to go:
    if len(crypto_list) != len(crypto_prices):
        print (colored("Error, the list length don´t match\n Please check them", 'red'))
        return 1

    else:

        # GetCurrentData
        dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        # Connect to mongo
        try:
            client = mongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=MONGO_TIMEOUT)  # timeout no es necesario
            client.server_info()
            print("Connection success")

            # connecting to DB
            db = client['express']
            collection = db["cryptos"]
            cryptos = {}
            # Preparing data to import
            for x in range(len(crypto_list)):
                if len(crypto_list[x]) > 2:  # esto es porque algunas cryptos solo son un nombre y no hay simbolo
                    cryptos = {
                        'Crypto_Name': crypto_list[x],
                        'Crypto_Symbol': crypto_list[x],
                        'Crypto_Price': crypto_prices[x],
                        'Query_Date': dt_string
                    }
                else:
                    cryptos = {
                        'Crypto_Name': crypto_list[x][0],
                        'Crypto_Symbol': crypto_list[x][1],
                        'Crypto_Price': crypto_prices[x],
                        'Query_Date': dt_string
                    }

                # inserting data
                result = collection.insert_one(cryptos)
                # Porcierto cada id que crea mongo tiene 24 caracteres alfanumericos
                # Otra forma
                # result = collection.insert_many([crypto_1,crypto_2])

                print (colored("inserted info of cryptos as ", 'yellow'), colored(str(result.inserted_id) + " (ID) ", 'green'))

            print("\n[*]Cryptos in order of most valuable:\n")

            best_cryptos = collection.find().sort("Crypto_Price", -1)  # Descending order funciona...mecorrrrrroooo
            repited_cryptos = ['']  # Para no ver nombres repetidos
            repitedIndex = 0
            for x in best_cryptos:
                if x['Crypto_Name'] not in repited_cryptos:
                    print("\t-" + colored(x['Crypto_Name'], 'yellow'), colored(x['Crypto_Price'], 'green'))  # Solo muestra esos valores
                    repited_cryptos.append(x['Crypto_Name'])  # aunque por ejemplo iota ya no se actualiza, su valor se mantiene en la base de datos, por eso aparece al final
                else:
                    repitedIndex = repitedIndex + 1

            print(colored("\nData uploaded succesfully\n", 'blue'), colored("\t in total ", 'yellow') + colored(str(repitedIndex), 'red') + colored(" entries were not shown", 'yellow'))
            # Closing client
            client.close()

        except mongo.errors.ServerSelectionTimeoutError as timeError:
            print(colored("Exceed time ", 'red') + str(
                timeError))    # Aunque arriba ponga que es un timeout error si el servidor deniega o no existe una ip tambien redirige aqui el error
        except mongo.errors.ConnectionFailure as connectionError:
            print(colored("Error connecting to server: ", 'red') + str(connectionError))

        return 0


# Con esto cogeremos de mongo los coins que hayamos metido x la api y asi se actualiza la lista
def getCryptos():
    cryptos = []
    repitedNames = ['']  # Puede pasar que sin querer metamos mas de una vez la misma crypto

    # Mongo connection
    client = mongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=MONGO_TIMEOUT)  # timeout no es necesario
    client.server_info()
    print(colored("Connection success", 'green'))

    # connecting to DB
    db = client['express']
    collection = db['coinNames']
    # Getting results
    result = collection.find()
    for x in result:
        if x['Crypto_Name'] not in repitedNames:

            repitedNames.append(x['Crypto_Name'])

            if x['Crypto_Symbol'] == 'null':
                obj = (x['Crypto_Name'])
            else:

                obj = (x['Crypto_Name'], x['Crypto_Symbol'])
            cryptos.append(obj)

    print('[*]Cryptos list updated..')
    return cryptos


# this method updates crypto prices list's length aunque metiendo un append a la lista mas abajo se soluciona...
def updateCryptoPrices(cryptos):
    prices = []

    for item in cryptos:
        prices.append(0)

    return prices


# Main method
def main():
    index = 0

    # Create an infinite loop to continuously show the price with 1 second offset
    while True:

        crypto_list = getCryptos()
        crypto_prices = updateCryptoPrices(crypto_list)

        # Get the price of the crypto currency

        for x in range(len(crypto_list)):
            crypto_prices[x] = float(
                getCryptoPrice(crypto_list[x]))  # Recorre la lista de cryptos para conseguir precios

            if len(crypto_list[x]) > 2:
                print("[*]Crypto: " + colored(str(crypto_list[x].capitalize()), 'yellow') + " (" + crypto_list[x] + "), Price: " + colored(str(
                    crypto_prices[x]) + "€", 'green'))
            else:
                print(
                    "[*]Crypto: " + colored(str(crypto_list[x][0].capitalize()), 'yellow') + " (" + crypto_list[x][1] + "), Price: " + colored(str(
                        crypto_prices[x]) + "€", 'green'))
        index = index + 1
        time.sleep(2)

        # Update data into DataBase(MongoDB) every 1 second
        updateDataBase(crypto_list, crypto_prices)

        # Checking how many inserts have been made
        print(colored("Succesfully updated " + str(index) + " Times\n", 'yellow'))
        time.sleep(1)  # Antes estaba puesto 3


# Y aver si funciona pos claro k siii...
main()

# Por tema de red en la actualizacion nª 277 se a petau al devolver null una query de internet
# Espero que con  el try-exception se solucione el error y que siga runeando
# porcierto nuestros datos son utiles y reales mas k en coinmarketcap
