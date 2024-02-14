let ship = document.getElementById('ship');
let aliens = document.getElementById('aliens');

let x = 46;
let y = 84;

ship.style.left = x + "vw";
ship.style.top = y + "vh"

document.onkeydown = function (event) {
    if (event.key === "ArrowLeft") {
        x -= 1;
    } else if (event.key === "ArrowRight") {
        x += 1;
    }

    if (x < 0) {
        x = 100 - 10;
    }
    if (x > 90) {
        x = 0;
    }

    ship.style.left = x + "vw";

    if (event.key === "ArrowUp" && y >= 1) {
        y -= 1
    } else if (event.key === "ArrowDown" && y < 84) {
        y += 1
    }


    ship.style.top = y + "vh"

    var shipInfo = ship.getBoundingClientRect()
    var alienInfo = aliens.getBoundingClientRect()

    if (shipInfo.left < alienInfo.right &&
        shipInfo.right > alienInfo.left &&
        shipInfo.top < alienInfo.bottom - 20 &&
        shipInfo.bottom > alienInfo.top) {
        ship.src = 'images/explosion.png'
    }


}






