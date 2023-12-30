const { test } = require('../support/');
const { executeSQL } = require('../support/database');
const data = require('../support/fixtures/movies.json');

test('Deve permitir cadastrar um novo filme', async ({ page }) => {
  const movie = data.create;

  await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.create(movie);
  await page.toast.containText('Cadastro realizado com sucesso!');
});

test('Não deve permitir cadastrar um filme duplicado', async ({ page }) => {
  const movie = data.duplicate;

  await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);

  await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.create(movie);
  await page.movies.create(movie);
  await page.toast.containText('Cadastro realizado com sucesso!');
});
