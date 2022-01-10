<?php

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

$search_path = multiSearch($gfg_array, array('subject' => 'Distributed Computing'));

print_r($search_path);

?>
