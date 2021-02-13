analyserRouter = require('express').Router()

function analyseData(data) {
  
  const withSpaces = data.length
  const withoutSpaces = (withSpaces - data.match(/\s/g).length)
  const wordCount = data.match(/\S+/g).length






  console.log(withSpaces , withoutSpaces , wordCount)
 
  


  

}

analyserRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (body.Text !== undefined) {
    if (body.Text.length <= 0) {
      res.status(400).json({ error: "invalid data" })
    } else {
      analyseData(body.Text)
      res.json("ok")
    }
  } else {
    res.status(400).json({error: "invalid data format, can't find 'Text'"})
  }
})

module.exports = analyserRouter