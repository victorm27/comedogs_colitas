import React, { useState } from 'react';
import '../styles/crudusers.css';

const CRUDUSERS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState(Array(5).fill(false));
  
    const toggleSelectAll = () => {
      setSelectAll(!selectAll);
      setCheckboxes(checkboxes.fill(!selectAll));
    };
  
    const toggleCheckbox = (index) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      setCheckboxes(newCheckboxes);
      setSelectAll(newCheckboxes.every((checkbox) => checkbox));
    };
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Gestionar <b>Usuarios</b></h2>
              </div>
              <div className="col-sm-6">
                <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal">
                  <i className="material-icons">&#xE147;</i> <span>Añadir un usuario nuevo</span>
                </a>
                <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal">
                  <i className="material-icons">&#xE15C;</i> <span>Eliminar</span>
                </a>						
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label htmlFor="selectAll"></label>
                  </span>
                </th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th>Contraseña</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label htmlFor="checkbox1"></label>
                  </span>
                </td>
                <td>Thomas</td>
                <td>Hardy</td>
                <td>thomashardy@mail.com</td>
                <td>thomas_h123</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">Mostrando <b>5</b> de <b>25 </b> Entradas</div>
            <ul className="pagination">
              <li className="page-item disabled"><a href="#">Anterior</a></li>
              <li className="page-item"><a href="#" className="page-link">1</a></li>
              <li className="page-item"><a href="#" className="page-link">2</a></li>
              <li className="page-item active"><a href="#" className="page-link">3</a></li>
              <li className="page-item"><a href="#" className="page-link">4</a></li>
              <li className="page-item"><a href="#" className="page-link">5</a></li>
              <li className="page-item"><a href="#" className="page-link">Siguiente</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal para Añadir Usuario */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">						
                <h4 className="modal-title">Añadir Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">					
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="text" className="form-control" required />
                </div>					
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-success" value="Añadir" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal para Editar Usuario */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">						
                <h4 className="modal-title">Editar Usuario</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">					
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="text" className="form-control" required />
                </div>					
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar" />
                <input type="submit" className="btn btn-info" value="Guardar" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal para Eliminar Usuario */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
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

