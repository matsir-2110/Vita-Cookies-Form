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
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).toBeDisabled();
  });

  test('debe permitir completar el formulario y avanzar a la Prueba de Aceptabilidad', async ({ page }) => {
    // Llenar edad
    await page.getByLabel(/Edad/i).fill('28');

    // Seleccionar género (hacemos clic directo en el botón de Radix UI)
    await page.locator('button[role="radio"][value="M"]').click({ force: true });

    // Seleccionar si consume snacks ('sí')
    await page.locator('button[role="radio"][value="si"]').click({ force: true });

    // Manejar cualquier alerta inesperada (si hay un error de base de datos, lo queremos ver)
    page.on('dialog', dialog => {
      console.error('ALERTA INESPERADA:', dialog.message());
      dialog.accept();
    });

    // Enviar formulario
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // Validar que la pestaña de Aceptabilidad se haya desbloqueado
    const acceptanceTab = page.locator('nav').getByRole('button', { name: /Prueba de Aceptabilidad/i });
    
    // Playwright esperará hasta que el botón ya no esté deshabilitado 
    // (esto cubre el tiempo que tarda Supabase en responder)
    await expect(acceptanceTab).not.toBeDisabled({ timeout: 10000 });
  });
});
