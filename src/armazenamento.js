const B2 = require('backblaze-b2');

const b2 = new B2({
  idChaveAplicacao: process.env.KEY_ID,
  chaveAplicacao: process.env.APP_KEY,
});

const autenticarB2 = async () => {
  await b2.autorizar();
  console.log('Autenticado com o B2');
};

const enviarParaB2 = async (nomeArquivo, bufferArquivo) => {
  const resposta = await b2.enviarArquivo({
    nomeArquivo,
    dados: bufferArquivo,
    idBalde: 'c4c9278bd8543df588c2081a',
  });

  console.log('Enviado para o B2:', resposta);

  return resposta;
};

module.exports = { autenticarB2, enviarParaB2 };
