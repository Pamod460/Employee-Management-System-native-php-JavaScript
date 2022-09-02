<?php
require_once("statusEmployeedao.php");
$statusEmployees = StatusEmployeeDao::getAll();
//var_dump($statusEmployees);
$jsonData = json_encode($statusEmployees);
echo $jsonData;