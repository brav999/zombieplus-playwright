const { expect } = require('@playwright/test');

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async create(movie) {
    await this.page.locator('a[href$="register"]').click();
    await this.page.getByLabel('Titulo do filme').fill(movie.tittle);
    await this.page.getByLabel('Sinopse').fill(overview);

    await this.page.locator('#select_company_id').click();

    await this.page.getByText(company, { exact: true }).click();

    await this.page.locator('#select_year').click();

    await this.page.getByText(release_year, { exact: true }).click();

    await this.page
      .locator('input[name=cover')
      .setInputFiles('tests/support/fixtures' + movie.cover);

    if (movie.featured) {
      await this.page.locator('.featured .react-switch').click();
    }

    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }
}
