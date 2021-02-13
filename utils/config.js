require('dotenv').config()

const PORT = process.env.PORT || 5000
console.log(`the system running on ${process.env.NODE_ENV} mode`)

module.exports = {
  PORT
}