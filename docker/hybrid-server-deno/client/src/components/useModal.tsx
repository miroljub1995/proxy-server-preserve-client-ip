import { useState } from "react";

export function useModal() {
  const [show, setShow] = useState(false)
  const handleHide = () => setShow(false)
  const handleShow = () => setShow(true)

  return [show, handleShow, handleHide] as const
}