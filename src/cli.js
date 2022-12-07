import pegaArquivo from "./index.js";

const caminho = process.argv;

async function processaTexto(caminho){
    const resultado = await pegaArquivo(caminho[2]);
    console.log(resultado);
}

processaTexto(caminho);

