<?php
include "service/database.php";
session_start();

$pesan = "";

if(isset($_SESSION["is_login"])) {
    header("location: dashboard.php");
}

if (isset($_POST["login"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $db->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password); // s = string
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        $_SESSION["username"] = $data["username"];
        $_SESSION["is_login"] = true; 

        header("location: dashboard.php");

    } else {
        $pesan = "akunnya gaada bro";
    }
    $db->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Poppins', sans-serif;
    }
  </style>
    <title>LOGIN</title>
</head>
<body>
     <?php include "layout/header.html" ?>
    <h3>MASUK</h3>
     <i><?= $pesan ?></i>
    <form action="login.php" method="POST">
        <input type="text" placeholder="username" name="username"/><br>
        <input type="text" placeholder="password" name="password"/><br>
        <button type="submit" name="login">LOGIN SEKARANG</button>
    </form>
     <?php include "layout/footer.html" ?>
</body>
</html>