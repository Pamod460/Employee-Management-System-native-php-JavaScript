<?php
require_once("./commonDao.php");
require_once("./employee.php");
require_once("./genderDao.php");
require_once("./designationDao.php");
require_once("./statusEmployeeDao.php");

class EmployeeDao
{
    public static function getAll(): array
    {
        $employees = array();
        $query = "SELECT * FROM employee";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $employee = EmployeeDao::setData($row);
            $employees[] = $employee;
        }
        return $employees;
    }

    public static function setData($row): Employee
    {
        $employee = new Employee();
        $employee->setId($row['id']);
        $employee->setName($row['name']);
        $employee->setNic($row['nic']);
        $employee->setEmail($row['email']);
        $employee->setDob($row['dob']);
        $employee->setMobile($row['mobile']);
        $employee->setGender(GenderDao::getById($row['gender_id']));
        $employee->setdesignation(DesignationDao::getById($row['designation_id']));
        $employee->setstatusEmployee(StatusEmployeeDao::getById($row['statusemployee_id']));
        return $employee;
    }

    public static function getById($id)
    {
        $query = "SELECT * FROM employee where id=" . $id;
        $result = CommonDao::getResults($query);
        $row = $result->fetch_assoc();
        return EmployeeDao::setData($row);
    }

    public static function getByName($name): array
    {
        $employees = array();
        $query = "SELECT * FROM employee where  name like '$name%';";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $employee = EmployeeDao::setData($row);
            $employees[] = $employee;
        }
        return $employees;
    }
}