import React from 'react'
import styled from 'styled-components'

import { useShortAnswerInput } from 'react-google-forms-hooks'

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
`

export default function ShortAnswerInput({ id }) {
  const { register, error } = useShortAnswerInput(id)

  return (
    <div>
      <input type='text' {...register()} />
      <ErrorMessage>{error && error.message}</ErrorMessage>
    </div>
  )
}
