import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/crudusers.css';
import { Redirect } from 'react-router-dom';


const CRUDUSERS = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [setErrors] = useState({});
  const [forceUpdate, setForceUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers(); // Llama a la función para cargar usuarios
  }, [forceUpdate]);

  // handleEditUser
  const handleEditUser = (e, userCedula) => {
    e.preventDefault();
    console.log(e);
    // Validación de campos
    if (!editingUser || !editingUser.firstName || !editingUser.lastName || !editingUser.email || !editingUser.phoneNumber) {
      setErrors({ message: 'Todos los campos son obligatorios' });
      return;
    }

    console.log('Editando usuario:', editingUser);

    // Resto del código para editar un usuario existente
    axios.put(`http://localhost:4000/users/${userCedula}`, editingUser)
      .then(response => {
        console.log('Usuario editado exitosamente:', response.data);
        
        // Actualizar la lista de usuarios después de la edición
        setUsers(users.map(user => (users.cedula === userCedula ? response.data : user)));
        //Mensaje en pantalla
        alert('Usuario editado exitosamente');
        setRedirect(true);
        // Cerrar el modal
        closeEditModal();
        
      })
      .catch(error => {
        console.error('Error al editar el usuario:', error);
      });

      if (redirect) {
        return <Redirect to="/tu_ruta_destino" />;
      }
  };

  const handleDeleteUser = (userCedula) => {
    // Eliminar un usuario
    axios.delete(`http://localhost:4000/users/${userCedula}`)
      .then(response => {
        console.log('Usuario eliminado exitosamente:', response.data);
        // Actualizar la lista de usuarios después de la eliminación
        setUsers(users.filter(user => users.cedula !== userCedula));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const closeEditModal = () => {
    // Cambiar el estado de forceUpdate para forzar la actualización del componente
    setForceUpdate(prevState => !prevState);

    // Cerrar el modal de edición y limpiar el usuario en edición
    setEditingUser(null);

    // Ocultar el modal de edición
    setModalVisible(false);
  };

  const openEditModal = (user) => {
    // Abrir el modal de edición y cargar los datos del usuario seleccionado
    setEditingUser(user);
    // Mostrar el modal de edición
    setModalVisible(true);
  };
  

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Gestionar <b>Donantes</b></h2>
              </div>
              <div className="col-sm-6">
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th>Numero de telefono</th>
                <th>Cedula</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.cedula}>
                  <td>{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</td>
                  <td>{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.cedula}</td>
                  <td>
                    <a href="#editEmployeeModal" className="edit" data-toggle="modal" onClick={() => openEditModal(user)}>
                      <i className="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i>
                    </a>
                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal" onClick={() => handleDeleteUser(user.cedula)}>
                      <i className="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal para Editar Usuario */}
      {modalVisible && (
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={(e) => handleEditUser(e, editingUser.cedula)}>
              <div className="modal-header">
                <h4 className="modal-title">Editar Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closeEditModal}>&times;</button>
              </div>
              <div className="modal-body">
                {editingUser !== null ? (
                  <div>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingUser.firstName}
                        onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingUser.lastName}
                        onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Numero de telefono</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={editingUser.phoneNumber}
                        onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <p>Selecciona un usuario para editar</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closeEditModal}>
                  Cancelar
                </button>
                {editingUser !== null && (
                  <button type="submit" className="btn btn-info">
                    Guardar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      {/* Modal para Eliminar Usuario */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={() => handleDeleteUser(editingUser.cedula)}>
              <div className="modal-header">
                <h4 className="modal-title">Eliminar Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro/a de que quieres eliminar este usuario?</p>
                <p className="text-warning"><small>Estás a punto de eliminar un usuario. Esta acción no se puede deshacer.</small></p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-danger" value="Eliminar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRUDUSERS;
