<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "weatherdata_db";
    
$conn = mysqli_connect($servername, $username, $password, $database);
    
if (!$conn) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    // Exit the script if the connection fails
    exit();
}

$selectAllData = "SELECT * FROM weatherdata";
$result = mysqli_query($conn, $selectAllData);

$rows = array(); // Initialize the array to store fetched rows

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
}

$json_data = json_encode($rows);

// Output JSON data
echo $json_data;

mysqli_close($conn);
?>
