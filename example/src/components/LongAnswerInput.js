import React from 'react'
import styled from 'styled-components'

import { useLongAnswerInput } from 'react-google-forms-hooks'

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
`

export default function LongAnswerInput({ id }) {
  const { register, error } = useLongAnswerInput(id)

  return (
    <div>
      <textarea type='text' {...register()} />
      <ErrorMessage>{error && error.message}</ErrorMessage>
    </div>
  )
}
