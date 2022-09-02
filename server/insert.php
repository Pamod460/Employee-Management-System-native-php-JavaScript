<?php
$name=$_POST['txtName'];
$nic=$_POST['txtNic'];
$mobile=$_POST['txtMobile'];
$email=$_POST['txtEmail'];
$dob=$_POST['dobDate'];
$gender=$_POST['cmbGender'];
$designation=$_POST['cmbDesignation'];
$status=$_POST['cmbStatusemployee'];

require_once("./commonDao.php");

$sql ="insert into   employee(name,dob,nic,mobile,email,gender_id,statusemployee_id,designation_id) values('$name','$dob','$nic','$mobile','$email',$gender,$status,$designation);";

$result =CommonDao::getResults($sql);
//$result=mysqli_query($conn,$sql);
echo $sql;
//echo $name;

?>


