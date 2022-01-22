
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-button-post');
    deleteButton.addEventListener('click', (e) => {
        const modal = document.querySelector('.confirm-modal');
        modal.style.display = "block";
        // if (e.target == modal) {
        //     modal.style.display = "none";
        // }
        // e.stopPropagation();
        return
    })
})
