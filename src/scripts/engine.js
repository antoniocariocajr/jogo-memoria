const persons = [
    "capitanMarvel", "capitanMarvel",
    "capitaoAmerica", "capitaoAmerica",
    "homemAranha", "homemAranha",
    "homemDeFerro", "homemDeFerro",
    "hulk", "hulk",
    "logan", "logan",
    "phoenix", "phoenix",
    "thor", "thor"
];
let openCard = [];

// Fisher-Yates Shuffle
for (let i = persons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [persons[i], persons[j]] = [persons[j], persons[i]];
}

for (let i = 0; i < persons.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.classList.add(persons[i]);
    box.dataset.value = persons[i];
    box.onclick = handleClick;

    document.querySelector(".game").appendChild(box);
}
function handleClick() {
    if (openCard.length < 2) {
        this.classList.add("boxOpen")
        openCard.push(this)
    }
    if (openCard.length == 2) {
        setTimeout(checkMatch, 500)
    }
}
function checkMatch() {
    if (openCard[0].dataset.value === openCard[1].dataset.value) {
        openCard[0].classList.add("boxMatch");
        openCard[1].classList.add("boxMatch");
    } else {
        openCard[0].classList.remove("boxOpen");
        openCard[1].classList.remove("boxOpen");
    }
    openCard = [];

    if (document.querySelectorAll(".boxMatch").length === persons.length) {
        alert("Você venceu!");
    }
}

document.getElementById("reset").addEventListener("click", () => {
    window.location.reload();
});