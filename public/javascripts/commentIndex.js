console.log('hello froms comments')
/*
We have to pass the answerId to the button and even listeners happen to that one answer
so only one of them opens and not the others

Have a class hidden. If click then remove the class from the element
Then if for submitted then add the class back

*/
document.addEventListener("DOMContentLoaded", (e) => {



    let commentFormTracker = {}

    let commentFormTracker2 = {}


    const addComment = document.querySelectorAll('.open-comment-button');
    e.preventDefault()
    addComment.forEach((answer) => {
        // answer.addEventListener('click', (e) => {
        //     let state = true
        //     e.stopPropagation()

        answer.addEventListener('click', async (e) => {


            if (!commentFormTracker[e.target.id]) {
                console.log('HELLOOOOOO00OO0O0O0O00O')

                commentFormTracker[e.target.id] = true;

                let state = true
                e.stopPropagation()

                const answerIdString = e.target.id.split('-')
                const answerId = answerIdString[2]

                const modal = document.querySelector(`#submit-container-${answerId}`);
                modal.style.display = "block";



                const commentForm = document.querySelector(`#comment-form-${answerId}`)
                console.log('is this printing twice?=====')

                commentForm.addEventListener("submit", async (e) => {

                    commentFormTracker = {};



                    e.preventDefault()
                    e.stopPropagation()
                    state = false
                    const commentData = new FormData(commentForm);
                    const answerId = commentData.get("answerId")
                    const content = commentData.get("content")
                    const _csrf = commentData.get("_csrf")

                    const body = { content, answerId, _csrf }
                    console.log("Hello from submit")
                    const res = await fetch(`/comments/`, {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    const data = await res.json()
                    if (data.message === "Success") {
                        if (state === false) {
                            state = true
                            const commentContent = document.querySelector(`#comment-content-${answerId}`)
                            console.log(commentContent)
                            commentContent.value = ""
                            console.log("this works")
                            modal.style.display = "none"
                        }
                    }
                })

            }

        })



    })

    const buttons = document.querySelectorAll('.delete-comment-button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        button.addEventListener("click", async (e) => {
            try {
                e.preventDefault()
                const commentId = e.target.id
                const res = await fetch(`/comments/${commentId}/delete`)
                const data = await res.json()
                if (data.message === "Success") {
                    const container = document.querySelector(`#comment-container-${commentId}`)
                    container.remove()
                }
            } catch (e) {
                console.log(e)
            }
        })
    }

    const commentsTracker = {}

    async function showComments(e) {
        e.stopPropagation()
        // const commentContainer = document.createElement(`.comment-container${e.target.id}`)
        if (commentsTracker[e.target.id] === true) {
            const answerContainer = document.querySelector(`.domContainer${e.target.id}`)
            answerContainer.remove();
            commentsTracker[e.target.id] = false;
            this.innerHTML = "Show Comments"
            return;
        }

        const commentContainer = document.createElement("div");

        commentContainer.setAttribute("class", `domContainer${e.target.id}`)

        const answerContainer = document.querySelector(`.answer-container${e.target.id}`)

        const res = await fetch(`/comments/${e.target.id}`);


        const { userId, comments } = await res.json();

        // const commentsHTML = comments.map(
        //     (comment) =>
        //     `
        //     <div class="comment-${comment.id}">
        //       <div class="comment-body-${comment.id}">
        //         <p class="card-text">${comment.User.userName}</p>
        //         <p class="card-text">${comment.content}</p>
        //       </div>
        //     </div>
        //   `
        // );
        let arr = []
        console.log(userId)
        comments.forEach(
            (comment) => {
                if ((comment.User.id === userId) && (userId != null)) {

                    let block = `
                    <div class="comment-${comment.id}">
                      <div class="comment-body-${comment.id}">
                        <p class="card-text">${comment.User.userName}</p>
                        <p class="card-text">${comment.content}</p>
                            <a href='/comments/${comment.id}/delete'></a>
                                <button id="comment-delete-${comment.id}" class="comment-delete-buttons"> Delete Comment
                      </div>
                    </div>
                  `
                    arr.push(block)
                } else {
                    let block = `
                <div class="comment-${comment.id}">
                  <div class="comment-body-${comment.id}">
                    <p class="card-text">${comment.User.userName}</p>
                    <p class="card-text">${comment.content}</p>
                  </div>
                </div>
              `
                    arr.push(block)
                }
            }
        );


        commentContainer.innerHTML = arr.join("");
        console.log(answerContainer)
        answerContainer.appendChild(commentContainer);

        const deleteCommentButton = document.querySelectorAll(".comment-delete-buttons");

        if (deleteCommentButton.length > 0) {
            for (let i = 0; i < deleteCommentButton.length; i++) {

                deleteCommentButton[i].addEventListener('click', async (e) => {
                    const commentIdArr = e.target.id.split('-')
                    const commentId = commentIdArr[2]
                    console.log(`Hello from comment delete: ${commentId}`)
                    const res = await fetch(`/comments/${commentId}/delete`,
                        {
                            method: "delete"
                        });
                    const data = await res.json()
                    if (data.message === "Success") {
                        const commentContainer = document.querySelector(`.comment-${commentId}`)
                        commentContainer.remove()
                    }
                })
            }
        }

        let id = e.target.id

        if (!commentsTracker[id]) {
            commentsTracker[id] = true;
            this.innerHTML = "Hide Comments"
            arr = []
        }

    }

    const commentsButton = document.querySelectorAll('.comments-button')

    for (let i = 0; i < commentsButton.length; i++) {

        commentsButton[i].addEventListener('click', showComments);

    }


})
