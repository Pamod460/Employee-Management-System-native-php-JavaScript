<?php
$time = time();


//session_start();
if (!(isset($_SESSION['username']) && $time - $_SESSION["lastactive"] < 1000)) {
    echo ("Time Out!");
    session_destroy();
    include "../client/login.html";
} else {

?>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <h1>Welcome To Harvest Super</h1>
        <h4>You are logged as <?php echo $_SESSION['username']; ?></h4>
        <a href="logout.php"> <button>Logout</button></a>


    </body>

    </html><?php
        }
            ?>