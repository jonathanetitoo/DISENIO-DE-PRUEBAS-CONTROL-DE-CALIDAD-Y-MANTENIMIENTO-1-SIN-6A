from pyDOE3 import fullfact
import numpy as np
import pandas as pd
import os

os.makedirs("../reports", exist_ok=True)

def main():
    # Definir niveles por factor (cumplir: >=5 factores; al menos 3 con >4 niveles)
    # Ajusta nombres y niveles según lo que decidas en tu especificación
    niveles = {
        "tipo_usuario": ["Estudiante","Docente","Admin","Invitado","Root"],            # 5 niveles
        "metodo_auth": ["UserPass","PIN","Token","Huella","QR"],                    # 5 niveles
        "navegador": ["Chrome","Firefox","Edge","Safari","Opera"],                  # 5 niveles
        "estado_red": ["Buena","Media","Lenta","Intermitente","SinConexion"],       # 5 niveles
        "sistema_op": ["Windows","Linux","Android","iOS"]                           # 4 niveles
    }

    # Para fullfact necesitamos lista de números de niveles
    levels_list = [len(v) for v in niveles.values()]
    design = fullfact(levels_list)  # matriz con índices de nivel (0..n-1)
    # Convertir índices a nombres de niveles
    cols = list(niveles.keys())
    rows = []
    for r in design.astype(int):
        row = {}
        for i,val in enumerate(r):
            row[cols[i]] = niveles[cols[i]][val]
        rows.append(row)

    df = pd.DataFrame(rows, columns=cols)
    df.to_csv("../reports/doe_matrix.csv", index=False)
    print("DOE generado: reports/doe_matrix.csv")
    print(df.head())

if __name__ == "__main__":
    main()
