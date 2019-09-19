jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const documentNew = new DocumentCollection;

describe('Document Collection', () => {
  // TODO
  it('saves a file', () => {
    // arrange 
    const objectExample = { name: 'Allison' };
    const dest = './id.json';
    writeFile.mockResolvedValue(objectExample);


    //act
    return documentNew.save(objectExample)
      .then(() => {
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][0]).toBe(dest);
        expect(writeCalls[0][1]).toBe(JSON.stringify(objectExample));
      });
  });
});
