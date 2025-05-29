function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

document.getElementById('yearSelect').addEventListener('change', function () {
    const year = this.value;
    const dataDisplay = document.getElementById('dataDisplay');

    if (year) {
        fetch(`http://localhost:3000/dados/${year}`)
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                console.log('Keys of the first data object:', Object.keys(data[0]));


                const table = document.createElement('table');
                const headerRow = document.createElement('tr');


                const headers = ['Município', 'Área (ha)', 'Nome', 'Bacia'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);


                data.forEach(item => {
                    const row = document.createElement('tr');
                    const cells = [item.MUNICIPIO, item.areaHa, item.NOME, item.BACIA];
                    cells.forEach(cellText => {
                        const td = document.createElement('td');
                        td.textContent = cellText !== null ? cellText : 'N/A';
                        row.appendChild(td);
                    });
                    table.appendChild(row);
                });

                dataDisplay.innerHTML = '';
                dataDisplay.appendChild(table);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                dataDisplay.innerHTML = 'Erro ao buscar dados.';
            });
    } else {
        dataDisplay.innerHTML = '';
    }
});

// Função para alterar o fundo do body dependendo da interação
function toggleBackground(removeImage) {
    const body = document.body;

    if (removeImage) {
        body.classList.add('no-image'); // Adiciona a classe para remover a imagem de fundo
    } else {
        body.classList.remove('no-image'); // Remove a classe para exibir a imagem de fundo
    }
}

// Chame essa função ao selecionar ano ou clicar em algum botão
document.getElementById('yearSelect').addEventListener('change', function() {
    toggleBackground(true); // Remove a imagem de fundo ao selecionar o ano
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        toggleBackground(true); // Remove a imagem de fundo ao clicar em algum botão
    });
});

