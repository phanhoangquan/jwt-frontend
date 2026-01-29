import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete(props) {
   const handleConfirm = () => {
      props.handleClose();
      props.handleConfirm(props.data);
   };
   return (
      <>
         <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
               <Modal.Title>{props.info.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.info.body}</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={props.handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleConfirm}>
                  Confirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalDelete;
