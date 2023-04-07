<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contactusphp_database";
try {
 $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 echo "Connected successfully <br />"; 
 }
catch(PDOException $e)
 {
 echo "Connection failed: " . $e->getMessage();
 }
$query=$conn->prepare("INSERT INTO contacts (firstname, lastname, mobile, email, subject, message) VALUES 
(?,?,?,?,?,?)");
$query->bindParam(1, $fname);
$query->bindParam(2, $lname);
$query->bindParam(3, $mob);
$query->bindParam(4, $email);
$query->bindParam(5, $subject);
$query->bindParam(6, $message);
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$mob=$_POST['mob'];
$email=$_POST['email']; 
$subject=$_POST['subject']; 
$message=$_POST['ans'];
$query->execute();
$conn = null;
echo 'Hello '.$_POST['fname'].''.'! Thanks for your interest.</br>';
echo 'GeoLocation will contact you at '. $_POST['email'].' soon.</br>';
?>