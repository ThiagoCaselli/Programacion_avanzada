// 1. Agregar y Eliminar Elementos

const frutas = ["manzana", "banana", "pera"];

console.log("1. Agregar y Eliminar Elementos");
console.log("Array inicial:", frutas);

// Agregamos una fruta al final
frutas.push("naranja");
console.log("Después de push('naranja'):", frutas);

// Eliminamos la última fruta
const frutaEliminada = frutas.pop();
console.log(`Fruta eliminada con pop(): ${frutaEliminada}`);
console.log("Array final:", frutas);



// 2. Array Bidimensional

const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("\n2. Array Bidimensional");
// El número 5 está en la fila índice 1, columna índice 1
const elementoCinco = matriz[1][1];
console.log("Elemento 5 accedido en matriz[1][1]:", elementoCinco);



// 3. Iterar sobre un Array

console.log("\n3. Iterar sobre un Array (bucle for)");
for (let i = 0; i < frutas.length; i++) {
  console.log(`Índice ${i}: ${frutas[i]}`);
}



// 4. Uso de map

function elevarAlCuadrado(numeros) {
  return numeros.map((num) => num ** 2);
}

console.log("\n4. Uso de map (elevarAlCuadrado) ");
const listaNumeros = [1, 2, 3, 4, 5];
const numerosAlCuadrado = elevarAlCuadrado(listaNumeros);
console.log("Array original:", listaNumeros);
console.log("Array al cuadrado:", numerosAlCuadrado);



// 5. Uso de filter

function filtrarMayoresDe(numeros, valorReferencia) {
  return numeros.filter((num) => num > valorReferencia);
}

console.log("\n5. Uso de filter (filtrarMayoresDe)");
const valores = [5, 12, 8, 130, 44, 3, 25];
const referencia = 15;
const mayores = filtrarMayoresDe(valores, referencia);
console.log("Array original:", valores);
console.log(`Elementos mayores a ${referencia}:`, mayores);



// 6. Uso de reduce

function sumarElementos(numeros) {
  return numeros.reduce((acumulador, actual) => acumulador + actual, 0);
}

console.log("\n6. Uso de reduce (sumarElementos)");
const numerosASumar = [10, 20, 30, 40];
const totalSuma = sumarElementos(numerosASumar);
console.log("Array a sumar:", numerosASumar);
console.log("Suma total:", totalSuma);



// 7. Uso de some

const numerosSome = [2, 5, 8, 1, 14, 4];
const hayMayorQue10 = numerosSome.some((num) => num > 10);

console.log("\n7. Uso de some");
console.log("Array evaluado:", numerosSome);
console.log("¿Algún número es mayor que 10?:", hayMayorQue10);



// 8. Uso de every

const numerosEvery = [1, 4, 7, 12, 9];
const sonTodosPositivos = numerosEvery.every((num) => num > 0);

console.log("\n8. Uso de every");
console.log("Array evaluado:", numerosEvery);
console.log("¿Todos los números son positivos (> 0)?:", sonTodosPositivos);



// 9. Uso de find

const personas = [
  { nombre: "Laura", edad: 25 },
  { nombre: "Martín", edad: 29 },
  { nombre: "Valeria", edad: 34 },
  { nombre: "Joaquín", edad: 42 }
];

const primeraPersonaMayorDe30 = personas.find((persona) => persona.edad > 30);

console.log("\n9. Uso de find ");
console.log("Primera persona mayor de 30 años encontrada:");
console.log(`- Nombre: ${primeraPersonaMayorDe30.nombre}, Edad: ${primeraPersonaMayorDe30.edad}`);



// 10. Uso de sort

const palabras = ["pera", "manzana", "uva", "banana", "cereza", "kiwi"];

console.log("\n10. Uso de sort");
console.log("Palabras antes de ordenar:", [...palabras]);

// Ordenamos alfabéticamente
palabras.sort((a, b) => a.localeCompare(b));

console.log("Palabras ordenadas alfabéticamente:", palabras);
