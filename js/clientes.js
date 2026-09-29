
const API_URL = "http://localhost:3000/api";

// ==================================================
// REGISTRO
// ==================================================

async function registrarCliente(evento) {

evento.preventDefault();

const nombre =
    document.getElementById("nombre").value.trim();

const apellido =
    document.getElementById("apellido").value.trim();

const telefono =
    document.getElementById("telefono").value.trim();

const correo =
    document.getElementById("correo").value.trim();

const tipoCabello =
    document.getElementById("cabello").value;

const contrasena =
    document.getElementById("contrasena").value;

const confirmar =
    document.getElementById("confirmarContrasena")
        ?.value;

const mensaje =
    document.getElementById("mensaje");


if (
    !nombre ||
    !apellido ||
    !correo ||
    !tipoCabello ||
    !contrasena
) {

    mensaje.textContent =
        "Complete los campos obligatorios.";

    return;
}


if (confirmar !== undefined &&
    contrasena !== confirmar) {

    mensaje.textContent =
        "Las contraseñas no coinciden.";

    return;
}


try {

    const respuesta = await fetch(
        `${API_URL}/clientes`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono,
                tipo_cabello: tipoCabello,
                contrasena: contrasena

            })
        }
    );


    const resultado =
        await respuesta.json();


    if (resultado.ok) {

        mensaje.textContent =
            "Cliente registrado correctamente.";

        mensaje.style.color = "green";

        document
            .getElementById("formularioCliente")
            .reset();

    } else {

        mensaje.textContent =
            resultado.mensaje ||
            "No se pudo registrar el cliente.";

        mensaje.style.color = "crimson";
    }


} catch (error) {

    console.error(error);

    mensaje.textContent =
        "No se pudo conectar con el servidor.";

    mensaje.style.color = "crimson";
}


}

// ==================================================
// LOGIN
// ==================================================

async function iniciarSesion(evento) {


evento.preventDefault();

const correo =
    document
        .getElementById("usuarioCliente")
        .value
        .trim();

const contrasena =
    document
        .getElementById("passwordCliente")
        .value;

const mensaje =
    document.getElementById("mensaje");


try {

    const respuesta = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo: correo,
                contrasena: contrasena
            })
        }
    );


    const resultado =
        await respuesta.json();


    if (resultado.ok) {

        sessionStorage.setItem(
            "cliente",
            JSON.stringify(resultado.cliente)
        );

        mensaje.textContent =
            "Inicio de sesión correcto.";

        mensaje.style.color = "green";


        setTimeout(function () {

            window.location.href =
                "../cliente/inicioCliente.html";

        }, 500);

    } else {

        mensaje.textContent =
            resultado.mensaje ||
            "Correo o contraseña incorrectos.";

        mensaje.style.color = "crimson";
    }


} catch (error) {

    console.error(error);

    mensaje.textContent =
        "No se pudo conectar con el servidor.";

    mensaje.style.color = "crimson";
}


}

// ==================================================
// LIMPIAR LOGIN
// ==================================================

function limpiarCliente() {


const formulario =
    document.getElementById("loginClienteForm");

const mensaje =
    document.getElementById("mensaje");

if (formulario) {
    formulario.reset();
}

if (mensaje) {
    mensaje.textContent = "";
}

}

// ==================================================
// CARGAR PERFIL
// ==================================================

async function cargarPerfil() {


const datos =
    sessionStorage.getItem("cliente");

if (!datos) {

    window.location.href =
        "../auth/loginCliente.html";

    return;
}


const cliente =
    JSON.parse(datos);


const nombre =
    document.getElementById("nombre");

const apellido =
    document.getElementById("apellido");

const correo =
    document.getElementById("correo");

const telefono =
    document.getElementById("telefono");

const cabello =
    document.getElementById("cabello");


if (nombre) {
    nombre.value = cliente.nombre || "";
}

if (apellido) {
    apellido.value = cliente.apellido || "";
}

if (correo) {
    correo.value = cliente.correo || "";
}

if (telefono) {
    telefono.value = cliente.telefono || "";
}

if (cabello) {
    cabello.value = cliente.tipo_cabello || "";
}


}

// ==================================================
// ACTUALIZAR PERFIL
// ==================================================

async function actualizarPerfil(evento) {


evento.preventDefault();

const datos =
    sessionStorage.getItem("cliente");

if (!datos) {
    return;
}


const cliente =
    JSON.parse(datos);


const nombre =
    document.getElementById("nombre").value.trim();

const apellido =
    document.getElementById("apellido").value.trim();

const correo =
    document.getElementById("correo").value.trim();

const telefono =
    document.getElementById("telefono").value.trim();

const tipoCabello =
    document.getElementById("cabello").value;

const mensaje =
    document.getElementById("mensaje");


try {

    const respuesta = await fetch(
        `${API_URL}/clientes/${cliente.id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono,
                tipo_cabello: tipoCabello,
                contrasena: cliente.contrasena || null

            })
        }
    );


    const resultado =
        await respuesta.json();


    if (resultado.ok) {

        const clienteActualizado = {

            id: cliente.id,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            tipo_cabello: tipoCabello,
            contrasena: cliente.contrasena || null

        };


        sessionStorage.setItem(
            "cliente",
            JSON.stringify(clienteActualizado)
        );


        mensaje.textContent =
            "Información actualizada correctamente.";

        mensaje.style.color = "green";

    } else {

        mensaje.textContent =
            resultado.mensaje ||
            "No se pudo actualizar.";

        mensaje.style.color = "crimson";
    }


} catch (error) {

    console.error(error);

    mensaje.textContent =
        "No se pudo conectar con el servidor.";

    mensaje.style.color = "crimson";
}

}

// ==========================================
// EVENTOS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ==========================================
        // REGISTRO
        // ==========================================

        const formularioRegistro =
            document.getElementById(
                "formularioCliente"
            );

        if (formularioRegistro) {

            formularioRegistro.addEventListener(
                "submit",
                registrarCliente
            );

        }


        // ==========================================
        // LOGIN
        // ==========================================

        const formularioLogin =
            document.getElementById(
                "loginClienteForm"
            );

        if (formularioLogin) {

            formularioLogin.addEventListener(
                "submit",
                iniciarSesion
            );

        }


        // ==========================================
        // BOTÓN LIMPIAR
        // ==========================================

        const botonLimpiar =
            document.getElementById(
                "limpiarCliente"
            );

        if (botonLimpiar) {

            botonLimpiar.addEventListener(
                "click",
                limpiarFormularioLogin
            );

        }


        // ==========================================
        // PERFIL
        // ==========================================

        const formularioPerfil =
            document.getElementById(
                "formularioPerfil"
            );

        if (formularioPerfil) {

            formularioPerfil.addEventListener(
                "submit",
                actualizarPerfil
            );

            cargarPerfil();

        }

    }
);


// ==========================================
// BOTÓN LIMPIAR DEL LOGIN
// ==========================================

function limpiarFormularioLogin() {

    const formulario =
        document.getElementById(
            "loginClienteForm"
        );

    if (formulario) {

        formulario.reset();

    }


    // Volver a ocultar contraseña

    const password =
        document.getElementById(
            "passwordCliente"
        );

    if (password) {

        password.type = "password";

    }


    // Desmarcar "Mostrar contraseña"

    const mostrarPassword =
        document.getElementById(
            "mostrarPassword"
        );

    if (mostrarPassword) {

        mostrarPassword.checked = false;

    }


    // Limpiar mensaje

    const mensaje =
        document.getElementById(
            "mensaje"
        );

    if (mensaje) {

        mensaje.textContent = "";

        mensaje.className = "mensaje";

    }

}