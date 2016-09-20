$(document).ready(function(){
        $("#scenario_img").on('click',function(){
            $("#modal-body-content").html(
//                "<div class='container'>"+
//                "<div class='row'>"+
//                "<div class='col-sm-3 col-md-3 content'>"+
                "<img src='images/crashlanded.png'>"+
//                "</div>"+
//                "<div class='col-sm-3 col-md-3 content'>"+

//                "</div>"+
//                "<div class='col-sm-3 col-md-3 content'>"+

//                "</div>"+
//                "</div>"+
//                "</div>"+
                "<img src='images/crashlandedScn.png'>"+
                "<img src='images/losttribe.png'>"+
                "<img src='images/richexplorer.png' class='pull-right'>"+
                "<p>This screen shows three differnt game scenarios to choose from. There is a button on the bottom where a player can edit indivudial scenarios. The Crashlanded scenario is the best starting scenario for new players as it gives guns, food, and medicine along with building materials.</p>"
            );
            $("#modal-header-content").html("<h2 class='modal-title'>Scenario Picker</h2>");
            $("#myModal").modal('show');
        });
        $('[data-toggle="popover"]').popover();


        $("#cassandra-popover").popover({
            html : true,
            content: function() {
              return $("#cassandra-popover-content").html();
            },
            title: function() {
              return $("#cassandra-popover-title").html();
            }
        });
        $("#phoebe-popover").popover({
            html : true,
            content: function() {
              return $("#phoebe-popover-content").html();
            },
            title: function() {
              return $("#phoebe-popover-title").html();
            }
        });
        $("#randy-popover").popover({
            html : true,
            content: function() {
              return $("#randy-popover-content").html();
            },
            title: function() {
              return $("#randy-popover-title").html();
            }
        });
        $("#create-colonist-popover").popover({
            html : true,
            content: function() {
              return $("#create-colonist-popover-content").html();
            },
            title: function() {
              return $("#create-colonist-popover-title").html();
            }
        });

    });
