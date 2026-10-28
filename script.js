document.addEventListener('DOMContentLoaded', () => {
    const countries = document.querySelectorAll('.country');
    const continents = document.querySelectorAll('.continent');

    // Adiciona os eventos para cada país (itens arrastáveis)
    countries.forEach(country => {
        country.addEventListener('dragstart', dragStart);
        country.addEventListener('dragend', dragEnd);
    });

    // Adiciona os eventos para cada continente (zonas de soltura)
    continents.forEach(continent => {
        continent.addEventListener('dragover', dragOver);
        continent.addEventListener('dragenter', dragEnter);
        continent.addEventListener('dragleave', dragLeave);
        continent.addEventListener('drop', dragDrop);
    });

    let draggedItem = null;

    function dragStart(e) {
        draggedItem = this;
        // Armazena o ID do elemento arrastado
        e.dataTransfer.setData('text/plain', this.id);
        setTimeout(() => this.classList.add('dragging'), 0);
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault(); // Necessário para permitir a soltura
    }

    function dragEnter(e) {
        e.preventDefault();
        // Pequeno feedback visual ao entrar na zona
        this.style.transform = "scale(1.05)";
    }

    function dragLeave() {
        this.style.transform = "scale(1)";
    }

    function dragDrop(e) {
        e.preventDefault();
        this.style.transform = "scale(1)";
        
        // Verifica se a zona onde o item caiu é válida (se não tem a classe continent, procura no pai)
        const dropZone = this.closest('.continent');
        if (!dropZone) return;

        // Recupera o continente correto do país arrastado e o continente da zona alvo
        const countryContinent = draggedItem.dataset.continent;
        const targetContinent = dropZone.dataset.continent;

        if (countryContinent === targetContinent) {
            // Acerto: Anexa o país ao continente e aplica a classe CSS de sucesso (verde)
            dropZone.appendChild(draggedItem);
            dropZone.classList.add('correct');
            dropZone.classList.remove('error');
            
            // Remove o atributo arrastável para não ser movido novamente (opcional)
            draggedItem.setAttribute('draggable', 'false');
            draggedItem.style.cursor = 'default';
        } else {
            // Erro: Aplica a classe CSS de erro (vermelho) temporariamente
            dropZone.classList.add('error');
            
            setTimeout(() => {
                dropZone.classList.remove('error');
            }, 1000); // Remove o vermelho após 1 segundo
        }
    }
});