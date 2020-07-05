import React, { useState } from "react";

export function useInput() {
  const [value, setValue] = useState('')
  function setStateFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value)
  }
  return [value, setStateFromInput] as const
}