export async function carregarEstadosBrasilAPI() {
  const selectEstado = document.getElementById('estado');
  try {
    console.log("Buscando estados na API oficial do IBGE...");
    
    // API oficial do IBGE (100% gratuita, pública e sem bloqueio de CORS)
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const estados = await response.json();
    console.log("Estados recebidos com sucesso:", estados);

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
    console.error("Erro detalhado ao carregar estados:", error);
    selectEstado.innerHTML = '<option value="">Erro ao carregar estados</option>';
  }
}