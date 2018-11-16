class FileUploader {
  constructor({ parentSelector = "#file-upload" }) {
    this.parentSelector = parentSelector;
    this.inputId = "file-upload-input";
    this.setup();
  }
  setup() {
    const parentEl = document.querySelector(this.parentSelector);
    parentEl.appendChild(this.render());
    const input = document.querySelector(`#${this.inputId}`);
    input.addEventListener("change", this.handleInputChange);
  }
  handleInputChange(e) {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      const fR = new FileReader();
      fR.addEventListener(
        "load",
        function(file, e) {
          debugger;
          const img = new ImageClass({
            url: e.target.result,
            title: file.name,
            author: "me",
            category: "uploaded"
          });
          imageList.addImage(img);
        }.bind(this, file)
      );

      fR.readAsDataURL(file);
    }
  }
  render() {
    let tempParent = document.createElement("div");
    tempParent.innerHTML = `<input type="file" id="${this.inputId}"/>`;
    return tempParent.firstChild;
  }
}
