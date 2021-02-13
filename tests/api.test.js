const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Testing for DB assignment API', () => {

  test('normal configuration', async () => {
    const data = {
      'Text' : 'hello 2 times  '
    }
    const characterCount = [{"e": 2}, {"h": 1}, {"i": 1}, {"l": 2}, {"m": 1}, {"o": 1}, {"s": 1}, {"t": 1}]

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(15)
    expect(result.body.textLength.withoutSpaces).toEqual(11)
    expect(result.body.wordCount).toEqual(3)
    expect(result.body.characterCount).toEqual(characterCount)
  })

  test('abnormal configuration , empty text', async () => {
    const data = {
      'Text' : ''
    }

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('invalid data , data is empty')
  })

  test('abnormal configuration , null data', async () => {
    const result = await api
      .post('/analyse')
      .send(null)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain(`invalid data format, can't find 'Text'`)
  })

  test('abnormal configuration , only spaces', async () => {
    const data = {
      'Text' : '  '
    }

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(2)
    expect(result.body.textLength.withoutSpaces).toEqual(0)
    expect(result.body.wordCount).toEqual(0)
    expect(result.body.characterCount).toEqual(null)
  })

  test('abnormal configuration , without alphabet', async () => {
    const data = {
      'Text' : ' 123 ** !!  '
    }

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(12)
    expect(result.body.textLength.withoutSpaces).toEqual(7)
    expect(result.body.wordCount).toEqual(3)
    expect(result.body.characterCount).toEqual(null)
  })

  test('abnormal configuration , without alphabet and space(s)', async () => {
    const data = {
      'Text' : '123**!!'
    }

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(7)
    expect(result.body.textLength.withoutSpaces).toEqual(7)
    expect(result.body.wordCount).toEqual(1)
    expect(result.body.characterCount).toEqual(null)
  })

  test('abnormal configuration , alphabet without space(s)', async () => {
    const data = {
      'Text' : 'hello'
    }

    const characterCount = [{"e": 1}, {"h": 1}, {"l": 2}, {"o": 1}]

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(5)
    expect(result.body.textLength.withoutSpaces).toEqual(5)
    expect(result.body.wordCount).toEqual(1)
    expect(result.body.characterCount).toEqual(characterCount)
  })

  test('abnormal configuration , alphabet with underscore', async () => {
    const data = {
      'Text' : ' hello_2_**!! times_again '
    }

    const characterCount = [{ "a": 2 } , { "e": 2 }, { "g": 1 } , { "h": 1 }, { "i": 2 }, {"l": 2}, {"m":1} ,{"n":1},{"o":1}, {"s": 1} , {"t": 1}]

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(26)
    expect(result.body.textLength.withoutSpaces).toEqual(23)
    expect(result.body.wordCount).toEqual(2)
    expect(result.body.characterCount).toEqual(characterCount)
  })

  test('abnormal configuration , starting,ending with space', async () => {
    const data = {
      'Text' : ' hello 2 times '
    }

    const characterCount = [{"e": 2}, {"h": 1}, {"i": 1}, {"l": 2}, {"m": 1}, {"o": 1}, {"s": 1}, {"t": 1}]

    const result = await api
      .post('/analyse')
      .send(data)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.textLength.withSpaces).toEqual(15)
    expect(result.body.textLength.withoutSpaces).toEqual(11)
    expect(result.body.wordCount).toEqual(3)
    expect(result.body.characterCount).toEqual(characterCount)
  })

})