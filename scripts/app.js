'use strict'

const KEY = '8d80eaa94bb6744b936899a6e78aa53e'

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&APPID='+KEY;

function HttpGet(url) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
}

HttpGet.prototype.proceed = function(callback) {
    this.ajax.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    }
    this.ajax.open('GET', this.url, true);
    this.ajax.send();
}

function fetch(url) {
    return new HttpGet(url);
}

function $(selector) {
    return document.querySelector(selector);
}

function DOMElement(selector) {
    this.element = $(selector);
}

DOMElement.prototype.select = function(target) {
    this.selected = $(target);
    return this;
}

DOMElement.prototype.click = function(callback){
    this.element.addEventListener('click',event =>{
        event.selected = this.selected;
        callback(event);
    });
}

function find(selector) {
    return new DOMElement(selector);
}

find('.fetch-data').select('.insert-weather').click(event => {
    fetch(API_URL).proceed(response => {
        var weatherData = JSON.parse(response);
        var weatherList = weatherData.list;

        weatherList.forEach(data => {
            console.log(data);
        });

        var tbody = event.selected;
        for(let index = 0; index < 5; index++){
            var time = weatherList[index].dt_txt;
            var date = new Date(time);
            var hour= date.getHours()+ ':00';
            var month = date.getMonth();

            var sonic = weatherList[index].wind.speed;
            var väder = weatherList[index].weather[0].main;
            var värme = weatherList[index].main.temp;
            var timestamp = `
            <tr>
                <td>${hour}</td>
                <td>${väder}</td>
                <td>${värme}</td>
                <td>${sonic}</td>
            </tr>
            `;
            tbody.innerHTML += timestamp;
        }
    });
});

//------------------------------------------------------------------train input/output
const trainInput = document.getElementById('train-input')
const trainOutput = document.getElementById('train-output')
const trainButton = document.getElementById('submit')
const inserTrains = document.getElementById('insert-trains')

trainButton.addEventListener('click', function(){
    let text = trainInput.value;
    trainOutput.innerText =text;
    inserTrains.innerHTML = `<tr>
    <td>42</td>
    <td>10:25</td>
    <td>11:23</td>
</tr>
<tr>
    <td>42</td>
    <td>12:25</td>
    <td>13:23</td>
</tr>
<tr>
    <td>42</td>
    <td>14:25</td>
    <td>15:23</td>
</tr>`;
})

