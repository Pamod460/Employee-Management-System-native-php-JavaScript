<?php

class CommonDao
{
    public static function getResults($query)
    {
        $servername = "localhost";
        $username = "root";
        $password = "12345";
        $database = "harvest";

        $conn = new mysqli($servername, $username, $password, $database);
        if (!$conn) {
            die("connection failed ".$conn->connect_error);
        }
        return $conn->query($query);

    }}


//echo "connected successful";

