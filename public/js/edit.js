const postId = document.getElementById("post-id").dataset.postId;

const editFormHandler = async (event) => {
  event.preventDefault();

  const titleEl = document.querySelector("#post-title").value;
  const bodyEl = document.querySelector("#post-content").value;

  await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      id: postId,
      title: titleEl,
      content: bodyEl,
    }),
    header: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard");
};

const deleteClickHandler = async () => {
  await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#submit-post-btn")
  .addEventListener("click", editFormHandler);
document
  .querySelector("delete-post-btn")
  .addEventListener("click", deleteClickHandler);
