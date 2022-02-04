import { RegisterOptions } from 'react-hook-form'

import { UseTextFieldReturn, TextField } from '../../types'
import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'

export default (
  id: string,
  fieldType: 'LONG_ANSWER' | 'SHORT_ANSWER'
): UseTextFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, fieldType) as TextField

  const error = context!.formState.errors[field.id]

  const register = (options?: RegisterOptions) => {
    let validate = {}
    if (field.options?.validateFn) {
      const rule = eval(field.options?.validateFn)
      validate = { rule }
    }
    return context!.register(id, {
      required: field.required,
      ...options,
      validate
    })
  }

  return { ...field, register, error }
}
