
const questions = [
    { q: "¿Qué es una onda?", a: ["Una perturbación que transfiere energía", "Una partícula en movimiento", "Una masa de aire caliente"], c: 0 },
    { q: "¿Qué tipo de ondas pueden viajar en el vacío?", a: ["Ondas mecánicas", "Ondas electromagnéticas", "Ondas sonoras"], c: 1 },
    { q: "¿Qué tipo de onda es el sonido?", a: ["Electromagnética transversal", "Mecánica longitudinal", "Electromagnética longitudinal"], c: 1 },
    { q: "¿Qué fenómeno ocurre cuando una onda 'rebota' en una superficie?", a: ["Difracción", "Reflexión", "Refracción"], c: 1 },
    { q: "¿Qué fenómeno describe el cambio de dirección de una onda al cambiar de medio?", a: ["Difracción", "Reflexión", "Refracción"], c: 2 },
    { q: "¿Qué fenómeno permite que el sonido rodee obstáculos?", a: ["Refracción", "Absorción", "Difracción"], c: 2 },
    { q: "¿Qué tipo de medio necesitan las ondas mecánicas para propagarse?", a: ["Vacío", "Cualquiera", "Un medio físico (sólido, líquido o gas)"], c: 2 },
    { q: "¿Por qué escuchamos un eco en una montaña?", a: ["Por absorción del sonido", "Por difracción", "Por reflexión del sonido en una superficie lejana"], c: 2 },
    { q: "¿Qué condición se necesita para que el cerebro perciba un eco?", a: ["El sonido debe ser fuerte", "Debe pasar al menos 0.1 segundos entre los sonidos", "El aire debe estar frío"], c: 1 },
    { q: "¿Qué causa la refracción del sonido?", a: ["El cambio en la temperatura del medio", "La dureza del material", "La distancia del emisor"], c: 0 },
    { q: "¿Qué ocurre con la velocidad del sonido en aire caliente?", a: ["Disminuye", "Se mantiene igual", "Aumenta"], c: 2 },
    { q: "¿Cómo afecta una noche fría la propagación del sonido?", a: ["El sonido viaja más lento y recto", "El sonido se curva hacia abajo y se escucha más lejos", "El sonido se detiene"], c: 1 },
    { q: "¿Qué propiedad tiene la onda que le permite rodear esquinas?", a: ["Frecuencia baja", "Longitud de onda grande", "Amplitud pequeña"], c: 1 },
    { q: "¿Por qué podemos escuchar a alguien detrás de una puerta?", a: ["Por reverberación", "Por refracción", "Por difracción del sonido"], c: 2 },
    { q: "¿Qué ocurre cuando el sonido se refleja muchas veces en un espacio cerrado?", a: ["Eco", "Silencio", "Reverberación"], c: 2 },
    { q: "¿Qué diferencia al eco de la reverberación?", a: ["El eco ocurre en interiores y la reverberación en exteriores", "El eco es una única reflexión; la reverberación son muchas muy rápidas", "Ambos son lo mismo"], c: 1 },
    { q: "¿Qué tipo de lugar necesita un buen equilibrio entre reflexión y absorción sonora?", a: ["Estudio de grabación", "Sala de conciertos", "Calle transitada"], c: 1 },
    { q: "¿Qué se busca en la acústica de un aula?", a: ["Mucha reverberación", "Sonido seco", "Reducir la reverberación para mejorar la comprensión del habla"], c: 2 },
    { q: "¿Qué material se puede usar para mejorar la acústica de un espacio?", a: ["Vidrio", "Paneles acústicos", "Metal"], c: 1 },
    { q: "¿Qué significa que una onda se propaga sin transportar materia?", a: ["La materia se mueve con la onda", "Solo transfiere energía a través del medio", "La onda solo existe en el vacío"], c: 1 },
    { q: "¿Qué forma tienen las ondas sonoras?", a: ["Transversales", "Longitudinales", "Circulares"], c: 1 },
    { q: "¿Cómo afecta la densidad del medio a la velocidad del sonido?", a: ["No la afecta", "A mayor densidad, menor velocidad", "A mayor densidad, mayor velocidad"], c: 2 },
    { q: "¿Qué pasa cuando una onda sonora pasa de aire a agua?", a: ["Se refleja completamente", "Se refracta, cambiando de dirección y velocidad", "Desaparece"], c: 1 },
    { q: "¿Qué explica que el sonido se escuche en toda una habitación?", a: ["Reflexión", "Difracción", "Refracción"], c: 1 },
    { q: "¿Qué se busca evitar en un estudio de grabación?", a: ["Reverberación", "Silencio", "Difracción"], c: 0 }
];


let currentPlayer = 0;
let numPlayers = 1;
let positions = [];
let scores = [];

function startGame() {
    numPlayers = parseInt(document.getElementById('players').value);
    positions = Array(numPlayers).fill(0);
    scores = Array(numPlayers).fill(0);
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    createBoard();
    updateBoard();
    updateScoreboard();
}

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.textContent = i + 1;
        board.appendChild(cell);
    }
}

function updateBoard() {
    document.querySelectorAll('.piece').forEach(p => p.remove());
    positions.forEach((pos, index) => {
        const piece = document.createElement('div');
        piece.className = `piece player-${index + 1}`;
        const cell = document.getElementById(`cell-${pos}`);
        if (cell) cell.appendChild(piece);
    });
}

function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';
    scores.forEach((score, i) => {
        const span = document.createElement('span');
        span.textContent = `Jugador ${i + 1}: ${score} pts`;
        scoreboard.appendChild(span);
    });
}

function rollDice() {
    const roll = Math.floor(Math.random() * 3) + 1;
    const dice = document.getElementById('dice');
    dice.textContent = roll;
    setTimeout(() => movePlayer(roll), 500);
}

function movePlayer(steps) {
    positions[currentPlayer] = Math.min(positions[currentPlayer] + steps, 24);
    updateBoard();
    askQuestion();
}

function askQuestion() {
    const q = questions[Math.floor(Math.random() * questions.length)];
    const box = document.getElementById('question-box');
    document.getElementById('question-text').textContent = q.q;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    q.a.forEach((ans, idx) => {
        const div = document.createElement('div');
        div.className = 'answer';
        div.textContent = ans;
        div.onclick = () => {
            if (idx === q.c) {
                div.classList.add('correct');
                scores[currentPlayer]++;
            } else {
                div.classList.add('incorrect');
                answersDiv.children[q.c].classList.add('correct');
            }
            updateScoreboard();
            setTimeout(() => {
                box.classList.add('hidden');
                currentPlayer = (currentPlayer + 1) % numPlayers;
            }, 5000);
        };
        answersDiv.appendChild(div);
    });
    box.classList.remove('hidden');
}
function goToStart() {
    // Oculta todas las pantallas activas
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('question-box').classList.add('hidden');

    // Muestra la pantalla de inicio
    document.getElementById('start-screen').classList.remove('hidden');

    // Limpia el tablero y los datos
    document.getElementById('board').innerHTML = '';
    document.getElementById('scoreboard').innerHTML = '';
    document.getElementById('dice').textContent = '🎲';

    // Reinicia variables (opcional)
    currentPlayer = 0;
    positions = [];
    scores = [];
}
