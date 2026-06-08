import { test, expect } from '@playwright/test';

test.describe('Prueba de Aceptabilidad', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Ir a la página principal
    await page.goto('/');

    // 2. Llenar el formulario de Información del Evaluador para llegar a la Prueba de Aceptabilidad
    await page.getByLabel(/Edad/i).fill('25');
    await page.locator('label[for="hero-genero-m"]').click();
    await page.locator('label[for="hero-snacks-si"]').click();
    
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // 3. Esperar a que la pestaña de Aceptabilidad se active
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).not.toBeDisabled({ timeout: 10000 });
  });

  test('debe requerir los campos obligatorios de aceptabilidad', async ({ page }) => {
    let alertMessage = '';
    page.once('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    // Intentar enviar sin completar nada
    await page.getByRole('button', { name: /Enviar Prueba de Aceptabilidad/i }).click();

    // Validar que lanza la alerta de campos obligatorios
    expect(alertMessage).toContain('complete todos los campos obligatorios');
    
    // Validar que no avanzó a la Prueba Descriptiva
    const descriptiveTab = page.locator('nav').getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).toBeDisabled();
  });

  test('debe permitir completar y avanzar a la Prueba Descriptiva', async ({ page }) => {
    // Manejar el diálogo de éxito que lanza la Prueba de Aceptabilidad, fallar si es un error
    page.once('dialog', dialog => {
      console.error('DIALOG MESSAGE:', dialog.message());
      expect(dialog.message()).toContain('Gracias por completar');
      dialog.accept();
    });

    // 1. Escala Hedónica (Satisfacción)
    await page.locator('label[for="satisfaction-2"]').click(); // "Me gusta mucho" es el valor "2"

    // 2. Consumo Diario (Select de Radix UI)
    await page.locator('button[role="combobox"]').nth(0).click();
    await page.getByRole('option', { name: 'Sí', exact: true }).click();

    // 3. Preferencia sobre Ultraprocesados (Select de Radix UI)
    await page.locator('button[role="combobox"]').nth(1).click();
    await page.getByRole('option', { name: 'No', exact: true }).click();

    // Enviar el formulario de Aceptabilidad
    await page.getByRole('button', { name: /Enviar Prueba de Aceptabilidad/i }).click();

    // Validar que se desbloqueó la pestaña Descriptiva
    const descriptiveTab = page.locator('nav').getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).not.toBeDisabled({ timeout: 10000 });
  });
});
