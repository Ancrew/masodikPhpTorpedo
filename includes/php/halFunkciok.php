<?php
$halacskam = file_get_contents('svg/halam.svg');
$raj = 40;                                                                      //maxhalak Száma


for ($i = 0; $i < $raj; $i++){                                                  //halak létrehozása
    echo $halacskam;
}
?>
<script type="text/javascript" src="includes/js/halak/vilagitoHal.js"></script>
<script type="text/javascript" src="includes/js/halak/hal.js"></script>
<script type="text/javascript" src="includes/js/halak/halKezelo.js"></script>
