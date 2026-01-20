<?php
$token = 'baeda71e3ab2aa3a97524eee8938567d800af31e58fc88111587b65ab8b6df33db2e7c1eebc5';
$url = "https://myworkspace.hurma.work/api/v1/out-off-office?per_page=100&page=1";

$options = [
    "http" => [
        "header" => "X-Requested-With: XMLHttpRequest\r\n" .
                    "token: $token\r\n" .
                    "Accept: application/json\r\n",
        "method" => "GET",
    ],
    "ssl" => [
        "verify_peer" => true,
        "verify_peer_name" => true,
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo "Error fetching data";
} else {
    $data = json_decode($response, true);
    echo '<pre>'; print_r($data); echo '</pre>';
}
?>