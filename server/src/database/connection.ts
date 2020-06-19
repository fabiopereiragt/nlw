 import knex from 'knex';
 import path from 'path';

 const connection = knex({
   client: 'sqlite3',
   connection: {
     filename: path.resolve(__dirname, 'database.sqlite'),  //__dirname é uma variável global que retorna o caminho do diretório em que o arquivo em questão está, neste exemplo retorna 'sda5:/www/nlw/server/src/sdatabase'
   },
   useNullAsDefault: true,

 });

 export default connection;