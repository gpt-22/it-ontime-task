const { Record } = require('../models')

export const recordController = {
  async getAll(_: any, response: any) {
    try {
      const items = await Record.find()
      return response.status(200).send({ items })
    } catch (error) {
      return response.status(400).send(console.warn(error))
    }
  },
  async get({ params: { id } }: { params: { id: number } }, response: any) {
    try {
      const item = await Record.findById(id)
      return response.status(200).send(item)
    } catch (error) {
      return response.status(400).send(console.warn(error))
    }
  },
  async create({ body }: { body: object }, response: any) {
    try {
      const item = new Record(body)
      const newItem = await item.save()
      return response.status(200).send(newItem)
    } catch (error) {
      return response.status(400).send(console.warn(error))
    }
  },
  async update({params: { id }, body }: { params: { id: number }, body: object }, response: any) {
    try {
      const item = await Record.findByIdAndUpdate(id, body, {new: true})
      return response.status(200).send(item)
    } catch (error) {
      return response.status(400).send(console.warn(error))
    }
  },
  async delete({ params: { id } }: { params: { id: number } }, response: any) {
    try {
      await Record.findByIdAndDelete(id)
      return response.status(200).send({
        status: 'OK',
        message: `Item with id ${id} successfully deleted`
      })
    } catch (error) {
      return response.status(400).send(console.warn(error))
    }
  }
}
