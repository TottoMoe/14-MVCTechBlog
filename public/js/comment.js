const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentEl = document.querySelector("#comment-body").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (commentEl) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        commentEl,
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

document
  .querySelector("#new-comment")
  .addEventListener("submit", commentFormHandler);
