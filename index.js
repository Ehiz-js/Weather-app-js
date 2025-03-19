const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const apiKey = "6e74acf40f798d75a6c0f6dc07e7875d";

weatherForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	city = cityInput.value;
	invalidInput = [
		"africa",
		"asia",
		"antarctica",
		"america",
		"south america",
		"north america",
		"europe",
		"australia",
		"earth",
		"globe",
	];

	if (city && !invalidInput.includes(city.toLowerCase())) {
		try {
			const weatherData = await getWeatherData(city);
			displayWeatherData(weatherData);
		} catch (error) {
			displayError(error);
		}
	} else {
		displayError("Please Enter a city");
	}
});

async function getWeatherData(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Could not fetch weather");
	}
	return await response.json();
}

function displayWeatherData(data) {
	console.log(data);
	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const weatherEmoji = document.createElement("p");

	cityDisplay.textContent = data.name;
	tempDisplay.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
	humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
	descDisplay.textContent = data.weather[0].description;
	weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);

	cityDisplay.classList.add("cityDisplay");
	tempDisplay.classList.add("tempDisplay");
	humidityDisplay.classList.add("humidityDisplay");
	descDisplay.classList.add("descDisplay");
	weatherEmoji.classList.add("weatherEmoji");

	card.textContent = "";
	card.style.display = "flex";

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(weatherEmoji);
}

function getWeatherEmoji(id) {
	switch (true) {
		case id >= 200 && id < 300:
			return "⛈️";
		case id >= 300 && id < 400:
			return "🌧️";
		case id >= 500 && id < 600:
			return "🌧️";
		case id >= 600 && id < 700:
			return "❄️";
		case id >= 700 && id < 800:
			return "🌁";
		case id === 800:
			return "☀️";
		case id > 800 && id < 900:
			return "☁️";
	}
}

function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("cityDisplay");
	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
