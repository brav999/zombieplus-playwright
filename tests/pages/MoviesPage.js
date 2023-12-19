const { expect } = require('@playwright/test');

export class MoviesPage {
  constructor(page) {
    this.page = page;
  }
  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/.*movies/);
  }

  async create(title, overview, company, release_year) {
    await this.page.locator('a[href$="register"]').click();
    await this.page.getByLabel('Titulo do filme').fill(title);
    await this.page.getByLabel('Sinopse').fill(overview);

    await this.page.locator('#select_company_id').click();

    await this.page.getByText(company, { exact: true }).click();

    await this.page.locator('#select_year').click();

    await this.page.getByText(release_year, { exact: true }).click();

    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }
}
