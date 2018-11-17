class Carousel {
  constructor({ parentSelector, sourceSelector }) {
    this.parentEl = document.querySelector(parentSelector);
    this.sourceSelector = sourceSelector;
    this.init();
  }

  init() {
    this.getImages();
    this.index = 0;
    this.parentEl.appendChild(this.render());
    this.imgEl = this.parentEl.querySelector(".img img");
    this.radios = Array.from(
      this.parentEl.querySelectorAll('fieldset input[type="radio"]')
    );
    this.radios[this.index].checked = true;
    setInterval(() => {
      this.index++;
      this.imgEl.src = this.images[this.index].src;
      this.radios[this.index].checked = true;
    }, 2000);
  }
  getImages() {
    this.images = Array.from(
      document.querySelectorAll(`${this.sourceSelector} img`)
    );
  }
  preRender(html) {
    const tempParent = document.createElement("div");
    tempParent.innerHTML = html;
    return tempParent.firstChild;
  }
  renderRadios() {
    const html = this.images
      .map(image => {
        return `<input name='img-index' type='radio'/>`;
      })
      .join("");
    return `<fieldset>${html}</fieldset>`;
  }
  render() {
    const html = `<div class='img'><img src='${
      this.images[this.index].src
    }'/>${this.renderRadios()}</div>`;
    return this.preRender(html);
  }
}
