<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$mail = new PHPMailer(true);

/* $correo = "comedor@wappcom.net";
$passemail = "liceoLE2021"; */

$correo = "gaoydnxo@wappcom.net";
$passemail = "jq69s9ObU6";

try {

    $mail->Username = $correo;
    $mail->Password = $passemail;

    $mail->SMTPDebug = 0;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Host = "mail.wappcom.net";
    $mail->Port = 587;
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->setFrom($mail->Username,"Liceo Las Esperanzas");
    //$mail->AddAddress("rvindas@lasesperanzas.ed.cr");
    $mail->AddAddress("mauriciobermudez@hotmail.com");

    $mail->AddEmbeddedImage('escudo.png', 'escudo', 'escudo.png');
    $srcImagen = "cid:escudo";    

    $mail->Subject = "Asistencia de funcionarios al comedor";

    $mail->Body .= "<head>
                        <meta http-equiv='Content-type' content='text/html; charset=utf-8'/>           
                    </head>";
    $mail->Body .= "<table style='width:40%'>
                        <tbody>
                            <tr>
                                <td><img src=".$srcImagen." width='50' height='60'></td>
                                <td><h3> Liceo Las Esperanzas </h3></td>
                            </tr>
                        </tbody>
                    </table>";
    $mail->Body .=  "<h3> Reporte Almuerzos Comedor </h3>";	
    $mail->Body .=  "<p> El Sistema de Control de Marcas [SiMarca] le informa la asistencia de funcionarios al comedor:</p>";
       
    $mail->IsHTML(true);
    $mail->Send();    

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>