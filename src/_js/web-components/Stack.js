/**
 * @module l-stack
 * @description
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */

export default class Stack extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Stack-${[this.space, this.recursive, this.splitAfter].join(
        ""
      )}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
          <style id="${this.i}">
            [data-i="${this.i}"]${this.recursive ? "" : " >"} * + * {
              margin-top: ${this.space};
            }
  
            ${
              this.splitAfter
                ? `
              [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
                margin-bottom: auto;
              }`
                : ""
            }
          </style>
          `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get recursive() {
    return this.hasAttribute("recursive");
  }

  set recursive(val) {
    return this.setAttribute(val ? "recursive" : "");
  }

  get splitAfter() {
    return this.getAttribute("splitAfter") || null;
  }

  set splitAfter(val) {
    return this.setAttribute("splitAfter", val);
  }

  static get observedAttributes() {
    return ["space", "recursive", "splitAfter"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("l-stack", Stack);
}
