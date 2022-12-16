const container = document.getElementById("sign-in-container");
const signInContainer = document.getElementById("comfirm-sign-in-container");
const settingsContainer = document.getElementById("settings-container");
const confirmTitle = document.getElementById("confirm-title");

var nameID;

var settings = false;

var names = ["Mason", "Benji", "Nicky", "Test", "Mason", "Benji", "Nicky", "Test", "Mason", "Benji", "Nicky", "Test", "Mason", "Benji", "Nicky", "Test"];
var peopleState = [];
var nameButtons = [];

fetch("names.json")
    .then(response => response.json())
    .then(data => {
        names = data.names;
        addNames();
    })
    .catch(err => alert(err));


function addNames() {
    var onLetter = "a";

    names.sort((a, b) =>
        a.localeCompare(b)
    );
    for (var i = 0; i < names.length; i++) {

        if(names[i].substring(0, 1) != onLetter) {
            onLetter = names[i].substring(0, 1);
            var letterText = document.createElement("div");
            letterText.innerText = names[i].substring(0, 1);
            letterText.className = "letter-header";
            container.appendChild(letterText);
        }

        var temp = document.createElement("div");
        temp.innerText = names[i];
        temp.className = "person-clickable";
        temp.id = i;
        nameButtons.push(temp);
        peopleState.push("out");

        temp.addEventListener('click', (e) => {
            checkSignIn(e.target.innerText, e.target.id);
        });

        container.appendChild(temp);
    }
    if (JSON.parse(localStorage.getItem("state-data")) != undefined) {
        peopleState = JSON.parse(localStorage.getItem("state-data"));
        console.log(peopleState);
        updatePeople();
    }
}

function checkSignIn(name, target) {
    var time = new Date();
    nameID = target;
    if (peopleState[nameID] == "out") {
        confirmTitle.innerText = `Are you sure you want to sign in ${name} at ${time.getHours()}:${time.getMinutes()}?`;
    } else {
        confirmTitle.innerText = `Are you sure you want to sign out ${name} at ${time.getHours()}:${time.getMinutes()}?`;
    }
    signInContainer.style.display = "block";
}

function signout(accept) {
    signInContainer.style.display = "none";
    if (accept) {
        if (peopleState[nameID] == "out") {
            peopleState[nameID] = "in";
        } else {
            peopleState[nameID] = "out";
        }
        updatePeople();
        localStorage.setItem("state-data", JSON.stringify(peopleState));
    } else {

    }
}

function toggleSettings() {
    settings = !settings;
    if (settings) {
        settingsContainer.style.display = "block";
    } else {
        settingsContainer.style.display = "none";
    }
}

function resetData() {
    if (confirm("Are you sure you would like to reset sign in & sign out data?")) {
        peopleState = [];
        for (var i = 0; i < names.length; i++) {
            peopleState.push("out");
        }
        localStorage.setItem("state-data", JSON.stringify(peopleState));
        updatePeople();
    }
}

function updatePeople() {
    for (var i = 0; i < names.length; i++) {
        if (peopleState[i] == "out") {
            nameButtons[i].style.backgroundColor = "rgba(0, 0, 0, 0.726)";
        } else {
            nameButtons[i].style.backgroundColor = "rgba(79, 219, 37, 0.726)";
        }
    }
}