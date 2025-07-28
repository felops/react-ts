  import { test, expect } from '@playwright/test';
import page1 from './json/establishments/page1.json';
import page2 from './json/establishments/page2.json';
import page1Liverpool from './json/establishments/page1-liverpool.json';

test.beforeEach(async ({ page }) => {
  await page.route('http://api.ratings.food.gov.uk/Establishments/basic/1/10', async route => {
    await new Promise(resolve => setTimeout(resolve, 200));
    await route.fulfill({ json: page1 });
  });
  await page.route('http://api.ratings.food.gov.uk/Establishments/basic/2/10', async route => {
    await new Promise(resolve => setTimeout(resolve, 200));
    await route.fulfill({ json: page2 });
  });
  await page.route('http://api.ratings.food.gov.uk/Establishments?localAuthorityId=179&pageNumber=1&pageSize=10', async route => {
    await new Promise(resolve => setTimeout(resolve, 200));
    await route.fulfill({ json: page1Liverpool });
  });
  
  await page.goto('http://localhost:3000/');
});

test.describe('HomePage', () => {
  test('correctly handle 1st loading', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeVisible();
    await expect(page.getByText('Loading...')).not.toBeVisible();
    await expect(page.getByText('!NOSH!')).toBeVisible();
    await expect(page.getByText('"Playhouse Nursery" Private Day Nursery')).toBeVisible();
  });

  test('correctly handle pagination', async ({ page }) => {
    await expect(page.getByText('!NOSH!')).toBeVisible();
    await expect(page.getByText('"Playhouse Nursery" Private Day Nursery')).toBeVisible();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByText('Loading...')).toBeVisible();
    await expect(page.getByText('Loading...')).not.toBeVisible();
    await expect(page.getByText('"Rio Cinema"')).toBeVisible();
    await expect(page.getByText('#bankmunch')).toBeVisible();
    await page.getByRole('button', { name: '-' }).click();
    await expect(page.getByText('Loading...')).toBeVisible();
    await expect(page.getByText('Loading...')).not.toBeVisible();
    await expect(page.getByText('!NOSH!')).toBeVisible();
    await expect(page.getByText('"Playhouse Nursery" Private Day Nursery')).toBeVisible();
  });

  test('correctly load new data when filtering by Authority', async ({ page }) => {
    const dropDownList = await page.getByRole('combobox');
    dropDownList.selectOption('Liverpool');
    await expect(page.getByText('Loading...')).toBeVisible();
    await expect(page.getByText('Loading...')).not.toBeVisible();
    await expect(page.getByText('1931')).toBeVisible();
    await expect(page.getByText('5 Star Film Catering')).toBeVisible();
  });

  test.describe('Favorites', () => {
    test('correctly add a favorite', async ({ page }) => {
      await expect(page.getByText('Favorites')).not.toBeVisible();
      await expect(page.getByText('Remove')).not.toBeVisible();
      await page.getByRole('checkbox').first().check();
      await expect(page.getByText('Favorites')).toBeVisible();
      await expect(page.getByText('Remove')).toBeVisible();
    });

    test('correctly remove a favorite', async ({ page }) => {
      await page.getByRole('checkbox').first().check();
      await page.getByText('Remove').click();
      await expect(page.getByText('Favorites')).not.toBeVisible();
      await expect(page.getByText('Remove')).not.toBeVisible();
    });
  });
});
