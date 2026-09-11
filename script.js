const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputField");
const searchIcon = document.querySelector("#searchIcon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityName = document.querySelector("#city");
const wind = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const goHome = document.querySelector(".homeBtn");
const icon = document.querySelector("#icon");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");

startBtn.addEventListener("click", () => {
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
})

function changeIcon(weatherMain) {
    let icons = {
        Clouds: "clouds.png",
        Rain: "rain.png",
        Mist: "mist.png",
        Haze: "haze.png",
        Snow: "snow.png",
        Clear: "clear.png"
    };
    icon.src = icons[weatherMain] || "clear.png";
}


const url = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "6a732d0cb3b27cc889904b6956d29288"

async function getWeatherData(city) {
    let finalUrl = `${url}q=${city}&appid=${apiKey}`;
    let weatherData = await fetch(finalUrl).then(res => res.json());
    console.log(weatherData);

    if (weatherData.cod == 404) {
        mainBox2.classList.add("inactive");
        mainBox3.classList.remove("inactive");
        desc.innerHTML = "desciption";
        temp.innerHTML = "0°C";
        cityName.innerHTML = "New York";
        wind.innerHTML = "0km/h";
        humidity.innerHTML = "0%";
        search.value="";
        icon.src="images/clear.png";

        return;

    }


    desc.innerHTML = weatherData.weather[0].description;
    temp.innerHTML = Math.round(weatherData.main.temp - 273.15) + "°C";
    cityName.innerHTML = weatherData.name;
    wind.innerHTML = weatherData.wind.speed + "km/h";
    humidity.innerHTML = weatherData.main.humidity + "%";

    changeIcon(weatherData.weather[0].main);

}

searchIcon.addEventListener("click", () => {
    getWeatherData(search.value);
})

search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeatherData(search.value);
    }
})

goHome.addEventListener("click", () => {
    mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");
})
