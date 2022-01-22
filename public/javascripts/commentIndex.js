console.log('hello froms comments')

const buttons = document.querySelectorAll('.delete-comment-button');
for(let i = 0; i < buttons.length; i++){
    const button = buttons[i]
    button.addEventListener("click", async(e) => {
        try {
            e.preventDefault()
            const commentId = e.target.id
            const res = await fetch(`/comments/${commentId}/delete`,
            {
                method: "Delete",
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

