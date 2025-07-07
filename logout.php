<?php
session_start();
session_destroy();
header("Location: login dan register.html");
exit;
?>


