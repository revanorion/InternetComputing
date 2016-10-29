/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/

$(document).ready(function () {
    'use strict';

    var i = 0,
        validators = document.getElementsByClassName("validation");

    //These lines will hide the validation divs
    for (i = 0; i < validators.length; i++) {
        validators[i].style.display = 'none';
    }

    var calcCurrency = function () {
        var myCurrency = document.getElementById("currency_input").value;
        if (isNaN(myCurrency)) {
            document.getElementById("currency_validation").style.display = 'block';
        } else {
            var valFrom = document.getElementById("currency_from").value,
                valTo = document.getElementById("currency_to").value;

            var xmlhttp = new XMLHttpRequest();
            //If the state changes to 4 or 200, which are good states unlike 404 or 500, the response will be put into the result
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById("result_currency").value = this.responseText + " " + valTo;
                }
            };
            //This sends a GET request to my php page and passes the currency values by putting them in the URL
            xmlhttp.open("GET", "p5.php?currency_input=" + myCurrency + "&currency_from=" + valFrom + "&currency_to=" + valTo, true);
            xmlhttp.send();

            document.getElementById("currency_validation").style.display = 'none';
        }
    };

    //these three events will call the calculate function if the inputs changed.
    document.getElementById("currency_input").onchange = function () {
        calcCurrency();
    };
    document.getElementById("currency_from").onchange = function () {
        calcCurrency();
    };
    document.getElementById("currency_to").onchange = function () {
        calcCurrency();
    };
});
