import { test, expect } from '@playwright/test';

test.describe('Prueba Descriptiva y Fin del Flujo', () => {
  test.beforeEach(async ({ page }) => {

    await page.route('**/rest/v1/descriptive_tests**', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'mock-id' }]),
      });
    });

    await page.route('**/rest/v1/acceptance_tests**', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 'mock-id' }]),
    });
  });

    await page.route('**/rest/v1/evaluators**', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'mock-evaluator-id' }]),
      });
    });
    
    await page.goto('/');

    // 1. Completar Información del Evaluador
    await page.getByLabel(/Edad/i).fill('30');
    await page.locator('label[for="hero-genero-o"]').click();
    await page.locator('label[for="hero-snacks-si"]').click();
    
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // Esperar pestaña Aceptabilidad
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).not.toBeDisabled({ timeout: 10000 });


    // 2. Completar Prueba de Aceptabilidad
    await page.locator('label[for="satisfaction-1"]').click(); // "Me gusta"
    await page.locator('button[role="combobox"]').nth(0).click();
    await page.getByRole('option', { name: 'Sí', exact: true }).click();
    await page.locator('button[role="combobox"]').nth(1).click();
    await page.getByRole('option', { name: 'Sí', exact: true }).click();
    await page.getByRole('button', { name: /Enviar Prueba de Aceptabilidad/i }).click();

    // Esperar pestaña Descriptiva
    const descriptiveTab = page.locator('nav').getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).not.toBeDisabled({ timeout: 10000 });
  });

  test('debe requerir todos los atributos obligatorios', async ({ page }) => {
    await page.getByRole('button', { name: /Enviar Prueba Descriptiva/i }).click();
    
    await expect(page.getByText('califique todos los atributos')).toBeVisible();
  });

  test('debe completar el flujo y mostrar la pantalla final', async ({ page }) => {
    // Seleccionar valores para los 4 atributos
    await page.getByRole('button', { name: 'Valor 5 para I. Intensidad Cromática (Color)' }).click();
    await page.getByRole('button', { name: 'Valor 4 para II. Perfil Aromático (Olor)' }).click();
    await page.getByRole('button', { name: 'Valor 3 para III. Sinergia de Sabores (Sabor)' }).click();
    await page.getByRole('button', { name: 'Valor 5 para IV. Propiedades Reológicas (Textura)' }).click();

    // Enviar Prueba Descriptiva
    await page.getByRole('button', { name: /Enviar Prueba Descriptiva/i }).click();
    
    // Validar que se muestra el toast de éxito
    await expect(page.getByText('¡Gracias por completar la prueba descriptiva!')).toBeVisible();

    // Validar que se muestre la pantalla de agradecimiento
    await expect(page.getByText('¡Muchas gracias por participar!')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Has completado todas las evaluaciones correctamente.')).toBeVisible();
    
    // Verificar que las pestañas anteriores estén bloqueadas de nuevo para evitar reenvíos
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).toBeDisabled();
    
    const descriptiveTab = page.locator('nav').getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).toBeDisabled();
  });
});
