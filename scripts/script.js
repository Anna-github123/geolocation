// navbar attributes change on scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
        $('.fixed-top').css('background', 'transparent');
        $('.nav-link').css('color', '#fff');
        $('nav').css('box-shadow', 'none');
        $('.navbar-light .navbar-toggler-icon').css('background-image', '#fff');
        $('.navbar-light .navbar-toggler').css('border-color', '#fff');
    } else {
        $('.fixed-top').css('background', 'rgba(255, 255, 255)');
        $('.nav-link').css('color', '#000');
        $('nav').css('box-shadow', '0 0 10px 0');
        $('.navbar-light .navbar-toggler-icon').css('background-image', 'firebrick');
        $('.navbar-light .navbar-toggler').css('border-color', 'firebrick');
    }
});

// country fact api
const apiurl = 'https://restcountries.com/v3.1/all';
let countriesData = [];
const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");

// get the id name of the country card
const nigeriaBtn = document.getElementById("nigeria");
const algeriaBtn = document.getElementById("algeria");
const kenyaBtn = document.getElementById("kenya");
const mauritiusBtn = document.getElementById("mauritius");

// loads the selected categories from the api data
function loaddata() {

    fetch(apiurl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }

    }).then(res => res.json())
        .then(jsonData => {

            for (let i = 0; i < jsonData.length; i++) {
                const name = jsonData[i].name.common;
                const officialName = jsonData[i].name.official;
                const capital = jsonData[i].capital;
                const population = jsonData[i].population;
                const area = jsonData[i].area;
                const region = jsonData[i].region;
                const subRegion = jsonData[i].subregion;
                const currencies = jsonData[i].currencies;
                const latitude = jsonData[i].latlng[0];
                const longitude = jsonData[i].latlng[1];
                const flag = jsonData[i].flags.png;
                const languages = jsonData[i].languages;
                const map = jsonData[i].maps.openStreetMaps;
                const timezones = jsonData[i].timezones[0];

                countriesData.push({
                    "name": name,
                    "officialName": officialName,
                    "capital": capital,
                    "population": population,
                    "area": area,
                    "region": region,
                    "subRegion": subRegion,
                    "currencies": currencies,
                    "latitude": latitude,
                    "longitude": longitude,
                    "flag": flag,
                    "languages": languages,
                    "map": map,
                    "timezones": timezones
                })
            }

            console.log(countriesData)

        }).catch((error) => {
            console.log(error);
        })
}

window.onload = loaddata;

// adding an event listener to add action to selecting a country card
nigeriaBtn.addEventListener('click', () => {
    localStorage.setItem('current', 'Nigeria');
})
algeriaBtn.addEventListener('click', () => {
    localStorage.setItem('current', 'Algeria');
})
kenyaBtn.addEventListener('click', () => {
    localStorage.setItem('current', 'Kenya');
})
mauritiusBtn.addEventListener('click', () => {
    localStorage.setItem('current', 'Mauritius');
})