const { Pool } = require('pg');

const Dbconfig = {
  user: 'tiacvbie',
  host: 'isabelle.db.elephantsql.com',
  database: 'tiacvbie',
  password: 'jTwOjjOrInNVXlTa5aCItdbDqwE0C9_Q',
  port: 5432,
};

export async function executeSQL(sqlScript) {
  try {
    const pool = new Pool(Dbconfig);
    const client = await pool.connect();

    const result = await client.query(sqlScript);
    console.log(result.rows);
  } catch (error) {
    console.log('Erro ao executar SQL' + error);
  }
}
