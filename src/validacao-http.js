import chalk from "chalk";

function extraiLinks(listaLinks){
    return listaLinks.map((objLink) => Object.values(objLink).join())

}

async function checaStatus(listaURLs){
    const listaStatus = await Promise.all(  
        listaURLs.map(async (url) => {
            try {
                const res = await fetch(url);
                return res.status;
                
            } catch (erro) {
                return manejaErros(erro);
            }
       })
    )
       return listaStatus;
}

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return `Link não encontrado...`;
    }else{
        return `Ocorreu algum erro... Código do erro: ${erro.cause.code}`;
    }
}


async function listaValidada(lista){
    const links =  extraiLinks(lista);
    const status = await checaStatus(links);
    return lista.map((objeto, indice) => ({
        ...objeto, 
        status: status[indice]
    }));
}

export default listaValidada;