<?php

  $userName = $_POST['userName'];
  $userEmail = $_POST['userEmail'];
  $userPhone = $_POST['userPhone'];
  echo 'Привет, ' . $name . ' Твой номер телефона: ' . $phone . ' Твой email: ' .$email;

  // Load Composer's autoloader
  require 'src/phpmailer/PHPMailer.php';
  require 'src/phpmailer/SMTP.php';
  require 'src/phpmailer/Exception.php';

  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer\PHPMailer\PHPMailer();

  try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'inessa.shuvalova874@gmail.com';                     // SMTP username
      $mail->Password   = 'iloverussia282828';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
      $mail->Port       = 465;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom('inessa.shuvalova874@gmail.com', 'Инесса');
      $mail->addAddress('inessasvendsen@yandex.ru');     // Add a recipient

      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Новая заявка с сайта';
      $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";

      $mail->send();
      header('Location: thanks.html');
  } catch (Exception $e) {
      echo "Письмо не отправлено, eсть ошибка. Код ошибки: {$mail->ErrorInfo}";
  }