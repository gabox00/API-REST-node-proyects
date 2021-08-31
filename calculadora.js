'use strict'

var params = process.argv.slice(2);
console.log("calculadora");

var num1 = parseFloat(params[0]);
var num2 = parseFloat(params[1]);

var calc = `
    suma: ${num1+num2} 
    resta: ${num1-num2} 
    division: ${num1/num2} 
    multiplicacion: ${num1*num2}
`;

console.log(calc);