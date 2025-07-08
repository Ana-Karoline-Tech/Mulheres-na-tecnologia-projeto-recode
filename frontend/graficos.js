// Gráfico 1: Participação Feminina na Tecnologia no Brasil
          const ctx1 = document.getElementById('womenInTechChart').getContext('2d');
          const womenInTechChart = new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: ['Homens', 'Mulheres'],
              datasets: [{
                label: '% de Profissionais de TI',
                data: [80, 20],
                backgroundColor: ['#007bff', '#ff6384'],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          
          // Gráfico 2: Mães Solo abaixo da Linha da Pobreza
          const ctx2 = document.getElementById('singleMomsPovertyChart').getContext('2d');
          const singleMomsPovertyChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
              labels: ['Abaixo da Linha da Pobreza', 'Acima da Linha da Pobreza'],
              datasets: [{
                label: '% de Mães Solo',
                data: [63, 37],
                backgroundColor: ['#ff6384', '#36a2eb'],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
          
          // Gráfico 3: Interesse em Cursos de Tecnologia
          const ctx3 = document.getElementById('interestInTechChart').getContext('2d');
          const interestInTechChart = new Chart(ctx3, {
            type: 'pie',
            data: {
              labels: ['Interessadas', 'Não Interessadas'],
              datasets: [{
                label: '% de Mulheres',
                data: [80, 20],
                backgroundColor: ['#4bc0c0', '#ffcd56'],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });