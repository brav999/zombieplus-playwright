const { test } = require('../support/');

const { executeSQL } = require('../support/database');

const data = require('../support/fixtures/movies.json');

test('Deve permitir cadastrar um novo filme', async ({ page }) => {
  const movie = data.madrugada_dos_mortos;

  await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);

  await page.login.visit();
  await page.login.submit('admin@zombieplus.com', 'pwd123');
  await page.movies.isLoggedIn();

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );

  await page.toast.containText('Cadastro realizado com sucesso!');
});
