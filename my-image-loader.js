// my-image-loader.js
export default function myImageLoader({ src, width, quality }) {
  // 在这里你可以根据需要返回图片的URL，对于GitHub Pages，通常直接返回原图路径
  // 如果你的图片存放在public目录，这通常是可行的
  return `${src}?w=${width}&q=${quality || 75}`;
}
