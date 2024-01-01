import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {

  const baseUrl = 'http://localhost:8009/api/person'
  const [data, setData] = useState([])

  // Modals
  const [dataModal, setDataModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [seedDataModal, setSeedModal] = useState(false);

  // Buttons action logic
  const [clearButton, setClearButton] = useState(false);
  const [seedDataButton, setSeedDataButton] = useState(false);

  // 
  const [updateData, setUpdateData] = useState(true);

  // Get People
  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        alert(error)
      })
  }

  // Bulk Delete
  const requestDelete = async () => {

    setClearButton(true);

    await axios.delete(baseUrl)
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

    await axios.post(baseUrl + '/seed-data')
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
  const openCloseDataModal = () => {
    setDataModal(!dataModal);
  }

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
              <li id='seed-data' className='nav-item'><a className='nav-link active pe-auto' onClick={() => openCloseDataModal()}>List All</a></li>
              <li id='new-person' className='nav-item'><a className='nav-link' onClick={() => alert('Working in progress...')}>New Person</a></li>
              <li id='clear' className='nav-item'><a className='nav-link active pe-auto' onClick={() => openCloseDeleteModal()}>Clear</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='container py-4 py-xl-5'>
        <div className='row mb-5'>
          <div className='col-md-8 col-xl-6 text-center mx-auto'>
            <h2>Data Faker Front-end</h2>
            <p className='w-lg-50'>This library generates fake data, similar to other fake data generators. It's useful when you're developing a new project and need some pretty data for showcase.</p>
          </div>
        </div>
        <div className='row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3'>
          <div className='col border border-white rounded'>
            <div className='card border-0 shadow-none'>
              <div className='card-body d-flex align-items-center p-0'><img className='rounded-circle flex-shrink-0 me-3 fit-cover' width='130' height='130' src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' />
                <div>
                  <h5 className='fw-bold text-primary mb-0'>Java 17+</h5>
                  <p className='text-muted mb-1'>Requires Java 17 or greater</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col border border-white rounded'>
            <div className='card border-0 shadow-none'>
              <div className='card-body d-flex align-items-center p-0'><img className='rounded-circle flex-shrink-0 me-3 fit-cover' width='130' height='130' src='https://www.cdnlogo.com/logos/o/94/open-source.svg' />
                <div>
                  <h5 className='fw-bold text-primary mb-0'><strong>Open source</strong></h5>
                  <p className='text-muted mb-1'>OSS</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col border border-white rounded'>
            <div className='card border-0 shadow-none'>
              <div className='card-body d-flex align-items-center p-0'><img className='rounded-circle flex-shrink-0 me-3 fit-cover' width='130' height='130' src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-line.svg' />
                <div>
                  <h5 className='fw-bold text-primary mb-0'>Developer Friendly</h5>
                  <p className='text-muted mb-1'>Easy to setup and use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='text-center bg-dark'>
        <div className='container text-white py-4 py-lg-5'>
          <ul className='list-inline'>
            <li className='list-inline-item'><a className='link-light' href='https://github.com/JGMelon22/DataFaker-Frontend'>Front-end source code</a></li>
            <li className='list-inline-item'><a className='link-light' href='https://github.com/JGMelon22/DataFakerDemo'>Back-end source code</a></li>
            <li className='list-inline-item'><a className='link-light' href='https://github.com/datafaker-net/datafaker'>Data Faker project code</a></li>
          </ul>
          <ul className='list-inline'>
            <li className='list-inline-item me-4'></li>
            <li className='list-inline-item me-4'><img width='100' height='80' src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' /></li>
            <li className='list-inline-item'></li>
          </ul>
          <p className='text-muted mb-0'><em>Talk is cheap. Show me the code </em>- Torvalds, Linus</p>
        </div>
      </footer>

      { /* List Data Details Modal */}
      < Modal isOpen={dataModal} className='modal-lg' >
        <ModalHeader className='text-center mx-auto'>
          <div>
            <h3>People</h3>
          </div>
        </ModalHeader>
        <ModalBody className='form-group'>
          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th className='text-center'>First Name</th>
                <th className='text-center'>Last Name</th>
              </tr>
            </thead>
            <tbody>
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
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-secondary m-1' onClick={() => openCloseDataModal()}>Close</button>
        </ModalFooter>
      </Modal >

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

