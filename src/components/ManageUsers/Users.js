import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../services/userServices';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            let response = await fetchAllUsers();
            console.log(response.data);
            if (response && response.data && response.data.EC === 0) {
               setListUsers(response.data.DT);
            }
         } catch (e) {}
      };
      fetchUsers();
   }, []);

   return (
      <div className="manage-users-container">
         <div className="user-header">
            <div>
               <h3>Table Users</h3>
            </div>
            <div className="action">
               <button className="btn btn-success">Refesh</button>
               <button className="btn btn-primary">Add New user</button>
            </div>
         </div>
         <div className="user-body">
            <table className="table table-bordered table-hover">
               <thead>
                  <tr>
                     <th scope="col">No</th>

                     <th scope="col">ID</th>
                     <th scope="col">Email</th>
                     <th scope="col">Username</th>
                     <th scope="col">Group</th>
                  </tr>
               </thead>
               <tbody>
                  {listUsers ? (
                     listUsers.map((user, index) => (
                        <tr key={`row-${index}`}>
                           <th scope="row">{index + 1}</th>
                           <td>{user.id}</td>
                           <td>{user.email}</td>
                           <td>{user.username}</td>
                           <td>{user.Group ? user.Group.name : ''}</td>
                        </tr>
                     ))
                  ) : (
                     <span>Not Found Users</span>
                  )}
               </tbody>
            </table>
         </div>
         <div className="user-footer">
            <nav aria-label="Page navigation example">
               <ul className="pagination">
                  <li className="page-item">
                     <a className="page-link" href="#">
                        Previous
                     </a>
                  </li>
                  <li className="page-item">
                     <a className="page-link" href="#">
                        1
                     </a>
                  </li>
                  <li className="page-item">
                     <a className="page-link" href="#">
                        2
                     </a>
                  </li>
                  <li className="page-item">
                     <a className="page-link" href="#">
                        3
                     </a>
                  </li>
                  <li className="page-item">
                     <a className="page-link" href="#">
                        Next
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   );
}

export default Users;
