import { test, expect } from '@playwright/test';
import page1 from './json/establishments/page1.json';
import establishmentDetails from './json/establishments/establishment-details.json';

test.beforeEach(async ({ page }) => {
  await page.route('http://api.ratings.food.gov.uk/Establishments/basic/1/10', async route => {
    await new Promise(resolve => setTimeout(resolve, 100));
    await route.fulfill({ json: page1 });
  });
  await page.route('http://api.ratings.food.gov.uk/Establishments/1466637', async route => {
    await new Promise(resolve => setTimeout(resolve, 100));
    await route.fulfill({ json: establishmentDetails });
  });

  await page.goto('http://localhost:3000/');
});

test.describe('EstablishmentsDetailsPage', () => {
  test('correctly load when go to establishment details', async ({ page }) => {
    page.getByText('!NOSH!').click();
    await expect(page.getByText('Establishment Details')).toBeVisible();
    await expect(page.getByText('5/1/2024')).toBeVisible();
    await expect(page.getByText('Coronation Street')).toBeVisible();
    await expect(page.getByText('35b High Street')).toBeVisible();
    await expect(page.getByText('Auchterarder')).toBeVisible();
    await expect(page.getByText('NY')).toBeVisible();
  });

  test('correctly go back to home page', async ({ page }) => {
    page.getByText('!NOSH!').click();
    await expect(page.getByText('Establishment Details')).toBeVisible();
    page.getByText('go back').click();
    await expect(page.getByText('Food Hygiene Ratings')).toBeVisible();
  });
});
