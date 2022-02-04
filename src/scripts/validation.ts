export const getRawValidation = (fieldInfo: Array<any>) => fieldInfo[4]?.[0]

export const TYPE_POS = 0
export const CONDITION_POS = 1
export const VALUES_POS = 2
export const MESSAGE_POS = 3

const VALIDATION_TYPES = ['NUMBER']
// const CONDITION_TYPES = [
//   'UNDEFINED',
//   'GREATER_THAN',
//   'GREATER_OR_EQUAL',
//   'LESS_THAN',
//   'LESS_OR_EQUAL',
//   'EQUAL',
//   'NOT_EQUAL',
//   'BETWEEN',
//   'NOT_BETWEEN',
//   'IS_NUMBER',
//   'IS_WHOLE_NUMBER'
// ]

export const parseValidation = (rawValidation: Array<any>) => ({
  type: VALIDATION_TYPES[rawValidation[TYPE_POS] - 1],
  condition: rawValidation[CONDITION_POS] - 1,
  values: rawValidation[VALUES_POS]?.map((e: string) => parseInt(e)),
  message: rawValidation[MESSAGE_POS] || 'Invalid input'
})

const sanitizeMessage = (msg: string) => msg.replace("'", "\\'")

const getNumberValidation = (
  condition: number,
  values: Array<any>,
  message: string
) => {
  // if (values !== undefined)
  const [val1, val2] = values ? values : [undefined, undefined]
  // console.log('values', values, val1, val2)
  // console.log('condition', condition)
  const msg = sanitizeMessage(message)
  const fnStringArgs = [
    `(v) => v > ${val1} || '${msg}'`,
    `(v) => v >= ${val1} || '${msg}'`,
    `(v) => v < ${val1} || '${msg}'`,
    `(v) => v <= ${val1} || '${msg}'`,
    `(v) => v == ${val1} || '${msg}'`,
    `(v) => v != ${val1} || '${msg}'`,
    `(v) => (v > ${val1} && v < ${val2}) || '${msg}'`,
    `(v) => (v < ${val1} && v > ${val2}) || '${msg}'`,
    `(v) => typeof v === 'number' || '${msg}'`,
    `(v) => (typeof v === 'number' && Math.round(v) == v) || '${msg}'`
  ][condition]
  return fnStringArgs
}

export const getValidation = ({
  type,
  condition,
  values,
  message
}: {
  type: string
  condition: number
  values: Array<any>
  message: string
}) => {
  console.log('type', type)
  switch (type) {
    case 'NUMBER':
      console.log('number!')
      return getNumberValidation(condition, values, message)
    default:
      return null
  }
}
