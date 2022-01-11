<?php

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(-1);

require '../sql/conexion.php';
require '../sql/select/selectReporteAlmuerzoProfesor.php';

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

try {

 	// $getfecDesde = $_GET['fechaDesde'];
    // $getfecHasta = $_GET['fechaHasta'];

    $getfecDesde = '04-11-2021';
    $getfecHasta = '05-11-2021';
    
	$Select = new SelectReporteAlmuerzoProfesor();
	$rs = $Select->selectReporteAlmuerzoProfesor($getfecDesde, $getfecHasta);
	
    echo json_encode($rs);
    
    date_default_timezone_set('America/Costa_Rica');
	$fechaDesdeYMD = date_create($getfecDesde)->format('Y-m-d');
    $fechaHastaYMD = date_create($getfecHasta)->format('Y-m-d');

    $begin = new DateTime($fechaDesdeYMD);
    $end   = new DateTime($fechaHastaYMD);

    $mail = "";

    for($i = $begin; $i <= $end; $i->modify('+1 day'))
    {

        $fechaRegistro = $i->format("Y-m-d");
        $fecha = date_create($fechaRegistro)->format('m-d-Y');

        $mail .=  "<div id='container'> 
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
        
        $mail .=  "<div id='container'> 
                        <table style='width:60%'>
                            <tbody>";
        
        
        if(!empty($rs))
        {
            $search_path = multiSearch($rs, array('Fecha' => $fechaRegistro));

            if(!empty($rs))
            {

                foreach($search_path as $key => $value) 
                {
                    $nombre = $value['Estudiante_Nombre'] . " ". $value['Estudiante_Apellido1'] . " ". $value['Estudiante_Apellido2'];
                    $seccion_Descripcion = $value['seccion_Descripcion'];

                    $mail->Body .= "<tr style='width:50%'>                                    
                                        <td>".$nombre."</td>
                                        <td>".$seccion_Descripcion."</td>
                                    </tr>";
                                        
                }

            }

        }

        $mail .=    "</tbody> 
                </table> 
                </div>
                <br/>";
    }

    $Select = null;
    $rs = null;

    echo $mail;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $db = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>