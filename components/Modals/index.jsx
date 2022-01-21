import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

export default function index(props) {
  return (
    <div>
      <Modal
        size={props.size ? props.size : "lg"}
        isOpen={props.modal}
        toggle={props.toggle}
        className={props.className}
      >
        <ModalHeader toggle={props.toggle}>
          <h1 className="text-2xl">{props.title}</h1>
        </ModalHeader>
        <ModalBody>{props.content}</ModalBody>
      </Modal>
    </div>
  )
}
