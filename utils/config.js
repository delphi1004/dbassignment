require('dotenv').config()

const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test'){
    
}

console.log(`the system running on ${process.env.NODE_ENV} mode`)

module.exports = {
    PORT
}