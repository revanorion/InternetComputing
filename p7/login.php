<?php


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
    $selectStmt = "SELECT PASSWORD FROM USER WHERE USERNAME ='".$username."'";
    $result = $db->query($selectStmt);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password, $row["PASSWORD"])){
                echo "your in";
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
