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

    $("#input-fa").fileinput({
        showRemove: false,
        maxFileCount: 10,
        uploadUrl: "upload2.php"

    });



    $('#postButton').on('click', function(e){
        e.preventDefault();
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
        var data = {
            'clearUploads':true
        };
        $.post(url, data, function (response) {
            alert("cleared session var");
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });
    $(document).on('click','.kv-file-remove',function(){
        alert("clicked file remove");
    });
    $(document).on('click','.like',function(){
        var dataId = $(this).data('id');
        if($(this).prop('checked'))
        {
            //like func
            var data = {
                'likePost':true,
                'wallSEQ': dataId
            };
            $.post(url, data, function (response) {
                var wallPost= '#WALL-SEQ-'+ dataId;
                $(wallPost).html(response);
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        } else{
            //unlike func
            var data = {
                'unlikePost':true,
                'wallSEQ':dataId
            };
            $.post(url, data, function (response) {
                var wallPost= '#WALL-SEQ-'+dataId;
                $(wallPost).html(response);
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        }
    });


});
