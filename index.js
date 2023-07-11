const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchfield");
const form = document.querySelector("form");


let target = "Mumbai";

const fetchData = async (target) => {

    try {

        const url = `http://api.weatherapi.com/v1/current.json?key=a08f6cf5295648c282031125230607&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {
            current: {temp_c,last_updated,condition:{ text,icon }},
            location: {name},
        } = data;
        updateDom(temp_c,name,last_updated,icon,text );

    } catch (error) {
        alert("Location Not Found");
    } 
};

function updateDom(temperate,city,date,icon,text){
    const exactDate = date.split(" ")[0];
    const exactTime = date.split(" ")[1];
    const exactDay = new Date(exactDate).getDay();

    temperateField.innerText = `${temperate}°`;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${Days(exactDay)} - ${exactDate}`;
    emojiField.src = icon;
    weatherField.innerText = text;
}

fetchData(target);

function Days (val) {
    switch (val) {
        case 0:
            return "SunDay";
            break;
        case 1:
            return "MonDay";
            break;
        case 2:
            return "TuesDay";
            break;
        case 3:
            return "WednesDay";
            break;
        case 4:
            return "ThursDay";
            break;
        case 5:
            return "FriDay";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return "Invalid";
            break;
    }
}

const search = (e) => {
    e.preventDefault();
    target = searchField.value;
    console.log(target);
    fetchData(target);
}

form.addEventListener("submit", search);