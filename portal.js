/*jslint browser: true, plusplus: true */
/*global $, jQuery, alert*/
$(document).ready(function () {
    'use strict';
    $("#p1").on('click', function () {
        $("#modal-body-content").html("<p>The first project for the Internet of Computing class is about anything as long as I can demonstrate html and css </p><p>What I decided to make is a webpage about my currently faviourate game, Rimworld, and discuss an experience I had within the colony building simulator.</p><p>You can find that story: <a href='p1/index.html'>Here</a>");
        $("#modal-header-content").html("<h2 class='modal-title'>Project 1</h2>");
        $("#myModal").modal('show');
    });
    $("#p2").on('click', function () {
        $("#modal-body-content").html("<p>The second project for the Internet of Computing class uses Twitter Bootstrap to create a visually pleasing website.</p><p>I continued the topic of my favourite game and put some showed off some interesting Bootstrap with Javascript</p><p>You can find that story: <a href='p2/index.html'>Here</a>");
        $("#modal-header-content").html("<h2 class='modal-title'>Project 2</h2>");
        $("#myModal").modal('show');
    });
    $("#p3").on('click', function () {
        $("#modal-body-content").html("<p>Project three implements vanilla javascript to create a unit converion application. This was one of the more difficult assignments yet.</p><p>You can find that app: <a href='p2/index.html'>Here</a>");
        $("#modal-header-content").html("<h3 class='modal-title'>Project 3</h2>");
        $("#myModal").modal('show');
    });
    $("#p4").on('click', function () {
        $("#modal-body-content").html("<p>Project four uses jQuery and HTML5 local storage to create a todo application. I utalized different libraries and followed the MV* frame work to accomplish this.</p><p>This was the most difficult project so far.</p><p>You can find that app: <a href='p4/index.html'>Here</a>");
        $("#modal-header-content").html("<h2 class='modal-title'>Project 4</h2>");
        $("#myModal").modal('show');
    });
    $("#p5").on('click', function () {
        $("#modal-body-content").html("<p>Project five uses jQuery and PHP to create a currency conversion app. This was quite simple as I have already built a simple framework to do this in project 3.</p><p>You can find that app: <a href='p5/index.html'>Here</a>");
        $("#modal-header-content").html("<h2 class='modal-title'>Project 5</h2>");
        $("#myModal").modal('show');
    });
    $("#p6").on('click', function () {
        $("#modal-body-content").html("<p>Project six uses jQuery, PHP, and SQL to make a app for users to vote on their favourite baby name. The hardest part about this was getting Ajax to communicate correctly with PHP as well as the PHP to communicate with MySQL.</p><p>You can find that app: <a href='p6/index.html'>Here</a>");
        $("#modal-header-content").html("<h2 class='modal-title'>Project 6</h2>");
        $("#myModal").modal('show');
    });
});
