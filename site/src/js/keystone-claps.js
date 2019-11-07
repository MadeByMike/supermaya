import { fetchData } from "./util";
import clapIcon from "../../_includes/partials/icons/clap.svg";

const clapsTarget = window.document.querySelector(`#keystone-claps-form`);

const GET_CLAPS = `
  query GetClaps($path: String!) {
    allPages (where: { path: $path  }) {
      id, 
      claps,
      path
    }
  }`;

const CLAP = `
  mutation Clap($path: String!, $pageTitle: String) {
      clap(path: $path, pageTitle: $pageTitle) {
        id,
        claps
    }
  }`;

const clap = event => {
  event.preventDefault();
  const form = event.target;
  const pageTitle = document.title;
  const { path } = form.elements;
  if (path) {
    fetchData(CLAP, {
      path: path.value,
      pageTitle
    }).then(({ claps }) => {
      updateClaps(claps);
    });
  }
};
const createForm = ({ claps }) => {
  const form = document.createElement("form");
  const path = window.location.pathname;

  form.innerHTML = `
      <input type="hidden" name="path" value="${path}"/>
      <div class="show-some-love">
        <button type="submit" class="clap-button">
          <div class="heart heart-1"></div>
          <div class="heart heart-2"></div>
          <div class="heart heart-3"></div>
          <div class="heart heart-4"></div>
          <div class="heart heart-5"></div>
          ${clapIcon}
          <span id="keystone-claps">${claps || 0}</span>
        </button>
        <p>Show some love!</p>
      </div>
      `;
  form.classList.add("js-clap-form");
  form.addEventListener("submit", clap);
  clapsTarget.appendChild(form);
};

const updateClaps = claps => {
  document.getElementById("keystone-claps").innerHTML = `<span>${claps ||
    0}</span>`;
};

if (clapsTarget) {
  const path = window.location.pathname;
  fetchData(GET_CLAPS, { path }).then(createForm);
}
