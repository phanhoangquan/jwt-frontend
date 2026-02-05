import { useEffect, useState } from 'react';
import './Users.scss';
import { deleteUser, fetchAllUsers } from '../../services/userServices';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [currentLimit, setCurrentLimit] = useState(3);
   const [totalPages, setTotalPages] = useState(0);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalUser, setShowModalUser] = useState(false);
   const [dataModal, setDataModal] = useState({});
   const [actionModalUser, setActionModalUser] = useState('');

   useEffect(() => {
      fetchUsers();
   }, [currentLimit, currentPage]);

   const fetchUsers = async () => {
      try {
         let response = await fetchAllUsers(currentPage, currentLimit);
         if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
         }
      } catch (e) {}
   };

   const handlePageClick = (event) => {
      setCurrentPage(+event.selected + 1);
   };

   const handleDelete = async (user) => {
      let response = await deleteUser(user);
      if (response && +response.EC === 0) {
         toast.success(response.EM);
         await fetchUsers();
      } else {
         toast.error(response.EM);
      }
   };

   const handleCloseModal = () => {
      setDataModal({});
      setShowModalDelete(false);
   };

   const handleOpenModal = (user) => {
      setDataModal(user);
      setShowModalDelete(true);
   };

   const handleOpenModalUser = (user) => {
      if (user) {
         setActionModalUser('UPDATE');
         setDataModal(user);
         setShowModalUser(true);
      } else {
         setActionModalUser('CREATE');
         setDataModal({});
         setShowModalUser(true);
      }
   };

   const handleRefesh = async () => {
      await fetchUsers;
   };

   return (
      <>
         <div className="container">
            <div className="manage-users-container mx-200">
               <div className="user-header">
                  <div className="ms-2 my-2">
                     <h3>Manage Users</h3>
                  </div>
                  <div className="action my-3">
                     <button className="btn btn-success mx-2 d-block-inline">
                        <i className="fa fa-refresh pe-2" aria-hidden="true" onClick={() => handleRefesh()}></i>Refesh
                     </button>
                     <button className="btn btn-primary d-block-inline" onClick={() => handleOpenModalUser()}>
                        <i className="fa fa-plus-circle pe-2"></i>
                        Create New user
                     </button>
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
                                 <th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
                                 <td>{user.id}</td>
                                 <td>{user.email}</td>
                                 <td>{user.username}</td>
                                 <td>{user.Group ? user.Group.name : ''}</td>
                                 <td>
                                    <span
                                       className="edit"
                                       onClick={() => {
                                          handleOpenModalUser(user);
                                       }}
                                    >
                                       <i className="fa fa-pencil"></i>
                                    </span>
                                    <span
                                       className="delete"
                                       onClick={() => {
                                          handleOpenModal(user);
                                       }}
                                    >
                                       <i className="fa fa-trash"></i>
                                    </span>
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
            <ModalDelete
               show={showModalDelete}
               handleClose={handleCloseModal}
               info={{ title: 'Confirm Delete User', body: 'Are you sure to delete this user?' }}
               handleConfirm={handleDelete}
               data={dataModal}
            />
            <ModalUser
               showModalUser={showModalUser}
               setShowModalUser={setShowModalUser}
               action={actionModalUser}
               dataModal={dataModal}
               fetchUsers={fetchUsers}
            />
         </div>
      </>
   );
}

export default Users;
