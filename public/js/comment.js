const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentEl = document.querySelector("#comment-body").value.trim();

  const postId = document.getElementById("post-id").dataset.postId;

  if (commentEl) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        comment: commentEl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (response.ok) {
    // If successful, redirect the browser to the dashboard page
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

const commentBtn = document.querySelector("#new-comment");
if (commentBtn) {
  commentBtn.addEventListener("submit", commentFormHandler);
}
