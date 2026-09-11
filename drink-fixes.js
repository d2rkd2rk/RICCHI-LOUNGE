const D=u=>`https://images.unsplash.com/photo-${u}?auto=format&fit=crop&w=1000&q=85`;

// Exact product -> Unsplash photo mapping. No category fallback is used for drinks.
const DRINKS={
  "Americano":D("1674766326040-c468906374f1"),
  "Ice Caramel Macchiato":D("1741321728571-e62467b671de"),
  "Ice Mocha":D("1461023058943-07fcbe16d735"),
  "Ice White Mocha":D("1512568400610-62da28bc8a13"),
  "Ice Latte":D("1517701604599-bb29b565090c"),
  "Ice Cappuccino":D("1698309626286-cfe29d8218a7"),
  "Ice Spanish Latte":D("1512568400610-62da28bc8a13"),
  "Ice Matcha":D("1560148196-df61132466ce"),

  "Classic Hot Chocolate":D("1542990253-0b0a5b7a8a5a"),
  "Nuttela":D("1542990253-0b0a5b7a8a5a"),

  "Pistachio":D("1572490122747-3968b75cc699"),
  "Ricchi Shake":D("1572490122747-3968b75cc699"),
  "Mango":D("1716441392930-b4daa288266a"),
  "Strawberry":D("1734747638453-dd5c0766add2"),
  "Blueberry":D("1588929473475-d16ffd5d068c"),
  "Caramel":D("1499636136210-6f4ee915583e"),
  "Lotus":D("1587314168485-3236d6710814"),
  "Coffee":D("1669872484166-e11b9638b50e"),

  "Classic Coffee Frappe":D("1461023058943-07fcbe16d735"),
  "Caramel Coffee Frappe":D("1499636136210-6f4ee915583e"),
  "White Mocha Frappe":D("1512568400610-62da28bc8a13"),
  "Mocha":D("1461023058943-07fcbe16d735"),

  "Ricchi Biscoff":D("1587314168485-3236d6710814"),
  "Blueberry Cream Frappe":D("1588929473475-d16ffd5d068c"),
  "Caramel Cream Frappe":D("1499636136210-6f4ee915583e"),
  "Vanillia Cream Frappe":D("1579954115545-36c48a0b5a09"),
  "Chocolate Chips Cream Frappe":D("1693857226065-3b3f482ecad0"),
  "Chocolate":D("1693857226065-3b3f482ecad0"),
  "Biscoff Cookies":D("1587314168485-3236d6710814"),
  "Mango Cream Frappe":D("1716441392930-b4daa288266a"),
  "Strawberry Cream Frappe":D("1734747638453-dd5c0766add2"),
  "Lotus Cream Frappe":D("1587314168485-3236d6710814"),
  "Oreo Cream Frappe":D("1619158401201-8fa932695178"),
  "Matcha":D("1560148196-df61132466ce"),

  "Banana Juice":D("1528825871115-3581a2c7c9d6"),
  "Strawberry Milk Juice":D("1565188003931-64e0c5af81b8"),
  "Mango Juice":D("1716441392930-b4daa288266a"),
  "Watermelon Juice":D("1721363005841-3831c567788d"),
  "Guava Juice":D("1490324028530-3df5a9af0637"),
  "Guava Milk Juice":D("1490324028530-3df5a9af0637"),
  "Lemon Juice":D("1673968873206-ceb16421a803"),
  "Lemon Mint Juice":D("1775264175004-604006f6c8b0"),
  "Strawberry Juice":D("1565188003931-64e0c5af81b8"),
  "Orange Juice":D("1600271886742-f049cd451bba"),

  "Blueberry Milkshake":D("1588929473475-d16ffd5d068c"),
  "Mixberry Milkshake":D("1588929473475-d16ffd5d068c"),
  "Oreo Milkshake":D("1619158401201-8fa932695178"),
  "Caramel Milkshake":D("1499636136210-6f4ee915583e"),
  "Strawberry Milkshake":D("1734747638453-dd5c0766add2"),
  "Chocolate Milkshake":D("1693857226065-3b3f482ecad0"),
  "Vanilla Milkshake":D("1548849956-8aa872cefb93"),
  "Coffee Milkshake":D("1669872484166-e11b9638b50e"),
  "Pistachio Milkshake":D("1572490122747-3968b75cc699"),
  "Lotus Coffee Milkshake":D("1587314168485-3236d6710814"),
  "Lotus Milkshake":D("1587314168485-3236d6710814"),
  "Raspberry Milkshake":D("1734747638453-dd5c0766add2"),
  "Mango Milkshake":D("1716441392930-b4daa288266a"),
  "Passion Fruit Milkshake":D("1754594537133-796eb54f206c"),
  "Green Apple Milkshake":D("1550258987-190a2d41e8ba"),
  "Peach Milkshake":D("1560807707-8cc77767d783"),
  "Nutella Milkshake":D("1693857226065-3b3f482ecad0")
};

function fixDrinks(){
  document.querySelectorAll("#menuGrid img[alt]").forEach(img=>{
    const name=img.alt.trim();
    const next=DRINKS[name];
    if(!next) return;
    if(img.dataset.ricchiDrinkImage!==next){
      img.onerror=null;
      img.src=next;
      img.dataset.ricchiDrinkImage=next;
    }
  });
}

function startDrinkFix(){
  fixDrinks();
  const grid=document.getElementById("menuGrid")||document.documentElement;
  new MutationObserver(fixDrinks).observe(grid,{subtree:true,childList:true,attributes:true,attributeFilter:["src","alt"]});
  [100,400,1000,2000].forEach(ms=>setTimeout(fixDrinks,ms));
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",startDrinkFix);
else startDrinkFix();
