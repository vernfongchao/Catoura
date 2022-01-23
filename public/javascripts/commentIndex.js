console.log('hello froms comments')
/*
We have to pass the answerId to the button and even listeners happen to that one answer
so only one of them opens and not the others

Have a class hidden. If click then remove the class from the element
Then if for submitted then add the class back

*/
document.addEventListener("DOMContentLoaded",(e) =>{

    const addComment = document.querySelectorAll('.open-comment-button');
    addComment.forEach((comment)=>{
    
        comment.addEventListener('click', async(e) => {
            e.preventDefault()
            e.stopPropagation()
            const idNumArr = e.target.id.split('-')
            const idNum = idNumArr[2]
    
            const modal = document.querySelector(`#submit-container-${idNum}`);
            modal.style.display = "block";
    
            console.log("above comment form")
            
            const commentForm = document.querySelector(`.comment-form-${idNum}`)
            console.log("This is the answer Id", idNum)
            commentForm.addEventListener("submit", async(e) =>{
                e.preventDefault()
                e.stopPropagation()
                const commentData = new FormData(commentForm);
                const answerId = commentData.get("answerId")
                const content = commentData.get("content")
                const _csrf = commentData.get("_csrf")
                
                const body = {content, answerId, _csrf}
                console.log("Hello from submit")
                const res = await fetch(`/comments/`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const {comment,message} = await res.json()
                if(data.message === "Success"){
    
                }
            })
        })
    })
    
    const buttons = document.querySelectorAll('.delete-comment-button');
    for(let i = 0; i < buttons.length; i++){
        const button = buttons[i]
        button.addEventListener("click", async(e) => {
            try {
                e.preventDefault()
                const commentId = e.target.id
                const res = await fetch(`/comments/${commentId}/delete`)
                const data = await res.json()
                if(data.message === "Success"){
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
            

            const {userId, comments } = await res.json();

            const commentsHTML = comments.map(
                (comment) => 
                `
                <div class="comment-${comment.id}">
                  <div class="comment-body-${comment.id}">
                    <p class="card-text">${comment.User.userName}</p>
                    <p class="card-text">${comment.content}</p>
                  </div>
                </div>
              `
            );
            // commentUserArr= []
            // const commentsHTML = coments.forEach((comment)=>{
            //     commentUserArr.push(comment.User)
            // })
            
            

            commentContainer.innerHTML = commentsHTML.join("");
            console.log(answerContainer)
            answerContainer.appendChild(commentContainer);
    
            // if(userId === comment.User.id)

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


})
