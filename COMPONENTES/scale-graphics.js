const scaleIconTemplate = document.createElement("template");

scaleIconTemplate.innerHTML = /* html */ `
 
class ScaleGraphics extends HTMLElement {

  static get observedAttributes() {
    return ["type"];
  }

  set type(value) {
    this._type = value;
  }

  get type() {
    return this._type;
  }

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(scaleIconTemplate.content.cloneNode(true));

    this.buttonElement = this.shadowRoot.querySelector("a");
    this.increase = this.shadowRoot.getElementById("increase");
    this.decrease = this.shadowRoot.getElementById("decrease");

    this.buttonElement.addEventListener("click", this.handleClick);
  }

  connectedCallback() {
    if (this.type === "up") {
      this.increase.classList.remove("hidden");
    } else {
      this.decrease.classList.remove("hidden")
    }
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("scaleGraphics", { detail: this.type }));
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "type") {
      this.type = newValue;
    }
  }
}

customElements.define("scale-graphics", ScaleGraphics);
