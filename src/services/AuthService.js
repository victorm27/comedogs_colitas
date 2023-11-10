// AuthService.js
class AuthService {
    login(username, password) {
      // Lógica de autenticación aquí
      return fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación');
        }
        return response.json();
      })
      .then(data => {
        // Lógica para guardar el token de autenticación en el local storage o en una cookie
        localStorage.setItem('token', data.token);
        return data;
      });
    }
  
    logout() {
      // Lógica de cierre de sesión aquí
      localStorage.removeItem('token');
    }
  
    getCurrentUser() {
      // Lógica para obtener el usuario actual utilizando el token almacenado en el local storage o en la cookie
      return JSON.parse(localStorage.getItem('user'));
    }
  }
  
  export default AuthService();
  