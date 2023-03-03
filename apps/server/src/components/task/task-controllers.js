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
    if (!ctx.request.body.title) throw new Error('Title is missing')

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
    if (!ctx.request.body.title) throw new Error('Title is missing')

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

export const addTaskToListById = async (ctx) => {
  try {
    const schema = joi.object({
      taskId: joi.string().required(),
      task: joi.object({
        title: joi.string().required(),
        description: joi.string(),
        state: joi.boolean()
      }).required()
    })
    const { error, value } = schema.validate(ctx.request.body)

    if (error) throw new Error(error)

    const list = await ListModel.findById(ctx.params.listId)
    if (!list) throw new Error('List not found')

    const task = await TaskModel.findById(value.taskId)
    if (!task) throw new Error('Task not found')

    const existingTaskIndex = list.tasks.findIndex(existingTask => existingTask._id.equals(task._id))
    if (existingTaskIndex >= 0) throw new Error('Task already exists in list')

    // Remove the task from any other lists where it might have existed
    const otherLists = await ListModel.find({ 'tasks._id': task._id })
    const otherListIds = otherLists.map(otherList => otherList._id)
    await ListModel.updateMany({ _id: { $in: otherListIds } }, { $pull: { tasks: { _id: task._id } } })

    // Add the task to the new list
    list.tasks.push(value.task)
    const updatedList = await list.save()
    ctx.ok(updatedList)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

