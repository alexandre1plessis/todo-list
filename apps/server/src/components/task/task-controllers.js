import { TaskModel, ListModel } from '../list/list-model.js'
import joi from 'joi'
import { SchemaType } from 'mongoose'

export const getTasks = async (ctx) => {
  try {
    // Check if user is authenticated
    if (!ctx.state.user) {
      ctx.unauthorized({ message: 'User not authenticated' })
      return
    }

    // Retrieve tasks belonging to authenticated user
    const tasks = await TaskModel.find({ user: ctx.state.user._id })
    ctx.ok(tasks)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getOneTask = async (ctx) => {
  try {
    const task = await TaskModel.findOne({ _id: ctx.params.id, user: ctx.state.user._id })
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
      description: joi.string().allow(null, ''),
      state: joi.boolean(),
      list: joi.string().required()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const task = await TaskModel.create({ ...value, user: ctx.state.user._id })
    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const updateTask = async (ctx) => {
  try {
    if (!ctx.request.body.title) throw new Error('Title is missing')

    const schema = joi.object({
      title: joi.string(),
      description: joi.string().allow(null, ''),
      state: joi.boolean(),
      list: joi.string()
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

export const moveTaskToListById = async (ctx) => {
  try {
    const schema = joi.object({
      listId: joi.string().required()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if (error) throw new Error(error)

    const task = await TaskModel.findById(ctx.params.taskId)
    if (!task) throw new Error('Task not found')

    const newlist = await ListModel.findById(value.listId)
    console.log(newlist)
    console.log(task.list.equals(newlist._id))
    if (!newlist) throw new Error('List not found')

    // Check if task is already in new list
    if (task.list.equals(newlist._id)) {
      throw new Error('Task is already in the new list')
    }

    // Update task list reference
    task.list = newlist._id
    await task.save()

    ctx.ok(task)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

