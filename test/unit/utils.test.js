require('../../lib/utils');


test('Global log works well', () => {

  expect(log('normal log'));
  expect(log.warn('warn message'));

});

test('Event bus works correctly', () => {
  bus.on('foo', foo => console.log(foo));
  bus.emit('foo', 'bar');

})