import { graphql, getAuthenticatedUser } from "./util";
import bookmarkIcon from "../../_includes/partials/icons/bookmark.svg";
import bookmarkRemoveIcon from "../../_includes/partials/icons/bookmark-remove.svg";

const BOOKMARK = `
mutation Bookmark($path: String!, $pageTitle: String, $user: ID!) {
  addBookmark(path: $path, pageTitle: $pageTitle, user: $user) {
    id,
    bookmarks {
      id,
      path
    }
  }
}`;

const REMOVE_BOOKMARK = `
mutation removeBookmark($user: ID!, $bookmark: ID!){
  updateUser(id: $user, data: { bookmarks: {disconnect:{id: $bookmark}}}) {
    bookmarks {
      id
      path
    }
  }
}
`;
getAuthenticatedUser()
  .then(authenticatedUser => {
    if (authenticatedUser) {
      const createAddRemoveButton = bookmarks => {
        const parent = window.document.querySelector(
          `#keystone-bookmarks-form`
        );
        if (!parent) return;
        const { id } = authenticatedUser;
        const form = document.createElement("form");

        const bookmark = bookmarks
          ? bookmarks.find(({ path }) => path === window.location.pathname)
          : false;

        const isBookmarked = bookmark;
        form.innerHTML = `
      <input type="hidden" name="user" value="${id}"/>
      ${
        isBookmarked
          ? `<input type="hidden" name="bookmark" value="${bookmark.id}"/>`
          : ""
      }
      <div class="l-bookmark-button">
        <button type="submit" class="bookmark-button">
          ${isBookmarked ? bookmarkRemoveIcon : bookmarkIcon}
        </button>
        <p>${
          isBookmarked ? "Remove from reading list" : "Add to reading list"
        }</p>
      </div>
      `;
        form.classList.add("js-bookmark-form");
        const event = isBookmarked ? removeBookmark : addBookmark;
        form.addEventListener("submit", event);
        parent.appendChild(form);
      };

      const createBookmarkList = bookmarks => {
        const parent = window.document.querySelector(
          `#keystone-bookmarks-list`
        );
        if (!parent) return;

        if (bookmarks && bookmarks.length) {
          parent.innerHTML = `
        <section class="l-container">
         <div class="l-stack">
          <h2 class="h3">Your reading list</h2>
            <ul>
            ${bookmarks.map(bookmark => {
              return `<li><a href="${bookmark.path}">${bookmark.name}</a></li>`;
            })}
            </ul>
          </div>
        </section>
        `;
        }
      };

      const addBookmark = event => {
        event.preventDefault();
        const form = event.target;
        const { user } = form.elements;
        graphql(BOOKMARK, {
          path: window.location.pathname,
          pageTitle: document.title,
          user: user.value
        }).then(({ data: { addBookmark: { bookmarks } } }) => {
          window.document.querySelector(`#keystone-bookmarks-form`).innerHTML =
            "";
          createAddRemoveButton(bookmarks);
        });
      };

      const removeBookmark = event => {
        event.preventDefault();
        const form = event.target;
        const { user, bookmark } = form.elements;
        graphql(REMOVE_BOOKMARK, {
          bookmark: bookmark.value,
          user: user.value
        }).then(({ data: { updateUser: { bookmarks } } }) => {
          window.document.querySelector(`#keystone-bookmarks-form`).innerHTML =
            "";
          createAddRemoveButton(bookmarks);
        });
      };

      if (authenticatedUser) {
        let { bookmarks } = authenticatedUser;

        createAddRemoveButton(bookmarks);
        createBookmarkList(bookmarks);
      }
    }
  })
  .catch(e => {
    console.log(e);
  });
