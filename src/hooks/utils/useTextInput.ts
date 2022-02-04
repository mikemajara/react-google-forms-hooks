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
    let validationFn = undefined
    if (field.options?.validateFn) {
      const [param, fnBody, message] = field.options?.validateFn
      if (field.required) {
        validationFn = eval(`(${param}) => ${fnBody} || ${message}`)
      } else {
        validationFn = eval(
          `(${param}) => !${param} || ${fnBody} || ${message}`
        )
      }
    }
    console.log(validationFn)
    return context!.register(id, {
      required: field.required && 'Required',
      ...options,
      validate: validationFn
    })
  }

  return { ...field, register, error }
}
