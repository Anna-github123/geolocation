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

// removes all the child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// endpoint for the country facts api
const apiurl = 'https://restcountries.com/v3.1/all';

// array to hold processsed country data
let countriesData = [];
const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const resultBox = document.getElementById("search-rec");
const exchangeRates = document.getElementById("ex-rates");

// getting country elements by their id
let countryFlag = document.getElementById("countryFlag");
const countryMap = document.getElementById("countryMap");
const countryName = document.getElementById("countryName");
const countryOffName = document.getElementById("countryOffName");
const countryCapital = document.getElementById("countryCapital");
const countryPopulation = document.getElementById("countryPopulation");
const countryArea = document.getElementById("countryArea");
const countryRegion = document.getElementById("countryRegion");
const countrySubRegion = document.getElementById("countrySubRegion");
const countryCurrencies = document.getElementById("countryCurrencies");
const countryLatitude = document.getElementById("countryLatitude");
const countryLongitude = document.getElementById("countryLongitude");
const countryLanguages = document.getElementById("countryLanguages");
const countryTimezones = document.getElementById("countryTimezones");
const list = document.createElement('ul');

countryInp.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace') {
        removeAllChildNodes(list);
    }
})



// add event listener on the countryInp element, to enable search functionality, clickabe action
countryInp.addEventListener('input', (event) => {
    const value = event.target.value.toUpperCase();
    if (value === '') {
        return;
    }
    const countries = countriesData.map(country => country.name).filter(name => name.toUpperCase().startsWith(value));

    removeAllChildNodes(list);

    for (let i = 0; i < countries.length; i++) {
        const li = document.createElement('li');
        li.className='searchValue'

        li.innerText = countries[i]
        list.appendChild(li);
    }


    resultBox.append(list)
    console.log(list)
    
const boxes = document.querySelectorAll('ul li');

boxes.forEach(box => {
    box.addEventListener('click', (event)=>{
        const value=event.target.firstChild.data
        //console.log(value.data)
        searchCountry(value)
    }
    );
  });

    console.log(list)
    console.log(countries)
})


// function to search for a country diaplaying the below
function searchCountry(countryValue) {

    const country = countryValue.toUpperCase();
    removeAllChildNodes(countryFlag);
    const data = countriesData.filter(data => data.name.toUpperCase() == country);
    const imgNode = document.createElement('img');
    imgNode.src = data[0].flag;
    countryFlag.appendChild(imgNode);
    countryName.innerText = ` Country Name: ${data[0].name}`;
    countryOffName.innerText = ` Country Official Name: ${data[0].officialName}`;
    countryCapital.innerText = ` Country Capital City: ${data[0].capital}`;
    // countryPopulation.innerText = ` Country Population: ${data[0].population}`;
    countryArea.innerText = ` Country Area: ${data[0].area}`;
    countryRegion.innerText = ` Country Region: ${data[0].region}`;
    // countrySubRegion.innerText = ` Country Continent/Sub Region: ${data[0].subRegion}`;
    countryCurrencies.innerText = ` Country Currencies: ${data[0].currencies}`;
    // countryLatitude.innerText = ` Country Latitude: ${data[0].latitude}`;
    // countryLongitude.innerText = ` Country Longitude: ${data[0].longitude}`;
    countryLanguages.innerText = ` Country Language(s): ${data[0].languages}`;
    countryTimezones.innerText = ` Country Timezone: ${data[0].timezones}`;

    // getting country name nad captital data for the exchange rates table
    rates(data[0].capital, data[0].name)

    // object containing map
    let map = {
        center: [data[0].latitude, data[0].longitude],
        minZoom: 5,
        zoom: 5
    }

    var container = L.DomUtil.get("countryMap");

    if (container != null) {
        container._leaflet_id = null;
    }
    let countryMap = L.map('countryMap', map);

    let mapLayer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    countryMap.addLayer(mapLayer)
    let icon = {
        title: data[0].name,
        draggable: true,
    }
    let mapMarker = new L.Marker([data[0].latitude, data[0].longitude], icon);
    mapMarker.addTo(countryMap)
    var popup = new L.popup({ maxWidth: 500 })
        .setLatLng([data[0].latitude, data[0].longitude])
        .setContent(`<b>${data[0].name}</b><br>The sub region/continent of ${data[0].name} is ${data[0].subRegion}<br>The total population of ${data[0].name} is ${data[0].population}`)
        .openOn(countryMap);
    mapMarker.bindPopup(popup)
}

// fetching country data from rest countries api
async function loaddata() {

    const defaultCountry = localStorage.getItem('current');
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
                let currencies = [];
                const latitude = jsonData[i].latlng[0];
                const longitude = jsonData[i].latlng[1];
                const flag = jsonData[i].flags.png;
                let languages = [];
                const map = jsonData[i].maps.openStreetMaps;
                const timezones = jsonData[i].timezones[0];
                if (jsonData[i].currencies != null) {
                    const currencyNames = Object.keys(jsonData[i].currencies);
                    for (let n = 0; n < currencyNames.length; n++) {
                        const currencyName = currencyNames[n]
                        const { [currencyName]: currency } = jsonData[i].currencies
                        currencies.push(currency.name)
                        // console.log(currencies)
                    }
                    const currencySymbols = Object.keys(jsonData[i].currencies);
                    for (let s = 0; s < currencySymbols.length; s++) {
                        const currencySymbol = currencySymbols[s]
                        const { [currencySymbol]: currency } = jsonData[i].currencies
                        currencies.push(currency.symbol)
                        // console.log(currencies)
                    }
                }

                if (jsonData[i].languages != null) {
                    const languageNames = (Object.keys(jsonData[i].languages))
                    for (let l = 0; l < languageNames.length; l++) {
                        const languageName = languageNames[l]
                        const { [languageName]: language } = jsonData[i].languages
                        languages.push(language)
                        // console.log(languages)

                    }

                }

                // adding processed object to country array
                countriesData.push({
                    "name": name,
                    "officialName": officialName,
                    "capital": capital,
                    "population": population,
                    "area": area,
                    "region": region,
                    "subRegion": subRegion,
                    "currencies": currencies.toString(),
                    "latitude": latitude,
                    "longitude": longitude,
                    "flag": flag,
                    "languages": languages.toString(),
                    "map": map,
                    "timezones": timezones,
                })
            }
            console.log(jsonData)

            const data = countriesData.filter(data => data.name == defaultCountry);
            const imgNode = document.createElement('img');
            imgNode.src = data[0].flag
            countryFlag.appendChild(imgNode);
            countryName.innerText = ` Country Name: ${data[0].name}`;
            countryOffName.innerText = ` Country Official Name: ${data[0].officialName}`;
            countryCapital.innerText = ` Country Capital City: ${data[0].capital}`;
            // countryPopulation.innerText = ` Country Population: ${data[0].population}`;
            countryArea.innerText = ` Country Area: ${data[0].area}`;
            countryRegion.innerText = ` Country Region: ${data[0].region}`;
            // countrySubRegion.innerText = ` Country Continent/Sub Region: ${data[0].subRegion}`;
            countryCurrencies.innerText = ` Country Currencies: ${data[0].currencies}`;
            // countryLatitude.innerText = ` Country Latitude: ${data[0].latitude}`;
            // countryLongitude.innerText = ` Country Longitude: ${data[0].longitude}`;
            countryLanguages.innerText = ` Country Languages: ${data[0].languages}`;
            countryTimezones.innerText = ` Country Timezone: ${data[0].timezones}`;
            rates(data[0].capital, data[0].name)
            let map = {
                center: [data[0].latitude, data[0].longitude],
                minZoom: 5,
                zoom: 5
            }

            var container = L.DomUtil.get("countryMap");

            if (container != null) {
                container._leaflet_id = null;
            }
            let countryMap = L.map('countryMap', map);

            let mapLayer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            countryMap.addLayer(mapLayer)
            let icon = {
                title: data[0].name,
                draggable: true,
            }
            let mapMarker = new L.Marker([data[0].latitude, data[0].longitude], icon);
            mapMarker.addTo(countryMap)
            var popup = new L.popup({ maxWidth: 500 })
                .setLatLng([data[0].latitude, data[0].longitude])
                .setContent(`<b>${data[0].name}</b><br>The sub region/continent of ${data[0].name} is ${data[0].subRegion}<br>The total population of ${data[0].name} is ${data[0].population}`)
                .openOn(countryMap);
            mapMarker.bindPopup(popup)

        }).catch((error) => {
            console.log(error);
        })
}

// getting data from the rapid api for exchange rates
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6838554010mshd78deea62eb2860p1c49dfjsn3e3d13e31882',
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
        'Accept': 'application/json'
    }
}
function rates(capital, country_name) {
    removeAllChildNodes(exchangeRates);

    let finalURL2 = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${capital}&country_name=${country_name}`;

    fetch(finalURL2, options)
        .then(response => response.json())
        .then(data => {


            const exchangeRateData = data.exchange_rate

            // to set the exchange rates
            console.log(exchangeRateData)
            const exchangeArray = [exchangeRateData.AUD, exchangeRateData.CAD, exchangeRateData.CHF, exchangeRateData.CNY, exchangeRateData.CZK,
            exchangeRateData.DKK, exchangeRateData.EUR, exchangeRateData.GBP, exchangeRateData.HKD, exchangeRateData.JPY, exchangeRateData.KRW,
            exchangeRateData.NOK, exchangeRateData.NZD, exchangeRateData.RUB, exchangeRateData.SEK, exchangeRateData.UAH, exchangeRateData.USD]

            const currencyNames = ['AUD', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'JPY', 'KRW', 'NOK', 'NZD', 'RUB', 'SEK', 'UAH', 'USD']
            exchangeRates.innerHTML = "";

            var table = "<table>";
            // add a row for currency
            table += `<tr>` + `<th>Currency</th>`
            for (let y = 0; y < currencyNames.length; y++) {

                table += `<th>${currencyNames[y]}</th>`
            }

            table += `</tr>`;
            // now add another row to show exchange rates
            table += `<tr>` + `<th>Exchange Rates to USD</th>`

            for (let y = 0; y < exchangeArray.length; y++) {

                table += `<th>${exchangeArray[y].toFixed(2)}</th>`
            }
            table += `</tr>`;
            var tr = "";

            table += tr + "</table>";

            // append table to body
            exchangeRates.innerHTML += table;
        });
}

// calls the loaddata function to load on window
window.onload = loaddata;

// adds event listener 'click' to search for a country
searchBtn.addEventListener('click', ()=>{
    const country = countryInp.value
    searchCountry(country)
});