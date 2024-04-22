<?php
// Engedélyezi a CORS-t minden eredet esetén
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// A fájlok elérési útvonalának definiálása
$fileDirectory = './f/';

// Főprogram: különböző műveletek végrehajtása az URL paraméterek alapján
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'list':
            listFiles();
            break;
        case 'get':
            if (isset($_GET['filename'])) {
                getFile($_GET['filename']);
            } else {
                echo 'Filename not provided.';
            }
            break;
        default:
            echo 'Invalid action.';
    }
} else {
    echo 'No action provided.';
}

// A fájlok listázásához
function listFiles() {
    global $fileDirectory;
    $files = scandir($fileDirectory); // A fájlok listázása
    $files = array_diff($files, array('..', '.')); // A "." és ".." elemek eltávolítása
    echo implode("\n", $files); // Szövegként adja vissza a fájllistát, soronként
}

// A fájl letöltéséhez
function getFile($filename) {
    global $fileDirectory;
    $file = $fileDirectory . $filename; // A fájl elérési útvonalának összeállítása

    // Ellenőrizzük, hogy a fájl létezik és olvasható-e
    if (file_exists($file) && is_readable($file)) {
        // Beállítjuk a HTTP header-t a fájl letöltéséhez
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        header('Content-Length: ' . filesize($file));
        header('Pragma: public');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Expires: 0');
        // Fájl kimenetelezése
        readfile($file);
        exit;
    } else {
        echo 'File not found or not readable.';
    }
}
?>
