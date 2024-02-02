
    // Selecting DOM elements for search input, search button, and weather icon
    const searchInput = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
    const image = document.querySelector('.icon');
    const form = document.querySelector("form");
    
    // Function to fetch weather data for a given city
    async function getWeather(city) {
        try {
            // Fetching weather data from the OpenWeatherMap API
            var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0439d6dee489d890a8909b29b32242b8&units=metric`);
            
            // Display error message if city not found (404)
            if (res.status == 404) {
                document.querySelector('.error').style.display = 'block';
            } else {
                document.querySelector('.error').style.display = 'none';
            }
            
            // Parsing fetched data
            var data = await res.json();

            // Updating the DOM with weather data
            document.querySelector(".celcius").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".humidityP").innerHTML = Math.round(data.main.humidity) + "%";
            document.querySelector(".windS").innerHTML = Math.round(data.wind.speed) + "km/h";
            document.querySelector(".pressureP").innerHTML = Math.round(data.main.pressure) + "pa";

            // Updating weather icon based on weather condition
            if (data.weather[0].main == "Clouds") {
                image.src = "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/mist_e7wtad.png";
            } else if (data.weather[0].main == "Clear") {
                image.src = "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/clear_kvhkfp.png";
            } else if (data.weather[0].main == "Rain") {
                image.src = "rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                image.src = "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/drizzle_c1im8a.png";
            } else if (data.weather[0].main == "Mist") {
                image.src = "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383275/clouds_emacdt.png";
            }
            // Display date and weekday
            const timestamp = data.dt * 1000; // Convert seconds to milliseconds
            const date = new Date(timestamp);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            document.querySelector(".date").innerHTML = `${formattedDate}`;
        } catch (error) {
            // Handling errors during fetching or parsing
            console.error("Error fetching weather data:", error);
        }
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        getWeather(searchInput.value);
    });

    // Event listener for the search input, triggered when Enter key is pressed
    // searchInput.addEventListener('keypress', function (e) {
    //     if (e.key === 'Enter') {
    //         getWeather(searchInput.value);
    //     }
    // });

    getWeather("Horsham");

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });


    // Function to create a new section with weather data
    function createWeatherSection(data) {
        const container = document.querySelector('.container2');

        // Create a new section element
        const section = document.createElement('div');
        section.classList.add('weather');

        // Create elements for weather data
        const icon = document.createElement('img');
        icon.src = getWeatherIcon(data.weather[0].main);
        icon.classList.add('icon');

        const temperature = document.createElement('h1');
        temperature.classList.add('celcius');
        temperature.innerHTML = Math.round(data.main.temp) + "°C";

        const city = document.createElement('h2');
        city.classList.add('city');
        city.innerHTML = data.name;

        const dateTime = document.createElement('div');
        dateTime.classList.add('date-time');
        const timestamp = data.dt * 1000; // Convert seconds to milliseconds
        const date = new Date(timestamp);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        dateTime.innerHTML = formattedDate;

        const details = document.createElement('div');
        details.classList.add('details');

        // ... (create elements for humidity, pressure, wind, etc.)

        // Append elements to the section
        section.appendChild(icon);
        section.appendChild(temperature);
        section.appendChild(city);
        section.appendChild(dateTime);
        section.appendChild(details);

        // Append the section to the container
        container.appendChild(section);
    }

    // Helper function to get weather icon based on weather condition
    function getWeatherIcon(weatherCondition) {
        switch (weatherCondition) {
            case "Clouds":
                return "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/mist_e7wtad.png";
            case "Clear":
                return "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/clear_kvhkfp.png";
            case "Rain":
                return "rain.png";
            case "Drizzle":
                return "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/drizzle_c1im8a.png";
            case "Mist":
                return "https://res.cloudinary.com/dppoa51hp/image/upload/v1704383275/clouds_emacdt.png";
            default:
                return "";
        }
    }

    getWeather("Horsham");


    // Fetch all weather data and create sections
    async function getAllWeatherData() {
        try {
            // Fetching all weather data from the PHP script
            const res = await fetch("http://localhost/weatherapp2/data.php");
            const data = await res.json();

            // Create a section for each set of weather data
            data.forEach(weatherData => {
                createWeatherSection(weatherData);
            });
        } catch (error) {
            // Handling errors during fetching or parsing
            console.error("Error fetching weather data:", error);
        }
    }

    getAllWeatherData();


    // Function to create a weather section
    function createWeatherSection(weatherData) {
        const weatherSection = document.createElement('div');
        weatherSection.classList.add('weather');

        // Update the DOM with weather data
        weatherSection.innerHTML = `
            <img src="${getWeatherIcon(weatherData.weather_condition)}" class="icon" alt="">
            <h1 class="celcius">${Math.round(weatherData.temperature)}°C</h1>
            <h2 class="city">${weatherData.city}</h2>
            <div class="date-time">
                <p class="date">${weatherData.date}</p>
            </div>
            <div class="details"> 
                <div class="col">
                    <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/humidity_suq6cu.png" alt="">
                    <div class="humidity">
                        <p class="humidityP">${Math.round(weatherData.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1706785322/vj4aqz5mfdiutivgr0ke.png" alt="">
                    <div class="pressure">
                        <p class="pressureP">${Math.round(weatherData.pressure)}%</p>
                        <p>Pressure</p>
                    </div>
                </div>
                <div class="col">
                    <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383275/wind_ob5was.png" alt="">
                    <div class="wind">
                        <p class="windS">${Math.round(weatherData.wind)}k/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        `;

        // Append the weather section to the container
        document.querySelector('.container2').appendChild(weatherSection);
    }

    // Function to get weather icon based on weather condition
    function getWeatherIcon(condition) {

    }

    // ... (your existing JavaScript code) ...

    function getWeatherIconUrl(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}.png`;
    }

    // Function to fetch and display weather data for a given city
    async function getAndDisplayWeather(city) {
        try {
            // Fetching weather data from the OpenWeatherMap API
            const res = await fetch(`http://localhost/weatherapp2/data.php?t=${city}`);
            const data = await res.json();

            // Display error message if city not found (404)
            if (res.status == 404) {
                document.querySelector('.error').style.display = 'block';
            } else {
                document.querySelector('.error').style.display = 'none';
            }

            // Update the DOM with the weather data
            createWeatherSection(data);

            // Update the date and time for each weather section
            const timestamp = data.dt * 1000;
            const date = new Date(timestamp);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            document.querySelector(".date").innerHTML = `${formattedDate}`;
        } catch (error) {
            // Handling errors during fetching or parsing
            console.error("Error fetching weather data:", error);
        }
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const cityName = searchInput.value.trim();
        if (cityName !== '') {
            getAndDisplayWeather(cityName);
        }
    });

    // Initial load with a default city (e.g., "Horsham")
    getAndDisplayWeather("Horsham");

    // ... (Other event listeners or code)

    // Display last 7 days data for the default city (Horsham)
    getLast7DaysData("Horsham");


    async function getStoredData() {
        try {
            const res = await fetch('http://localhost/weatherapp2/data.php');
            const storedData = await res.json();

            // Update the DOM with stored data
            const storedDataContainer = document.getElementById('storedData');
            storedDataContainer.innerHTML = ''; // Clear existing content

            storedData.forEach(day => {
                const date = new Date(day.date);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                // Create HTML for each day's stored data
                const storedDataHTML = `<div class="stored-data-item">
                    <p>Date: ${formattedDate}</p>
                    <p>Temperature: ${day.temperature}°C</p>
                    <p>Humidity: ${day.humidity}%</p>
                    <p>Pressure: ${day.pressure}Pa</p>
                    <p>Wind Speed: ${day.wind}km/h</p>
                </div>`;

                storedDataContainer.innerHTML += storedDataHTML;
            });

            // Add a flex container class to make the data display horizontally
                storedDataContainer.classList.add('flex-container');
        } catch (error) {
            console.error("Error fetching stored weather data:", error);
        }
    }

    // Call the function to fetch and display stored data
    getStoredData();


console.log(data);


