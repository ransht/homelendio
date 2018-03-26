<?php

$fields = array('name' => 'Name', 'phone' => 'Phone', 'email' => 'Email', 'phoneNumber' => 'Phone number');
$sendTo = 'contact@homelend.io, mt@stratg.co.il';
$from = 'mail@stratg.co.il';
$subject = 'התקבלה פנייה חדשה';
$okMessage = 'SUCCESS';
$errorMessage = 'ERROR';

try
{
    $emailText = "New message:<br>";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value"."<br>";
        }
    }

    $headers = array('Content-Type: text/html; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );

    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');
}
else {
    echo $responseArray['message'];
    echo $emailText;
}

?>