let xp=0;
let health=100;
let gold50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3"); 

const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterName=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealthText");

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function goStore(){
  button1.innerText="Buy 1 health (10 gold)";
  button2.innerText="Buy weapon (30 gold)";
  button3.innerText="Go back";
  button1.onclick=buyHealth;
  button2.onclick=buyWeapon;
  button3.onclick=goTown;
  text.innerText="You entered the store.";
} 
function goCave(){
  text.innerText="You are in the cave. You see a dragon.";
}
function fightDragon(){
  text.innerText="You are fighting the dragon.";
}
function buyHealth(){
  text.innerText="You bought 1 health.";
}
function buyWeapon(){
  text.innerText="You bought a weapon.";
} 
function goTown(){
  text.innerText="You are in the town.";
} 