<?php
$client = curl_init();

$option = [
    CURLOPT_URL => "https://myworkspace.hurma.work/api/v1/out-off-office?per_page=100&page=1",
    CURLOPT_POST => false,
    CURLOPT_HTTPGET => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-Requested-With: XMLHttpRequest",
        "token: baeda71e3ab2aa3a97524eee8938567d800af31e58fc88111587b65ab8b6df33db2e7c1eebc5"
    ],
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false 
];

if(curl_setopt_array($client, $option)){
    $result = curl_exec($client);
    if($result !== false){
        $result = json_decode($result, true);
    } else {
        $result = curl_error($client);
    }
    echo '<pre>';print_r($result);echo '</pre>';
}
?>