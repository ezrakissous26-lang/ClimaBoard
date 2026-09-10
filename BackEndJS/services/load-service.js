export async function getCoordinatesByName(cityName) {
    try {
        const res = await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)).json()
        return res.results
    } catch (error) {
        console.error(error)
        const err =  new Error(error.message)
        err.status = 500
        throw err
    }
}


export async function getWeatherByCoordinates(coordinates) {

    const { latitude, longitude } = coordinates

    try {
        const res = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,apparent_temperature,weather_code&daily=temperature_2m_mean,apparent_temperature_mean,wind_speed_10m_max,weather_code`)).json()
        return res
    } catch (error) {
        const err =  new Error(error.message)
        err.status = 500
        throw err
    }
}