<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $smtpHost = 'smtp.yandex.ru';
    $smtpUsername = 'len-zhulina@yandex.ru';
    $smtpPassword = 'ijtssftlqiyenllb';
    $smtpPort = 465;

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUsername;
        $mail->Password = $smtpPassword;
        $mail->SMTPSecure = 'ssl';
        $mail->Port = $smtpPort;

        $mail->setFrom('len-zhulina@yandex.ru');
        $mail->addAddress('rbru-metrika@yandex.ru');
        $mail->isHTML(true);

        $mail->Subject = 'Новое сообщение с сайта';
        $mail->Body = "Имя: $name<br>E-mail: $email<br>Сообщение: $message";


        if(!$mail->send()) {
        echo 'Error';
      } else {
        http_response_code(200);
        echo "Письмо успешно отправлено!";
      }
    } catch (Exception $e) {
      http_response_code(500);
      echo "Ошибка при отправке письма: {$e->getMessage()}";
    }
  }
?>


