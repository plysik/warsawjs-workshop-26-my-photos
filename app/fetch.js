let allImages = [];
let fetchCallback = null;

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function fetchLocalImages() {
  let images = localData;
  images.map(item => {
    allImages.push(item);

    //! http://placeskull.com/

    // let image = new ImageClass({
    //   url: item.url,
    //   // url: item.url + "/" + randomColor(),
    //   title: item.title,
    //   author: item.author,
    //   dateAdded: new Date(item.published)
    // });
    // imageList.addImage(image);
  });
}

function fetchImages({ tags = ["flowers"], mode = "ALL", callback }) {
  fetchCallback = callback;
  const url = `https://api.flickr.com/services/feeds/photos_public.gne?tagmode=${mode}&tags=${tags.join(
    ","
  )}&format=json`;
  const s = document.createElement("script");
  s.src = url;
  s.type = "text/javascript";
  document.body.appendChild(s);
  document.body.removeChild(s);

  //   const options = {
  //     mode: "no-cors",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/atom+xml; charset=utf-8"
  //     },
  //     credentials: "omit"
  //   };
  //   const response = await fetch(new Request(url, options));

  //   const data = await response.text();
  //   console.log(data);
  //   return data;
}
function jsonFlickrFeed(data) {
  debugger;
  data.items.map(item => {
    let image = new ImageClass({
      url: item.media.m,
      title: item.title,
      author: item.author,
      dateAdded: new Date(item.published)
    });
    imageList.addImage(image);
  });
  fetchCallback();
}
