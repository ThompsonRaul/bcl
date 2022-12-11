import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';
import listaValidada from "./validacao-http.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, id = ''){

    if(valida){
        console.log(chalk.yellow(`Lista validada: ${id}`), await listaValidada(resultado)); 

    }else{
        console.log(chalk.yellow(`Lista de links: ${id}`), resultado);
    }
    
    

} 

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if(erro.code === 'ENOENT'){
            console.log("Arquivo/diretório inexistente");
            return;
        }
    }

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeArquivo) =>{
           const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`); 
           imprimeLista(valida, lista, nomeArquivo);
        });
    }
}

processaTexto(caminho);

