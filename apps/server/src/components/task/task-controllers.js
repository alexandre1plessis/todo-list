import { TaskModel } from '../list/list-model.js'
import joi from 'joi'
import { SchemaType } from 'mongoose'

export const getTasks = async (ctx) => {
  try {
    const tasks = await TaskModel.find({})
    ctx.ok(tasks)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getOneTask = async (ctx) => {
  try {
    const task = await TaskModel.findOne({ _id: ctx.params.id })
    if(!task) throw new Error('Task not found')
    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const createTask = async (ctx) => {
  try {
    const schema = joi.object({
      title: joi.string().required(),
      description: joi.string(),
      state: joi.boolean()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const task = await TaskModel.create(value)
    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const updateTask = async (ctx) => {
  try {
    const schema = joi.object({
      title: joi.string(),
      description: joi.string(),
      state: joi.boolean()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)
  
    const task = await TaskModel.findOneAndUpdate({ _id: ctx.params.id }, value, { new: true })
    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const deleteTask = async (ctx) => {
  try {
    const task = await TaskModel.findOneAndDelete({ _id: ctx.params.id })
    if(!task) throw new Error('Task not found')
    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}