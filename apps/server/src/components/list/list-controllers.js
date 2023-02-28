import { ListModel } from './list-model.js'
import joi from 'joi'
import { SchemaType } from 'mongoose'

export const getLists = async (ctx) => {
  try {
    const lists = await ListModel.find({})
    ctx.ok(lists)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getOneList = async (ctx) => {
  try {
    const list = await ListModel.findOne({ _id: ctx.params.id })
    if(!list) throw new Error('List not found')
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const createList = async (ctx) => {
  try {
    const schema = joi.object({
      title: joi.string().required(),
      tasks: joi.array()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const list = await ListModel.create(value)
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const updateList = async (ctx) => {
  try {
    const schema = joi.object({
      title: joi.string(),
      tasks: joi.array()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)
  
    const list = await ListModel.findOneAndUpdate({ _id: ctx.params.id }, value, { new: true })
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const deleteList = async (ctx) => {
  try {
    const list = await ListModel.findOneAndDelete({ _id: ctx.params.id })
    if(!list) throw new Error('List not found')
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}