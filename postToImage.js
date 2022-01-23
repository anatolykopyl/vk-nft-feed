export default function(post) {
  const photoAttachments = post.attachments.filter((attachment) => {
    return attachment.photo;
  })

  const images = photoAttachments.map((attachment) => 
    attachment.photo.sizes[attachment.photo.sizes.length - 1].url
  );

  return images;
}
