// ForgotPassword.js
import React from 'react';
import '../styles/styles.min.css';
const ForgotPassword = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-2">Olvidaste tu contraseña?</h1>
                                            <p className="mb-4">
                                                ¿Oops, olvidaste tu contraseña? No te preocupes, solo ingresa tu
                                                dirección de correo electrónico a continuación y te enviaremos un
                                                enlace para restablecer tu contraseña.
                                            </p>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Escribe tu correo electrónico"
                                                />
                                            </div>
                                            <a href="loginV2.html" className="btn btn-primary btn-user btn-block">
                                                Reestablecer Contraseña
                                            </a>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="register.html">Crea una cuenta!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="loginV2.html">¿Ya tienes una cuenta? Inicia Sesión!</a>
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

export default ForgotPassword;
