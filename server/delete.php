<?php
$id=$_GET['id'];

require_once("./commonDao.php");

$sql="delete from employee where id = $id";
$result=CommonDao::getResults($sql);
?>