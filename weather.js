function $ (selector) {
   return document.querySelector(selector);
}


class Weather {
    constructor(city){
    this.apikey = "bc98fd9adc84acc4fdf81c2c890b01b1";
    this.getWeather(city);
    }


    getWeather(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?" 
        + "q=" + city 
        + "&appid=" + this.apikey 
        + "&units=metric"
        ).then((response) => response.json())
         .then((data) => 
         {          
                    this.displayWeather(data);
         });
    }

    displayWeather(data) {

            if((data.message == "city not found")||(data.cod == "404")||(data.cod =="400")||(data.message == "Nothing to geocode")){
                removeData();
                $(".city").innerText = "City not found";
            }
            else   
            {

           const { name } = data;
           const { icon, description } = data.weather[0];
           const { temp, humidity } = data.main;
           const { speed } = data.wind;

            $(".city").innerText = "Weather in " + name;
            $(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            $(".description").innerText = description;
            $(".temp").innerText = temp + "°C";
            $(".humidity").innerText ="Humidity: " + humidity + "%";
            $(".wind").innerText ="Wind Speed: " + speed + " km/h";
            }
    }
}

function createWeather() {
    let city = $(".search-bar").value;
    if(inputValidation(city)) {
        new Weather(city);
    }
    else {
        removeData();
        $(".city").innerText = "Please enter a valid city";
    }
}

function inputValidation (city) {
     var letter = /^[a-zA-Z]+$/;
    if((city != null)&&(city != "")&&(city.match(letter)))
    {
        return true;
    }
    else
    { 
        return false; 
    }
}

function removeData() {
    $(".city").innerText = "";
    $(".icon").src = "";
    $(".description").innerText = "";
    $(".temp").innerText = "";
    $(".humidity").innerText ="";
    $(".wind").innerText ="";
}

$(".search-bar").addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        createWeather();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    new Weather("Tyrol");
});