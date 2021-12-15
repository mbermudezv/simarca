<?php

$arr = ['a' => 1, 'b' => 2, 'c' => 3, 'd' => 4];


var_dump(array_filter($arr, function($v, $k) {
    return $k == 'b' && $v == 2;
}, ARRAY_FILTER_USE_BOTH));

?>