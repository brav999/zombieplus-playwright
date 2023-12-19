const { test } = require('../support');

test('Deve logar como admin', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('admin@zombieplus.com', 'pwd123');
  await page.movies.isLoggedIn();
});

test('Não deve logar com senha incorreta', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('admin@zombieplus.com', 'pwd1234');

  const message =
    'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

  await page.toast.containText(message);
});

test('Não deve logar com preenchimento do email inválido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('bruno@', 'pwd123');

  await page.landing.alertHaveText('Email incorreto');
});

test('Não deve logar sem preenchimento do email', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('', 'pwd123');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('Não deve logar sem preenchimento da senha', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('bruno@gmail.com', '');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('Não deve logar sem preenchimento dos campos', async ({ page }) => {
  await page.landing.visit();
  await page.landing.submit('', '');

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});
