<?php
$servername = "localhost";
$username = "root";
$password="";
$dbname="contactusphp_database";
try {
 $conn = new PDO("mysql:host=$servername;dbname=$dbname", 
$username,$password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 echo "Connected successfully <br />"; 
 }
catch(PDOException $e)
 {
 echo "Connection failed: " . $e->getMessage();
 }
$query=$conn->prepare("CREATE TABLE contacts (id int(6) NOT NULL 
auto_increment,firstname varchar(15) NOT NULL,lastname varchar(15) NOT NULL,mobile varchar(15) NOT NULL,email varchar(30) NOT NULL,subject varchar(30) NOT NULL,message varchar(30) NOT NULL,PRIMARY 
KEY (id),UNIQUE id (id),KEY id_2 (id))");
$query->execute();
$conn = null;
?>