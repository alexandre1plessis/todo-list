import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tasks: [taskSchema]
}, 
{
  timestamps: true
})

const ListModel = mongoose.model('List', listSchema)

export { ListModel }