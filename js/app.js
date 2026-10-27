import { db } from './firebase.js';
import { carregarEstadosBrasilAPI } from './api.js';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const form = document.getElementById('clube-form');
const clubeIdInput = document.getElementById('clube-id');
const nomeInput = document.getElementById('nome');
const estadoSelect = document.getElementById('estado');
const campeonatoInput = document.getElementById('campeonato');
const clubesList = document.getElementById('clubes-list');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

const clubesCollection = collection(db, "clubes");

// --- R (READ) - Ler em Tempo Real do Firestore ---
function listarClubes() {
  onSnapshot(clubesCollection, (snapshot) => {
    clubesList.innerHTML = "";
    
    if (snapshot.empty) {
      clubesList.innerHTML = "<p>Nenhum clube cadastrado ainda.</p>";
      return;
    }

    snapshot.forEach((docSnapshot) => {
      const clube = docSnapshot.data();
      const id = docSnapshot.id;

      const card = document.createElement('div');
      card.className = 'clube-card';
      card.innerHTML = `
        <div>
          <h3>${clube.nome}</h3>
          <p><strong>Estado:</strong> ${clube.estado}</p>
          <p><strong>Campeonato:</strong> ${clube.campeonato}</p>
        </div>
        <div class="actions">
          <button class="btn-edit" onclick="prepararEdicao('${id}', '${clube.nome}', '${clube.estado}', '${clube.campeonato}')">Editar</button>
          <button class="btn-delete" onclick="excluirClube('${id}')">Excluir</button>
        </div>
      `;
      clubesList.appendChild(card);
    });
  });
}

// --- C (CREATE) & U (UPDATE) ---
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = clubeIdInput.value;
  const nome = nomeInput.value;
  const estado = estadoSelect.value;
  const campeonato = campeonatoInput.value;

  try {
    if (id) {
      // Atualizar (UPDATE)
      const clubeRef = doc(db, "clubes", id);
      await updateDoc(clubeRef, { nome, estado, campeonato });
      alert("Clube atualizado com sucesso!");
    } else {
      // Cadastrar (CREATE)
      await addDoc(clubesCollection, { nome, estado, campeonato, criadoEm: new Date() });
      alert("Clube cadastrado com sucesso!");
    }
    resetForm();
  } catch (error) {
    console.error("Erro ao salvar clube:", error);
    alert("Erro ao salvar os dados.");
  }
});

// --- D (DELETE) ---
window.excluirClube = async (id) => {
  if (confirm("Tem certeza que deseja excluir este clube do diretório?")) {
    try {
      await deleteDoc(doc(db, "clubes", id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }
};

// --- Preparar Edição ---
window.prepararEdicao = (id, nome, estado, campeonato) => {
  clubeIdInput.value = id;
  nomeInput.value = nome;
  estadoSelect.value = estado;
  campeonatoInput.value = campeonato;
  
  formTitle.innerText = "Editar Clube";
  btnCancel.style.display = "inline-block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

btnCancel.addEventListener('click', resetForm);

function resetForm() {
  clubeIdInput.value = "";
  form.reset();
  formTitle.innerText = "Cadastrar Novo Clube";
  btnCancel.style.display = "none";
}

// Inicialização do Sistema
carregarEstadosBrasilAPI();
listarClubes();