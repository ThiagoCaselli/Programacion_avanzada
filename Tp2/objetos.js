
// 1. Creación de un Objeto Básico

const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anioDePublicacion: 1967
};

console.log("1. Objeto Básico");
console.log("Título:", libro.titulo);
console.log("Autor:", libro.autor);
console.log("Año de Publicación:", libro.anioDePublicacion);



// 2. Anidación de Objetos

const estudiante = {
  nombre: "Carlos Pérez",
  edad: 21,
  direccion: {
    calle: "Av. San Martín 1234",
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
};

console.log("\n2. Anidación de Objetos");
console.log(
  `Dirección completa: ${estudiante.direccion.calle}, ${estudiante.direccion.ciudad}, ${estudiante.direccion.pais}`
);


// 3. Métodos en Objetos

libro.descripcion = function () {
  return `"${this.titulo}" fue escrito por ${this.autor}.`;
};

console.log("\n3. Métodos en Objetos");
console.log(libro.descripcion());



// 4. Iteración sobre Propiedades de un Objeto

const producto = {
  nombre: "Auriculares Bluetooth",
  precio: 49.99,
  disponible: true
};

console.log("\n4. Iteración con for...in");
for (const propiedad in producto) {
  console.log(`${propiedad}: ${producto[propiedad]}`);
}



// 5. Actualización de Propiedades

producto.precio = 39.99;

console.log("\n5. Actualización de Propiedades");
for (const propiedad in producto) {
  console.log(`${propiedad}: ${producto[propiedad]}`);
}



// 6. Comprobación de Propiedades

function tienePropiedad(objeto, propiedad) {
  return propiedad in objeto;
}

console.log("\n6. Comprobación de Propiedades");
console.log("¿Tiene 'precio'?:", tienePropiedad(producto, "precio")); // true
console.log("¿Tiene 'descuento'?:", tienePropiedad(producto, "descuento")); // false



// 7. Eliminación de Propiedades

console.log("\n7. Eliminación de Propiedades");
console.log("Antes de eliminar 'disponible':");
for (const propiedad in producto) {
  console.log(`${propiedad}: ${producto[propiedad]}`);
}

delete producto.disponible;

console.log("\nDespués de eliminar 'disponible':");
for (const propiedad in producto) {
  console.log(`${propiedad}: ${producto[propiedad]}`);
}



// 8. Combinar Objetos

const persona1 = {
  nombre: "Lucía",
  profesion: "Diseñadora"
};

const persona2 = {
  edad: 28,
  nacionalidad: "Chilena"
};

// Combinamos en un nuevo objeto usando Object.assign
const personaCombinada = Object.assign({}, persona1, persona2);

console.log("\n8. Combinar Objetos");
console.log("Objeto combinado:");
for (const propiedad in personaCombinada) {
  console.log(`${propiedad}: ${personaCombinada[propiedad]}`);
}



// 9. Copiar Objetos (Copia Profunda)

const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));

// Modificamos propiedades en el primer y segundo nivel de la copia
copiaEstudiante.nombre = "María Gómez";
copiaEstudiante.direccion.ciudad = "Córdoba";

console.log("\n9. Copiar Objetos");
console.log("Original (sin alterar):");
for (const propiedad in estudiante) {
  if (typeof estudiante[propiedad] === "object" && estudiante[propiedad] !== null) {
    console.log(`${propiedad}:`);
    for (const subProp in estudiante[propiedad]) {
      console.log(`  ${subProp}: ${estudiante[propiedad][subProp]}`);
    }
  } else {
    console.log(`${propiedad}: ${estudiante[propiedad]}`);
  }
}

console.log("\nCopia (modificada):");
for (const propiedad in copiaEstudiante) {
  if (typeof copiaEstudiante[propiedad] === "object" && copiaEstudiante[propiedad] !== null) {
    console.log(`${propiedad}:`);
    for (const subProp in copiaEstudiante[propiedad]) {
      console.log(`  ${subProp}: ${copiaEstudiante[propiedad][subProp]}`);
    }
  } else {
    console.log(`${propiedad}: ${copiaEstudiante[propiedad]}`);
  }
}



// 10. Métodos Getters y Setters

// Guardamos el valor actual en una propiedad auxiliar (_anioDePublicacion)
libro._anioDePublicacion = libro.anioDePublicacion;
delete libro.anioDePublicacion;

// Definimos el getter y setter en el objeto libro
Object.defineProperty(libro, "anioDePublicacion", {
  get() {
    return this._anioDePublicacion;
  },
  set(nuevoAnio) {
    this._anioDePublicacion = nuevoAnio;
  },
  configurable: true,
  enumerable: true
});

console.log("\n10. Getters y Setters");
// Usamos el setter para actualizar el año
libro.anioDePublicacion = 1970;

// Usamos el getter para leer el valor
console.log("Año de publicación obtenido con getter:", libro.anioDePublicacion);
