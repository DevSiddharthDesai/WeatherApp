const submitBtn = document.querySelector('.btn');
const inputCity = document.querySelector('.search');
const cityName = document.querySelector('.city');
const currentTemp = document.querySelector('.temp');
const currentWeather = document.querySelector('.weather');
const weatherImg = document.querySelector('img');
const humidity = document.querySelector('.humidity');
const currentDate = document.querySelector('.date');
const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
const errorMsg = document.querySelector('.error'); 
let weatherData;
let city;
let date;

function weatherInfo(city)
{
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            weatherData = JSON.parse(this.responseText);
            if(errorMsg.innerHTML != '')
            {
                errorMsg.innerHTML = "";
            }
        }
        else
        {
            errorMsg.innerHTML = "Provide Correct City Name";
        }
   };

   xhttp.open("GET", `https://api.weatherapi.com/v1/current.json?key=3e4bba3caff04d38b7f183450211108&q=${city}&aqi=no`, false);
   
   xhttp.send();

   return weatherData;
}

submitBtn.addEventListener('click', (e) =>{
    //console.log(inputCity.value);
    e.preventDefault();
    const weatherOutput = weatherInfo(inputCity.value);

    cityName.innerHTML = `${weatherOutput.location.name} , ${weatherOutput.location.country}`;
    city = new Date(weatherOutput.location.localtime);
    city = `${monthNames[city.getMonth()]} ${city.getDate()} ${city.getFullYear()}`;
    currentDate.innerHTML = city;
    currentTemp.innerHTML = `Temp: ${weatherOutput.current.temp_c} &#176;C`;
    currentWeather.innerHTML = `Weather: ${weatherOutput.current.condition.text}`;
    weatherImg.src = `https:${weatherOutput.current.condition.icon}`;
    humidity.innerHTML = `Humidity: ${weatherOutput.current.humidity}`;
});

