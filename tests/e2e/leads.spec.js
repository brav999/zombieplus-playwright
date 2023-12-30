const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.containTextText(message);
});

test('não deve cadastrar quando o email já existe', async ({
  page,
  request,
}) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message =
    'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.containTextText(message);
});

test('validar mensagem de email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Bruno Lima', 'bruno@');

  await page.leads.alertHaveText('Email incorreto');
});

test('validar mensagem de campo obrigatório para form sem email', async ({
  page,
}) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Bruno Lima', '');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('validar mensagem de campo obrigatório para form sem nome', async ({
  page,
}) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'bruno@gmail.com');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('validar mensagem de campo obrigatório para form sem preenchimento', async ({
  page,
}) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');

  await await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ]);
});
