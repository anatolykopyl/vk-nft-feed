import dotenv from 'dotenv';
dotenv.config();

import Rarepress from 'rarepress';
import getImages from './getImages.js';

(async () => {
  const rarepress = new Rarepress();
  // await rarepress.init({ network: 'mainnet' });
  
  (await getImages(-1)).forEach((image) => {
    console.log(image);
    // const cid = await rarepress.fs.add()
  })
})();
