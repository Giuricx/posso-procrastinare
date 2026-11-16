const DURATA = 5 * 60; // secondi

const messaggiFine = [
  "Tempo scaduto. Lo sapevi già, vero?",
  "Cinque minuti finiti. Il compito no.",
  "Ancora qui? Il compito ti aspetta, paziente.",
  "A questo punto è un hobby.",
  "Hai procrastinato più di quanto ci volesse a farlo.",
  "Ok, ormai è arte."
];

const risposta = document.getElementById("risposta");
const timer = document.getElementById("timer");
const bottone = document.getElementById("bottone");
const contatore = document.getElementById("contatore");

let intervallo = null;
let giri = 0;

function formatta(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function avvia() {
  clearInterval(intervallo);
  const fine = Date.now() + DURATA * 1000;

  risposta.textContent = giri === 0
    ? "Sì, ma solo 5 minuti."
    : "Va bene, altri 5 minuti. Gli ultimi. Giuro.";
  timer.classList.remove("nascosto");
  bottone.disabled = true;

  intervallo = setInterval(() => {
    const rimasti = Math.max(0, Math.ceil((fine - Date.now()) / 1000));
    timer.textContent = formatta(rimasti);
    document.title = `${formatta(rimasti)} · Posso procrastinare?`;
    if (rimasti === 0) finisci();
  }, 250);
}

function finisci() {
  clearInterval(intervallo);
  risposta.textContent = messaggiFine[Math.min(giri, messaggiFine.length - 1)];
  giri++;
  contatore.textContent = `Minuti procrastinati: ${giri * 5}`;
  contatore.classList.remove("nascosto");
  bottone.textContent = "Posso procrastinare ancora 5 minuti?";
  bottone.disabled = false;
  document.title = "Tempo scaduto · Posso procrastinare?";
}

bottone.addEventListener("click", avvia);