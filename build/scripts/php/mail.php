<?php
$to  = 'joncolab@gmail.com';

$subject = 'Пользователь с Roik';

$message = 'Пользователь: ' . $_POST['email'] . ';<br>' . $_POST['name'] . ';<br>'. $_POST['tel'] . ';<br>'  .
    '"' . $_POST['msg'] . '"<br>' .
    'Связяться с ним можно по email: <a href="email:' . $_POST['email'] . '">' . $_POST['email'] . '</a>'
;

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; 


$headers .= 'To: joncolab@gmail.com' . "\r\n";
$headers .= 'From: '  . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n";

mail($to, $subject, $message, $headers);
header('refresh: 5; url="index.html"');