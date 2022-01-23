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

export default async function(owner_id) {
  let posts = await getPosts(owner_id);
  posts = filterPosts(posts);

  let images = [];

  posts.forEach((post) => {
    images.push(post2Svg(post));
  })

  return images;
}
