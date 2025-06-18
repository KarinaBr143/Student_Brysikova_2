document.addEventListener('DOMContentLoaded', function() { 
    const solutionButtons = document.querySelectorAll('.btn');
    // загрузка актимельки 
            
    solutionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const solutionContainer = this.closest('.task-card').querySelector('.cont-ans'); //внутри родительского ищется, ответы на задчи 
        solutionContainer.classList.toggle('active'); //само отображение 
        this.classList.toggle('active'); //измена стиля кнопки 
        });
    });
});