document.querySelector('.acidity-strength').style.display = "none";
document.querySelector('.taste-characteristics').style.display = "none";

const wizardNexts = document.querySelectorAll('a');

wizardNexts[0].onclick = () => {
  document.querySelector('.brewing-method').style.display = "none";
  document.querySelector('.acidity-strength').style.display = "initial";
}

wizardNexts[1].onclick = () => {
  document.querySelector('.acidity-strength').style.display = "none";
  document.querySelector('.taste-characteristics').style.display = "initial";
}