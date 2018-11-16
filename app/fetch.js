let allImages = [];
function fetchImages(tags = ["flowers"], mode = "ANY") {
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
  data.items.map(item => {
    let image = new ImageClass({
      url: item.media.m,
      title: item.title,
      author: item.author,
      category: null,
      dateAdded: new Date(item.published)
    });
    imageList.addImage(image);
  });
}
