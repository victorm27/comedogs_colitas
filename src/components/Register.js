import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cedula: '',
    password: '',
    repeatPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cedula: '',
    password: '',
    repeatPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Limpiar el mensaje de error cuando se realiza un cambio en el campo
    setFormErrors({
      ...formErrors,
      [e.target.id]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    const newFormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newFormErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Validación de contraseña
    if (formData.password !== formData.repeatPassword) {
      newFormErrors.repeatPassword = 'Las contraseñas no coinciden';
    }

    // Actualizar los errores del formulario
    setFormErrors(newFormErrors);

    // Si hay errores, no enviar el formulario
    if (Object.keys(newFormErrors).length > 0) {
      return;
    }

    // Resto de la lógica para enviar el formulario
    try {
      const response = await fetch('https://comedogs-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/');
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
                        className={`form-control form-control-user ${
                          formErrors.firstName ? 'is-invalid' : ''
                        }`}
                        id="firstName"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.firstName && (
                        <div className="invalid-feedback">{formErrors.firstName}</div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formErrors.lastName ? 'is-invalid' : ''
                        }`}
                        id="lastName"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.lastName && (
                        <div className="invalid-feedback">{formErrors.lastName}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control form-control-user ${
                        formErrors.email ? 'is-invalid' : ''
                      }`}
                      id="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className={`form-control form-control-user ${
                        formErrors.phoneNumber ? 'is-invalid' : ''
                      }`}
                      id="phoneNumber"
                      placeholder="Número de teléfono"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    {formErrors.phoneNumber && (
                      <div className="invalid-feedback">{formErrors.phoneNumber}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control form-control-user ${
                        formErrors.cedula ? 'is-invalid' : ''
                      }`}
                      id="cedula"
                      placeholder="Cédula"
                      value={formData.cedula}
                      onChange={handleInputChange}
                    />
                    {formErrors.cedula && <div className="invalid-feedback">{formErrors.cedula}</div>}
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        className={`form-control form-control-user ${
                          formErrors.password ? 'is-invalid' : ''
                        }`}
                        id="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {formErrors.password && (
                        <div className="invalid-feedback">{formErrors.password}</div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="password"
                        className={`form-control form-control-user ${
                          formErrors.repeatPassword ? 'is-invalid' : ''
                        }`}
                        id="repeatPassword"
                        placeholder="Repite la contraseña"
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.repeatPassword && (
                        <div className="invalid-feedback">{formErrors.repeatPassword}</div>
                      )}
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
