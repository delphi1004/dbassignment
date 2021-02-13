const analyserRouter = require('express').Router()
const logger = require('../utils/logger')

function analyseData(data) {
  let finalLetterCount = null
  const withSpaces = data.length
  const findSpaces = data.match(/\s/g)
  const withoutSpaces = withSpaces - (findSpaces ? findSpaces.length : 0)
  const findWords = data.match(/([^\s]+)/g)
  const wordCount = findWords ? findWords.length : 0
  const onlyAlphabet = data.match(/[A-Za-z]/g)

  logger.info(onlyAlphabet)

  if (onlyAlphabet) {
    const filteredData = onlyAlphabet.sort()
    const letterCount = filteredData.reduce((count, letter) => {
      count[letter] ? count[letter]++ : count[letter] = 1;
      return count;
    }, {})
  
    finalLetterCount = Object.keys(letterCount).map(letter => {
      return { [letter]: letterCount[letter] }
    })
  }
 
  const result = {
    textLength: {
      withSpaces: withSpaces,
      withoutSpaces:withoutSpaces
    },
    wordCount: wordCount,
    characterCount:finalLetterCount
  }

  logger.info(result)

  return result
}

analyserRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    if (body.Text !== undefined) {
      if (body.Text.length <= 0) {
        res.status(400).json({ error: "invalid data , data is empty" })
      } else {
        res.json(analyseData(body.Text))
      }
    } else {
      res.status(400).json({ error: "invalid data format, can't find 'Text'" })
    }
  }catch (e){
    res.status(500).json({ error: "invalid data" })
  }
})

module.exports = analyserRouter