// Register.js
import React, { useState } from 'react';
import '../styles/styles.min.css';
import { useNavigate, Link  } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        });
    
        // Manejador de cambios en los campos del formulario
        const handleInputChange = (e) => {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        };
    
        // Manejador para enviar el formulario
        const handleSubmit = async (e) => {
    
            e.preventDefault();
        
            // Validación de contraseña
            if (formData.password !== formData.repeatPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
        
            try {
                // Enviar datos al backend (usando fetch o axios)
                const response = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
        
                // Manejar la respuesta del servidor
                if (response.ok) {
                    alert("Registro exitoso");
                    
                    // Redirigir al usuario a la página de inicio de sesión
                    navigate('/'); // Ajusta la ruta según tu configuración
        
                } else {
                    const errorData = await response.json();
                    alert(`Error en el registro: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error en la conexión:', error);
            }
        };
        
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Crea una cuenta!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="firstName"
                                                placeholder="Nombre"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="lastName"
                                                placeholder="Apellido"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="email"
                                            placeholder="Correo electronico"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="password"
                                                placeholder="Contraseña"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="repeatPassword"
                                                placeholder="Repite la contraseña"
                                                value={formData.repeatPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Registrate
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center">
                                <Link to="/" className="small">
                                Ya tienes una cuenta? Inicia Sesión!
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
export default Register;
