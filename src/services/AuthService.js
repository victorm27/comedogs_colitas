// AuthService.js
class AuthService {
  login(email, password) {
    // Lógica de autenticación aquí
    return fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
  }

    register(firstName, lastName, email, password) {
    // Lógica de registro aquí
    return fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en el registro');
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
  }
}

export default AuthService();

  