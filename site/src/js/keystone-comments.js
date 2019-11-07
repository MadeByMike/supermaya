import { fetchData, validateInputs } from "./util";
import snarkdown from "snarkdown";

const GET_COMMENTS = `
query Comments ($path: String!) {
  allComments (where: {page: { path: $path } }) {
    id, 
    name, 
    body, 
    date
  }
}
`;

const ADD_COMMENT = `
  mutation AddComment($path: String!, $pageTitle: String, $comment: CommentCreateInput!) {
    addComment(path:$path, pageTitle: $pageTitle, comment: $comment ){
      comments {
        id
        name
        body
        date
      }
    }
  }`;
const addComment = event => {
  event.preventDefault();
  const form = event.target;
  const pageTitle = document.title;
  const { path, name, body, email } = form.elements;
  if (validateInputs([path, name, body, email])) {
    fetchData(ADD_COMMENT, {
      path: path.value,
      pageTitle,
      comment: { body: body.value, name: name.value, email: email.value }
    })
      .then(data => {
        alert("Thank you, all comments are moderated before publishing.");
        form.reset();
        return data;
      })
      .then(updateComments)
      .catch(e => {
        alert("Sorry, there was an error sending this comment.");
      });
  } else {
    alert("All fields are required");
  }
};

const createForm = () => {
  const path = window.location.pathname;
  const form = document.createElement("form");
  form.innerHTML = `
      <h3>Join the discussion</h3>
      <input type="hidden" name="path" value="${path}"/>
      <div class="l-form-row">
        <label>Name</label>
        <input type="text" name="name" class="input" />
      </div>
      <div class="l-form-row">
        <label>Email</label>
        <input type="text" name="email" class="input"/>
      </div>
      <div class="l-form-row">
        <label>Comment</label>
        <textarea name="body" class="textarea"></textarea>
      </div>
      <div class="l-form-row">
      <button type="submit" class="button">
        Share opinion
      </button>
      </div>
      `;
  form.classList.add("js-keystone-comment-form");
  form.addEventListener("submit", addComment);
  window.document.querySelector(`#keystone-comments-form`).appendChild(form);
};

const updateComments = ({ comments }) => {
  const renderComments = () => {
    if (comments) {
      return `<ul class="keystone-comments">${comments
        .map(comment => {
          return `
          <li class="keystone-comment">
            <div class="l-stack">
              <div class="l-comment-name">
                <img src="https://api.adorable.io/avatars/64/${
                  comment.name
                }.png">
                <div class="l-comment-meta">
                  <span>${comment.name}</span>
                  <span class="comment-date">${new Date(
                    comment.date
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</span>
                </div>
              </div>
              <div class="l-stack">${snarkdown(comment.body)}</div>
            </div>
          </li>`;
        })
        .join("\n")}</ul>`;
    }
    return "";
  };

  document.getElementById("keystone-comments").innerHTML = `
  <h2>Comments</h2>
  ${renderComments()}`;
};

const path = window.location.pathname;
fetchData(GET_COMMENTS, { path })
  .then(updateComments)
  .then(createForm);
