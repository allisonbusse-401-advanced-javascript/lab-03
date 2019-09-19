jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const documentNew = new DocumentCollection;
const shortid = require('shortid');


describe('Document Collection', () => {
  // TODO
  const objectExample = { name: 'Allison' };

  it('saves a file', () => {
    // arrange 
    writeFile.mockResolvedValue(objectExample);


    //act
    return documentNew.save(objectExample)
      .then(() => {
        const dest = `./${objectExample.id}.json`;
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][0]).toBe(dest);
        expect(writeCalls[0][1]).toBe(JSON.stringify(objectExample));
      });
  });

  it(`propagates error`, () => {
    // arrange
    // const objectExample = { name: 'Allison' };
    const dest = `./${objectExample.id}.json`;

    const error = 'file error';
    writeFile.mockRejectedValueOnce(error);
    expect.assertions(0);
    
    // act
    documentNew.save({})
      .catch(err => {
        expect(err).toBe(error);
      });
  });

  it('gets a file by id', () => {
    // arrange 
    // const objectExample = { name: 'Allison' };
    const source = `./${objectExample.id}.json`;
    readFile.mockResolvedValue(objectExample);


    //act
    return documentNew.get(objectExample.id)
      .then(() => {
        const readCalls = readFile.mock.calls;
        expect(readCalls.length).toBe(1);
        expect(readCalls[0][0]).toBe(source);
      });
  });

});
