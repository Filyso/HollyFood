<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>HollyFood</title>
    <link href="/css/style.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
    <script type="text/javascript" src="https://gc.kis.v2.scr.kaspersky-labs.com/5DB61108-6373-D04E-9AF3-A7F9AF15E69D/main.js" charset="UTF-8"></script><script src="/js/main.js"></script>
</head>

<body>
    <?= $content ?>
    <?php
        if (isset($_SESSION['flash'])) {
            include("flashPopupTemplate.php");
        }
    ?>
</body>

</html>