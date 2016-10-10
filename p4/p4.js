/*jslint  browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    var testObject = $("#cards").html();

// Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

});
