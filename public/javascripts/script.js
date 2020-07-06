document.querySelector('.acidity-strength').style.display = "none";
document.querySelector('.taste-characteristics').style.display = "none";


const wizzardButtons = document.querySelectorAll('button');

wizzardButtons[0].onclick = function() {
  document.querySelector('.brewing-method').style.display = "none";
  document.querySelector('.acidity-strength').style.display = "inherit";
}

wizzardButtons[1].onclick = function() {
  document.querySelector('.acidity-strength').style.display = "none";
  document.querySelector('.taste-characteristics').style.display = "inherit";
}