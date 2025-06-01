let apiKey = "c8a35806a0f7457fb8b120448253105"; // Ganti dengan API key WeatherAPI

navigator.geolocation.getCurrentPosition(async function (position) {
    try {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        // Dapatkan nama kota berdasarkan koordinat (reverse geocoding)
        let map = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat},${lon}`);
        let userdata = await map.json();
        let loc = userdata[0].name;

        // Ambil data cuaca dan ramalan
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=5&lang=id`;
        let respond = await fetch(url);
        let data = await respond.json();

        console.log(data);

        // Menampilkan cuaca saat ini
        document.getElementById("city-name").innerHTML = data.location.name;
        document.getElementById("metric").innerHTML = Math.floor(data.current.temp_c) + "°";

        let weatherMain = document.querySelectorAll("#weather-main");
        weatherMain[0].innerHTML = data.current.condition.text;
        weatherMain[1].innerHTML = data.current.condition.text;

        document.getElementById("humidity").innerHTML = data.current.humidity;
        document.getElementById("feels-like").innerHTML = Math.floor(data.current.feelslike_c);
        document.getElementById("temp-min-today").innerHTML = Math.floor(data.forecast.forecastday[0].day.mintemp_c) + "°";
        document.getElementById("temp-max-today").innerHTML = Math.floor(data.forecast.forecastday[0].day.maxtemp_c) + "°";

        // Ikon cuaca saat ini
        const weatherImg = document.querySelector(".weather-icon");
        const weatherImgs = document.querySelector(".weather-icons");
        const condition = data.current.condition.text.toLowerCase();

        let iconSrc = "img/sun.png"; // default
        if (condition.includes("hujan")) {
            iconSrc = "img/rain.png";
        } else if (condition.includes("cerah")) {
            iconSrc = "img/sun.png";
        } else if (condition.includes("salju")) {
            iconSrc = "img/snow.png";
        } else if (condition.includes("awan") || condition.includes("asap")) {
            iconSrc = "img/cloud.png";
        } else if (condition.includes("kabut")) {
            iconSrc = "img/mist.png";
        } else if (condition.includes("haze")) {
            iconSrc = "img/haze.png";
        } else if (condition.includes("badai")) {
            iconSrc = "img/thunderstorm.png";
        }

        weatherImg.src = iconSrc;
        weatherImgs.src = iconSrc;

        // Tampilkan ramalan cuaca 5 hari ke depan
        function displayForecast(data) {
            let forecast = document.getElementById('future-forecast-box');
            let forecastbox = "";

            data.forecast.forecastday.forEach(item => {
                let date = new Date(item.date);
                let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let day = dayName[date.getDay()];
                let desc = item.day.condition.text.toLowerCase();

                let icon = "img/sun.png";
                if (desc.includes("hujan")) icon = "img/rain.png";
                else if (desc.includes("cerah")) icon = "img/sun.png";
                else if (desc.includes("salju")) icon = "img/snow.png";
                else if (desc.includes("awan")) icon = "img/cloud.png";
                else if (desc.includes("kabut")) icon = "img/mist.png";
                else if (desc.includes("haze")) icon = "img/haze.png";
                else if (desc.includes("badai")) icon = "img/thunderstorm.png";

                forecastbox += `
                <div class="weather-forecast-box">
                    <div class="day-weather">
                        <span>${day}</span>
                    </div>
                    <div class="weather-icon-forecast">
                        <img src="${icon}" />
                    </div>
                    <div class="temp-weather">
                        <span>${Math.floor(item.day.avgtemp_c)}°</span>
                    </div>
                    <div class="weather-main-forecast">${item.day.condition.text}</div>
                </div>`;
            });

            forecast.innerHTML = forecastbox;
        }

        displayForecast(data);

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}, () => {
    alert("Aktifkan lokasi dan muat ulang halaman.");
});

