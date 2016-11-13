/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/
$(document).ready(function () {
    'use strict';
    $("#foo").submit(function (event) {
        event.preventDefault();
        var url = window.location.href + $(this).attr("action");
        var formData = $(this).serialize();
        //supports the ability to send more data meant to be stored in a database
        $.post(url, formData, function (response) {
            $('#formContainer').html(response);
        }); // end post
    });
    $('#firstname').on('keyup', function () {
        var url = './' + $('#babyForm').attr("action");
        var formData = $(this).serialize();
        $.get(url, formData, function (response) {
            $('#selectOptions').append(response);
        });
    });
    var url = './' + $('#babyForm').attr("action");
    $.get(url, function (response) {
        $('#selectOptions').append(response);
        $('.combobox').combobox();
    });
});
