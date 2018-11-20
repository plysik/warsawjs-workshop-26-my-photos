const imageList = new ImageList();
const form = new FileForm({ parentSelector: "#new-file-form" });
let carousel = null;
// fetchLocalImages();
// fetchImages({
//   tags: ["nature forest"],
//
// });
fetchImages({
  tags: ["nature forest"],
  callback: () => {
    carousel = new Carousel({
      sourceSelector: ".images-list",
      parentSelector: ".carousel"
    });
  }
});
