import React, { useState, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ({ onDelete }: { onDelete: () => void }) {
  const [showModal, setShowModal] = useState(false)
  const handleHideModal = useCallback(() => setShowModal(false), [setShowModal])
  const handleShowModal = useCallback(() => setShowModal(true), [setShowModal])
  const handleDelete = useCallback(() => {
    setShowModal(false)
    onDelete()
  }, [setShowModal, onDelete])
  return (
    <>
      <i onClick={handleShowModal}>
        <i className="fas fa-2x mx-2 fa-trash text-danger cursor-pointer"></i>
      </i>
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}