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

/* $correo = "lic.lasesperanzas@wappcom.net";
$passemail = "liceoLE2021";
 */

/*$correo = "comedor@wappcom.net";
$passemail = "liceoLE2021";*/

$correo = "gaoydnxo@lake-9070.banahosting.com";
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
    $mail->AddAddress("rvindas@lasesperanzas.ed.cr");

    $mail->AddEmbeddedImage('escudo.png', 'escudo', 'escudo.png');
    $srcImagen = "cid:escudo";    

    $mail->Subject = "Reporte de Almuerzos Comedor";

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
    $mail->Body .=  "<p> El Sistema de Control de Marcas [SiMarca] le informa la lista de Almuerzos del Comedor:</p>";
    $mail->Body .=  "<div id='container'> 
                        <table style='width:50%'>
                            <tbody>
                                <tr style='width:30%'>
                                    <th scope='row'>Fecha:</th>
                                    <td>".$fecha."</td>
                                </tr>
                            </tbody> 
                        </table> 
                    </div>
                    <br/>";
    
    $mail->Body .=  "<div id='container'> 
        <table style='width:60%'>
            <tbody>"; 

    if(!empty($JSON_Datos)) 
    { 
        foreach($JSON_Datos as $key => $value) 
        {
            $nombre = $value['Estudiante_Nombre'] . " ". $value['Estudiante_Apellido1'] . " ". $value['Estudiante_Apellido2'];
            $seccion_Descripcion = $value['seccion_Descripcion'];

            $mail->Body .= "<tr style='width:50%'>                                    
                                <td>".$nombre."</td>
                                <td>".$seccion_Descripcion."</td>
                            </tr>";
                                
        }
    }

    $mail->Body .= "</tbody> 
                </table> 
            </div>
            <br/>";

    $mail->Body .= "<br/>";


    $mail->Body .= "<div>
                        <table style='width:70%'>
                            <tbody>
                                <tr>
                                    <td>------------------------------</td>
                                    <td>------------------------------</td>                
                                </tr>
                                <tr>
                                    <td>MSc. Patricia God&iacute;nez S&aacute;nchez</td>
                                    <td>MSc. Raquel Vindas Quiros</td>
                                </tr>
                                <tr>
                                    <td>Director Institucional</td>
                                    <td>Coordinadora Comite Nutrici&oacute;n</td>                
                                </tr>
                            </tbody>
                        </table> 
                    </div>";

    $mail->IsHTML(true);
    $mail->Send();    

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>