class FileForm {
  constructor({ parentSelector, image = {} } = {}) {
    this.parentSelector = parentSelector;
    this.image = image;
    this.formId = "file-edit-form";
    this.setup();
  }

  setup() {
    const parentEl = document.querySelector(this.parentSelector);
    parentEl.appendChild(this.render());
    this.bindEvents();
  }
  render() {
    let tempParent = document.createElement("div");
    const html = `<form id=${this.formId} class='form'>
        <label for="title">Tytuł</label>
        <input id='title' name='title' type='text' value='${this.image.title ||
          ""}'/>
        <label for="author">Autor</label>
        <input id='author' name='author' type='text' value='${this.image
          .author || ""}'/>
        <label for="category">Kategoria</label>
        <input id='category' name='category' type='text' value='${this.image
          .category || ""}'/>
        <label for="description">Opis</label>
        <textarea id='description' name='description' type='text'>${this.image
          .description || ""}</textarea>
        <label for="image">Obraz</label>
        <input type="file" name="image" id="image-upload-input"/>
        <button type='submit'>
            Zapisz
        </button>
    </form>`;
    tempParent.innerHTML = html;
    return tempParent.firstChild;
  }
  bindEvents() {
    document.querySelector(`#${this.formId}`).addEventListener("submit", e => {
      e.preventDefault();
      let data = new FormData(e.target);
      const fR = new FileReader();
      fR.addEventListener(
        "load",
        function(data, e) {
          const image = new ImageClass({
            url: e.target.result,
            author: data.get("author"),
            title: data.get("title"),
            description: data.get("description"),
            category: data.get("category") || "uploaded"
          });
          let index = imageList.images.indexOf(image);
          if (index === -1) imageList.addImage(image);
          else imageList.updateImage(index, image);
        }.bind(this, data)
      );

      fR.readAsDataURL(data.get("image"));
    });
  }
}
