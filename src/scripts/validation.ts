export const getRawValidation = (fieldInfo: Array<any>) => fieldInfo[4]?.[0]

export const TYPE_POS = 0
export const CONDITION_POS = 1
export const VALUES_POS = 2
export const MESSAGE_POS = 3

const VALIDATION_TYPES = ['NUMBER', 'TEXT']

const PATTERN_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const PATTERN_URL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const sanitizeMessage = (msg: string) => msg.replace("'", "\\'")

export const parseNumberValidation = (rawValidation: Array<any>) => ({
  type: VALIDATION_TYPES[rawValidation[TYPE_POS] - 1],
  condition: rawValidation[CONDITION_POS] - 1,
  values: rawValidation[VALUES_POS]?.map((e: string) => parseInt(e)),
  message: rawValidation[MESSAGE_POS] || 'Invalid input'
})

export const parseTextValidation = (rawValidation: Array<any>) => ({
  type: VALIDATION_TYPES[rawValidation[TYPE_POS] - 1],
  condition: rawValidation[CONDITION_POS] % 100,
  values: rawValidation[VALUES_POS],
  message: rawValidation[MESSAGE_POS] || 'Invalid input'
})

const getNumberValidation = ({
  condition,
  values,
  message
}: {
  condition: number
  values: Array<any>
  message: string
}) => {
  // if (values !== undefined)
  const [val1, val2] = values ? values : [undefined, undefined]
  // console.log('values', values, val1, val2)
  // console.log('condition', condition)
  const msg = sanitizeMessage(message)
  const fnStringArgs = [
    [`v`, `v > ${val1}`, `'${msg}'`],
    [`v`, `v >= ${val1}`, `'${msg}'`],
    [`v`, `v < ${val1}`, `'${msg}'`],
    [`v`, `v <= ${val1}`, `'${msg}'`],
    [`v`, `v == ${val1}`, `'${msg}'`],
    [`v`, `v != ${val1}`, `'${msg}'`],
    [`v`, `(v > ${val1} && v < ${val2})`, `'${msg}'`],
    [`v`, `(v < ${val1} && v > ${val2})`, `'${msg}'`],
    [`v`, `typeof v === 'number'`, `'${msg}'`],
    [`v`, `(typeof v === 'number' && Math.round(v) == v)`, `'${msg}'`]
  ][condition]
  return fnStringArgs
}

const getTextValidation = ({
  condition,
  values,
  message
}: {
  condition: number
  values: Array<any>
  message: string
}) => {
  const [val1] = values ? values : [undefined]

  const msg = sanitizeMessage(message)
  const fnStringArgs = [
    [`v`, `v.includes('${val1}')`, `'${msg}'`],
    [`v`, `!v.includes('${val1}')`, `'${msg}'`],
    [`v`, `${PATTERN_EMAIL}.test(v)`, `'${msg}'`],
    [`v`, `${PATTERN_URL}.test(v)`, `'${msg}'`]
  ][condition]
  return fnStringArgs
}

export const getValidation = (rawValidation: Array<any>) => {
  const type = VALIDATION_TYPES[rawValidation[TYPE_POS] - 1]

  switch (type) {
    case 'NUMBER':
      return getNumberValidation(parseNumberValidation(rawValidation))
    case 'TEXT':
      return getTextValidation(parseTextValidation(rawValidation))
    default:
      return undefined
  }
}
