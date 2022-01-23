import {createSVGWindow} from 'svgdom';
import {SVG, registerWindow} from '@svgdotjs/svg.js';
// import sharp from 'sharp';

function makeSvg(images) {
  const spacing = 50;
  const height = images.length * (900 + spacing) + spacing;

  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);

  const draw = SVG(document.documentElement).width(1000).height(height);
  draw.rect(1000, height).fill('white');
  images.forEach((image, i) => {
    const y = 50 + i * (900 + spacing);
    draw.image(image.url).x(50).y(y).width(900).height(900)
  });

  return draw.svg();
}

// function svgToPng(svg) {
//   return sharp(Buffer.from(svg)).toBuffer();
// }

export default function(post) {
  const photoAttachments = post.attachments.filter((attachment) => {
    return attachment.photo;
  })

  const images = photoAttachments.map((attachment) => {
    return {
      url: attachment.photo.sizes[attachment.photo.sizes.length - 1].url,
    };
  });

  return makeSvg(images);
}
