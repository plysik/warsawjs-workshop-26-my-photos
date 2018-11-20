class ImageClass {
  constructor({
    url,
    title,
    author,
    dateAdded = new Date(),
    isFavourite = false
  } = {}) {
    this.url = url;
    this.title = title;
    this.author = author;
    this.dateAdded = dateAdded;
    this.isFavourite = isFavourite;
  }
  get imageTag() {
    return `<img src=${this.url} alt=${this.title}/>`;
  }
  get created() {
    let created = this.author;
    if (this.dateAdded) created += `, ${this.formattedDate}`;
    return created;
  }
  get formattedDate() {
    let d = this.dateAdded;
    return `${d.getDate()}/${d.getMonth() +
      1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }
  addToFavourite() {
    this.isFavourite = true;
  }
  removeFromFavourite() {
    this.isFavourite = false;
  }
  render(index = 0) {
    let tempParent = document.createElement("div");
    tempParent.innerHTML = `<li id='image-${index}' class='image${
      this.isFavourite ? "image--fav" : ""
    }'>      
      ${this.imageTag}
      <div class="title">${this.title}</div>
      <div class="created">${this.created}</div>
      </li>`;
    return tempParent.firstChild;
  }

  //tutaj lighbox jest wbudowany w klase ImageClass. Powinno być w odzielnej klasie.
  bindClick(index = 0) {
    document
      .querySelector(`#image-${index} img`)
      .addEventListener("click", e => {
        const zoomEl = document.querySelector(".lightbox");
        const { src } = e.target;
        const imgEl = document.createElement("img");
        imgEl.src = src;
        zoomEl.innerHTML = "";
        zoomEl.appendChild(imgEl);
      });
  }
}

class ImageList {
  constructor({ images = [] } = {}) {
    this.images = images;
    this.parentEl = document.querySelector(".images-list");
    this.filtered = false;
    this.filteredImages = null;
  }
  addImage(image) {
    if (!image instanceof ImageClass)
      throw new Error("image has to be an instance of ImageClass class");
    this.images.unshift(image);
    this.reRender();
  }
  updateImage(index, image) {
    this.images[index] = image;
    this.reRender();
  }
  removeImage(index) {
    this.images.splice(index, 1);
    this.reRender();
  }
  //nie uzywane - przygotowane do sortowania - bardzo uniwersalne
  sort(sortBy) {
    this.images.sort((a, b) => sortBy(a).localeCompare(sortBy(b)));
    this.reRender();
  }
  // cała klasa jest przygotowana do wyswietlania przefiltrowanych obrazow.
  // jednak filtrowanie nigdzie nie jest wywolane. 
  // dobre podstawy do dokonczenia tej funkcjonalności.
  filter(predicate = image => image) {
    this.filtered = true;
    this.filteredImages = this.images.filter(image => predicate(image));
  }

  clearFilter() {
    this.filtered = false;
    this.filteredImages = null;
    this.reRender();
  }

  reRender() {
    this.parentEl.innerHTML = "";
    this.render();
  }
  render() {
    const images = this.filtered ? this.filteredImages : this.images;
    for (let index in images) {
      this.parentEl.appendChild(images[index].render(index));
      images[index].bindClick(index);
    }
  }
}
