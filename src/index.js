import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^s?#.]*.[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));

    return resultados.length > 0 ? resultados : 'Não há links para mostrar...';
}

function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(`Não foi possível executar a operação pelo erro ${erro.code}`));
}

// async function pegaArquivo(caminhoArquivo){
//     const encoding = 'utf8';
//     fs.promises.readFile(caminhoArquivo, encoding)
//     .then((txt) => console.log(chalk.green(txt)))
//     .catch((erro) => console.log(trataErro(erro)))
// }

async function pegaArquivo(caminhoArquivo){
    try {
        const encoding = 'utf8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }finally{
        console.log(chalk.yellow('Operação concluída.'));
    }
}

export default pegaArquivo;




