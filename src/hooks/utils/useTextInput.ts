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
  // console.log(`field`)
  // console.log(field)
  const error = context!.formState.errors[field.id]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const register = (_options?: RegisterOptions) => {
    let validate = {}
    if (field.options?.validateFn) {
      const rule = eval(field.options?.validateFn)
      validate = { rule }
    }
    // const v = { rule: (_v: any) => _v > 13 }
    // console.log('options', {
    // required: field.required,
    // ...options,
    //   validate
    // })
    return context!.register(id, {
      // required: field.required,
      // ...options,
      validate
    })
  }

  return { ...field, register, error }
}
