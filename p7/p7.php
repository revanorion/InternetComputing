<?php
session_start();

function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

//This checks which ajax post is called. either for getting data for typeahead, top 10 names, or voting for a name
if (is_ajax()) {
    if(isset($_POST['signup']) && !empty($_POST['username']) && !empty($_POST['password'])) {
        echo registerUser($_POST['username'], $_POST['password']);
    }
    if(isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
        echo loginUser($_POST['username'], $_POST['password']);
    }
    if(isset($_POST['voicePost']) && (!empty($_POST['textValue']) || !empty($_POST['picValue']))) { //replace one with pictureVal
        echo postVoice($_POST['textValue'], $_POST['picValue']);
    }
    if(isset($_POST['getPosts'])) { //replace one with pictureVal
        echo loadPosts();
    }


}

function loadPosts(){
    require_once './php/db_connect.php';
    $selectStmt = "SELECT W.USER_SEQ, W.STATUS_TEXT, W.TIME_STAMP, U.USERNAME FROM wall W JOIN user U ON W.USER_SEQ = U.USER_SEQ ORDER BY TIME_STAMP DESC LIMIT 5 ";
    $result = $db->query($selectStmt);
    // output data of each row
    $getResults="";
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $getResults.= "<div class='row'>
                    <div class='col-md-offset-3 col-md-5'>
                        <hr/> </div>
                </div>
                <div data-id='".$row["USER_SEQ"]."' class='row'>
                    <div class='col-md-offset-3 col-md-3'>
                        <form class='well'>
                            <p>".$row["USERNAME"]." ".$row["TIME_STAMP"]."</p>
                            <p>".$row["STATUS_TEXT"]."</p>
                            <p>
                                <image class='image-post' src='images/048.jpg'></image>
                            </p>
                            <p>
                                <button class='btn btn-default'><span class='glyphicon glyphicon-thumbs-up'></span> <span class='badge'>4</span></button>
                            </p>
                        </form>
                    </div>
                    <div class='col-md-2'>
                        <form class='well'>
                            <p> this is a reply</p>
                            <button class='btn btn-default'><span class='glyphicon glyphicon-thumbs-up'></span> <span class='badge'>4</span></button>
                        </form>
                    </div>
                </div>";
        }
        return $getResults;
    }
    return "Error getting posts!";
}


function postVoice($textValue, $pictureUrl){
    require_once './php/db_connect.php';
    $userid= $_SESSION['login_user_id'];
    $insertStmt = "INSERT INTO WALL (USER_SEQ, STATUS_TEXT) VALUES(".$userid.", '".$textValue."')";
    $result = $db->query($insertStmt);
    if (mysqli_affected_rows($db) > -1) {
       return "<div class='row'>
                    <div class='col-md-offset-3 col-md-5'>
                        <hr/> </div>
                </div>
                <div data-id='".$userid."' class='row'>
                    <div class='col-md-offset-3 col-md-3'>
                        <form class='well'>
                            <p>".$textValue."</p>
                            <p>
                                <image class='image-post' src='images/048.jpg'></image>
                            </p>
                            <p>
                                <button class='btn btn-default'><span class='glyphicon glyphicon-thumbs-up'></span> <span class='badge'>4</span></button>
                            </p>
                        </form>
                    </div>
                    <div class='col-md-2'>
                        <form class='well'>
                            <p> this is a reply</p>
                            <button class='btn btn-default'><span class='glyphicon glyphicon-thumbs-up'></span> <span class='badge'>4</span></button>
                        </form>
                    </div>
                </div>";
    }
    return 0;
}



function registerUser($username, $password){
    require_once './php/db_connect.php';
    $selectStmt = "SELECT USER_SEQ FROM USER WHERE USERNAME ='".$username."'";
    $result = $db->query($selectStmt);
    if (mysqli_num_rows($result) > 0) {
        return -1;
    }
    else
    {
        $insertStmt= "INSERT INTO USER (USERNAME, PASSWORD) VALUES ('".$username."', '".password_hash($password, PASSWORD_DEFAULT)."')";
        $result = $db->query($insertStmt);
        if (mysqli_affected_rows($db) > -1) {
            return 1;
        }
        return 0;
    }
}


function loginUser($username, $password){
    require_once './php/db_connect.php';
    $selectStmt = "SELECT USER_SEQ, PASSWORD FROM USER WHERE USERNAME ='".$username."'";
    $result = $db->query($selectStmt);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password, $row["PASSWORD"])){
            $_SESSION["login_user"] = $username;
            $_SESSION["login_user_id"] = $row["USER_SEQ"];
            echo "your in".$_SESSION["login_user"];
        }
        else{
            echo "try again";
        }
    }
    else
    {
        echo "User doesnt exist";
    }
}
?>
