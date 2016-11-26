/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/
$(document).ready(function () {
    'use strict';
    var url = $('#voiceForm').attr('action');
    var data={
        'getPosts':true
    };
    $.post(url, data, function (response) {
        $('#wall-posts').html(response);
    }).fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    $('#postButton').on('click', function(e){
        e.preventDefault();
        var url = $('#voiceForm').attr('action');
        var data = {
            'voicePost':true,
            'textValue':$('#voiceInput').val(),
            'picValue': "test"
        };
        $.post(url, data, function (response) {
            $('#voiceInput').val("")
            var wallData= response + $('#wall-posts').html();
            $('#wall-posts').html(wallData);
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });

    $('#uploadArea').slideToggle(500);
    $('#uploadPictureButton').on('click', function(e){
        e.preventDefault();
       $('#uploadArea').slideToggle(500);
    });
    $('.fileinput-remove-button').on('click',function(){
        var url = $('#voiceForm').attr('action');
        var data = {
            'clearUploads':true
        };
        $.post(url, data, function (response) {
            alert("cleared session var");
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });

});
