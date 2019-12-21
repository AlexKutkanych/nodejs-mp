process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    var reversedChunk = chunk.split('').reverse().join('');
    process.stdout.write(`here is ${reversedChunk}\n`);
  }
});