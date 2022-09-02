<?php

class Employee{

    public $id;
    public $name;
    public $nic;
    public $mobile;
    public $dob;

    public $gender;
    public $email;

    function __construct(){}

    function getId(){ return $this->id;}
    function setId($id){ $this->id = $id;}

    function getName(){ return $this->name;}
    function setName($name){ $this->name = $name;}

    function getNic(){ return $this->nic;}
    function setNic($nic){ $this->nic = $nic;}

    function getMobile(){ return $this->mobile;}
    function setMobile($mobile){ $this->mobile = $mobile;}

    function getEmail(){ return $this->email;}
    function setEmail($email){ $this->email = $email;}

    function getDob(){ return $this->dob;}
    function setDob($dob){ $this->dob = $dob;}

    function getGender(){ return $this->gender;}
    function setGender($gender){ $this->gender = $gender;}

    function getstatusEmployee(){ return $this->statusEmployee;}
    function setstatusEmployee($statusEmployee){ $this->statusEmployee = $statusEmployee;}
    function getdesignation(){ return $this->designation;}
    function setdesignation($designation){ $this->designation = $designation;}
}



