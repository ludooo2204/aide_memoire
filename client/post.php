<?php
$indiceFromJS = file_get_contents(('php://input'));
try {
    $pdo = new PDO("mysql:host=localhost;dbname=essaiphp", "root", "", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ]);

    if ($indiceFromJS == "") {
        $query = $pdo->prepare('SELECT * FROM mock_data');
        $query->execute();
    } else {
        $query = $pdo->prepare('SELECT * FROM mock_data WHERE id = :id');
        $query->execute(['id' => $indiceFromJS]);
    }

    $posts = $query->fetchAll();


    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (PDOException $e) {
    echo $e->getMessage();
}