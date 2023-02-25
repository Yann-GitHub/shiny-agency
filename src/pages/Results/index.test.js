import { formatFetchParams, formatJobList } from './'

// describe('La fonction formatJobList', () => {
//   test('ajoute une virgule à un item', () => {
//     const expectedState = 'item2,'
//     expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
//   })
//   test('ne met pas de virgule pour le dernier élément', () => {
//     const expectedState = 'item3'
//     expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
//   })
// })

// variation qui utilise 'it' à la place de 'test'
// plus clair avec la convention 'shouls...'

describe('The formatJobList function', () => {
  it('should add a comma to a word', () => {
    const expectedState = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
  })

  it('should not add a comma to the last element of the list', () => {
    const expectedState = 'item3'
    expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
  })
})

describe('The formatFetchParams function', () => {
  it('should use the right format for param', () => {
    const expectedState = 'a1=answer1'
    expect(formatFetchParams({ 1: 'answer1' })).toEqual(expectedState)
  })
  it('should concatenate params with an &', () => {
    const expectedState = 'a1=answer1&a2=answer2'
    expect(formatFetchParams({ 1: 'answer1', 2: 'answer2' })).toEqual(
      expectedState
    )
  })
})
