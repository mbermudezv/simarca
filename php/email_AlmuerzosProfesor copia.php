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

$correo = "mauriciobermudez@wappcom.net";
$passemail = "{cqa4G&UJEt6";

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
    
    date_default_timezone_set('America/Costa_Rica');
	$fechaDesdeYMD = date_create($fechaDesde)->format('Y-m-d');
    $fechaHastaYMD = date_create($fechaHasta)->format('Y-m-d');

    $begin = new DateTime($fechaDesdeYMD);
    $end   = new DateTime($fechaHastaYMD);

    for($i = $begin; $i <= $end; $i->modify('+1 day'))
    {
                       
        if(!empty($JSON_Datos)) 
        {

            $fechaRegistro = $i->format("Y-m-d");

            $search_path = multiSearch($JSON_Datos, array('Fecha' => $fechaRegistro));

            if(!empty($search_path))
            {
                
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

                foreach($search_path as $key => $value) 
                {
                    $sinpe = "En efectivo";
                    $nombre = $value['profesor_nombre'] . " ". $value['profesor_primer_apellido'] . " ". $value['profesor_segundo_apellido'];
                    $monto = $value['Monto'];

                    if ($value['Sinpe']==1) {
                        $sinpe="Sinpe";
                    }

                    $mail->Body .= "<tr style='width:50%'>                                    
                                        <td>".$nombre."</td>
                                        <td>".$monto."</td>
                                        <td>".$sinpe."</td>
                                    </tr>";
                                        
                }

                $mail->Body .= "</tbody> 
                </table> 
            </div>
            <br/>";

            }    
        }
       
    }

    $mail->Body .= "<br/>";

    $mail->Body .= "<div>
                        <table style='width:70%'>
                            <tbody>
                                <tr>
                                    <td>------------------------------</td>                                    
                                </tr>
                                <tr>
                                    <td>MSc. ___________________________________</td>
                                </tr>
                                <tr>
                                    <td>Director(a) Institucional</td>
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

function multiSearch(array $array, array $pairs)
{

	$found = array();

	foreach ($array as $aKey => $aVal) {

		$coincidences = 0;

		foreach ($pairs as $pKey => $pVal) {

			if (array_key_exists($pKey, $aVal) && $aVal[$pKey] == $pVal) {
				$coincidences++;
			}

		}

		if ($coincidences == count($pairs)) {
			$found[$aKey] = $aVal;
		}
	}

	return $found;
}

?>