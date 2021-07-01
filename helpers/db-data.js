// Convertir el objeto que se envía por el response a una cadena json - es como el res.json()
const varDump = (object) => JSON.stringify(object, null, 2);

module.exports = {
    varDump
}