import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { fetchAllGroups, createNewUser } from '../../services/userServices';
import _ from 'lodash';

function ModalUser(props) {
   const { showModalUser, setShowModalUser } = props;
   const [groups, setGroups] = useState([]);

   const defaultUserData = {
      email: '',
      phone: '',
      username: '',
      password: '',
      address: '',
      sex: '',
      group: '',
   };

   const validInputsDefault = {
      email: true,
      phone: true,
      username: true,
      password: true,
      address: true,
      sex: true,
      group: true,
   };

   const [userData, setUserData] = useState(defaultUserData);
   const [validInputs, setValidInputs] = useState(validInputsDefault);

   const handleClose = () => setShowModalUser(false);
   const handleShow = () => setShowModalUser(true);

   useEffect(() => {
      getGroups();
   }, []);

   const getGroups = async () => {
      let response = await fetchAllGroups();
      if (response && response.data && +response.data.EC === 0) {
         setGroups(response.data.DT);
         if (response.data.DT && response.data.DT.length > 0) {
            let groups = response.data.DT;
            setUserData({ ...userData, group: groups[0].id });
         }
      } else {
         toast.error(response.data.EM);
      }
   };

   const handleOnChangeInput = (value, name) => {
      let _userData = _.cloneDeep(userData);
      _userData[name] = value;
      setUserData(_userData);
   };

   const checkValidInputs = () => {
      setValidInputs(validInputsDefault);
      let arr = ['email', 'phone', 'username', 'password', 'group'];
      let check = true;
      for (let i = 0; i < arr.length; i++) {
         if (!userData[arr[i]]) {
            toast.error(`Empty in ${arr[i]}`);
            let _validInputs = _.cloneDeep(validInputsDefault);
            _validInputs[arr[i]] = false;
            setValidInputs(_validInputs);
            check = false;
            break;
         }
      }
      return check;
   };

   const handleConfirmUser = async () => {
      let check = checkValidInputs();
      if (check) {
         let response = await createNewUser({ ...userData, groupId: userData['group'] });
         if (response.data && +response.data.EC === 0) {
            toast.success(response.data.EM);
            handleClose();
            setUserData({ ...userData, group: groups[0].id });
         } else {
            toast.error('Error create user');
         }
      }
   };

   return (
      <>
         <Button variant="primary" onClick={handleShow}>
            Launch demo modal
         </Button>

         <Modal show={showModalUser} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form className="d-flex flex-wrap justify-content-around">
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput1">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                        value={userData.email}
                        onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput2">
                     <Form.Label>Username</Form.Label>
                     <Form.Control
                        className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                        type="text"
                        placeholder="username ..."
                        autoFocus
                        value={userData.username}
                        onChange={(e) => handleOnChangeInput(e.target.value, 'username')}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput3">
                     <Form.Label>Phone number</Form.Label>
                     <Form.Control
                        className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                        type="text"
                        placeholder="(+83)37222..."
                        autoFocus
                        value={userData.phone}
                        onChange={(e) => handleOnChangeInput(e.target.value, 'phone')}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput4">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                        type="text"
                        placeholder="Password.."
                        autoFocus
                        value={userData.password}
                        onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 col-11" controlId="exampleForm.ControlInput5">
                     <Form.Label>Address</Form.Label>
                     <Form.Control
                        className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                        type="text"
                        placeholder="Address"
                        autoFocus
                        value={userData.address}
                        onChange={(e) => handleOnChangeInput(e.target.value, 'address')}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput6">
                     <Form.Label>Gender</Form.Label>
                     <Form.Select aria-label="Gender" onChange={(e) => handleOnChangeInput(e.target.value, 'sex')}>
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput7">
                     <Form.Label>Group</Form.Label>
                     <Form.Select
                        className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                        aria-label="Group"
                        onChange={(e) => handleOnChangeInput(e.target.value, 'group')}
                     >
                        {groups.length > 0 &&
                           groups.map((groups, index) => (
                              <option key={`group-${index}`} value={groups.id}>
                                 {groups.name}
                              </option>
                           ))}
                     </Form.Select>
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleConfirmUser}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalUser;
