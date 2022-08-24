import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { IUsers } from '../types/IUsers'
import NewUserModal from './Modal'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'



export const FormData = () => {

    const [users, setUsers] = React.useState<IUsers[]>([])
    const [show, setShow] = React.useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    // const [id, setId] = React.useState<number | null>(null);

    const handleClose = () => setShow(false);
    const handleShow = (id: any) => {
        setShow(true);
        // eslint-disable-next-line no-lone-blocks
        {
            users.map((user) => (
                user._id === id && (
                    setFirstName(user.firstName),
                    setLastName(user.lastName),
                    setEmail(user.email)
                )
            ))
        }
    }



    const getUsers = async () => {
        try {
            const response = await fetch('https://devkom.herokuapp.com/users')
            const data = await response.json()
            setUsers(data)

        } catch (error) {
            console.log(error)
        }
    }

    const DeleteUser = async (id: string) => {

        try {
            const response = await fetch('https://devkom.herokuapp.com/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            window.location.reload()
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // Update User
    const UpdateUser = async (id: string) => {
        try {
            const data = { firstName, lastName, email }
            const response = await fetch('https://devkom.herokuapp.com/users/' + id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data)

                handleClose();

                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUsers()

    }, [])


    return (
        <>
            <Container>
                <NewUserModal />
                <Table striped bordered hover variant="dark" className='mt-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {users.map((user, index) => (

                        <>

                            <tbody>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstName}
                                    </td>
                                    <td>{user.lastName}</td>
                                    <td >{user.email}
                                        <Button className='float-right btn-danger'
                                            onClick={() => DeleteUser(user._id)}
                                        ><BsFillTrashFill />
                                        </Button>

                                        <Button className='float-right btn-primary ml-2 mr-2'
                                            onClick={() => handleShow(user._id)}
                                        ><BsFillPencilFill />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Updating User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form >
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="firstName"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <Form.Control

                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}

                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type='button' variant="primary"
                                        onClick={() => UpdateUser(user._id)}
                                    >

                                        Update User
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    ))}
                </Table>


            </Container>
        </>
    )
}

