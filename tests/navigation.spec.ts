import { test, expect } from '@playwright/test';

test.describe('Navegación y Estructura Principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe cargar la página principal con el header y título correctos', async ({ page }) => {
    // Verifica que el header principal esté visible
    await expect(page.getByRole('heading', { name: /Evaluación Sensorial - Galletitas Vegetales Sustentables/i })).toBeVisible();

    // Verifica el subtexto del header
    await expect(page.getByText('Universidad de la Cuenca del Plata', { exact: true })).toBeVisible();
  });

  test('las pestañas de Aceptabilidad y Descriptiva deben estar bloqueadas inicialmente', async ({ page }) => {
    // La pestaña de Información no debe estar deshabilitada
    const infoTab = page.locator('nav').getByRole('button', { name: /Información/i });
    await expect(infoTab).not.toBeDisabled();

    // La pestaña de Aceptabilidad debe estar deshabilitada
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).toBeDisabled();

    // La pestaña Descriptiva debe estar deshabilitada
    const descriptiveTab = page.locator('nav').getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).toBeDisabled();
  });
});
