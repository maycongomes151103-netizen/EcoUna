// ============================================
// BANCO DE DADOS DO CHATBOT
// ============================================
const database = {
    // --- PLÁSTICOS ---
    "garrafa": "♻️ Sim! Garrafas PET são recicláveis. Escorra bem o líquido e retire a tampa.",
    "copo": "⚠️ Geralmente não. Copos plásticos (de café) não são recicláveis.",
    "canudo": "❌ Não. Canudos devem ir para o lixo comum.",
    "sacola": "♻️ Sim, se estiver limpa. Sacolas de plástico podem ser recicladas.",
    "embalagem": "♻️ Depende! Se for plástico duro e limpo, sim. Se for isopor, não.",
    "brinquedo": "❌ Não. Brinquedos de plástico geralmente vão para o lixo comum.",
    "plastico": "♻️ Depende. Plástico duro e limpo é reciclável.",
    
    // --- PAPÉIS ---
    "papelão": "♻️ Sim! Caixas de papelão são recicláveis. Dobre bem.",
    "jornal": "♻️ Sim. Jornal é reciclável.",
    "revista": "♻️ Sim, mas as capas brilhantes às vezes complicam.",
    "papel": "♻️ Sim, se estiver limpo. Rasgue envelopes com plástico.",
    "papel higiênico": "❌ Não. Papel sujado vai para o rejeito (lixo comum).",
    "guardanapo": "❌ Não. Guardanapos usados vão para o rejeito.",
    
    // --- VIDROS ---
    "vidro": "♻️ Sim! Garrafas e potes de vidro são recicláveis.",
    "garrafa de vidro": "♻️ Sim! Vidro é 100% reciclável.",
    "copo de vidro": "♻️ Sim. Vidro vai para a coleta seletiva.",
    "espelho": "❌ Não. ESPELHO não é reciclável.",
    "louça": "❌ Não. Pratos e xícaras quebrados vão para o rejeito.",
    
    // --- METAIS ---
    "lata": "♻️ Sim! Latas de refrigerante e sardinha são recicláveis.",
    "alumínio": "♻️ Sim! Alumínio é reciclável.",
    "tampa": "♻️ Sim. Tampas de metal podem ser recicladas.",
    "faca": "♻️ Sim, se for metal. Descarte com cuidado.",
    
    // --- ELETRÔNICOS E PILHAS ---
    "celular": "⚠️ Ponto Verde! Leva a uma loja de eletrônicos ou ecoponto.",
    "pilha": "⚠️ NUNCA no lixo comum! Leve a um Ponto de Coleta de Pilhas.",
    "pilhas": "⚠️ NUNCA no lixo comum! Leve a um Ponto de Coleta de Pilhas.",
    "bateria": "⚠️ PERIGOSO! Descarte em locais especiais.",
    "televisor": "⚠️ Leva a um ecoponto ou ponto de coleta de eletrônicos.",
    
    // --- OUTROS ---
    "óleo": "❌ Não despeje na pia! Leve a um posto de coleta.",
    "pizza": "❌ Não. Restos de comida são orgânicos (para compostagem).",
    "comida": "♻️ Restos de comida são orgânicos. Se puder, faça compostagem!",
    "isopor": "❌ Não! Isopor não é reciclável.",
    "cigarro": "❌ Não. Bitucas vão para o rejeito.",
    "fralda": "❌ Não. Fraldas são rejeitos (lixo comum).",
    
    // --- AJUDA ---
    "ajuda": "🤖 Estas são algumas coisas que posso te dizer:\n♻️ Garrafas, Latas, Papelão (Recicláveis)\n❌ Copos plásticos, Canudos (Não Recicláveis)\n⚠️ Pilhas, Celulares (Pontos Especiais)",
    "menu": "♻️ Garrafa | ♻️ Lata | ♻️ Papelão | ❌ Copo | ⚠️ Pilha",
};

// ============================================
// FUNÇÕES DO CHATBOT
// ============================================
function findResponse(userMessage) {
    const msg = userMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    for (let key in database) {
        if (msg.includes(key)) {
            return database[key];
        }
    }
    
    return "Desculpe, não sei ainda. 🧐\n\nTente perguntar sobre: Garrafa, Lata, Papelão, Copo, Pizza, Pilhas, etc.";
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const messagesContainer = document.getElementById("chatMessages");
    const userMessage = input.value.trim();

    if (userMessage === "") return;

    // Mensagem do usuário
    const userDiv = document.createElement("div");
    userDiv.className = "message user-message";
    userDiv.textContent = userMessage;
    messagesContainer.appendChild(userDiv);

    // Resposta do BOT
    const botResponse = findResponse(userMessage);
    const botDiv = document.createElement("div");
    botDiv.className = "message bot-message";
    botDiv.textContent = botResponse;
    messagesContainer.appendChild(botDiv);

    // Limpa e rola
    input.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Permite enviar com Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// ============================================
// DARK MODE
// ============================================
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const icon = document.querySelector(".theme-toggle i");
    
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// ============================================
// MENU MOBILE
// ============================================
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

// ============================================
// QUIZ
// ============================================
let quizScore = 0;

function answerQuiz(option) {
    const result = document.getElementById("quiz-result");
    
    if (option === 1) {
        result.textContent = "✅ Correto! Garrafa PET vai na lixeira vermelha (plástico).";
        result.className = "correct";
        quizScore++;
    } else {
        result.textContent = "❌ Errado! Tente novamente.";
        result.className = "wrong";
    }
}