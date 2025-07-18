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
        <p class="font-bold italic text-xl flex justify-center ">Halo silahkan login ya</p>
        <p class="font-bold text-xl italic flex justify-center">Belum punya akun <a href="register.php" class="font-bold text-lg hover:text-blue-500 ml-1">Daftar</a></p>
    </main>
    <div class="flex justify-center items center">
    <button class="p-3 pr-7 pl-7 bg-red-500 font-bold text-xl mt-4 rounded-full hover:bg-red-300"><a href="login.php">Login</a></button>
    </div>
     <?php include "layout/footer.html" ?>
</body>
</html>