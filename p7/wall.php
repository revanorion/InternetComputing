<?php
include('session.php');
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible">
        <title>Image Sharing</title>
        <meta name="description" content="Currency Converter, initial-scale=1">
        <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel=stylesheet href="../content/main.css">
        <link rel="stylesheet" type="text/css" href="p7.css"> </head>

    <body>
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <div id="modal-header-content"></div>
                    </div>
                    <div id="modal-body-content" class="modal-body"> </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Tyler's Cool Site</a> </div>
                <div class="col-md-offset-11">
                    <div class="btn-group">
                        <button type="button" class="btn btn-lg btn-default dropdown-toggle glyphicon glyphicon-user" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">
                                <?php
                                echo $_SESSION["login_user"];
                                ?>
                            </a>
                            <div class="dropdown-divider"></div> <a class="dropdown-item" href="./logout.php">Logout</a>
                            <div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Another action</a> </div>
                    </div>
                </div>
            </div>
        </nav>
        <div id="wall" class="container-fluid">
            <div class="row">
                <div class="col-md-offset-3 col-md-5">
                    <form class="well" action="upload.php" method="post" enctype="multipart/form-data"> Select image to upload:
                        <input type="file" name="fileToUpload" id="fileToUpload">
                        <input type="submit" value="Upload Image" name="submit"> </form>
                    <form id="voiceForm" class="well" action="p7.php">
                        <div class="input-group input-group-lg">
                            <input id="voiceInput" type="text" class="form-control" placeholder="This is your voice!" />
                            <div class="input-group-btn">
                                <button id="uploadPictureButton" class="btn btn-info">Upload Picture</button>
                                <button id="postButton" class="btn btn-success">Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="wall-posts"> </div>
        </div>
        <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
        <script src="wall.js" type="text/javascript"></script>
    </body>

    </html>
