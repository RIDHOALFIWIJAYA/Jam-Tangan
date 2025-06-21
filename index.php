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
    <title>DATA</title>
</head>
<body>
    <?php include "layout/header.html" ?>

    <main>
        <p class="font-bold italic text-xl">Halo silahkan login ya</p>
        <p class="font-bold text-xl italic">Belum punya akun <a href="register.php" class="font-bold text-lg hover:text-blue-500">Daftar</a></p>
    </main>
    <button class="p-3 pr-7 pl-7 bg-red-500 font-bold text-xl ml-10 mt-4 rounded-full hover:bg-red-300"><a href="login.php">Login</a></button>

     <?php include "layout/footer.html" ?>
</body>
</html>