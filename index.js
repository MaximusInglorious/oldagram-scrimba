const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "assets/avatar-vangogh.jpg",
        post: "assets/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        isLiked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "assets/avatar-courbet.jpg",
        post: "assets/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        isLiked: false
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "assets/avatar-ducreux.jpg",
        post: "assets/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        isLiked: false
    }
]

let postsContainerEl = document.getElementById("posts-container");
let btnLike = document.getElementById("btn-like");

postsContainerEl.addEventListener("click", handleLikeBtnClick);
postsContainerEl.addEventListener("dblclick", handleImageDblClick);

renderPosts();

function renderPosts() {
    let postItems = "";
    for (let i = 0; i < posts.length; i++) {
        postItems += `
          <div class="post-item" id="${i}">
            <div class="post-header">
              <img class="avatar-img" src="${posts[i].avatar}" alt="poster's avatar"/>
              <div>
                <b><p>${posts[i].name}</p></b>
                <p class="user-location">${posts[i].location}</p>
              </div>
            </div>
            <div class="post-img">
              <img src="${posts[i].post}" alt="image posted"/>
              <div class="overlay">
                <img src="./assets/filled-heart-big.png" alt="liked heart symbol"/>
              </div>
            </div>
            <div class="post-body">
              <div class="post-buttons">
                <button class="post-button like-button"><img src="./assets/icon-heart.png" alt="like button"></button>
                <button class="post-button"><img src="./assets/icon-comment.png" alt="comment button"></button>
                <button class="post-button"><img src="./assets/icon-dm.png" alt="share button"/></button>
              </div>
              <p class="like-count">${posts[i].likes} likes</p>
              <p class="comment"><b>${posts[i].username}</b> ${posts[i].comment}</p>
            </div>
          </div>
        `;
    }

    postsContainerEl.innerHTML = postItems;
}

function handleLikeBtnClick(event) {
    // get the like button 
    // in-case the click was triggered from an element within the button (such as the heart-icon image), this gets the closest enclosing parent button element
    // works even if the click was triggered by the button itself, since the check (for closest element) begins from the event.target element itself
    const btnLike = event.target.closest(".like-button");
    // check if click was triggered by our like button (or it's children)
    // i.e. if not, then btnLike would be null since there would be no element matching the .like-button class
    if (btnLike !== null) {
        incrementLikeCount(event.target);
    }
}

function handleImageDblClick(event) {
    // get the post element
    // in-case the click was triggered from a double-click on image
    const postImgEl = event.target.closest(".post-img");
    // check if click was triggered by our .post-img dblclick (or it's children)
    // i.e. if not, then postImgEl would be null since there would be no element matching the .post-img class
    if (postImgEl !== null) {
        incrementLikeCount(event.target, true);
    }
}

function incrementLikeCount(clickedEl, forced=false) {
    // find which post the like belongs to
    const postItemEl = clickedEl.closest(".post-item");
    // get the like button of the post (will need it to update button state)
    const btnLike = postItemEl.querySelector(".like-button");
    // get the id of the post
    const postId = postItemEl.id;
    // get the isLiked attribute from the object with index corresponding to the postId
    const isLiked = posts[Number(postId)].isLiked;

    // if post is liked (already)...
    if (isLiked && !forced) {
        // decrement likes by 1
        --posts[Number(postId)].likes;
        // update liked status
        posts[Number(postId)].isLiked = false;
        // update like button ui state
        btnLike.firstElementChild.src = "./assets/icon-heart.png";

        // if post is not liked (already)...
    } else {
        if (!isLiked) {
            // increment likes by 1
            ++posts[Number(postId)].likes;
            // update liked status
            posts[Number(postId)].isLiked = true;
            // update like button ui state
            btnLike.firstElementChild.src = "./assets/filled-heart.png";
        }
        // update overlay opacity
        const overlayEl = postItemEl.querySelector(".overlay");
        overlayEl.classList.add("is-visible");
        setTimeout(() => {
            overlayEl.classList.remove("is-visible");
        }, 500);
    }

    // get the updated likes attribute from the object with index corresponding to the postId
    const updatedLikes = posts[Number(postId)].likes;
    // find the like-count element of the post
    const likeCountEl = postItemEl.querySelector(".like-count");
    // update the element with the new likes count
    likeCountEl.textContent = updatedLikes + " likes";
}