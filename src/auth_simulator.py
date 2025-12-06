import random

def simulate_login():
    users = ["Estudiante", "Docente", "Administrador", "Invitado", "Root"]
    methods = ["Usuario/Contraseña", "PIN", "Token", "Huella", "QR"]
    browsers = ["Chrome", "Firefox", "Edge", "Safari", "Opera"]
    networks = ["Buena", "Media", "Lenta", "Intermitente", "Sin conexión"]
    systems = ["Windows", "Linux", "Android", "iOS"]

    # Selección aleatoria
    user = random.choice(users)
    method = random.choice(methods)
    browser = random.choice(browsers)
    network = random.choice(networks)
    system = random.choice(systems)

    # Reglas básicas simuladas
    if network == "Sin conexión":
        return False

    if user == "Invitado" and method != "QR":
        return False

    return True
