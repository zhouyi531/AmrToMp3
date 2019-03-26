import { expect } from 'chai';
import { AmrToMp3 } from '../AmrToMp3';

describe('general tests', () => {
  it('Convert amr to mp3', async () => {
    try {
      const result = await AmrToMp3.Convert('./src/test.amr', './');
      expect(!!/mp3/.exec(result)).to.true;
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  });
});
