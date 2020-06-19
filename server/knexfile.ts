import path from "path";

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, 'src', 'database',  "database.sqlite"), //__dirname é uma variável global que retorna o caminho do diretório em que o arquivo em questão (knexfile) está, isto é, na raiz do projeto.
  },
  migrations:{
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds:{
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullDefault: true
};
