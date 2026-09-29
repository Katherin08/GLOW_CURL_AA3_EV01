
document.addEventListener("DOMContentLoaded", function () {


const menuToggle =
    document.getElementById("menuToggle");

const closeMenu =
    document.getElementById("closeMenu");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


// Abrir menú

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.add("activo");

            overlay.classList.add("activo");

        }
    );

}


// Cerrar menú

if (closeMenu) {

    closeMenu.addEventListener(
        "click",
        function () {

            sidebar.classList.remove("activo");

            overlay.classList.remove("activo");

        }
    );

}


// Cerrar tocando el fondo

if (overlay) {

    overlay.addEventListener(
        "click",
        function () {

            sidebar.classList.remove("activo");

            overlay.classList.remove("activo");

        }
    );

}
});
