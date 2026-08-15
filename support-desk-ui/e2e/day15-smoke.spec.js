import { test, expect } from '@playwright/test';

test('admin can login and create a ticket through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now();
  const ticketTitle = `E2E Test Ticket ${uniqueSuffix}`;

  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login to Support Desk' })).toBeVisible();

  await page.getByPlaceholder('Email').fill('admin@example.com');
  await page.getByPlaceholder('Password').fill('Admin@12345');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);

  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
  await mainNav.getByRole('link', { name: 'Tickets', exact: true }).click();

  await page.getByRole('link', { name: '+ New Ticket' }).click();
  await expect(page.getByRole('heading', { name: 'Create a new ticket' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Title', exact: true }).fill(ticketTitle);
  await page.getByRole('textbox', { name: 'Description', exact: true }).fill('Created by the Day 15 smoke test');
  await page.getByRole('textbox', { name: 'Category', exact: true }).fill('E2E');

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page
    .getByLabel('I have reviewed the ticket details and they are ready to submit.', { exact: true })
    .check();

  await page.getByRole('button', { name: 'Create Ticket' }).click();

  await expect(page).toHaveURL(/\/app\/tickets$/);
  await expect(page.getByRole('heading', { name: ticketTitle })).toBeVisible();
});