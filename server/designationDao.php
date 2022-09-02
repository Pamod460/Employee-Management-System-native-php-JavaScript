<?php

require_once("./commonDao.php");
require_once("./designation.php");

class DesignationDao
{
    public static function getById($id)
    {
        $query = "SELECT * FROM designation WHERE id = '$id';";
        $result = CommonDao::getResults($query);
        $row = $result->fetch_assoc();
        return DesignationDao::setData($row);
    }

    public static function setData($row)
    {
        $designation = new Designation();
        $designation->setId($row['id']);
        $designation->setName($row['name']);
        return $designation;
    }

    public static function getAll(): array
    {

        $designations = array();
        $query = "SELECT * FROM designation";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $designation = DesignationDao::setData($row);
            $designations[] = $designation;
        }
        return $designations;

    }


}

?>