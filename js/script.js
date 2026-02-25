document.addEventListener("DOMContentLoaded", function(){

    // ===== MENU HAMBURGUER =====
    window.toggleMenu = function(){
        document.getElementById("sidebar").classList.toggle("active");
    };

    // ===== DROPDOWN DAS MATÉRIAS =====
    document.querySelectorAll(".menu-title").forEach(title=>{
        title.addEventListener("click", ()=>{
            title.parentElement.classList.toggle("active");
        });
    });

    // ===== SISTEMA DE PROGRESSO =====
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    function updateProgress(materia){
        const items = document.querySelectorAll(`input[data-materia='${materia}']`);
        const checked = document.querySelectorAll(`input[data-materia='${materia}']:checked`);
        const percent = (checked.length / items.length) * 100;

        const progressBar = document.getElementById(`progress-${materia}`);
        if(progressBar){
            progressBar.style.width = percent + "%";
        }

        localStorage.setItem("progress-"+materia, JSON.stringify(
            Array.from(items).map(i=>i.checked)
        ));
    }

    checkboxes.forEach((checkbox)=>{
        const materia = checkbox.dataset.materia;

        checkbox.addEventListener("change", ()=>{
            updateProgress(materia);
        });

        // Carregar estado salvo
        const saved = localStorage.getItem("progress-"+materia);
        if(saved){
            const states = JSON.parse(saved);
            document.querySelectorAll(`input[data-materia='${materia}']`)
            .forEach((box,i)=>{
                box.checked = states[i];
            });
            updateProgress(materia);
        }
    });

});