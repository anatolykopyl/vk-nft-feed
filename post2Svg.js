function makeSvg(image) { 
  image = image.replaceAll('&', '&amp;')

  return `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  <image x="50" y="50" width="900" height="900" href="${image}"/>
</svg>`;
}

export default function(post) {
  return makeSvg(post.attachments[0].photo.sizes[0].url)
}