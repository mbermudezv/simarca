<?php
function searchForId($search_value, $array) {

	// Iterating over main array
	foreach ($array as $key1 => $val1) {

		$temp_path = array();
        array_push($temp_path, $key1);
		
		// Check if this value is an array
		// with atleast one element
		if(is_array($val1) and count($val1)) {

			// Iterating over the nested array
			foreach ($val1 as $key2 => $val2) {

				if($val2 == $search_value) {
						
					// Adding current key to search path
					//array_push($temp_path, $key2);
						
				}
			}
		}
		
		elseif($val1 == $search_value) {
            //array_push($temp_path, $key1);
		}
	}
	
	//return null;
    return $temp_path;
}

// Multidimensional array
$gfg_array = array(
	array(
		'score' => '100',
		'name' => 'Sam',
		'subject' => 'Data Structures'
	),
	array(
		'score' => '50',
		'name' => 'Tanya',
		'subject' => 'Advanced Algorithms'
	),
	array(
		'score' => '75',
		'name' => 'Jack',
		'subject' => 'Distributed Computing'
	)
);

$search_path = searchForId('Distributed Computing', $gfg_array);

print_r($search_path);

?>
