import { test, expect } from '@playwright/test';

test.describe('Información del Evaluador', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar alerta si faltan campos obligatorios', async ({ page }) => {
    let alertMessage = '';
    page.on('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    // Intentar guardar sin llenar nada
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // Validar que se mostró la alerta y que no se avanzó
    expect(alertMessage).toContain('Por favor, complete todos los campos');
    const acceptanceTab = page.getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).toBeDisabled();
  });

  test('debe permitir completar el formulario y avanzar a la Prueba de Aceptabilidad', async ({ page }) => {
    // Llenar edad
    await page.getByLabel(/Edad/i).fill('28');

    // Seleccionar género (buscamos el label exacto 'M', 'F' u 'Otro')
    await page.locator('label').filter({ hasText: /^M$/ }).click();

    // Seleccionar si consume snacks ('Sí' o 'No')
    await page.locator('label').filter({ hasText: /^Sí$/ }).click();

    // Manejar cualquier alerta inesperada (aunque no debería haber si todo está bien)
    page.on('dialog', dialog => dialog.accept());

    // Enviar formulario
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // Validar que la pestaña de Aceptabilidad se haya desbloqueado
    const acceptanceTab = page.getByRole('button', { name: /Prueba de Aceptabilidad/i });
    
    // Playwright esperará hasta que el botón ya no esté deshabilitado 
    // (esto cubre el tiempo que tarda Supabase en responder)
    await expect(acceptanceTab).not.toBeDisabled({ timeout: 10000 });
  });
});
