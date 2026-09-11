const WA="201019926199";
let products=[], cart=[], active="All";
const grid=document.getElementById("menuGrid"), cats=document.getElementById("cats"), search=document.getElementById("search");
const cartEl=document.getElementById("cart"), backdrop=document.getElementById("backdrop");

fetch("menu.json").then(r=>r.json()).then(data=>{products=data; renderCats(); render();});

function renderCats(){
 const list=["All",...new Set(products.map(x=>x.category))];
 cats.innerHTML=list.map(c=>`<button class="${c===active?"active":""}" onclick="setCat(${JSON.stringify(c)})">${c}</button>`).join("");
}
window.setCat=c=>{active=c;renderCats();render()};

function render(){
 const q=search.value.toLowerCase().trim();
 const list=products.filter(x=>(active==="All"||x.category===active)&&(!q||(x.name+" "+x.desc).toLowerCase().includes(q)));
 grid.innerHTML=list.map((x,i)=>`
 <article class="card">
  <div class="photo"><img loading="lazy" src="${x.img}" alt="${x.name}"></div>
  <div class="card-body">
   <div class="card-top"><h3>${x.name}</h3><div class="price">${x.price==null?"On selection":"EGP "+x.price}</div></div>
   <p class="desc">${x.desc}</p>
   <button class="add" onclick='add(${JSON.stringify(x.name)})'>Add to order +</button>
  </div>
 </article>`).join("") || `<div style="grid-column:1/-1;padding:60px;text-align:center">No dishes found.</div>`;
}
search.addEventListener("input",render);

window.add=function(name){
 const p=products.find(x=>x.name===name);
 if(!p.price){alert("This item is priced on selection. Please contact RICCHI on WhatsApp.");return}
 const found=cart.find(x=>x.name===name);
 found?found.qty++:cart.push({...p,qty:1});
 updateCart(); openCart();
};
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.getElementById("cartItems"), empty=document.getElementById("cartEmpty");
 empty.style.display=cart.length?"none":"block";
 box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>EGP ${x.price} × ${x.qty}</small></div><div class="qty"><button onclick="change('${x.name}',-1)">−</button><span>${x.qty}</span><button onclick="change('${x.name}',1)">+</button></div><button class="remove" onclick="removeItem('${x.name}')">×</button></div>`).join("");
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("total").textContent="EGP "+total.toLocaleString();
}
window.change=(n,d)=>{const x=cart.find(x=>x.name===n);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(y=>y.name!==n);updateCart()};
window.removeItem=n=>{cart=cart.filter(x=>x.name!==n);updateCart()};
function openCart(){cartEl.classList.add("open");backdrop.classList.add("show")}
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=()=>{cartEl.classList.remove("open");backdrop.classList.remove("show")};
backdrop.onclick=()=>{cartEl.classList.remove("open");backdrop.classList.remove("show")};

document.getElementById("sendWhatsApp").onclick=()=>{
 if(!cart.length){alert("Please add at least one item.");return}
 const name=document.getElementById("customerName").value.trim();
 if(!name){alert("Please enter your name first.");document.getElementById("customerName").focus();return}
 const notes=document.getElementById("notes").value.trim();
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const lines=cart.map(x=>`• ${x.name} — ${x.qty} × EGP ${x.price} = EGP ${x.price*x.qty}`).join("\n");
 const msg=`*New RICCHI LOUNGE Order*%0A%0A*Customer:* ${encodeURIComponent(name)}%0A%0A${encodeURIComponent(lines)}%0A%0A*Items:* ${cart.reduce((s,x)=>s+x.qty,0)}%0A*Total:* EGP ${total.toLocaleString()}${notes?`%0A*Notes:* ${encodeURIComponent(notes)}`:""}`;
 window.open(`https://wa.me/${WA}?text=${msg}`,"_blank");
};
updateCart();
