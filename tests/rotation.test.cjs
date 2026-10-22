const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const router = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const halfHour = 30 * 60 * 1000;

function destination(time, search = '') {
  let target;
  vm.runInNewContext(router, {
    URLSearchParams,
    Date: {now: () => time},
    location: {search, replace: value => { target = value; }}
  });
  return target;
}

test('changes at the half-hour boundary and stays stable inside each interval', () => {
  assert.equal(destination(0), 'v2-ascii-frames.html');
  assert.equal(destination(halfHour - 1), 'v2-ascii-frames.html');
  assert.equal(destination(halfHour), 'v4-directory.html');
  assert.equal(destination(2 * halfHour - 1), 'v4-directory.html');
  assert.equal(destination(2 * halfHour), 'v5-bbs.html');
});

test('includes both chosen designs and wraps after fifteen intervals', () => {
  assert.equal(destination(13 * halfHour), 'v16-crimson.html');
  assert.equal(destination(14 * halfHour), 'v17-keep.html');
  assert.equal(destination(15 * halfHour), 'v2-ascii-frames.html');
  assert.equal(destination(30 * halfHour), 'v2-ascii-frames.html');
});

test('offsets advance by half-hours, including backward wraparound', () => {
  assert.equal(destination(0, '?o=1'), 'v4-directory.html');
  assert.equal(destination(0, '?o=-1'), 'v17-keep.html');
  assert.equal(destination(halfHour, '?o=-1'), 'v2-ascii-frames.html');
  assert.equal(destination(0, '?o=15'), 'v2-ascii-frames.html');
});

test('forced previews preserve intro and demo flags and override the offset', () => {
  assert.equal(destination(0, '?i=13&intro=1'), 'v16-crimson.html?intro=1');
  assert.equal(destination(0, '?i=14&demo=1'), 'v17-keep.html?demo=1');
  assert.equal(destination(0, '?i=13&o=8&intro=1&demo=1'), 'v16-crimson.html?intro=1&demo=1');
  assert.equal(destination(0, '?i=-1'), 'v17-keep.html');
});

test('invalid and empty previews fall back to the current interval', () => {
  for (const search of ['?i=invalid', '?i=', '?o=invalid']) {
    assert.equal(destination(14 * halfHour, search), 'v17-keep.html');
  }
});

test('every rotation entry is unique and exists on disk', () => {
  const entries = Array.from({length:15}, (_, index) => destination(0, `?i=${index}`));
  assert.equal(new Set(entries).size, 15);
  for (const file of entries) assert.ok(fs.existsSync(path.join(root, file)), file);
});
