import { ListModel, TaskModel } from './list-model.js'
import joi from 'joi'
import { SchemaType } from 'mongoose'

export const getLists = async (ctx) => {
  try {
    const userId = ctx.state.auth.userId
    const lists = await ListModel.find({ user: userId })
    ctx.ok(lists)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getOneList = async (ctx) => {
  try {
    const user = ctx.state.auth.userId;
    const list = await ListModel.findOne({ _id: ctx.params.id, user: user._id });
    if (!list) throw new Error('List not found')
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const createList = async (ctx) => {
  try {
    console.log(ctx);
    ctx.badRequest(JSON.stringify(ctx.request.body))
    if (!ctx.request.body.title) throw new Error('Title is missing')

    const schema = joi.object({
      title: joi.string().required(),
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)
    console.log(ctx.state.auth)

    const { userId } = ctx.state.auth.userId;
    const listname = await ListModel.findOne({ title: ctx.request.body.title, userId })
    if (listname) throw new Error('List already exists')

    const list = await ListModel.create({ ...value, user: userId })
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const updateList = async (ctx) => {
  try {
    const userId = ctx.ctx.state.auth.userId;
    if (!ctx.request.body.title) throw new Error('Title is missing')

    const schema = joi.object({
      title: joi.string(),
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const list = await ListModel.findOne({ _id: ctx.params.id, user: userId });
    if (!list) throw new Error('List not found');
    const listname = await ListModel.findOne({ title: ctx.request.body.title, user: userId });
    if (listname && listname._id.toString() !== list._id.toString()) throw new Error('List already exists');
  
    const updatedList = await ListModel.findOneAndUpdate({ _id: ctx.params.id, user: userId }, value, { new: true });
    ctx.ok(updatedList)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const deleteList = async (ctx) => {
  try {
    const userId = ctx.ctx.state.auth.userId

    const list = await ListModel.findOneAndDelete({ _id: ctx.params.id, user: userId })
    if(!list) throw new Error('List not found or user is not authorized to delete it')
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getTasksByListId = async (ctx) => {
  try {
    const list = await ListModel.findOne({ _id: ctx.params.id, user: ctx.state.user._id });
    if (!list) throw new Error('List not found');

    const tasks = await TaskModel.find({ list: list._id });
    ctx.ok(tasks);
  } catch (error) {
    ctx.badRequest({ message: error.message });
  }
};

export const getCompletedTasksByListId = async (ctx) => {
  try {
    const tasks = await TaskModel.find({ list: ctx.params.id, state: true, user: ctx.state.user.id })
    ctx.ok(tasks || [])
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getUncompletedTasksByListId = async (ctx) => {
  try {
    const tasks = await TaskModel.find({ list: ctx.params.id, state: false, user: ctx.state.user.id })
    ctx.ok(tasks || [])
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}
