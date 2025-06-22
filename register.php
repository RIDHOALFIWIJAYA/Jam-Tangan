<?php
include "service/database.php";
session_start();

$pesan = "";

if (isset($_SESSION["is_login"])) {
    header("location: dashboard.php");
    exit;
}
if (isset($_POST["register"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $cek = $db->query("SELECT * FROM users WHERE username = '$username'");
    if ($cek->num_rows > 0) {
        $pesan = "namanya udh ada yang make";
    } else {
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        if ($db->query($sql)) {
            $pesan = "Daftar berhasil, silahkan login ya";
        } else {
            $pesan = "Terjadi kesalahan saat mendaftar";
        }
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
    <title>REGISTER</title>
</head>
<body>
    <?php include "layout/header.html" ?>
    <div class="flex flex-col justify-center items-center">
    <div class="flex-col bg-red-400 p-5 mt-44 rounded-xl">
    <h3 class="font-bold text-2xl">DAFTAR AKUN</h3>
    <i><?= $pesan ?></i>
    <form action="register.php" method="POST" class="mt-3">
        <input type="text" placeholder="username" name="username" class="rounded-xl p-2" required/><br>
        <input type="text" placeholder="password" name="password" class="mt-3 rounded-xl p-2" required/><br>
        <button type="submit" name="register" class="mt-3 p-2 pl-4 pr-4 font-bold bg-sky-300 rounded-full hover:bg-sky-500">Daftar Sekarang</button>
    </form>
    </div>
    </div>
    <?php include "layout/footer.html" ?>
</body>
</html>
