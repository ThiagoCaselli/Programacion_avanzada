// 1. Función Suma

function sumar(a, b) {
  return a + b;
}

console.log("1. Función Suma");
console.log("5 + 3 =", sumar(5, 3));
console.log("10 + -4 =", sumar(10, -4));
console.log("2.5 + 7.5 =", sumar(2.5, 7.5));



// 2. Función que Multiplica

function multiplicar(a, b) {
  return a * b;
}

console.log("\n2. Función que Multiplica");
console.log("4 * 6 =", multiplicar(4, 6));
console.log("-3 * 5 =", multiplicar(-3, 5));
console.log("7 * 0 =", multiplicar(7, 0));



// 3. Función con Parámetro por Defecto

function saludar(nombre = "Invitado") {
  return `Hola, ${nombre}`;
}

console.log("\n3. Función con Parámetro por Defecto");
console.log(saludar()); // Usa valor por defecto "Invitado"
console.log(saludar("Thiago"));



// 4. Función que Devuelve un Objeto

function crearPersona(nombre, edad) {
  return {
    nombre: nombre,
    edad: edad
  };
}

console.log("\n4. Función que Devuelve un Objeto");
const persona = crearPersona("Ana", 25);
for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}



// 5. Función que Modifica un Objeto

function actualizarEdad(persona, nuevaEdad) {
  persona.edad = nuevaEdad;
}

console.log("\n5. Función que Modifica un Objeto");
console.log("Antes de actualizar:");
for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}

actualizarEdad(persona, 26);

console.log("\nDespués de actualizar la edad a 26:");
for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}



// 6. Función Recursiva

function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log("\n6. Función Recursiva (Factorial)");
console.log("Factorial de 0:", factorial(0));
console.log("Factorial de 5:", factorial(5));
console.log("Factorial de 6:", factorial(6));



// 7. Función con Función Interna

function despedir() {
  function adios() {
    return "¡Hasta luego! Que tengas un buen día.";
  }
  return adios();
}

console.log("\n7. Función con Función Interna");
console.log(despedir());



// 8. Función que Usa Otra Función

function procesarArray(array, funcion) {
  const resultado = [];
  for (let i = 0; i < array.length; i++) {
    resultado.push(funcion(array[i]));
  }
  return resultado;
}

const numeros = [1, 2, 3, 4, 5];
const duplicar = function (num) {
  return num * 2;
};

const numerosDuplicados = procesarArray(numeros, duplicar);

console.log("\n8. Función que Usa Otra Función");
console.log("Array original:", numeros);
console.log("Array procesado (multiplicado por 2):", numerosDuplicados);



// 9. Función que Devuelve Otra Función (Closure)

function crearMultiplicador(x) {
  return function (numero) {
    return numero * x;
  };
}

const duplicador = crearMultiplicador(2);
const triplicador = crearMultiplicador(3);

console.log("\n9. Función que Devuelve Otra Función");
console.log("5 duplicado con duplicador(5):", duplicador(5));
console.log("5 triplicado con triplicador(5):", triplicador(5));



// 10. Función Anónima

const sumarAnonima = function (a, b) {
  return a + b;
};

console.log("\n10. Función Anónima");
console.log("sumarAnonima(7, 12) =", sumarAnonima(7, 12));
console.log("sumarAnonima(20, 30) =", sumarAnonima(20, 30));
