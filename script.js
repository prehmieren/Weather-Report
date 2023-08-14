let city = "Bangkok"
const apiKey = "ce8d04849695aca90865aa1be94bc81f"

const form = document.getElementById("form")
const search = document.getElementById("search")

function setData() {
    showWeather()
}

async function showWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()
        showDataToUI(data)

    } catch (error) {
        console.log(error);
    }
}

function showDataToUI(data) {
    const city = document.getElementById("city")
    const country = document.getElementById("country")
    const weather = document.getElementById("weather")
    const status = document.getElementById("status")
    const humidity = document.getElementById("humidity")
    const wind = document.getElementById("wind")

    city.innerText = data.name
    country.innerText = data.sys.country
    weather.children[0].innerHTML = calculate(data.main.temp).toFixed(0) + "&deg;"
    weather.children[1].innerHTML = "Max: " + calculate(data.main.temp_max).toFixed(1) + "&deg;" + " Min: " + calculate(data.main.temp_min).toFixed(1) + "&deg;"

    //status
    status.innerText = data.weather[0].main
    humidity.innerText = "Humidity: " + data.main.humidity
    wind.innerText = "Wind Speed: " + data.wind.speed

}

function calculate(k) {
    return k - 273.15
}

function callDataApi(e) {
    e.preventDefault()
    city = search.value;
    showWeather()
}

form.addEventListener("submit", callDataApi)

setData()