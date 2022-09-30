const editFormHandler = async function (event) {
  event.preventDefault();
  const postId = document.querySelector('input[name="post-id"]').value;
  console.log("postId", postId);
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-body"]').value;
  console.log("title and content", title, content);

  await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("after title and content", title, content);
  document.location.replace("/dashboard");
};

const deleteClickHandler = async () => {
  const postId = document.querySelector('input[name="post-id"]').value;
  console.log("postId", postId);
  await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-btn")
  .addEventListener("click", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
