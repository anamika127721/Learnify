function postBlog() {
    let blogContent = document.getElementById("blogContent").value;
    let blogImage = document.getElementById("blogImage").files[0];
    let blogPosts = document.getElementById("blogPosts");

    if (blogContent.trim() === "") {
        alert("Please write something before posting.");
        return;
    }

    let blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");

    let contentPara = document.createElement("p");
    contentPara.textContent = blogContent;

    blogPost.appendChild(contentPara);

    if (blogImage) {
        let imageElement = document.createElement("img");
        imageElement.src = URL.createObjectURL(blogImage);
        blogPost.appendChild(imageElement);
    }

    // Comment section
    let commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");

    let commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Write a comment...";

    let commentButton = document.createElement("button");
    commentButton.textContent = "Comment";
    commentButton.onclick = function() {
        addComment(blogPost, commentInput.value);
        commentInput.value = "";
    };

    let commentList = document.createElement("div");
    commentList.classList.add("comment-list");

    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentButton);
    commentSection.appendChild(commentList);

    blogPost.appendChild(commentSection);
    blogPosts.prepend(blogPost);

    // Clear input fields
    document.getElementById("blogContent").value = "";
    document.getElementById("blogImage").value = "";
}

function addComment(postElement, commentText) {
    if (commentText.trim() === "") {
        alert("Comment cannot be empty.");
        return;
    }

    let commentList = postElement.querySelector(".comment-list");

    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.textContent = commentText;

    commentList.appendChild(commentDiv);
}