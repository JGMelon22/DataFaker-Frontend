import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {

  const baseUlr = 'http://localhost:8080/api/person'
  const [data, setData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false);
  const [seedDataModal, setSeedModal] = useState(false);

  // Get People
  const requestGet = async () => {
    await axios.get(baseUlr)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        alert(error)
      })
  }

  // Bulk Delete
  const requestDelete = async () => {
    await axios.delete(baseUlr)
      .then(response => {
        setData(response.data)
        openCloseDeleteModal();
      }).catch(error => {
        alert(error)
      })
  }

  // Seed Data
  const requestPostSeedData = async () => {
    await axios.post(baseUlr + '/seed-data')
      .then(response => {
        setData(response.data)
      }).catch(error => {
        alert(error)
      })
  }

  // Modal States
  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const openCloseSeedDataModal = () => {
    setSeedModal(!seedDataModal);
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
          <button className="btn rounded-1 btn-success btn-sm" onClick={() => openCloseSeedDataModal()}>Seed Data</button>&nbsp;
          <button className="btn rounded-1 btn-success btn-sm">New Person</button>&nbsp;
          <button className="btn rounded-1 btn-danger btn-sm" onClick={() => openCloseDeleteModal()}>Clear</button>
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
        <tbody> {/* Will verify if People table is empty */}
          {data && data.length > 0 ? (
            data.map((person, index) => (
              <tr key={index}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className='text-center'>No data available</td>
            </tr>
          )}
        </tbody>
      </table>


      {/* Delete Modal */}
      <Modal isOpen={deleteModal}>
        <ModalBody>
          Are you sure you want to <b className='text-danger'>bulk delete</b>?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => requestDelete()}>Delete</button>
          <button className='btn btn-secondary' onClick={openCloseDeleteModal}>Cancel</button>
        </ModalFooter>
      </Modal>

      {/* Seed Data Modal */}
      <Modal isOpen={seedDataModal}>
        <ModalBody>
          Are you sure you want to <b className='text-success'>seed data</b>?&nbsp;
          <span>This operation might take a while...</span>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success'>Seed!</button>
          <button className='btn btn-secondary' onClick={openCloseSeedDataModal}>Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App

