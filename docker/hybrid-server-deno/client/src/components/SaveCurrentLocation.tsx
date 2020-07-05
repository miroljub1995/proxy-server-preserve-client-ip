import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useInput, useLocation, useModal } from "./CustomHooks"

export default function SaveCurrentLocation() {
  const [show, handleShow, handleHide] = useModal()
  const [, saveCurrentLocation] = useLocation()
  const [description, setDescription] = useInput()
  const handleSave = () => {
    saveCurrentLocation(description)
    handleHide()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save current location
      </Button>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Save current location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description here..." value={description} onChange={setDescription} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}