import rootReducer from '../reducer'

test('should return initial state', () => {
  expect(rootReducer(undefined, {})).toEqual({
    dogsBackup: [],
    dogs: [],
    temps: [{ name: 'All' }],
    dogDetail: [],
  })
})
