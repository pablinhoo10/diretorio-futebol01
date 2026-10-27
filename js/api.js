export async function carregarEstadosBrasilAPI() {
  const selectEstado = document.getElementById('estado');
  try {
    console.log("Iniciando requisição para a BrasilAPI...");
    const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1');
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const estados = await response.json();
    console.log("Dados recebidos da BrasilAPI:", estados);

    // Ordenar estados alfabeticamente pela sigla
    estados.sort((a, b) => a.sigla.localeCompare(b.sigla));

    selectEstado.innerHTML = '<option value="">Selecione um Estado</option>';
    estados.forEach(uf => {
      const option = document.createElement('option');
      option.value = uf.sigla;
      option.textContent = `${uf.nome} (${uf.sigla})`;
      selectEstado.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar estados:", error);
    selectEstado.innerHTML = '<option value="">Erro ao carregar estados</option>';
  }
}