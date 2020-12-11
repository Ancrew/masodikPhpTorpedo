<div id="regfelulet">
    <div id="reg">
        <h1>Kezdjük is el!</h1>
           <form action="includes/feliratkozas.php" method="post">
                <label for="user">Felhasználónév</label>
                <input type="text" name="user" value="">
                <label for="pass">Jelszó</label>
                <input type="text" name="pass" value="">
                <label for="repass">Jelszó megerősítése</label>
                <input type="text" name="repass" value="">
                <label for="pass">e-mail cím</label>
                <input type="text" name="email" value="">
                <button type="submit" name = "submit">Regisztrálás</button>
           </form>
           <p>Sikeres küzdelmeket kívánunk!</p>
           <?php
                    if(isset($_GET["error"])){
                    if ($_GET["error"] == "emptyinput") {
                        echo "<p>Minden mezőt tölts ki!</p>";
                    }
                    if ($_GET["error"] == "invaliduid") {
                        echo "<p>Foglalt felhasználónév vagy email!</p>";
                    }
                    if ($_GET["error"] == "invalidemail") {
                        echo "<p>Hibás e-mail cím!</p>";
                    }
                    if ($_GET["error"] == "passwordsdontmatch") {
                        echo "<p>A jelszavad nem egyeznek!</p>";
                    }
                    if ($_GET["error"] == "stmtfailed") {
                        echo "<p>Valami hiba történt, próbálkozz újra!</p>";
                    }
                    if ($_GET["error"] == "none") {
                        echo "<p>Sikeres regisztráció!</p>";
                    }
                }
            ?>  
    </div>
</div>

