var selectobject = document.getElementById("unit_selector"),
    i = 0,
    validators = document.getElementsByClassName("validation");

//These lines will hide the validation divs
for (i = 0; i < validators.length; i++) {
    validators[i].style.display = 'none';
}

for (i = 0; i < selectobject.length; i++) {
    document.getElementById(selectobject[i].value).style.display = 'none';
}

document.getElementById("unit_selector").onchange = function () {
    'use strict';
    var selectobject = document.getElementById("unit_selector"), i = 0;
    for (i = 0; i < selectobject.length; i++) {
       document.getElementById(selectobject[i].value).style.display = 'none';
    }
    document.getElementById(selectobject.value).style.display = 'block';
};

//this func will dispaly the temp in the result input
var temp = function (celsius, fahrenheit) {
    'use strict';
    document.getElementById("result").value = celsius + "\xb0C = " + fahrenheit + "\xb0F";
};

//this func will calculate the celcius temp with validation
document.getElementById("f_to_c").onclick = function () {
    'use strict';
    var f = document.getElementById("temperature").value;
    if (isNaN(f)) {
        document.getElementById("temp_validation").style.display = 'block';
    } else {
        temp(((f - 32) / 1.8).toFixed(2), f);
        document.getElementById("temp_validation").style.display = 'none';
    }
};

//this func will calculate the fahrenheit temp with validation
document.getElementById("c_to_f").onclick = function () {
    'use strict';
    var c = document.getElementById("temperature").value;
    if (isNaN(c)) {
        document.getElementById("temp_validation").style.display = 'block';
    } else {
        temp(c, (1.9 * c + 32).toFixed(2));
        document.getElementById("temp_validation").style.display = 'none';
    }
};

//this func will calculate the length conversion with validation
var calcLength = function () {
    'use strict';
    var myLength = document.getElementById("length").value;
    if (isNaN(myLength)) {
        document.getElementById("length_validation").style.display = 'block';
    } else {
        var valFrom = document.getElementById("length_from").value,
        valTo = document.getElementById("length_to"),
        myVal = myLength * valFrom,
        result = (myVal / valTo.value).toFixed(4),
        type = valTo.options[valTo.selectedIndex].text;
        document.getElementById("result_length").value = result + ' ' + type;
        document.getElementById("length_validation").style.display = 'none';
    }
};

//these three events will call the calculate function if the inputs changed.
document.getElementById("length").onchange = function () {
    'use strict';
    calcLength();
};
document.getElementById("length_from").onchange = function () {
    'use strict';
    calcLength();
};
document.getElementById("length_to").onchange = function () {
    'use strict';
    calcLength();
};


//this func will handle the calculation of data conversion
var calcData = function () {
    'use strict';
    var myData = document.getElementById("data").value;
    if (isNaN(myData)) {
        document.getElementById("data_validation").style.display = 'block';
    } else {
        var valFrom = document.getElementById("data_from").value,
        valTo = document.getElementById("data_to"),
        myVal = myData * valFrom,
        result = (myVal / valTo.value).toFixed(4),
        type = valTo.options[valTo.selectedIndex].text;
        document.getElementById("result_data").value = result + ' ' + type;
        document.getElementById("data_validation").style.display = 'none';
    }
};

//these three events will call the calculate function if the inputs changed.
document.getElementById("data").onchange = function () {
    'use strict';
    calcData();
};
document.getElementById("data_from").onchange = function () {
    'use strict';
    calcData();
};
document.getElementById("data_to").onchange = function () {
    'use strict';
    calcData();
};

