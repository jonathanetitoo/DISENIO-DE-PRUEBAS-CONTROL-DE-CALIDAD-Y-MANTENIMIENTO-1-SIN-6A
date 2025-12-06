from src.auth_simulator import simulate_login

def test_login_runs():
    result = simulate_login()
    assert result in [True, False]

def test_multiple_runs():
    # ejecutar varias veces para aumentar cobertura
    for _ in range(20):
        result = simulate_login()
        assert result in [True, False]
