console.log('hello froms comments')

// const logInForm = document.querySelector(".log-in-form");

// logInForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = new FormData(logInForm);
//   const email = formData.get("email");
//   const password = formData.get("password");
// const body = { email, password };

// const res = await fetch("http://localhost:8080/users/token", {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });



const addComment = document.querySelector('.open-comment-button');
addComment.addEventListener('click', async(e) => {
    const modal = document.querySelector('.submit-comment-container');
    const modalComment = document.querySelector('.add-comment-button');
    modal.style.display = "block";
    modalComment.style.display = "block"
    const commentForm = document.querySelector(".comment-form")

    const commentData = new FormData(commentForm);

    const content = commentData.get("content")
    const body = {content}

    modalComment.addEventListener("submit", async(e) =>{
        try{
            e.preventDefault
            const res = await fetch(`/comments/answers/:answerId`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
    // if (e.target == modal) {
    //     modal.style.display = "none";
    // }
})
const buttons = document.querySelectorAll('.delete-comment-button');
for(let i = 0; i < buttons.length; i++){
    const button = buttons[i]
    button.addEventListener("submit", async(e) => {
        try {
            e.preventDefault()
            const commentId = e.target.id
            const res = await fetch(`/comments/${commentId}/delete`, {
                method: "DELETE"
            })
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

