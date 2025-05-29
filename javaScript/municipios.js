let chartInstance = null; // Variável global para armazenar o gráfico atual

// Alternar entre temas claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Carregar municípios únicos para os selects
async function carregarMunicipios() {
    try {
        const response = await fetch('http://localhost:3000/dados/2000');
        const data = await response.json();

        // Obter municípios únicos
        const municipiosUnicos = [...new Set(data.map(item => item.MUNICIPIO))];

        const municipio1Select = document.getElementById('municipio1');
        const municipio2Select = document.getElementById('municipio2');

        municipiosUnicos.forEach(municipio => {
            const option1 = document.createElement('option');
            option1.value = municipio;
            option1.textContent = municipio;

            const option2 = option1.cloneNode(true);

            municipio1Select.appendChild(option1);
            municipio2Select.appendChild(option2);
        });
    } catch (error) {
        console.error('Erro ao carregar municípios:', error);
    }
}

// Comparar dois municípios com base nos dados de todos os anos
async function compararMunicipios() {
    const municipio1 = document.getElementById('municipio1').value;
    const municipio2 = document.getElementById('municipio2').value;

    if (!municipio1 || !municipio2) {
        alert('Por favor, selecione dois municípios para comparar.');
        return;
    }

    const anos = [2000, 2010, 2022];
    const comparacao = {
        [municipio1]: [],
        [municipio2]: []
    };

    try {
        for (const ano of anos) {
            const response = await fetch(`http://localhost:3000/dados/${ano}`);
            const data = await response.json();

            comparacao[municipio1].push(
                data.find(item => item.MUNICIPIO === municipio1) || { ano, areaHa: 0 }
            );
            comparacao[municipio2].push(
                data.find(item => item.MUNICIPIO === municipio2) || { ano, areaHa: 0 }
            );
        }

        exibirComparacao(comparacao, municipio1, municipio2, anos);
    } catch (error) {
        console.error('Erro ao comparar municípios:', error);
    }
}

// Exibir os dados da comparação
function exibirComparacao(comparacao, municipio1, municipio2, anos) {
    const dataDisplay = document.getElementById('dataDisplay');
    const table = document.createElement('table');

    // Cabeçalho da tabela
    const headerRow = document.createElement('tr');
    const headers = ['Ano', municipio1, municipio2];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Preencher os dados
    anos.forEach((ano, index) => {
        const row = document.createElement('tr');
        const cellAno = document.createElement('td');
        cellAno.textContent = ano;
        row.appendChild(cellAno);

        const cellMunicipio1 = document.createElement('td');
        cellMunicipio1.textContent =
            comparacao[municipio1][index]?.areaHa || 'N/A';
        row.appendChild(cellMunicipio1);

        const cellMunicipio2 = document.createElement('td');
        cellMunicipio2.textContent =
            comparacao[municipio2][index]?.areaHa || 'N/A';
        row.appendChild(cellMunicipio2);

        table.appendChild(row);
    });

    // Atualiza a tabela sem afetar outras partes do DOM
    dataDisplay.innerHTML = '';
    dataDisplay.appendChild(table);

    // Gráfico
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const labels = anos;
    const dataset1 = comparacao[municipio1].map(item => item.areaHa || 0);
    const dataset2 = comparacao[municipio2].map(item => item.areaHa || 0);

    // Destruir o gráfico existente antes de criar um novo
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Criar um novo gráfico
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `Área de ${municipio1} (ha)`,
                    data: dataset1,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Área de ${municipio2} (ha)`,
                    data: dataset2,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Inicializar
carregarMunicipios();

// Adicionar evento ao botão de comparar
document.getElementById('compareButton').addEventListener('click', compararMunicipios);
