<?php
require_once("designationDao.php");
$designations = DesignationDao::getAll();
//var_dump($designations);
$jsonData = json_encode($designations);
echo $jsonData;