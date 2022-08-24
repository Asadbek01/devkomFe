import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export type IBool = boolean;
const NewUserModal = () => {
    const [show, setShow] = useState<IBool>(false);
    const [formProperties, setFormProperties] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInput = (fieldName: any, value: any) => {
        setFormProperties({
            ...formProperties,
            [fieldName]: value,
        });
    };

    const PostUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://devkom.herokuapp.com/users', {
                method: 'POST',
                body: JSON.stringify(formProperties),
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            if (response.status === 200) {
                await response.json();
                setFormProperties({
                    firstName: '',
                    lastName: '',
                    email: ''
                })
                handleClose();
                window.location.reload()
            } else if (response.status === 400) {
                alert("Please fill all the fields")
            }
        } catch (error) {
            alert(error);
        }
    }




    return (
        <>
            <Button
                onClick={handleShow}
                className='btn-success float-right mb-2 mt-2'>New User</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="firstName"
                                placeholder="insert firstName"
                                value={formProperties.firstName}
                                onChange={(e) => handleInput("firstName", e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Control
                                type="surName"
                                value={formProperties.lastName}
                                onChange={(e) => handleInput("lastName", e.target.value)}
                                placeholder="insert lastName"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={formProperties.email}
                                onChange={(e) => handleInput("email", e.target.value)}
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="primary"
                        onClick={PostUser}
                    >

                        Create User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewUserModal;