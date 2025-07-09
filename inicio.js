const images = [
  "imgs/quixada-1.jpg",
  "imgs/quixada-2.jpg",
  "imgs/quixada-3.jpg",
  "imgs/quixada-4.jpg"
];
let index = 0;
const hero = document.getElementById("hero"); 
function changeBackground() {
  console.log(`Mudando para a imagem: ${images[index]}`); // Para depuração
  hero.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}
changeBackground(); // primeira imagem
setInterval(changeBackground, 5000); 