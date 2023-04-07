// navbar attributes change on scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
        $('.fixed-top').css('background', 'transparent');
        $('.nav-link').css('color', '#fff');
        $('nav').css('box-shadow', 'none');
        $('.navbar-light .navbar-toggler-icon').css('background-color', '#fff');
        $('.navbar-light .navbar-toggler').css('border-color', '#fff');
    } else {
        $('.fixed-top').css('background', 'rgba(255, 255, 255)');
        $('.nav-link').css('color', '#000');
        $('nav').css('box-shadow', '0 0 10px 0');
        $('.navbar-light .navbar-toggler-icon').css('background-color', 'firebrick');
        $('.navbar-light .navbar-toggler').css('border-color', 'firebrick');
    }
});

// seleted data to be displayed on the table and chart because the data provided by the api was not consistent in all countries although the had the same number of arrays (54)
const tableColumns = ['Price per square meter to Buy Apartment in City Center', 'International Primary School, Yearly for 1 Child', 'Beef Round or Equivalent Back Leg Red Meat, 1 kg ', 'Loaf of Fresh White Bread, 0.5 kg', 'McMeal at McDonalds or Alternative Combo Meal', 'Fitness Club, Monthly Fee for 1 Adult', 'Cinema ticket, 1 Seat', 'Banana, 1 kg', 'Coca-Cola, 0.33 liter Bottle', 'Pack of Cigarettes', 'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL']
const chartColumns = ['Taxi, price for 1 km, Normal Tariff', 'Water, 1.5 liter Bottle', 'Gasoline, 1 liter', 'One-way Ticket, Local Transport']

var chart1 = null;
var chart2 = null;

// function for creatTable1
function myFunction1() {
    var cap1 = document.getElementById("country1").value;
    var x1 = document.getElementById("country1").selectedIndex;
    var y1 = document.getElementById("country1").options;
    var country_name1 = y1[x1].text;
    document.getElementById("demo1").innerHTML = cap1;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6838554010mshd78deea62eb2860p1c49dfjsn3e3d13e31882',
            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
            'Accept': 'application/json'
        }
    };

    let finalURL1 = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cap1}&country_name=${country_name1}`;
    fetch(finalURL1, options)
        .then(response => response.json())
        .then(data => {
            const country1Data = []

            console.log(data)
            const filteredData = []
            for (let a = 0; a < tableColumns.length; a++) {
                filteredData.push(data.prices.filter(price => price.item_name === tableColumns[a]))
            }

            for (let a = 0; a < chartColumns.length; a++) {
                country1Data.push(data.prices.filter(price => price.item_name === chartColumns[a]))
            }

            createTable1(filteredData)

            const ctx = document.getElementById('myChart1');
            const categoryName = []
            const avergagePrice1 = []
            const minPrice1 = []
            const maxPrice1 = []

            console.log(country1Data)

            // loop for item name
            for (let i = 0; i < country1Data.length; i++) {
                categoryName.push(country1Data[i].item_name);
            };

            // loop for min, max and average prices
            for (let i = 0; i < country1Data.length; i++) {
                minPrice1.push(country1Data[i][0].min);
                maxPrice1.push(country1Data[i][0].max);
                avergagePrice1.push(country1Data[i][0].avg);
            };

            // plots information on chart
            const plotData = {
                labels: ['min', 'average', 'max'],
                datasets: [
                    {
                        label: 'Taxi Cost',
                        data: [minPrice1[0], avergagePrice1[0], maxPrice1[0]]
                    },
                    {
                        label: 'Water Cost',
                        data: [minPrice1[1], avergagePrice1[1], maxPrice1[1]]
                    },
                    {
                        label: 'Gasoline Cost',
                        data: [minPrice1[2], avergagePrice1[2], maxPrice1[2]]
                    },
                    {
                        label: 'Local Transport Cost',
                        data: [minPrice1[3], avergagePrice1[3], maxPrice1[3]]
                    }

                ]
            }

            // to display chart
            if (chart1 != null) {
                chart1.destroy()
            }
            let delayed;
            chart1 = new Chart(ctx, {
                type: 'bar',
                data: plotData,
                borderWidth: 1,
                options: {
                    responsive: true,
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 300 + context.datasetIndex * 100;
                            }
                            return delay;
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                            },
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            position: 'top',
                            text: 'Comparing the Cost of Living with the following Factors',
                            fontSize: 18,
                            fontColor: '#111'
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        layout: {
                            autoPadding: true
                        }
                    }
                }
            });
        })
        .catch(err => console.error(err));
}

// function for creatTable2
function myFunction2() {
    var cap2 = document.getElementById("country2").value;
    var x2 = document.getElementById("country2").selectedIndex;
    var y2 = document.getElementById("country2").options;
    var country_name2 = y2[x2].text;
    document.getElementById("demo2").innerHTML = cap2;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6838554010mshd78deea62eb2860p1c49dfjsn3e3d13e31882',
            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
            'Accept': 'application/json'
        }
    };

    let finalURL2 = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cap2}&country_name=${country_name2}`;
    fetch(finalURL2, options)
        .then(response => response.json())
        .then(data => {
            const filteredData = []
            const country2Data = []
            for (let a = 0; a < tableColumns.length; a++) {
                filteredData.push(data.prices.filter(price => price.item_name === tableColumns[a]))
            }

            for (let a = 0; a < chartColumns.length; a++) {
                country2Data.push(data.prices.filter(price => price.item_name === chartColumns[a]))
            }

            createTable2(filteredData)

            const ctx = document.getElementById('myChart2');
            const avergagePrice2 = []
            const minPrice2 = []
            const maxPrice2 = []

            // loop for min, max and average prices
            for (let i = 0; i < country2Data.length; i++) {
                minPrice2.push(country2Data[i][0].min);
                maxPrice2.push(country2Data[i][0].max);
                avergagePrice2.push(country2Data[i][0].avg);
            };

            // plots information on chart
            const plotData = {
                labels: ['min', 'average', 'max'],
                datasets: [
                    {
                        label: 'Taxi Cost',
                        data: [minPrice2[0], avergagePrice2[0], maxPrice2[0]]
                    },
                    {
                        label: 'Water Cost',
                        data: [minPrice2[1], avergagePrice2[1], maxPrice2[1]]
                    },
                    {
                        label: 'Gasoline Cost',
                        data: [minPrice2[2], avergagePrice2[2], maxPrice2[2]]
                    },
                    {
                        label: 'Local Transport Cost',
                        data: [minPrice2[3], avergagePrice2[3], maxPrice2[3]]
                    }
                ]
            }

            // to display chart
            if (chart2 != null) {
                chart2.destroy()
            }
            let delayed;
            chart2 = new Chart(ctx, {
                type: 'bar',
                data: plotData,
                borderWidth: 1,
                options: {
                    responsive: true,
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 300 + context.datasetIndex * 100;
                            }
                            return delay;
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                            },
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            position: 'top',
                            text: 'Comparing the Cost of Living with the following Factors',
                            fontSize: 18,
                            fontColor: '#111'
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        layout: {
                            autoPadding: true
                        }
                    }
                }
            });
        })
        .catch(err => console.error(err));
}

// to create and display table
function createTable1(data) {

    result1.innerHTML = "";

    var table = "<table>";
    // add a row for item name and cost in usd
    table += `<tr>
                    <th>Item Name</th>
                    <th colspan="3">Cost In USD($)</th>
                  </tr>`;
    // now add another row to show min, average and max costs
    table += `<tr>
                    <th></th>
                    <th>Min</th>
                    <th>Avg</th>
                    <th>Max</th>
                  </tr>`;
    // now loop through cities
    // show their cost of living and prices in usd
    var tr = "";
    for (let i = 0; i < data.length; i++) {

        tr += "<tr>";
        tr += `<td>${data[i][0].item_name}</td>`;
        for (var key in data[i][0].usd) {
            tr += `<td>${data[i][0].usd[key]}</td>`;
        }
        tr += "</tr>"
    }
    table += tr + "</table>";

    // append table to body
    result1.innerHTML += table;
}

// to create and display table
function createTable2(data) {

    result2.innerHTML = "";

    var table = "<table>";
    // add a row for item name and cost in usd
    table += `<tr>
                    <th>Item Name</th>
                    <th colspan="3">Cost In USD($)</th>
                  </tr>`;
    // now add another row to show min, average and max costs
    table += `<tr>
                    <th></th>
                    <th>Min</th>
                    <th>Avg</th>
                    <th>Max</th>
                  </tr>`;
    // now loop through cities
    // show their cost of living and prices in usd
    var tr = "";
    for (let i = 0; i < data.length; i++) {
        tr += "<tr>";
        tr += `<td>${data[i][0].item_name}</td>`;
        for (var key in data[i][0].usd) {
            tr += `<td>${data[i][0].usd[key]}</td>`;
        }
        tr += "</tr>"
    }
    table += tr + "</table>";

    // append table to body
    result2.innerHTML += table;
}