
        <?php
        
        
        echo file_get_contents('templates/head.tpl');
        echo file_get_contents('templates/topAnimacio.tpl');
        echo file_get_contents('templates/menu.tpl');
        echo file_get_contents('templates/bejelentkezes.tpl');
        echo file_get_contents('templates/elsoReteg.tpl');
        echo file_get_contents('templates/halasReteg.tpl');
        echo file_get_contents('templates/harmadikReteg.tpl');
        echo file_get_contents('templates/lorem.tpl');
        include "includes/halFunkciok.php";
        halInit();
        halMozgatas();
        
