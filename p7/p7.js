/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/
$(document).ready(function () {
    'use strict';
    $('#sign-up').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username != "" && password != "") {
            var url = $('#loginForm').attr('action');
            var data = {
                'signup': true
                , 'username': username
                , 'password': password
            }
            $.post(url, data, function (response) {
                if (response == -1) {
                    Command: toastr["error"]("Username already taken!", "Failed")
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }
                else if (response == 0) {
                    Command: toastr["error"]("Error creating user!", "Failed")
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }
                else {
                    Command: toastr["success"]("Successfully created account!", "Success")
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }
            }).fail(function (e) {
                alert("error" + e);
            });
        }
    });
    $('#login').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username != "" && password != "") {
            var url = $('#loginForm').attr('action');
            var data = {
                'login': true,
                'username': username,
                'password': password
            };
            $.post(url, data, function (response) {
                alert(response);
            }).fail(function (e) {
                alert("error" + e);
            });
        }
    });
});