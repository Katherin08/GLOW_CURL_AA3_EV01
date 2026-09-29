
// Cargar variables de entorno
require("dotenv").config();

// Importar dependencias
const express = require("express");
const cors = require("cors");

// Importar conexión con MySQL
const pool = require("./db");

// Crear aplicación Express
const app = express();

// Puerto del servidor
const PORT = 3000;

// ==========================================
// CONFIGURACIÓN
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// RUTA DE PRUEBA DE BASE DE DATOS
// ==========================================

app.get("/api/prueba-db", async (req, res) => {

    try {

        const [resultado] = await pool.query(
            "SELECT 1 AS conexion"
        );

        res.json({
            ok: true,
            mensaje: "Conexión con MySQL funcionando",
            resultado
        });

    } catch (error) {

        console.error(
            "Error de conexión con MySQL:",
            error
        );

        res.status(500).json({
            ok: false,
            mensaje: "No se pudo conectar con MySQL"
        });
    }
});

// ==========================================
// REGISTRAR CLIENTE
// ==========================================

app.post("/api/clientes", async (req, res) => {

    const {
        nombre,
        apellido,
        correo,
        telefono,
        tipo_cabello,
        contrasena
    } = req.body;

    // Validar campos obligatorios
    if (
        !nombre ||
        !apellido ||
        !correo
    ) {

        return res.status(400).json({
            ok: false,
            mensaje: "Nombre, apellido y correo son obligatorios"
        });
    }

    try {

        // Verificar si el correo ya existe
        const [existente] = await pool.query(
            "SELECT id FROM clientes WHERE correo = ?",
            [correo]
        );

        if (existente.length > 0) {

            return res.status(400).json({
                ok: false,
                mensaje: "El correo ya está registrado"
            });
        }

        // Insertar cliente
        const [resultado] = await pool.query(
            `INSERT INTO clientes
            (
                nombre,
                apellido,
                correo,
                telefono,
                tipo_cabello,
                contrasena
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nombre,
                apellido,
                correo,
                telefono || null,
                tipo_cabello || null,
                contrasena || null
            ]
        );

        res.status(201).json({
            ok: true,
            mensaje: "Cliente registrado correctamente",
            id: resultado.insertId
        });

    } catch (error) {

        console.error(
            "Error al registrar cliente:",
            error
        );

        res.status(500).json({
            ok: false,
            mensaje: "Error al registrar el cliente"
        });
    }
});
/* ==========================================
INICIAR SESIÓN DEL CLIENTE
========================================== */

app.post("/api/login", async (req, res) => { 
    const { correo, contrasena } = req.body; 
    // Verificar que se hayan enviado los datos 
    if (!correo || !contrasena) { 
        return res.status(400).json({ ok: false, mensaje: "Ingresa tu correo y contraseña." 
        }); } try {
             // Buscar el cliente en la base de datos 
             const [clientes] = await pool.query( `SELECT id, nombre, apellido, correo, telefono, tipo_cabello, contrasena FROM clientes WHERE correo = ?`, [correo] ); 
             // Si el correo NO está registrado 
             if (clientes.length === 0) { return res.status(401).json({ ok: false, mensaje: "Este correo no está registrado. Debes crear una cuenta primero." }); } const cliente = clientes[0]; 
             // Comprobar contraseña 
             if (cliente.contrasena !== contrasena) { return res.status(401).json({ ok: false, mensaje: "La contraseña es incorrecta." }); } 
             // No enviar la contraseña al navegador 
             delete cliente.contrasena; 
             // Inicio de sesión correcto 
             res.json({ ok: true, mensaje: "Inicio de sesión correcto.", cliente: cliente }); } catch (error) { console.error( "Error al iniciar sesión:", error ); res.status(500).json({ ok: false, mensaje: "Error al conectar con el servidor." }); } });

// ==========================================
// CONSULTAR CLIENTES
// ==========================================

app.get("/api/clientes", async (req, res) => {

    try {

        const [clientes] = await pool.query(
            `SELECT
                id,
                nombre,
                apellido,
                correo,
                telefono,
                tipo_cabello
            FROM clientes
            ORDER BY id DESC`
        );

        res.json({
            ok: true,
            clientes: clientes
        });

    } catch (error) {

        console.error(
            "Error al consultar clientes:",
            error
        );

        res.status(500).json({
            ok: false,
            mensaje: "No se pudieron consultar los clientes"
        });
    }
});

// ==========================================
// ACTUALIZAR CLIENTE
// ==========================================

app.put("/api/clientes/:id", async (req, res) => {

    const id = req.params.id;

    const {
        nombre,
        apellido,
        correo,
        telefono,
        tipo_cabello,
        contrasena
    } = req.body;

    if (
        !nombre ||
        !apellido ||
        !correo
    ) {

        return res.status(400).json({
            ok: false,
            mensaje: "Nombre, apellido y correo son obligatorios"
        });
    }

    try {

        // Verificar que el cliente exista
        const [cliente] = await pool.query(
            "SELECT id FROM clientes WHERE id = ?",
            [id]
        );

        if (cliente.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "Cliente no encontrado"
            });
        }

        // Actualizar datos
        await pool.query(
            `UPDATE clientes
            SET
                nombre = ?,
                apellido = ?,
                correo = ?,
                telefono = ?,
                tipo_cabello = ?,
                contrasena = ?
            WHERE id = ?`,
            [
                nombre,
                apellido,
                correo,
                telefono || null,
                tipo_cabello || null,
                contrasena || null,
                id
            ]
        );

        res.json({
            ok: true,
            mensaje: "Cliente actualizado correctamente"
        });

    } catch (error) {

        console.error(
            "Error al actualizar cliente:",
            error
        );

        res.status(500).json({
            ok: false,
            mensaje: "No se pudo actualizar el cliente"
        });
    }
});

// ==========================================
// ELIMINAR CLIENTE
// ==========================================

app.delete("/api/clientes/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const [resultado] = await pool.query(
            "DELETE FROM clientes WHERE id = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "Cliente no encontrado"
            });
        }

        res.json({
            ok: true,
            mensaje: "Cliente eliminado correctamente"
        });

    } catch (error) {

        console.error(
            "Error al eliminar cliente:",
            error
        );

        res.status(500).json({
            ok: false,
            mensaje: "No se pudo eliminar el cliente"
        });
    }
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("GLOW CURL APP");
    console.log("Módulo de gestión de clientes");
    console.log("--------------------------------");
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
    console.log("--------------------------------");

});