<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h4></h4>
    <h1>COME AGAIN..!</h1>
    <hr><?php
        session_start();
        session_destroy();
        include("../client/login.html");
        ?>
</body>

</html>