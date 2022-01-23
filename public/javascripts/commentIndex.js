console.log('hello froms comments')

document.addEventListener('DOMContentLoaded', () => {

    const commentsTracker = {}

    const buttons = document.querySelectorAll('.delete-comment-button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        button.addEventListener("click", async (e) => {
            try {
                e.preventDefault()
                const commentId = e.target.id
                const res = await fetch(`/comments/${commentId}/delete`,
                    {
                        method: "Delete",
                    })
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

    async function showComments(e) {
        // const commentContainer = document.createElement(`.comment-container${e.target.id}`)
        if(commentsTracker[e.target.id] === true){
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

        const { comments } = await res.json();

        const commentsHTML = comments.map(
            (comment) => `
            <div class="card">
              <div class="card-body">
                <p class="card-text">${comment.User.userName}</p>
                <p class="card-text">${comment.content}</p>
              </div>
            </div>
          `
        );

        commentContainer.innerHTML = commentsHTML.join("");

        answerContainer.appendChild(commentContainer);

        let id = e.target.id

        if(!commentsTracker[id]){
            commentsTracker[id] = true;
            this.innerHTML = "Hide Comments"
        }

    }

    const commentsButton = document.querySelectorAll('.comments-button')

    for (let i = 0; i < commentsButton.length; i++) {

        commentsButton[i].addEventListener('click', showComments);

    }


    // const cbutton = document.getElementById('button1')

    // cbutton.addEventListener("click", () => {
    //     console.log("HELLOOOOOOOOO")
    // })

})


// what do we need to chang on Heroku for the fetch calls
