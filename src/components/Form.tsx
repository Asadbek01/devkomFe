import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { IUsers } from '../types/IUsers'
import NewUserModal from './Modal'


export const Form = () => {
    const [users, setUsers] = React.useState<IUsers[]>([])

    const getUsers = async () => {
        try {
            const response = await fetch('https://devkom.herokuapp.com/users')
            const data = await response.json()
            setUsers(data)
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
                        <tbody>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>

            </Container>
        </>
    )
}

