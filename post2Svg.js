function makeSvg(images) {
  const spacing = 50;
  const height = images.length * (900 + spacing) + spacing;

  function imageTag(url, n) {
    const y = 50 + n * (900 + spacing);
    return `<image x="50" y="${y}" width="900" height="900" href="${url}"/>`;
  }

  let imageTags = '';

  images.forEach((image, i) => {
    imageTags += imageTag(image.url, i);
  })

  return `<svg viewBox="0 0 1000 ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  ${imageTags}
</svg>\n`;
}

export default function(post) {
  const photoAttachments = post.attachments.filter((attachment) => {
    return attachment.photo;
  })

  const images = photoAttachments.map((attachment) => {
    return {
      url: attachment.photo.sizes[attachment.photo.sizes.length - 1].url.replaceAll('&', '&amp;'),
    };
  });

  return makeSvg(images);
}
