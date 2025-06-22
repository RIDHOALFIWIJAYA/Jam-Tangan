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
     <div class="flex flex-col justify-center items-center">
    <div class="flex-col bg-red-400 p-5 mt-44 rounded-xl">
    <h3 class="font-bold text-2xl">MASUK</h3>
     <i><?= $pesan ?></i>
    <form action="login.php" method="POST">
        <input type="text" placeholder="username" name="username" class="rounded-xl p-2"/><br>
        <input type="text" placeholder="password" name="password" class="mt-3 rounded-xl p-2"/><br>
        <button type="submit" name="login" class="mt-3 p-2 pl-4 pr-4 font-bold bg-sky-300 rounded-full hover:bg-sky-500">LOGIN SEKARANG</button>
    </form>
    </div>
    </div>
     <?php include "layout/footer.html" ?>
</body>
</html>