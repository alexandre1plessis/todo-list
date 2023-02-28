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
    return tasks
}