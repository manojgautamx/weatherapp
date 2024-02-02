<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Link to the font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="manoj_gautam_2409334.css">

    <!-- Title -->
    <title>Weather App- Manoj Gautam</title>

</head>
<body>
    <!-- Whole content of the site -->


    <div class="row">
        <div class="col span-2-of-3 box ">
            <div class="container">
                <form method="GET" action =<?php echo $_SERVER['PHP_SELF']?>>
                    <div class="search">
                        <input type="text" placeholder="City Name" name="t">
                        <button> <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383275/search_ryyk7t.png" alt="search button"></button>
                    </div>  
                </form>

                <!-- incase of no city name found -->

                <div class="error">
                    <p>Invalid City Name</p>
                </div>

                <div class="weather">
                    <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/mist_e7wtad.png" class="icon" alt="">
                    <h1 class="celcius">10°C</h1>
                    <h2 class="city">Horsham</h2>
                    <div class="date-time">
                        <p class="date"></p>
                    </div>
                                    
                    <div class="details"> 
                        <div class="col">
                        <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383274/humidity_suq6cu.png" alt="">
                            <div class="humidity">
                            <p class="humidityP">20%</p>
                            <p>Humidity</p>
                        </div>
                    </div>

                    <div class="col">
                        <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1706785322/vj4aqz5mfdiutivgr0ke.png" alt="">
                        <div class="pressure">
                            <p class="pressureP">20%</p>
                                <p>Pressure</p>
                        </div>
                     </div>

                    <div class="col">
                        <img src="https://res.cloudinary.com/dppoa51hp/image/upload/v1704383275/wind_ob5was.png" alt="">
                        <div class="wind">
                             <p class="windS">20k/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>

    <div class="row">
        <div class="col span-1-of-3 box stored-data-container">
                <div class="container2 stored-data" id="storedData">
                </div>
        </div>
    </div>
        


    <?php 

    // $createTable = "CREATE TABLE weatherdata (
    //     id int auto_increment PRIMARY KEY,
    //     temperature varchar(255) NOT NULL,
    //     humidity varchar(255) NOT NULL,
    //     pressure varchar(255) NOT NULL,
    //     wind varchar(255) NOT NULL,
    //     date DATE NOT NULL
    // )";

    
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
    
    if (isset($_GET['t'])) {
        $city = $_GET['t'];
    } else {
        $city = "Horsham";
    }
    
    $url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0439d6dee489d890a8909b29b32242b8&units=metric";
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    $temperature = $data['main']['temp'];
    $humidity = $data['main']['humidity'];
    $pressure = $data['main']['pressure'];
    $wind = $data['wind']['speed'];
    
    // Get the current date
    $currentDate = date('Y-m-d');
    
    // Check if data for the current date already exists
    $existingData = "SELECT * FROM weatherdata WHERE temperature='$temperature' AND date='$currentDate'";
    $result = mysqli_query($conn, $existingData);
    
    if (!$result) {
        // Output detailed error information
        echo "Error in query: " . mysqli_error($conn);
    } else {
        // Check the number of rows only if the query was successful
        $numRows = mysqli_num_rows($result);
    
        if ($numRows > 0) {
            echo "Weather data for today already exists";
        } else {
            // Insert data with the current date
            $insertData = "INSERT INTO weatherdata(temperature, humidity, pressure, wind, date) VALUES('$temperature', '$humidity', '$pressure', '$wind', '$currentDate')";
            
            if (mysqli_query($conn, $insertData)) {
                echo "Data inserted";
            } else {
                echo "Failed to insert data: " . mysqli_error($conn);
            }
        }
    }
    
    // Close the database connection
    mysqli_close($conn);
    
    


    // $createTable = "CREATE TABLE weatherdata (
    //     id int auto_increment PRIMARY KEY,
    //     temperature varchar(255) NOT NULL,
    //     humidity varchar(255) NOT NULL,
    //     pressure varchar(255) NOT NULL,
    //     wind varchar(255) NOT NULL
    // )";
    
    // if (mysqli_query($conn, $createTable)) {
    //     echo "Table created";
    // } else {
    //     echo "Failed: " . mysqli_error($conn);
    // }













    ?>



<!-- load javascript -->
<script src="manoj_gautam_2409334.js"></script>

    
</body>
</html>