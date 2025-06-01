let apiKey = "c8a35806a0f7457fb8b120448253105"; // Ganti dengan API key WeatherAPI kamu
let searchinput = document.querySelector(".searchinput");
let box = document.querySelector(".box");
let normalMessage = document.querySelector(".normal-message");
let errorMessage = document.querySelector(".error-message");
let addedMessage = document.querySelector(".added-message");

// Tanggal
let date = new Date().getDate();
let months_name = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
let months = new Date().getMonth();
let year = new Date().getFullYear();

let FullDate = document.querySelector(".date");
FullDate.innerHTML = `${months_name[months]} ${date}, ${year}`;

// Ambil data cuaca
async function city(cityName) {
  let url = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=id`
  );

  if (url.ok) {
    let data = await url.json();
    console.log(data);

    let cityBox = document.querySelector(".city-box");

    if (!box) {
      box = document.createElement("div");
      box.className = "box";
      cityBox.appendChild(box);
    }

    let weatherBox = document.createElement("div");
    weatherBox.className = "weather-box";

    let nameDiv = document.createElement("div");
    nameDiv.className = "name";

    let cityElement = document.createElement("div");
    cityElement.className = "city-name city";
    cityElement.innerHTML = data.location.name;

    let tempElement = document.createElement("div");
    tempElement.className = "weather-temp temp";
    tempElement.innerHTML = Math.floor(data.current.temp_c) + "°";

    let weatherIconDiv = document.createElement("div");
    weatherIconDiv.className = "weather-icon";

    let weatherImg = document.createElement("img");
    weatherImg.className = "weather";

    let condition = data.current.condition.text.toLowerCase();

    if (condition.includes("hujan")) {
      weatherImg.src = "img/rain.png";
    } else if (condition.includes("cerah")) {
      weatherImg.src = "img/sun.png";
    } else if (condition.includes("salju")) {
      weatherImg.src = "img/snow.png";
    } else if (condition.includes("berawan") || condition.includes("asap")) {
      weatherImg.src = "img/cloud.png";
    } else if (condition.includes("kabut") || condition.includes("berkabut")) {
      weatherImg.src = "img/mist.png";
    } else if (condition.includes("haze")) {
      weatherImg.src = "img/haze.png";
    } else if (condition.includes("badai")) {
      weatherImg.src = "img/thunderstorm.png";
    } else {
      weatherImg.src = "img/cloud.png"; // default
    }

    weatherIconDiv.appendChild(weatherImg);
    nameDiv.appendChild(cityElement);
    nameDiv.appendChild(tempElement);
    weatherBox.appendChild(nameDiv);
    weatherBox.appendChild(weatherIconDiv);
    box.appendChild(weatherBox);

    return weatherBox;

  } else {
    return "";
  }
}

// toggle tampilan add section
let section = document.querySelector(".add-section");
let navBtn = document.querySelector(".button");
let navIcon = document.querySelector(".btn-icon");

navBtn.addEventListener("click", () => {
  if (section.style.top === "-60rem") {
    section.style.top = "100px";
    navIcon.className = "fa-solid fa-circle-xmark";
  } else {
    section.style.top = "-60rem";
    navIcon.className = "fa-solid fa-circle-plus";
  }
});

// pencarian kota
searchinput.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const weatherInfo = await city(searchinput.value);
    if (weatherInfo) {
      normalMessage.style.display = "none";
      errorMessage.style.display = "none";
      addedMessage.style.display = "block";
    } else {
      normalMessage.style.display = "none";
      errorMessage.style.display = "block";
      addedMessage.style.display = "none";
    }
    box.prepend(weatherInfo);
  }
});

// Default cities
city("Surabaya");
city("Bandung");
city("Bali");
city("Jakarta");
city("Kediri");

