# Utilização do Sistema

## Instalação das dependências

Antes de tudo, certifique-se de que o node.js e o npm estão instalados de forma correta em sua máquina, caso não esteja, acesse o site do node.js e faça a instalação:
[https://nodejs.org/pt-br](https://nodejs.org/pt-br)

depois, baixe os arquivos do respositório em sua máquina e abra a pasta onde todos os arquivos se encontram no terminal ou no prompt de comandos e realize a instalação das depêndencias do projeto utilizando um dos seguintes comandos:

```npm i --save``` ou ```npm install --save```

## Configurações do bot:

Acesse o site de desenvolvedores do Discord, crie uma nova aplicação e resgate as seguintes informações:

`Client_ID` | `Token` | `Client_secret`

[https://discord.dev/](https://discord.dev/)

Após recuperar as informações da sua aplicação/bot, acesse seu servidor de discord o qual a aplicação será executada e resgate as seguintes informações:

`ID do Servidor` | `ID do Canal da Verificação` | `ID do Cargo de Verificado`

Basta criar um cargo de verificado para que os membros tenham acesso ao servidor a partir do cargo de verificado e criar um chat exclusivo para realizar a verificação e resgatar seus respectivos ID para adicionar a aplicação.

Depois de resgatar todas as informações necesárias, na pasta onde se encontram os arquivos do bot, o mesmo que você abriu o terminal/cmd para instalação das dependências, abra o arquivo `.env` no VS Code ou bloco de notas e substitua todas as informações pelas obtidas anteriormente:

```
DISCORD_TOKEN= SEU TOKEN
CLIENT_ID= SEU CLIENT
CLIENT_SECRET= SEU CLIENT_SECRET

REDIRECT_URI=http://localhost:3000/auth/callback
PORT=3000

GUILD_ID= ID DO SEU SERVIDOR
ROLE_ID= ID DO CARGO DE VERIFICADO
CANAL_ID= ID DO CANAL DE VERIFICAÇÃO
```

## Execução da aplicação:

Após ter configurado tudo corretamente, abra o terminal/cmd na pasta dos arquivos da aplicação, a mesma qual você instalou as dependência do projeto e execute um dos seguintes comandos:

`node .` ou `node index.js`

Se você não cometeu nenhum erro, o bot irá inicializar sem nenhum erro.

Após a inicialização do sistema, basta ir em algum canal separado ao canal de destinação da embed de verificação e irá executar, no chat do discord, o comando `!verifricar`. Após a execução do comando, o bot irá enviar a embed de verificação no chat/canal do seu servidor especificado no código

<img width="1482" height="360" alt="image" src="https://github.com/user-attachments/assets/0ab9c99c-3367-40d2-9771-d67ce251f556" />

Para um membro se verificar e receber seu cargo para ter acesso as funções de seu servidor, basta clicar no botão `Verificar` presente na embed do bot.
Quando o botão é clicado, o bot envia uma embed contendo um código captcha e 3 botões com 3 códigos aleatórios, sendo um deles igual ao código da embed, se o usuário clicar no código correto, ele receberá o cargo de verificado especificado no arquivo .env

<img width="1489" height="546" alt="image" src="https://github.com/user-attachments/assets/b31e7f84-7887-468e-8cd9-aa42e0208c12" />

Após isso, o membro recebe o cargo especificado em seu perfil:

<img width="381" height="404" alt="image" src="https://github.com/user-attachments/assets/3d319dca-1775-4132-90e3-0b95b3c449eb" />


