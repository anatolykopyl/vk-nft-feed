import getPosts from './getPosts.js';
import postToImage from './postToImage.js';

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

  for (const post of posts) {
    images.push(...postToImage(post));
  }

  return images;
}
