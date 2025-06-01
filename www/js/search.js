let apiKey = "c8a35806a0f7457fb8b120448253105"; // Ganti dengan API key WeatherAPI
let searchinput = document.querySelector(".searchinput");

async function search(cityInput) {
    let url = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&lang=id`);

    if (url.ok) {
        let data = await url.json();
        console.log(data);

        let box = document.querySelector(".return");
        box.style.display = "block";

        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "none";

        let weatherImg = document.querySelector(".weather-img");
        document.querySelector(".city-name").innerHTML = data.location.name;
        document.querySelector(".weather-temp").innerHTML = Math.floor(data.current.temp_c) + '°';
        document.querySelector(".wind").innerHTML = Math.floor(data.current.wind_kph / 3.6) + " m/s";
        document.querySelector(".pressure").innerHTML = data.current.pressure_mb + " hPa";
        document.querySelector('.humidity').innerHTML = data.current.humidity + "%";

        // WeatherAPI tidak menyediakan sunrise/sunset langsung di endpoint current.json
        // Jadi ditampilkan sebagai "Data tidak tersedia" atau bisa diambil dari endpoint forecast jika perlu
        document.querySelector(".sunrise").innerHTML = "N/A";
        document.querySelector(".sunset").innerHTML = "N/A";

        let condition = data.current.condition.text.toLowerCase();

        if (condition.includes("hujan")) {
            weatherImg.src = "img/rain.png";
        } else if (condition.includes("cerah")) {
            weatherImg.src = "img/sun.png";
        } else if (condition.includes("salju")) {
            weatherImg.src = "img/snow.png";
        } else if (condition.includes("awan") || condition.includes("asap")) {
            weatherImg.src = "img/cloud.png";
        } else if (condition.includes("kabut")) {
            weatherImg.src = "img/mist.png";
        } else if (condition.includes("haze")) {
            weatherImg.src = "img/haze.png";
        } else if (condition.includes("badai")) {
            weatherImg.src = "img/thunderstorm.png";
        } else {
            weatherImg.src = "img/cloud.png"; // default
        }

    } else {
        document.querySelector(".return").style.display = "none";
        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "block";
    }
}

searchinput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value.trim());
        console.log("worked");
    }
});

