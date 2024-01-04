const day = document.querySelector(".day");
const date=document.querySelector(".datee")
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&q=${city}`,{method:"GET",})
    .then((Response)=>Response.json())
    .then((data)=>{
        console.log(data);
    });
}