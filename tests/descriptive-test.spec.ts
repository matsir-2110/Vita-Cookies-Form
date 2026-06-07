import { test, expect } from '@playwright/test';

test.describe('Prueba Descriptiva y Fin del Flujo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // 1. Completar Información del Evaluador
    await page.getByLabel(/Edad/i).fill('30');
    await page.locator('label').filter({ hasText: /^Otro$/ }).click();
    await page.locator('label').filter({ hasText: /^Sí$/ }).click();
    
    // Configurar listener para el primer form
    let firstDialogResolved = false;
    page.once('dialog', dialog => {
      dialog.accept();
      firstDialogResolved = true;
    });
    
    await page.getByRole('button', { name: /Guardar datos y continuar/i }).click();

    // Esperar pestaña Aceptabilidad
    const acceptanceTab = page.getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).not.toBeDisabled({ timeout: 10000 });

    // 2. Completar Prueba de Aceptabilidad
    await page.locator('label').filter({ hasText: /^Me gusta$/ }).click();
    await page.locator('button[role="combobox"]').nth(0).click();
    await page.getByRole('option', { name: 'Sí', exact: true }).click();
    await page.locator('button[role="combobox"]').nth(1).click();
    await page.getByRole('option', { name: 'Sí', exact: true }).click();
    
    // Configurar listener para el segundo form
    page.once('dialog', dialog => {
      dialog.accept();
    });

    await page.getByRole('button', { name: /Enviar Prueba de Aceptabilidad/i }).click();

    // Esperar pestaña Descriptiva
    const descriptiveTab = page.getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).not.toBeDisabled({ timeout: 10000 });
  });

  test('debe requerir todos los atributos obligatorios', async ({ page }) => {
    let alertMessage = '';
    page.once('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await page.getByRole('button', { name: /Enviar Prueba Descriptiva/i }).click();
    
    expect(alertMessage).toContain('califique todos los atributos');
  });

  test('debe completar el flujo y mostrar la pantalla final', async ({ page }) => {
    // Escuchar el diálogo de éxito final
    let alertMessage = '';
    page.once('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    // Seleccionar valores para los 4 atributos
    await page.getByRole('button', { name: 'Valor 5 para I. Intensidad Cromática (Color)' }).click();
    await page.getByRole('button', { name: 'Valor 4 para II. Perfil Aromático (Olor)' }).click();
    await page.getByRole('button', { name: 'Valor 3 para III. Sinergia de Sabores (Sabor)' }).click();
    await page.getByRole('button', { name: 'Valor 5 para IV. Propiedades Reológicas (Textura)' }).click();

    // Enviar Prueba Descriptiva
    await page.getByRole('button', { name: /Enviar Prueba Descriptiva/i }).click();

    // Validar el mensaje de éxito final
    expect(alertMessage).toContain('Gracias por completar la prueba descriptiva');

    // Validar que se muestre la pantalla de agradecimiento
    await expect(page.getByText('¡Muchas gracias por participar!')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Has completado todas las evaluaciones correctamente.')).toBeVisible();
    
    // Verificar que las pestañas anteriores estén bloqueadas de nuevo para evitar reenvíos
    const acceptanceTab = page.getByRole('button', { name: /Prueba de Aceptabilidad/i });
    await expect(acceptanceTab).toBeDisabled();
    
    const descriptiveTab = page.getByRole('button', { name: /Prueba Descriptiva/i });
    await expect(descriptiveTab).toBeDisabled();
  });
});
