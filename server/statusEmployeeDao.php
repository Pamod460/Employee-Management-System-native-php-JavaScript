<?php
require_once("./commonDao.php");
require_once("./statusEmployee.php");

class StatusEmployeeDao
{

    public static function getById($id)
    {
        $query = "SELECT * FROM statusemployee WHERE id = '$id';";
        $result = CommonDao::getResults($query);
        $row = $result->fetch_assoc();
        return StatusEmployeeDao::setData($row);
    }

    public static function setData($row)
    {
        $statusEmployee = new StatusEmployee();
        $statusEmployee->setId($row['id']);
        $statusEmployee->setName($row['name']);
        return $statusEmployee;
    }

    public static function getAll(): array
    {
        $statusEmployees = array();
        $query = "SELECT * FROM statusEmployee";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $statusEmployee = StatusEmployeeDao::setData($row);
            $statusEmployees[] = $statusEmployee;
        }
        return $statusEmployees;

    }


}

?>



