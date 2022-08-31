
var alarmsObj = [];



var currentDay = document.getElementById('day');
var currentDate = document.getElementById('date');
var currentHour = document.getElementById('hour');
var currentSec = document.getElementById('second');

function displayCurrentTime() {

    var date = new Date();

    let day = String(date).substring(0, 3);

    if (day === 'Mon') {
        day = 'Monday';
    }

    else if (day === 'Tue') {
        day = 'Tuesday';
    }

    else if (day === 'Wed') {
        day = 'Wednesday';
    }

    else if (day === 'Thu') {
        day = 'Thursday';
    }

    else if (day === 'Fri') {
        day = 'Friday';
    }

    else if (day === 'Sat') {
        day = 'Saturday';
    }

    else if (day === 'Sun') {
        day = 'Sunday';
    }

    let hour = date.getHours();

    hour = hour % 12;

    if (hour == 0) {
        hour = 12;
    }

    if (Number(hour) < 10) {
        hour = '0' + "" + hour;
    }

    let minutes = date.getMinutes();
    if (Number(minutes) < 10) {
        minutes = '0' + "" + minutes;
    }
    let second = date.getSeconds();

    if (second < 10) {
        second = '0' + '' + second
    }

    currentDay.innerText = day;
    currentDate.innerText = String(date).substring(4, 16);
    currentHour.innerText = hour + ":" + minutes;
    currentSec.innerText = second;



    for (let i = 0; i < alarmsObj.length; i++) {
        if ((currentHour.innerText + ':' + second) == `${alarmsObj[i].hour}:${alarmsObj[i].minute}:${alarmsObj[i].seconds}`) {

            alert("Wake up!!!");
            alarmsObj.splice(i, 1);
        }
    }

    setTimeout(displayCurrentTime, 1000);
}

document.body.onload = function () {
    displayCurrentTime();
}


var userHours = document.getElementById('getUserHours');
var userMinutes = document.getElementById('getUserMinutes');
var userSeconds = document.getElementById('getUserSeconds');
var addAlarmButton = document.getElementById('add-alarm');



function createNewAlarmDOM() {

    if (String(userHours.value).length == 1) {
        userHours.value = '0' + '' + String(userHours.value);
    }

    if (String(userMinutes.value).length == 1) {
        userMinutes.value = '0' + '' + String(userMinutes.value);
    }

    console.log(`${userHours.value}:${userMinutes.value}:${userSeconds.value}`);

    if (userHours.value == '' || userHours.value == null || userHours.value == 'undefined' || userHours.value == undefined || userHours.value == '00') {
        alert("Invalid Time format!!! Enter in 12-hr format");
        return;
    }

    const newAlarmObject = {
        hour: userHours.value,
        minute: userMinutes.value,
        seconds: userSeconds.value,
        combinedTime: `${userHours.value}:${userMinutes.value}:${userSeconds.value}`
    }

    alarmsObj.push(newAlarmObject);


    var alarmItem = document.createElement('div');
    alarmItem.classList.add('alarm-items');



    var logo = document.createElement('img');
    logo.setAttribute('src', 'alarm-on.png');
    logo.classList.add('logo');

    var section = document.createElement('section');
    section.classList.add('time-day');


    var alarmTime = document.createElement('span');
    alarmTime.classList.add('time');
    alarmTime.innerHTML = userHours.value + ":" + userMinutes.value + ":" + userSeconds.value

    var day = document.createElement('small');
    day.classList.add('day');
    day.innerHTML = currentDay.innerHTML;

    section.appendChild(alarmTime);
    section.appendChild(day);

    var delButton = document.createElement('img');
    delButton.classList.add('delete');
    delButton.setAttribute('src', 'timer-off.png');

    delButton.onclick = function () {


        const currentAlarmTime = this.parentNode.childNodes[1].childNodes[0].innerHTML;

        for (let i = 0; i < alarmsObj.length; i++) {
            if (alarmsObj[i].combinedTime == currentAlarmTime) {
                alarmsObj.splice(i, 1);
            }
        }

        this.parentNode.remove();

    }

    alarmItem.appendChild(logo);
    alarmItem.appendChild(section);
    alarmItem.appendChild(delButton);

    document.getElementById('alarm-items-wrapper').appendChild(alarmItem);




    document.getElementById('nav-home-tab').classList.toggle('active');
    document.getElementById('nav-home').classList.toggle('show');
    document.getElementById('nav-home').classList.toggle('active');



    document.getElementById('nav-profile-tab').classList.toggle('active');
    document.getElementById('nav-profile').classList.toggle('show');
    document.getElementById('nav-profile').classList.toggle('active');


}

addAlarmButton.addEventListener('click', createNewAlarmDOM);