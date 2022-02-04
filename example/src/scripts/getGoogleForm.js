const { googleFormsToJson } = require('react-google-forms-hooks')
const fs = require('fs')
const path = require('path')

const saveJsonToFile = (filename, json) => {
  const filePath = path.resolve(__dirname, filename)
  fs.writeFile(filePath, JSON.stringify(json), 'utf8', function (err) {
    if (err) throw err
  })
}

// numbers: https://forms.gle/NfoppNLnDTPqY5NJA
// text: https://forms.gle/ftv294SEZV96e9DJ8
// length: https://forms.gle/1DH7GSPiNsqVFRZK6
// regex: https://forms.gle/gHwYkxE3czR1QT7x9

const run = async () => {
  const result = await googleFormsToJson('https://forms.gle/gHwYkxE3czR1QT7x9')

  saveJsonToFile('form.json', result)
}

run()
