<?php
/**
* Mauricio Bermudez Vargas 4/01/2020 10:31 p.m.
*/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_FILES['upexcel']['tmp_name']) || !in_array($_FILES['upexcel']['type'], [
    'text/x-comma-separated-values', 
    'text/comma-separated-values', 
    'text/x-csv', 
    'text/csv', 
    'text/plain',
    'application/octet-stream', 
    'application/vnd.ms-excel', 
    'application/x-csv', 
    'application/csv', 
    'application/excel', 
    'application/vnd.msexcel', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ])) {
    die("error");
  }	

  require '../vendor/autoload.php';
  require '../sql/conexion.php';  
  require '../sql/insert/insertExcel.php';
  require '../sql/delete/deleteExcel.php';
  //require '../sql/insert/callExcel.php';

  try 
  {

    if (pathinfo($_FILES['upexcel']['name'], PATHINFO_EXTENSION) == 'csv') 
    {

        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Csv();

    } else     
      {

        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

      }
  
    $spreadsheet = $reader->load($_FILES['upexcel']['tmp_name']);

    $dbdeleteExcel = new deleteExcel();
    $dbdeleteExcel-> deleteExcel(); 

    $worksheet = $spreadsheet->getActiveSheet();   
    $highestRow = $worksheet->getHighestRow();    

    for ($row = 1; $row <= $highestRow; ++$row) 
    {

      $estudiante_Cedula = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
      $estudiante_PrimerApellido = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
      $estudiante_SegundoApellido = $worksheet->getCellByColumnAndRow(3, $row)->getValue();
      $estudiante_Nombre = $worksheet->getCellByColumnAndRow(4, $row)->getValue();
      $seccion_Id = $worksheet->getCellByColumnAndRow(5, $row)->getValue();

      $db = new insertExcel();
      $db-> insertExcel($estudiante_Cedula, $estudiante_Nombre, 
      $estudiante_PrimerApellido, $estudiante_SegundoApellido, $seccion_Id);

      $db = null;	
          
      }      
      
      $dbinsertExcel = new insertExcel();
      $dbinsertExcel-> callExcel();

      $dbinsertExcel = null;
      
      echo "Ok";

  } 

catch (PDOException $e) 
  {		

      $rs = null;
      $db = null;
      echo $e->getMessage();
      exit;

  }
  
?>