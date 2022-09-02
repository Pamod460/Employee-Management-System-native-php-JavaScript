<?php
require_once("./employeeDao.php");
//$genders = EmployeeDao::getAll();
////var_dump($genders);
//$jsonData = json_encode($genders);
//echo $jsonData;
$hasname = !empty($_GET['name']);
$hasgender = !empty($_GET['gender']);

if ($hasname) {
    $name = $_GET['name'];
}
if ($hasgender) {
    $gender = $_GET['gender'];
}

$employees = null;

if (!$hasname && !$hasgender) $employees = EmployeeDao::getAll();
if ($hasname && !$hasgender) $employees = EmployeeDao::getbyName($name);
if (!$hasname && $hasgender) $employees = EmployeeDao::getbyGender($gender);
if ($hasname && $hasgender) $employees = EmployeeDao::getbyNameAndGender($name, $gender);
$jsonData = json_encode($employees);

echo $jsonData;