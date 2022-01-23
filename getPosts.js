import axios from 'axios';
import ProgressBar from 'progress';

 async function getPosts(owner_id, offset) {
  const res = await axios.get('https://api.vk.com/method/wall.get', {
    params: {
      access_token: process.env.SERVICE_KEY,
      owner_id,
      offset: Number(offset),
      count: 100,
      filter: 'owner',
      v: '5.81',
    }
  });

  return res.data.response;
}

export default async function getAllPosts(owner_id) {
  let finished = false;
  let offset = 0;
  let posts = [];
  let bar;

  while (!finished) {
    const response = await getPosts(owner_id, offset);
    const total = response.count;

    if (!bar) {
      bar = new ProgressBar(
        'Getting posts [:bar] :current/:total :percent', 
        { 
          total,
          width: 30,
        }
      );
    }
    bar.tick(response.items.length);

    posts = posts.concat(response.items);
    if (posts.length === total) {
      finished = true;
    } else {
      offset += response.items.length;
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  return posts;
}