function clickCounterForever() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount2) {
            localStorage.clickcount2 = Number(localStorage.clickcount2) + 1;
        } else {
            localStorage.clickcount2 = 1;
        }
        document.getElementById("resultForever").innerHTML = localStorage.clickcount2;
    }
    else {
        document.getElementById("resultForever").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
/**
function clickCounter() {
    var d = new Date();
    var n = d.getHours();
    var k = d.getMinutes();
    var l = d.getSeconds();
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }

        document.getElementById("result").innerHTML = localStorage.clickcount;
    }
    else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
    if (n === 0 && k === 0) {
        localStorage.clickcount = 0;
        document.getElementById("result").innerHTML = localStorage.clickcount;
    }
}
**/