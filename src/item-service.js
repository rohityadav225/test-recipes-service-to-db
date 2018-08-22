const { select, selectOne } = require('./db-utils')

const fetchAllItems = async function () {
  // this is a 'select all' because we aren't passing in a limit argument
  // the db util select function defaults to LIMIT ALL if not limit arg is passed in
  try {
    return await select('items')
  } catch(err) {
    throw err
  }
}

// filter/format function
// TODO: put comment above each function showing what scenario its linked to in test
const fetchItemNames = async function () {
  try {
    const items = await select('items')
    return items.rows.map(({name}) => name.toUpperCase())
  } catch(err) {
    // you can either swallow error or throw here, since its a service it depends
    throw err
  }
}

// scenario: bad input, bad query
// TODO: in blog post show step by step, so first step is happy path, then handling
const getPrice = async function (itemName) {
  try {
    const items = await selectOne('items', itemName)
    if (items.rows.length) {
      return items.rows.map(({price}) => price).pop()    
    } else {
      throw Error('Either no items, or item name was wrong/does not exist')
    }
  } catch(err) {
    throw err
  }
}

module.exports = {
  fetchAllItems,
  fetchItemNames,
  getPrice
}