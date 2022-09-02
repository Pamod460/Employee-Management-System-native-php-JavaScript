<?php
require_once("genderDao.php");
$genders = GenderDao::getAll();
//var_dump($genders);
$jsonData = json_encode($genders);
echo $jsonData;