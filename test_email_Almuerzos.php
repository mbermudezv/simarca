<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');
       
$mail = new PHPMailer(true);

$correo = "lic.lasesperanzas@wappcom.net";
$passemail = "4j?iJ.AiVqEG";

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
    $mail->AddAddress("mauricio.bermudez.vargas@mep.go.cr");
    $mail->Subject = "Reporte de Almuerzos Comedor";

    $mail->Body .= "<head>
                        <meta http-equiv='Content-type' content='text/html; charset=utf-8'/>           
                        <style>
                                html {
                                    overflow-y: auto;
                                }
                                
                                img
                                {
                                    max-width: 100%;
                                }
                                
                                html, body {
                                    height: 100%;
                                }
                                
                                body {
                                    margin: 0%;                                                                                                   
                                }
                                
                                #container {
                                    display: flex;
                                }
    
                                table, th, td {
                                border: 1px solid black;
                                border-collapse: collapse;
                                }
                        </style>
                    </head>";            
    $mail->Body .=  "<h3> Reporte Almuerzos Comedor </h3>";	
    $mail->Body .=  "<p> <b> El Sistema de Control de Marcas </b> le informa:</p>";    
    $mail->Body .=  "<div id='container'> 
                        <table style='width:100%'>
                            <tbody>
                                <tr style='width:50%'>
                                    <th scope='row'>Fecha:</th>
                                    <td> 11-08/2021 </td>
                                </tr>
                            </tbody> 
                        </table> 
                    </div>
                    <br/>";                               
    $mail->IsHTML(true);
    $mail->Send();
 
    echo "ok";

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>