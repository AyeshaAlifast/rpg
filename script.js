let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 }
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

const locations = [
  {
    name: "town square",
    buttonText: ["Go to store", "Go to cave", "Fight dragon"],
    buttonFunctions: [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "store".'
  },
  {
    name: "store",
    buttonText: [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square"
    ],
    buttonFunctions: [buyHealth, buyWeapon, goTown],
    text: "You are in the store."
  },
  {
    name: "cave",
    buttonText: ["Fight slime", "Fight fanged beast", "Go to town square"],
    buttonFunctions: [fightSlime, fightBeast, goTown],
    text: "You are in the cave. You see some monsters."
  },
  {
    name: "fight",
    buttonText: ["Attack", "Dodge", "Run"],
    buttonFunctions: [attack, dodge, goTown],
    text: "You are fighting a monster."
  }
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button1.onclick = location.buttonFunctions[0];
  button2.onclick = location.buttonFunctions[1];
  button3.onclick = location.buttonFunctions[2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    goldText.innerText = gold;
    health += 10;
    healthText.innerText = health;
    text.innerText = "You bought 10 health.";
  } else {
    text.innerText = "Not enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText = "You bought a " + newWeapon + ".";
      text.innerText += "\nIn your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = "Not enough gold to buy weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let soldWeapon = inventory.shift(); // Removed first item from inventory
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += "\nIn your inventory you have: " + inventory.join(", ");
    button2.innerText = "Buy weapon (30 gold)";
    button2.onclick = buyWeapon;
  } else {
    text.innerText = "You need at least one weapon to sell.";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  const monster = monsters[fighting];
  monsterHealth = monster.health;
  monsterNameText.innerText = monster.name;
  monsterHealthText.innerText = monsterHealth;
  update(locations[3]);
}

function attack() {
  const weapon = weapons[currentWeapon];
  monsterHealth -= weapon.power;
  monsterHealthText.innerText = monsterHealth;

  if (monsterHealth <= 0) {
    text.innerText = "You defeated the " + monsters[fighting].name + "!";
    xp += monsters[fighting].level * 10;
    xpText.innerText = xp;
    fighting = undefined;
    goTown();
  } else {
    text.innerText = "You attack the " + monsters[fighting].name + " for " + weapon.power + " damage.";
  }
}

function dodge() {
  text.innerText = "You dodged the attack!";
  goTown();
}
goTown();