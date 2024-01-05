const day = document.querySelector(".day");
const date=document.querySelector(".datee");
const temp =document.querySelector(".temp");
const wind = document.querySelector(".wind");
const airp = document.querySelector(".air");
const humidity = document.querySelector(".humidity");
const wcondition = document.querySelector(".wcondition");
const visible = document.querySelector(".visible");
const visible_s = document.querySelector(".visible_text");
const sunrise = document.querySelector(".sun");
const sunset = document.querySelector(".sun_text");
const main_weather=document.querySelector("#mainw");
function getday(){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let now = new Date();

    let month=["January","February","March","April","May","June","July","August","September","October","November","December"]

    day.innerText = days[now.getDay()];
    date.innerText = `${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()}`;
}
getday();

function getip(){
    fetch("https://geolocation-db.com/json/" ,{method:"GET",})
    .then((Response)=>Response.json())
    .then((data)=>{
        console.log(data);
        // let currentcity = data.currentcity;
        getweather(data.city);
    })
}
getip();
function getweather(city){
    let apikey = "8f8dca08f137b492cfd3dda51ab0addb";
    // let apikey2 ="sdEy1tNru1mOoA9ATZGjiU7hNevsstKx"
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&q=${city}`,{method:"GET",})
    .then((Response)=>Response.json())
    .then((data)=>{
        temp.textContent=(data.main.temp).toFixed(1);
        wind.textContent = (data.wind.speed)+" m/s";
        airp.textContent = data.main.pressure+" hpa";
        updatehumidity(data.main.humidity);
        updatevisibility(((data.visibility)/1000).toFixed(2));
        wcondition.textContent = (data.weather[0].main);
        // visible.textContent = ((data.visibility)/1000).toFixed(2) +" km";
        // visible_s.textContent=data.weather[0].description;
        sunrise.textContent=sunrises(data.sys.sunrise);
        sunset.textContent=sunsets(data.sys.sunset);
        main_weather.src =icon_update(data.weather[0].description) 
    });
}
function sunrises(unixTimestamp) {
    const utcMilliseconds = unixTimestamp * 1000;
    const dateObject = new Date(utcMilliseconds);
  
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
    return `${formattedHours}:${minutes} ${ampm}`;
}
function sunsets(unixTimestamp) {
    const utcMilliseconds = unixTimestamp * 1000;
    const dateObject = new Date(utcMilliseconds);
  
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
    return `${formattedHours}:${minutes} ${ampm}`;
}

function updatehumidity(humidity1){
    humidity.textContent =humidity1+" %";
    const humiditystatus = document.querySelector(".humidity_text");
    if(humidity1<=30){
        humiditystatus.textContent="Low";
    }else if(humidity1<=60){
        humiditystatus.textContent="Moderate";
    }else{
        humiditystatus.textContent="High";
    }
     
}

function updatevisibility(visible1){
    visible.textContent = visible1 + "km";
    if(visible1<=0.3){
        visible_s.textContent ="Dense Fog"
    }else  if(visible1<=0.16){
        visible_s.textContent ="Moderate Fog"
    
    }else  if(visible1<=0.35){
        visible_s.textContent ="Light Fog"
    
    }else  if(visible1<=2.16){
        visible_s.textContent ="Light Mist"
    }else  if(visible1<=8.4){
        visible_s.textContent ="Very Light Mist"
    
    }else{
        visible_s.textContent ="Clear Air"}
}