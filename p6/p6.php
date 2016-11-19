<?php



function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

//This checks which ajax post is called. either for getting data for typeahead, top 10 names, or voting for a name
if (is_ajax()) {
    if(isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['gender'])) {
        echo getData($_POST['firstname'], $_POST['gender']);
    }
    if(isset($_POST['id']) && !empty($_POST['id'])) {
        echo vote($_POST['id']);
    }
    if(isset($_POST['gender']) && !empty($_POST['gender']) && !isset($_POST['firstname'])) {
        echo getTop10($_POST['gender']);
    }
}

//this gets the data for the typeahead based on the text typed and the gender. it returns either 0 results or
// it returns a list item limited to 5 results
function getData($firstname, $gender){
    require_once './php/db_connect.php';
    $selectStmt = "SELECT FIRSTNAME, BABYNAMES_SEQ FROM babynames WHERE FIRSTNAME LIKE '".$firstname."%' AND GENDER='".$gender."' LIMIT 5";
    $result = $db->query($selectStmt);
    // output data of each row
    $getResults="";
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $getResults.= "<li value='".$row["BABYNAMES_SEQ"]."'>".$row["FIRSTNAME"]."</li>";
        }
    } else {
        $getResults= "0 results";
    }
    return $getResults;
}

//this votes for the specific baby name. it first tests to see if the id is actually in the db then it updates the vote count
function vote($id){
    require_once './php/db_connect.php';
    $selectStmt = "SELECT VOTES FROM babynames WHERE BABYNAMES_SEQ= '".$id."'";
    $result = $db->query($selectStmt);
    if (mysqli_num_rows($result) > 0) {
        $votes = mysqli_fetch_assoc($result)['VOTES'] + 1;
        $updateStmt = "UPDATE babynames SET VOTES=".$votes." WHERE BABYNAMES_SEQ= '".$id."'";
        $result = $db->query($updateStmt);
        if (mysqli_affected_rows($db) > -1) {
            return 1;
        }
        else {
            return 0;
        }
    } else {
        return 0;
    }
}

function getTop10($gender)
{
    require_once './php/db_connect.php';
    $selectStmt = "SELECT FIRSTNAME, VOTES FROM babynames WHERE GENDER='".$gender."' ORDER BY VOTES DESC LIMIT 10";
    $result = $db->query($selectStmt);
    // output data of each row
    $getResults="";
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $getResults.="<div class='row'><div class='col-md-6 text-center'>".$row["FIRSTNAME"]."</div><div class='col-md-6 text-center'>".$row["VOTES"]."</div></div>";
        }
    } else {
        $getResults= "0 results";
    }
    return $getResults;
}




?>
