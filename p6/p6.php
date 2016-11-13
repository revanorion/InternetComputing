<?php
require_once './php/db_connect.php';



    $selectStmt = "SELECT * FROM `BABYNAMES` ORDER BY FIRSTNAME;";
    //WHERE FIRSTNAME LIKE '".$firstname."%'
    $result = $db->query($selectStmt);
    // output data of each row
    if (mysqli_num_rows($result) > 0) {
        // output data of each row

        while($row = mysqli_fetch_assoc($result)) {
            echo "<option value='".$row["FIRSTNAME"]."'>".$row["FIRSTNAME"]."</option>";
        }
    } else {
        echo "0 results";
    }



?>
