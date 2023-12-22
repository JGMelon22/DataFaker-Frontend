import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import reactLogo from './assets/react.svg'

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

  // UseEffect without infinity loop
  useEffect(() => {
    requestGet();
  }, [])

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
        <span className='border border-light border-2 rounded-2 text-white'>&nbsp;People&nbsp;</span>
        <img id='page-logo' src={reactLogo} width='30px' />

        <div id='buttons-action' className="btn-group ms-auto" role="group" aria-label="">
          <button className="btn btn-info btn-sm">Bulk Insert</button>&nbsp;
          <button className="btn btn-success btn-sm">New Person</button>&nbsp;
          <button className="btn btn-danger btn-sm">Clear</button>
        </div>
      </nav>

      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th className='text-center'>Id</th>
            <th className='text-center'>First Name</th>
            <th className='text-center'>Last Name</th>
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
