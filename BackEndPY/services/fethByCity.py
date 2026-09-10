import requests

def getCoordinate(cityName):
    data = requests.get(f'https://geocoding-api.open-meteo.com/v1/search?name={cityName}').json()
    print(data)
    if data.get('results'):
        print(data)
        print(data.results)
        return data.results
    else:
        return []

# def getForecast(cityName):
#     res = getCoordinate(cityName)
#     objectCoordinate = res[0]
#     print(objectCoordinate)


# getForecast('berlin')

getCoordinate('berlin')