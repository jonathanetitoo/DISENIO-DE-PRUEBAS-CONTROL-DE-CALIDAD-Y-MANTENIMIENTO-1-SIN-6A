# test_async_events.py
import asyncio
import pytest

async def procesar_orden():
    """Simula una operación de compra que toma tiempo."""
    await asyncio.sleep(0.2)
    return "Compra realizada"

async def cancelar_orden():
    """Simula una operación de cancelación más rápida."""
    await asyncio.sleep(0.1)
    return "Orden cancelada"

@pytest.mark.asyncio
async def test_eventos_asincronos():
    """
    Prueba la gestión de múltiples eventos asíncronos que pueden
    completarse en un orden no predecible.
    """
    # Inicia ambas tareas para que se ejecuten concurrentemente
    tarea_compra = asyncio.create_task(procesar_orden())
    tarea_cancelacion = asyncio.create_task(cancelar_orden())

    # Espera a que ambas tareas terminen y recoge sus resultados
    resultados = await asyncio.gather(tarea_compra, tarea_cancelacion)

    # Verifica que ambos resultados esperados están presentes, sin importar el orden
    assert "Compra realizada" in resultados
    assert "Orden cancelada" in resultados
    print(f"\nResultados obtenidos: {resultados}")
