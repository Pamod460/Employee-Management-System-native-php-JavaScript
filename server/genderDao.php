<?php
require_once("./commonDao.php");
require_once("./gender.php");

class GenderDao
{
    public static function getById($id)
    {
        $query = "SELECT * FROM gender WHERE id = '$id';";
        $result = CommonDao::getResults($query);
        $row = $result->fetch_assoc();
        return GenderDao::setData($row);
    }
    public static function setData($row)
    {
        $gender = new Gender();
        $gender->setId($row['id']);
        $gender->setName($row['name']);
        return $gender;
    }
    public static function getAll(): array
    {
        $genders = array();
        $query = "SELECT * FROM gender";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $gender = GenderDao::setData($row);
            $genders[] = $gender;
        }
        return $genders;
    }
}




