import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {

  const baseUlr = 'https://render-deploy-data-faker.onrender.com/api/person'
  const [data, setData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false);
  const [seedDataModal, setSeedModal] = useState(false);

  // Buttons action logic
  const [clearButton, setClearButton] = useState(false);
  const [seedDataButton, setSeedDataButton] = useState(false);

  // 
  const [updateData, setUpdateData] = useState(true);

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

    setClearButton(true);

    await axios.delete(baseUlr)
      .then(response => {
        setData(response.data)
        setUpdateData(true);
        openCloseDeleteModal();

        setClearButton(false);
      }).catch(error => {
        alert(error)
      })
  }

  // Seed Data
  const requestPostSeedData = async () => {

    setSeedDataButton(true);

    await axios.post(baseUlr + '/seed-data')
      .then(response => {
        setData(response.data)
        setUpdateData(true);
        openCloseSeedDataModal();

        setSeedDataButton(false);
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
    if (updateData) {
      requestGet();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
        <div className='container'><a className='navbar-brand d-flex align-items-center' href='/'><span className='navbar-brand d-flex align-items-center me-1'>
          <img id='page-logo' src={reactLogo} width='30px' />
        </span><span className='border border-light border-2 rounded-2 text-white'>&nbsp;People&nbsp;</span></a><button data-bs-toggle='collapse' className='navbar-toggler' data-bs-target='#navcol-1'><span className='visually-hidden'>Toggle navigation</span><span className='navbar-toggler-icon'></span></button>
          <div className='collapse navbar-collapse' id='navcol-1'>
            <ul className='navbar-nav me-auto '>
              <li id='seed-data' className='nav-item'><a className='nav-link active pe-auto' onClick={() => openCloseSeedDataModal()}>Seed Data</a></li>
              <li id='new-person' className='nav-item'><a className='nav-link' onClick={() => alert('Working in progress...')} >New Person</a></li>
              <li id='clear' className='nav-item'><a className='nav-link active pe-auto' onClick={() => openCloseDeleteModal()}>Clear</a></li>
            </ul>
          </div>
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
        <tbody>{/* Will verify if People table is empty */}
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
              <td colSpan='3' className='text-center'>No data available</td>
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
          <button className='btn btn-danger' disabled={clearButton} onClick={() => requestDelete()} >Delete</button>
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
          <button className='btn btn-success' disabled={seedDataButton} onClick={() => requestPostSeedData()} >Seed!</button>
          <button className='btn btn-secondary' onClick={openCloseSeedDataModal}>Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App

