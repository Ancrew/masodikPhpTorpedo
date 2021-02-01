        
<?php
session_start();
echo file_get_contents('templates/fooldal/head.tpl');
echo file_get_contents('templates/animaciok/topAnimacio.tpl');


        if (isset($_SESSION["userid"])) {
             echo file_get_contents('templates/fooldal/menuLogged.tpl');
        } else {
             echo file_get_contents('templates/fooldal/menu.tpl');
        }
      



if (isset($_GET["error"])) {
    $ujUzenet = file_get_contents('templates/bejelentkezes/bejelentkezes.tpl');

    if ($_GET["error"] == "emptyinputslogin") {
//        echo "<p>Minden mezőt tölts ki!</p>";

        $ujUzenet = str_replace('Nincs még fiókod?', 'Minden mezőt tölts ki!', $ujUzenet);
        echo $ujUzenet;
    }
    if ($_GET["error"] == "wronglogin") {

        $ujUzenet = str_replace('Nincs még fiókod?', 'Téves adatokat adtál meg!', $ujUzenet);
        echo $ujUzenet;
    }
    if ($_GET["error"] == "wrongpass") {

        $ujUzenet = str_replace('Nincs még fiókod?', 'Téves jelszót adtál meg!', $ujUzenet);
        echo $ujUzenet;
    }
    
}
else{
    echo file_get_contents('templates/bejelentkezes/profil.tpl');
}              
                    