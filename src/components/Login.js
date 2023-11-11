// Login.js
import React, { useState } from 'react';
import '../styles/styles.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Aquí puedes realizar la lógica de inicio de sesión utilizando axios
      // Por ejemplo, puedes enviar una solicitud al backend para autenticar al usuario
  
      axios.post('http://localhost:4000/login', { email, password })
        .then(response => {
          // Manejar la respuesta del backend después del inicio de sesión exitoso
          console.log('Inicio de sesión exitoso:', response.data);
          navigate('/users')
                
        })
        .catch(error => {
          // Manejar errores de inicio de sesión
          console.error('Error al iniciar sesión:', error);
        });
    };
  
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Bienvenido</h1>
                      </div>
                      <form className="user" onSubmit={handleLogin}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Escribe tu correo electronico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label className="custom-control-label" htmlFor="customCheck">
                              Recuerdame
                            </label>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Iniciar Sesión
                        </button>
                        <hr />
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link to="/forgotpassword" className="small">
                        Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="text-center">
                      <Link to="/register" className="small">
                      No tienes una cuenta? Crear una cuenta!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Login;
