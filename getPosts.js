import axios from 'axios';

export default async function(owner_id, offset) {
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