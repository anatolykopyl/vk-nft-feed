import getPosts from './getPosts.js';
import post2Svg from './post2Svg.js';

function filterPosts(posts) {
  return posts.filter((post) => {
    let isValid = false;

    if (post.attachments) {
      post.attachments.forEach((attachment) => {
        isValid = isValid || attachment.type === 'photo';
      })
    }
    
    return isValid;
  })
}

async function getAllPosts(owner_id) {
  let finished = false;
  let offset = 0;
  let posts = [];

  while (!finished) {
    const response = await getPosts(owner_id, offset);
    posts = posts.concat(response.items);
    if (posts.length === response.count) {
      finished = true;
    } else {
      offset += response.items.length;
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  return posts;
}

export default async function(owner_id) {
  let posts = await getAllPosts(owner_id);
  posts = filterPosts(posts);

  let images = [];

  posts.forEach((post) => {
    images.push(post2Svg(post));
  })

  return images;
}
