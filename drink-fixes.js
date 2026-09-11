const D=u=>`https://images.unsplash.com/photo-${u}?auto=format&fit=crop&w=1000&q=85`;
const DRINK_IMAGES={
  coffee:D("1514432324607-a09d9b4aefdd"),
  icedCoffee:D("1517701604599-bb29b565090c"),
  mocha:D("1461023058943-07fcbe16d735"),
  matcha:D("1515823064-d6e0c2c5f5e3"),
  hotChocolate:D("1542990253-0b0a5b7a8a5a"),
  milkshake:D("1572490122747-3968b75cc699"),
  biscoff:D("1587314168485-3236d6710814"),
  caramel:D("1499636136210-6f4ee915583e"),
  fruitShake:D("1553530666-ba11a7da3888"),
  orange:D("1600271886742-f049cd451bba"),
  lemonade:D("1583064313642-a7c149480c7e")
};
const names=["Americano","Ice Caramel Macchiato","Ice Mocha","Ice White Mocha","Ice Latte","Ice Cappuccino","Ice Spanish Latte","Ice Matcha","Classic Hot Chocolate","Nuttela","Pistachio","Ricchi Shake","Mango","Strawberry","Blueberry","Caramel","Lotus","Coffee","Classic Coffee Frappe","Caramel Coffee Frappe","White Mocha Frappe","Mocha","Ricchi Biscoff","Blueberry Cream Frappe","Caramel Cream Frappe","Vanillia Cream Frappe","Chocolate Chips Cream Frappe","Chocolate","Biscoff Cookies","Mango Cream Frappe","Strawberry Cream Frappe","Lotus Cream Frappe","Oreo Cream Frappe","Matcha","Banana Juice","Strawberry Milk Juice","Mango Juice","Watermelon Juice","Guava Juice","Guava Milk Juice","Lemon Juice","Lemon Mint Juice","Strawberry Juice","Orange Juice","Blueberry Milkshake","Mixberry Milkshake","Oreo Milkshake","Caramel Milkshake","Strawberry Milkshake","Chocolate Milkshake","Vanilla Milkshake","Coffee Milkshake","Pistachio Milkshake","Lotus Coffee Milkshake","Lotus Milkshake","Raspberry Milkshake","Mango Milkshake","Passion Fruit Milkshake","Green Apple Milkshake","Peach Milkshake","Nutella Milkshake"];
const byName={};names.forEach(n=>byName[n]=n);
function drinkImage(name){
 const n=name.toLowerCase();
 if(n.includes("matcha")) return DRINK_IMAGES.matcha;
 if(n.includes("hot chocolate")) return DRINK_IMAGES.hotChocolate;
 if(n.includes("iced")||n.includes("ice ")) return n.includes("matcha")?DRINK_IMAGES.matcha:DRINK_IMAGES.icedCoffee;
 if(n.includes("mocha")||n.includes("frappe")&&n.includes("coffee")) return DRINK_IMAGES.mocha;
 if(n.includes("biscoff")||n.includes("lotus")) return DRINK_IMAGES.biscoff;
 if(n.includes("caramel")) return DRINK_IMAGES.caramel;
 if(n.includes("milkshake")||n.includes("shake")) return DRINK_IMAGES.milkshake;
 if(n.includes("juice")) return n.includes("orange")?DRINK_IMAGES.orange:n.includes("lemon")?DRINK_IMAGES.lemonade:DRINK_IMAGES.fruitShake;
 if(n.includes("frappe")) return DRINK_IMAGES.milkshake;
 return DRINK_IMAGES.coffee;
}
function fixDrinks(){
 document.querySelectorAll("#menuGrid img[alt]").forEach(img=>{
   const name=img.alt.trim();
   if(!byName[name]) return;
   const next=drinkImage(name);
   if(img.src!==next){img.onerror=null;img.src=next;}
 });
}
new MutationObserver(fixDrinks).observe(document.getElementById("menuGrid")||document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src","alt"]});
window.addEventListener("load",()=>{fixDrinks();setTimeout(fixDrinks,100);setTimeout(fixDrinks,500);setTimeout(fixDrinks,1500);});
