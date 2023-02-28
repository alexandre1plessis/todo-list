import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  dbName: 'ynov-todo-app'
})
  .then(() => console.log(`✅ Successfully connected to database`))
  .catch(() => console.log(`⛔️ Error during connection to database`))