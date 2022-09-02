<?php
$nic=!empty($_GET['txtSearchNic']);
$name=!empty($_GET['txtSearchName']);
$gender=!empty($_GET['cmbSearchGender']);
$designation=!empty($_GET['cmbSearchDesignation']);
$status=!empty($_GET['cmbSearchStatusemployee']);

require_once("./commonDao.php");

if($nic||$name||$gender||$designation||$status){
if($nic){
    $schNic=$_GET['txtSearchNic'];
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where nic like '$schNic%';";
}
if($name){
    $schName=$_GET['txtSearchName'];
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where name like '$schName%';";
}
if($gender){
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where gender_id=".$_GET['cmbSearchGender'];
}
if ($designation) {
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where designation_id=".$_GET['cmbSearchDesignation'];
}
if ($status) {
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where statusemployee_id=".$_GET['cmbSearchStatusemployee'];
}
if ($name && $gender && $designation && $status) {
    $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee  where statusemployee_id=".$_GET['cmbStatusemployee'];
}
}
else{
   $sql = "select id,name,dob,nic,mobile,email,(select name from gender where id = gender_id) as gender,(select name from designation where id = designation_id) as designation,(select name from statusemployee where id = statusemployee_id) as statusemployee from employee;";
}

$result = mysqli_query($conn, $sql);
$rows = array();

while($employee = mysqli_fetch_array($result)){

    $rows[] = $employee;
}

$jasonData = json_encode($rows);

echo $jasonData;
?>