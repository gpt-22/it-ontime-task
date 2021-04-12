const { model, Schema } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    default: 'Записка номер n'
  },
  text: {
    type: String,
    default: 'Дефолтный текст ʕ•ᴥ•ʔ'
  }
})

module.exports = model('Record', schema)
