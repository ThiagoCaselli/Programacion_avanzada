// 1. Consumo de Datos desde una API

async function obtenerUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await respuesta.json();
    return usuarios;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}



// 2. Procesamiento de Datos de una API

async function imprimirNombresDeUsuarios() {
  const usuarios = await obtenerUsuarios();
  if (usuarios) {
    console.log("Lista de nombres de usuarios:");
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. ${usuario.name}`);
    });
  }
}



// 3. Autenticación Simulada

function autenticarUsuario(credenciales) {
  const usuarioRegistrado = {
    usuario: "admin",
    contrasenia: "secret123"
  };

  const passwordIngresada = credenciales.contrasenia || credenciales.contraseña || credenciales.password;

  return (
    credenciales.usuario === usuarioRegistrado.usuario &&
    passwordIngresada === usuarioRegistrado.contrasenia
  );
}



// 4. Transformación de Datos

function mapearUsuarios(usuarios) {
  return usuarios.map((usuario) => ({
    nombre: usuario.name,
    email: usuario.email
  }));
}



// 5. Validación de Formularios

function validarFormulario(formulario) {
  const { nombre, email, password } = formulario;

  const esValido = (campo) => typeof campo === "string" && campo.trim().length > 0;

  return esValido(nombre) && esValido(email) && esValido(password);
}



// 6. Paginación de Datos

function obtenerPagina(datos, numeroPagina, elementosPorPagina = 5) {
  if (numeroPagina < 1) return [];
  const inicio = (numeroPagina - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return datos.slice(inicio, fin);
}



// 7. Envío de Datos a una API

async function enviarDatos(data) {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    });

    const resultado = await respuesta.json();
    console.log("Respuesta recibida de la API tras enviar datos:");
    for (const propiedad in resultado) {
      console.log(`${propiedad}: ${resultado[propiedad]}`);
    }
    return resultado;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
}



// 8. Búsqueda de Usuarios

function buscarUsuarioPorEmail(usuarios, email) {
  return usuarios.find(
    (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
  );
}



// 9. Generación de Token de Autenticación

function generarToken(usuario) {
  // Función auxiliar compatible con Node.js y navegadores
  const base64Encode = (str) => {
    if (typeof btoa === "function") {
      return btoa(str);
    }
    return Buffer.from(str).toString("base64");
  };

  const header = base64Encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Encode(JSON.stringify(usuario));
  const signature = base64Encode("firma_secreta_simulada");

  return `${header}.${payload}.${signature}`;
}



// 10. Actualización de Información del Usuario

function actualizarUsuario(usuario, cambios) {
  return { ...usuario, ...cambios };
}



// Demostración y Pruebas de Ejecución

async function ejecutarDemostracion() {
  console.log("1. Consumo de Datos desde una API");
  const listaUsuarios = await obtenerUsuarios();
  console.log(`Total de usuarios obtenidos: ${listaUsuarios ? listaUsuarios.length : 0}`);
  if (listaUsuarios && listaUsuarios.length > 0) {
    console.log("Primer usuario obtenido:");
    for (const prop in listaUsuarios[0]) {
      if (typeof listaUsuarios[0][prop] !== "object") {
        console.log(`  ${prop}: ${listaUsuarios[0][prop]}`);
      }
    }
  }

  console.log("\n2. Procesamiento de Datos de una API");
  await imprimirNombresDeUsuarios();

  console.log("\n3. Autenticación Simulada");
  const loginCorrecto = autenticarUsuario({ usuario: "admin", contrasenia: "secret123" });
  const loginIncorrecto = autenticarUsuario({ usuario: "admin", contrasenia: "passwordErroneo" });
  console.log(`Intento con credenciales correctas: ${loginCorrecto}`);
  console.log(`Intento con credenciales incorrectas: ${loginIncorrecto}`);

  console.log("\n4. Transformación de Datos");
  if (listaUsuarios) {
    const usuariosMapeados = mapearUsuarios(listaUsuarios);
    console.log("Primeros 3 usuarios mapeados (nombre y email):");
    usuariosMapeados.slice(0, 3).forEach((u, i) => {
      console.log(`  ${i + 1}. Nombre: ${u.nombre} | Email: ${u.email}`);
    });
  }

  console.log("\n5. Validación de Formularios");
  const formValido = { nombre: "Juan", email: "juan@example.com", password: "mipassword" };
  const formInvalido = { nombre: "Juan", email: "", password: "mipassword" };
  console.log(`Formulario completo es válido: ${validarFormulario(formValido)}`);
  console.log(`Formulario con email vacío es válido: ${validarFormulario(formInvalido)}`);

  console.log("\n6. Paginación de Datos");
  if (listaUsuarios) {
    const pagina1 = obtenerPagina(listaUsuarios, 1, 5);
    const pagina2 = obtenerPagina(listaUsuarios, 2, 5);
    console.log(`Elementos en Página 1 (Total: ${pagina1.length}):`);
    pagina1.forEach((u) => console.log(`  - [ID ${u.id}] ${u.name}`));
    console.log(`Elementos en Página 2 (Total: ${pagina2.length}):`);
    pagina2.forEach((u) => console.log(`  - [ID ${u.id}] ${u.name}`));
  }

  console.log("\n7. Envío de Datos a una API (POST)");
  const nuevoPost = {
    title: "Publicación de prueba",
    body: "Contenido de la publicación",
    userId: 1
  };
  await enviarDatos(nuevoPost);

  console.log("\n8. Búsqueda de Usuarios por Email");
  if (listaUsuarios) {
    const emailBuscado = "Sincere@april.biz";
    const usuarioEncontrado = buscarUsuarioPorEmail(listaUsuarios, emailBuscado);
    console.log(`Buscando usuario con email "${emailBuscado}":`);
    if (usuarioEncontrado) {
      console.log(`  Encontrado: ${usuarioEncontrado.name} (ID: ${usuarioEncontrado.id})`);
    } else {
      console.log("  No se encontró el usuario.");
    }
  }

  console.log("\n9. Generación de Token de Autenticación");
  const datosUsuarioParaToken = { id: 1, usuario: "admin", rol: "administrador" };
  const tokenGenerado = generarToken(datosUsuarioParaToken);
  console.log("Token JWT simulado generado:");
  console.log(tokenGenerado);

  console.log("\n10. Actualización de Información del Usuario");
  const usuarioOriginal = {
    id: 1,
    nombre: "Pedro",
    email: "pedro@example.com",
    rol: "usuario"
  };
  const cambiosAAplicar = {
    email: "pedro_nuevo@example.com",
    rol: "editor"
  };
  const usuarioActualizado = actualizarUsuario(usuarioOriginal, cambiosAAplicar);

  console.log("Usuario Original:");
  for (const p in usuarioOriginal) {
    console.log(`  ${p}: ${usuarioOriginal[p]}`);
  }
  console.log("\nUsuario Actualizado:");
  for (const p in usuarioActualizado) {
    console.log(`  ${p}: ${usuarioActualizado[p]}`);
  }
}

// Ejecutamos la demostración
ejecutarDemostracion();
