# fsm_login.py
from transitions import Machine

# Funciones que se ejecutarán como acciones de la máquina de estados
def validar_credenciales():
    print("Validando credenciales...")

def mostrar_panel():
    print("Usuario logueado, mostrando panel.")

def mostrar_error():
    print("Error en login.")

def cerrar_sesion():
    print("Sesión cerrada.")

class Usuario:
    """Clase que representa al usuario y su estado de login."""
    def __init__(self):
        # Define los estados posibles
        states = ['Inicial', 'Logueandose', 'Logueado']

        # Define las transiciones entre estados
        transitions = [
            {'trigger': 'login', 'source': 'Inicial', 'dest': 'Logueandose', 'after': 'validar_credenciales'},
            {'trigger': 'login_ok', 'source': 'Logueandose', 'dest': 'Logueado', 'after': 'mostrar_panel'},
            {'trigger': 'login_error', 'source': 'Logueandose', 'dest': 'Inicial', 'after': 'mostrar_error'},
            {'trigger': 'logout', 'source': 'Logueado', 'dest': 'Inicial', 'after': 'cerrar_sesion'}
        ]

        # Crea la máquina de estados
        self.machine = Machine(model=self, states=states, transitions=transitions, initial='Inicial')

        # Asigna las funciones a los métodos del modelo para que 'after' funcione
        self.validar_credenciales = validar_credenciales
        self.mostrar_panel = mostrar_panel
        self.mostrar_error = mostrar_error
        self.cerrar_sesion = cerrar_sesion

# --- DEMOSTRACIÓN ---
if __name__ == "__main__":
    usuario = Usuario()
    print(f"Estado inicial: {usuario.state}")

    print("\n--- Intento de login exitoso ---")
    usuario.login()
    print(f"Estado actual: {usuario.state}")
    usuario.login_ok()
    print(f"Estado actual: {usuario.state}")
    usuario.logout()
    print(f"Estado actual: {usuario.state}")

    print("\n--- Intento de login fallido ---")
    usuario.login()
    print(f"Estado actual: {usuario.state}")
    usuario.login_error()
    print(f"Estado actual: {usuario.state}")
