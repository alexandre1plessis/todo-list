import { TaskModel, ListModel } from '../list/list-model.js'
import joi from 'joi'

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