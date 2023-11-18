// UserService.js
class UserService {
  async getUserById(userId) {
    try {
      // Lógica para obtener un usuario por su ID
      const response = await fetch(`https://comedogs-backend.onrender.com/users/${userId}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener el usuario');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }

  async updateUser(userId, userData) {
    try {
      // Lógica para actualizar un usuario por su ID
      const response = await fetch(`https://comedogs-backend.onrender.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('No se pudo actualizar el usuario');
      }
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  async deleteUser(userId) {
    try {
      // Lógica para eliminar un usuario por su ID
      const response = await fetch(`https://comedogs-backend.onrender.com/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
      }
      const deletedUser = await response.json();
      return deletedUser;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
}

export default UserService();
