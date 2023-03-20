import { ListModel, TaskModel } from './list-model.js'
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
    if (!ctx.request.body.title) throw new Error('Title is missing')

    const schema = joi.object({
      title: joi.string().required(),
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const listname = await ListModel.findOne({ title: ctx.request.body.title })
    if (listname) throw new Error('List already exists')

    const list = await ListModel.create(value)
    ctx.ok(list)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const updateList = async (ctx) => {
  try {
    if (!ctx.request.body.title) throw new Error('Title is missing')

    const schema = joi.object({
      title: joi.string(),
    })
    const { error, value } = schema.validate(ctx.request.body)

    if(error) throw new Error(error)

    const listname = await ListModel.findOne({ title: ctx.request.body.title })
    if (listname) throw new Error('List already exists')
  
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

export const getTasksByListId = async (ctx) => {
  try {
    const tasks = await TaskModel.find({ list: ctx.params.id })
    if(!tasks) throw new Error('List not found')
    ctx.ok(tasks)
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getCompletedTasksByListId = async (ctx) => {
  try {
    const tasks = await TaskModel.find({ list: ctx.params.id, state: true })
    ctx.ok(tasks || [])
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}

export const getUncompletedTasksByListId = async (ctx) => {
  try {
    const tasks = await TaskModel.find({ list: ctx.params.id, state: false })
    ctx.ok(tasks || [])
  } catch (error) {
    ctx.badRequest({ message: error.message })
  }
}