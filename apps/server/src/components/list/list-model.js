import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Pas de description pour cette tâche',
  },
  state: {
    type: Boolean,
    default: false
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  }
}, {
  timestamps: true
})

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
})

const ListModel = mongoose.model('List', listSchema)
const TaskModel = mongoose.model('Task', taskSchema)

export { ListModel, TaskModel }