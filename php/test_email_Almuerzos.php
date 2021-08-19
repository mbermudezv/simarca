<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$JSON_Datos = array();
$JSON_Datos = json_decode($_POST['JSON_Datos'], true);

$fecha = $_POST['fecha'];

$mail = new PHPMailer(true);

$correo = "lic.lasesperanzas@wappcom.net";
$passemail = "liceoLE2021";

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
    $mail->AddAddress("lic.lasesperanzas@mep.go.cr");
    $mail->AddCC("rvindas@lasesperanzas.ed.cr");
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
    $mail->Body .=  "<p> <b> El Sistema de Control de Marcas </b> le informa la lista de Almuerzos del Comedor:</p>";    
    $mail->Body .=  "<div id='container'> 
                        <table style='width:100%'>
                            <tbody>
                                <tr style='width:50%'>
                                    <th scope='row'>Fecha:</th>
                                    <td>".$fecha."</td>
                                </tr>
                            </tbody> 
                        </table> 
                    </div>
                    <br/>";
    
    $mail->Body .=  "<div id='container'> 
        <table style='width:100%'>
            <tbody>"; 

    if(!empty($JSON_Datos)) 
    { 
        foreach($JSON_Datos as $key => $value) 
        {
            $nombre = $value['Estudiante_Nombre'] . " ". $value['Estudiante_Apellido1'] . " ". $value['Estudiante_Apellido2'];
            $seccion_Descripcion = $value['seccion_Descripcion'];

            $mail->Body .= "<tr style='width:80%'>                                    
                                <td>".$nombre."</td>
                                <td>".$seccion_Descripcion."</td>
                            </tr>";
                                
        }
    }

    $mail->Body .= "</tbody> 
                </table> 
            </div>
            <br/>";

    $mail->IsHTML(true);
    $mail->Send();    

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>