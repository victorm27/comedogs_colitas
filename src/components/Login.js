// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://comedogs-backend.onrender.com/auth/login', { email, password });
  
      if (response.status === 200) {
        alert('Inicio de sesión exitoso');
        navigate('/users');
      } else {
        alert(`Error en el inicio de sesión: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
  
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('Respuesta del servidor:', error.response.data);
        alert(`Error en el inicio de sesión: ${error.response.data.message}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
        alert('Error en la conexión. Por favor, inténtalo de nuevo.');
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error('Error en la configuración de la solicitud:', error.message);
        alert('Error en la conexión. Por favor, inténtalo de nuevo.');
      }
    }
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
