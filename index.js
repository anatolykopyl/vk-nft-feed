import dotenv from 'dotenv';
dotenv.config();

import Rareterm from 'rareterm.node';
import getImages from './getImages.js';

(async () => {
  const rarepress = new Rareterm();
  await rarepress.init({ host: "https://rinkeby-beta.rarepress.org/v1" });
  
  (await getImages(-1)).forEach(async (image, index) => {
    const cid = await rarepress.fs.add(Buffer.from(image));
    const token = await rarepress.token.create({
      type: "ERC721",
      metadata: {
        name: `${index}`,
        description: `${index}.svg`,
        image: `/ipfs/${cid}`,
      },
    });
    await rarepress.fs.push(cid);
    await rarepress.fs.push(token.uri);
    const sent = await rarepress.token.send(token);
    console.log(`[${index}] published: https://rarible.com/token/${sent.id}`);
  })
})();
