import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import springLogo from './assets/spring.svg'

import './App.css'

function App() {

  const baseUlr = 'http://localhost:8080/api/person'
  const [data, setData] = useState([])

  // Get People
  const requestGet = async () => {
    await axios.get(baseUlr)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
    requestGet();
  })

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
        <span className='text-white'>People</span>
        <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-plain.svg' />
      </nav>

      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.id}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
