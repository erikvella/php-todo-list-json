<?php

// con questo file leggo il file json e lo salvo in una variabile sotto forma di stringa
// file_get_contents accede a un file esterno e lo restituisce sotto forma di stringa
$json_string = file_get_contents('todolist.json');

// una volta fatto ciò devo trasformare questa stringa in un array

$list = json_decode($json_string,true);
// verifico se mi arriva in POST la viariabile del nuovo item
if(isset($_POST['todoItem'])){
  // aggiungo l'elemento alla lista 
  $newItem = $_POST['todoItem'];
  $newTask = [
    'text' => $newItem,
    'done' => false
  ];
  $list[] = $newTask;

  // salvo il dato nel file JSON esterno
  file_put_contents('todolist.json' , json_encode($list));

}

if(isset($_POST['indexToDelete'])){
  $indexToDelete = $_POST['indexToDelete'];
  array_splice($list , $indexToDelete , 1);
  file_put_contents('todolist.json' , json_encode($list));
}


if(isset($_POST['indexToToggle'])){
  $indexToToggle = $_POST['indexToToggle'];
  $list[$indexToToggle]['done'] =!$list[$indexToToggle]['done'];
  file_put_contents('todolist.json', json_encode($list));
}

// voglio che la lettura di questo file PHP si comporti come una file JSON
// "trasformo" il file PHP in file JSON

header('Content-Type: application/json');

// stampo la lista ricodificata ,  ovvero la lista PHP torna ad essere una stringa

echo json_encode($list);