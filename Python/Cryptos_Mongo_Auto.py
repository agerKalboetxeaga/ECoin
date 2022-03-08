from bs4 import BeautifulSoup
from requests_html import HTMLSession
from datetime import datetime
import pymongo as mongo
import time

#Observacion: en 1 hora tengo mas de 4304 entradas en mongo
# abra k subir el tiempo ke tarda entre las subidas

# Mongo conection variables:
MONGO_HOST = "localhost"   # Probamos si poniendo mi ip o yo el tuyo nos podemos comunicar entre nosotros
MONGO_PORT = "27017"
MONGO_TIMEOUT = 1000

MONGO_URI = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/"

# Crypto Variable declaration:

btcPrice = 0
ethPrice = 0
usdtPrice = 0
usdCoinPrice = 0
xrpPrice = 0
terraPrice = 0
solanaPrice = 0
cardanoPrice = 0
bnbPrice = 0  # *
crypto_prices = [btcPrice, ethPrice, usdtPrice, usdCoinPrice, xrpPrice, terraPrice, solanaPrice, cardanoPrice]

btc = ('bitcoin', 'btc')
eth = ('ethereum', 'eth')
usdt = ('tether')
usdCoin = ('usd-coin')
xrp = ('xrp', 'xrp')
terra = ('terra-luna', 'lunat')
solana = ('solana', 'sol')
cardano = ('cardano', 'ada')
bnb = ('bnb', 'bnb')  # para hacer con salgatz
crypto_list = [btc, eth, usdt, usdCoin, xrp, terra, solana, cardano]


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

    text = text.replace('.', '') # antes: btc= 34.432,54
    text = text.replace(',', '.')# despues: btc= 34432.54
    return float(text)


# Method to update data into MongoDB
def updateDataBase(crypto_list, crypto_prices):
    # Look if both arrays are ready to go:
    if len(crypto_list) != len(crypto_prices):
        print("Error, the list length don´t match\n Please check them")
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
                if len(crypto_list[x]) > 2:    # esto es porque algunas cryptos solo son un nombre y no hay simbolo
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

                print("inserted info of cryptos as " + str(result.inserted_id) + " (ID) ")

            print("\n[*]Cryptos in order of most valuable:\n")

            best_cryptos = collection.find().sort("Crypto_Price", -1)  # Descending order funciona...mecorrrrrroooo
            repited_cryptos = ['']                                     # Para no ver nombres repetidos
            repitedIndex = 0
            for x in best_cryptos:
                if x['Crypto_Name'] not in repited_cryptos:
                    print("\t-" + x['Crypto_Name'], x['Crypto_Price'])  # Solo muestra esos valores
                    repited_cryptos.append(x['Crypto_Name'])
                else:
                    repitedIndex = repitedIndex + 1

            print("Data uploaded succesfully\n"
                  "\t in total " + str(repitedIndex) + " entries were not shown")
            # Closing client
            client.close()


        except mongo.errors.ServerSelectionTimeoutError as timeError:
            print("Exceed time " + str(
                timeError))     # Aunque arriba ponga que es un timeout error si el servidor deniega o no existe una ip tambien redirige aqui el error
        except mongo.errors.ConnectionFailure as connectionError:
            print("Error connecting to server: " + str(connectionError))

        return 0


# Main method
def main():
    index = 0

    # Create an infinite loop to continuously show the price with 1 second offset
    while True:

        # Get the price of the crypto currency

        for x in range(len(crypto_list)):
            crypto_prices[x] = float(getCryptoPrice(crypto_list[x]) ) # Recorre la lista de cryptos para conseguir precios

            if len(crypto_list[x]) > 2:
                print("[*]Crypto: " + str(crypto_list[x].capitalize()) + " (" + crypto_list[x] + "), Price: " + str(crypto_prices[x]) + "€")
            else:
                print("[*]Crypto: " + str(crypto_list[x][0].capitalize()) + " (" + crypto_list[x][1] + "), Price: " + str(crypto_prices[x]) + "€")
        index = index +1
        time.sleep(2)

        # Update data into DataBase(MongoDB) every 1 second
        updateDataBase(crypto_list, crypto_prices)

        # Checking how many inserts have been made
        print("Succesfully updated " + str(index) + " Times\n")
        time.sleep(5)   # Antes estaba puesto 3

# Y aver si funciona pos claro k siii...
main()


# Por tema de red en la actualizacion nª 277 se a petau al devolver null una query de internet
# Espero que con  el try-exception se solucione el error y que siga runeando
# porcierto nuestros datos son utiles y reales mas k en coinmarketcap