const day = document.querySelector(".day"),
 date=document.querySelector(".datee"),
 temp =document.querySelector(".temp"),
 wind = document.querySelector(".wind"),
 airp = document.querySelector(".air"),
 humidity = document.querySelector(".humidity"),
 wcondition = document.querySelector(".wcondition"),
 visible = document.querySelector(".visible"),
 visible_s = document.querySelector(".visible_text"),
 sunrise = document.querySelector(".sun"),
 sunset = document.querySelector(".sun_text"),
 uv = document.querySelector(".uv"),
 uv_s = document.querySelector(".uv_text"),
 weekforecast = document.querySelector(".weektemp"),
 main_weather=document.querySelector("#mainw");
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
        getweather(data.city);
        getrestparameter(data.city);
    })
}
getip(); 
function getweather(city){
    let apikey = "8f8dca08f137b492cfd3dda51ab0addb";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&q=${city}`,{method:"GET",})
    .then((Response)=>Response.json())
    .then((data)=>{
        // temp.textContent=(data.main.temp).toFixed(1);
        wind.textContent = (data.wind.speed)+" km/s";
        airp.textContent = data.main.pressure+" hpa";
        updatehumidity(data.main.humidity);
        updatevisibility(((data.visibility)/1000).toFixed(2));
        wcondition.textContent = (data.weather[0].description);
        sunrise.textContent=sunrises(data.sys.sunrise);
        sunset.textContent=sunsets(data.sys.sunset);
        // main_weather.src =updateicon(data.weather[0].icon) 
    });  
}

function getrestparameter(city){
    let apikey ="556W6Z7EX2GT2SRFZCR254SUR";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apikey}&iconSet=icons2`,{method:"GET",})
    .then((Response)=>Response.json())
    .then((data)=>{
        let today = data.currentConditions;
        updateuv(data.days[0].uvindex);
        updateforecast(data.days);
        main_weather.src =updateicon(today.icon);
        temp.textContent=(today.temp);
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
    humidity.textContent =humidity1+"%";
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
    visible.textContent = visible1 + " km";
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

function updateicon(icon1){
    if(icon1=="50d" || icon1=="wind" ||icon1=="fog"){
        return "icon/50d.png";
    }else if(icon1=="01d" || icon1=="clear-day" || icon1=="clear-night"){
        return "icon/01d.png";
    }else if(icon1=="02d" || icon1=="partly-cloudy-day" ||icon1=="partly-cloudy-night"){
        return "icon/02d.png";
    }else if(icon1=="03d" || icon1==""){
        return "icon/03d.png";
    }else if(icon1=="04d" || icon1=="cloudy"){
        return "icon/04d.png";
    }else if(icon1=="09d" || icon1=="showers-day"||icon1=="showers-night"){
        return "icon/09d.png";
    }else if(icon1=="10d" || icon1=="rain"){
        return "icon/10d.png";
    }else if(icon1=="11d" || icon1=="thunder-showers-day"||icon1=="thunder-rain"||icon1=="thunder-showers-night"){
        return "icon/11d.png";
    }else if(icon1=="13d" || icon1=="snow"||icon1=="snow-showers-night"||icon1=="snow-showers-day"){
        return "icon/13d.png";
    };
}

function updateuv(uv1){
    uv.textContent = uv1;
    if (uv1<=2){
        uv.textContent = uv1 +2;
        uv_s.textContent ="Low";
    }else if(uv1<=5){
        uv_s.textContent="Moderate";
    }else if(uv1<=7){
        uv_s.textContent="High";
    }else if(uv1<=10){
        uv_s.textContent="Very High";
    }else{
        uv_s.textContent="Extreme";}
}

function getdayname(data){
    let day = new Date(data);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log()
    return days[day.getDay()];
}
function updateforecast(data){
    weekforecast.textContent="";
    let day = 0;
    for(let i=0;i<7;i++){
        let card = document.createElement("div");
        card.classList.add("card");
        let dayname = getdayname(data[day].datetime);
        let daytemp = data[day].temp;
        let iconsrc = updateicon(data[day].icon);
    
    card.innerHTML = `
    <div class="wtempchild">
                    <div class="day_name temptext">${dayname}</div>
                    <div class="weather_icon"><img id="weekimg" src="${iconsrc}"></div>
                    <div class="day_temp temptext">
                        <span class="dtemp">${daytemp}</span>
                        <span>°C</span>
                    </div>
                </div>
    `
    weekforecast.appendChild(card);
    day++;
    }
}
