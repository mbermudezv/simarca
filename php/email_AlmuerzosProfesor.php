<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$JSON_Datos = array();
$JSON_Datos = json_decode($_POST['JSON_Datos'], true);

$fechaDesde = $_POST['fechaDesde'];
$fechaHasta = $_POST['fechaHasta'];

$mail = new PHPMailer(true);

/* $correo = "lic.lasesperanzas@wappcom.net";
$passemail = "liceoLE2021";
 */

$correo = "comedor@wappcom.net";
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
    $mail->AddAddress("rvindas@lasesperanzas.ed.cr");

    $mail->AddEmbeddedImage('escudo.png', 'escudo', 'escudo.png');
    $srcImagen = "cid:escudo";    

    $mail->Subject = "Asistencia funcionarios comedor";

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
    
    date_default_timezone_set('America/Costa_Rica');
	$fechaDesdeYMD = date_create($fechaDesde)->format('Y-m-d');
    $fechaHastaYMD = date_create($fechaHasta)->format('Y-m-d');

    $begin = new DateTime($fechaDesdeYMD);
    $end   = new DateTime($fechaHastaYMD);

    for($i = $begin; $i <= $end; $i->modify('+1 day'))
    {

        $fechaRegistro = $i->format("Y-m-d");
        $fecha = date_create($fechaRegistro)->format('m-d-Y');

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

            $output = array_filter($JSON_Datos, function($value) {
                return $value % 2 == 0;  
              });

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
    }

    $mail->Body .= "<br/>";

    $mail->Body .= "<div>
                        <table style='width:70%'>
                            <tbody>
                                <tr>
                                    <td>------------------------------</td>
                                    <td>------------------------------</td>                
                                </tr>
                                <tr>
                                    <td>MSc. Henry Navarro Zu&ntilde;iga</td>
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