# doe/pairwise_cases.py
from allpairspy import AllPairs
import pandas as pd
import os

os.makedirs("../reports", exist_ok=True)

def main():
    parameters = [
        ["Estudiante","Docente","Admin","Invitado","Root"],        # tipo_usuario
        ["UserPass","PIN","Token","Huella","QR"],                  # metodo_auth
        ["Chrome","Firefox","Edge","Safari","Opera"],              # navegador
        ["Buena","Media","Lenta","Intermitente","SinConexion"],    # estado_red
        ["Windows","Linux","Android","iOS"]                        # sistema_op
    ]

    rows = []
    for pair in AllPairs(parameters):
        rows.append(pair)

    df = pd.DataFrame(rows, columns=["tipo_usuario","metodo_auth","navegador","estado_red","sistema_op"])
    df.to_csv("../reports/pairwise_cases.csv", index=False)
    print("Pairwise generado: reports/pairwise_cases.csv")
    print(df.shape[0], "casos generados")
    print(df.head())

if __name__ == "__main__":
    main()
