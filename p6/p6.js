/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/
$(document).ready(function () {
    'use strict';

    $('#formContainer').hide();
    $('#results').hide();
    getTop10();

    $('#firstname').on('keyup', function () {
        var url = './' + $('#babyForm').attr("action");
//        var formData = $(this).serialize();
        var data= {
            'firstname':$(this).val(),
            'gender':$("input[name=gender]:checked").val()
        };
        $.post(url, data, function (response) {
                $('#results').html(response);
                $('#results').slideToggle(500);
            }).fail(function (e) {
                alert("error" + e);
            })
    });
    $(document).on('click', '#results li', function () {
        $('#firstname').data('id', $(this).val());
        $('#firstname').val($(this).text());
        $('#results').slideToggle(500);
    });
    $('#firstname').on('focus', function () {
        $('#firstname').val('');
        $('#firstname').data('id', '0');
    });

    $('#babyForm').submit(function (e) {
        e.preventDefault();
        if ($('#firstname').data('id') != 0) {
            var data = {
                'id': $('#firstname').data('id')
            }
            var url = './' + $(this).attr("action");
            $.post(url, data, function (response) {
                if (response) {
                    Command: toastr["success"]("Successfully Voted!", "Success")
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
                    getTop10();
                }
                else {
                    Command: toastr["error"]("Failed to Vote!", "Failed")
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
                Command: toastr["error"]("Internal Server Error!", "Failed")
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
            })
        }
        else {
            Command: toastr["warning"]("Please enter a baby name.", "Warning")
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
    });

    $('#nextButton').on('click', function(){
        $('#genderContainer').slideToggle(500);
        $('#formContainer').slideToggle(500);
    });
    $('#backButton').on('click', function(){
        $('#formContainer').slideToggle(500);
        $('#genderContainer').slideToggle(500);

    });




    function getTop10() {
        var url = './' + $('#babyForm').attr("action");
        var data = {
            'gender': 'M'
        };
        $.post(url, data, function (response) {
            $('#MaleContainer').html(response);
        }).fail(function (e) {
            alert("error" + e);
        })
        var data = {
            'gender': 'F'
        };
        $.post(url, data, function (response) {
            $('#FemaleContainer').html(response);
        }).fail(function (e) {
            alert("error" + e);
        })
    }

});
