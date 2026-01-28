import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../services/userServices';
import ReactPaginate from 'react-paginate';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [currentLimit, setCurrentLimit] = useState(3);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            let response = await fetchAllUsers(currentPage, currentLimit);
            console.log(response.data);
            if (response && response.data && response.data.EC === 0) {
               // setListUsers(response.data.DT);
               setTotalPages(response.data.DT.totalPages);
               setListUsers(response.data.DT.users);
            }
         } catch (e) {}
      };
      fetchUsers();
   }, [currentLimit, currentPage]);

   const handlePageClick = (event) => {
      setCurrentPage(+event.selected + 1);
   };

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
                     <th scope="col">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {listUsers && listUsers.length > 0 ? (
                     listUsers.map((user, index) => (
                        <tr key={`row-${index}`}>
                           <th scope="row">{index + 1}</th>
                           <td>{user.id}</td>
                           <td>{user.email}</td>
                           <td>{user.username}</td>
                           <td>{user.Group ? user.Group.name : ''}</td>
                           <td>
                              <button className="btn btn-warning">Edit</button>
                              <button className="btn btn-danger">Delete</button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td>Not Found Users</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         {totalPages > 0 && (
            <div className="user-footer">
               <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
               />
            </div>
         )}
      </div>
   );
}

export default Users;
