const WA="201019926199";
let products=[],cart=[],active="All";
const grid=document.getElementById("menuGrid"),cats=document.getElementById("cats"),search=document.getElementById("search");
const cartEl=document.getElementById("cart"),backdrop=document.getElementById("backdrop");
const catViewport=document.getElementById("catViewport");
const catPrev=document.getElementById("catPrev");
const catNext=document.getElementById("catNext");

function escapeHTML(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));}
function categoryLabel(c){return c==="All"?"All":c.replace("Ricchi Signature","Signature").replace("Milkshake","Milkshakes").replace("Ricchi Shake","Ricchi Shakes");}

fetch("menu.json",{cache:"no-store"})
 .then(r=>{if(!r.ok)throw new Error("Menu could not be loaded");return r.json()})
 .then(data=>{products=Array.isArray(data)?data:[];renderCats();render();updateCatArrows();})
 .catch(()=>{grid.innerHTML='<div class="menu-error">The menu could not be loaded. Please refresh the page.</div>';});

function renderCats(){
 const list=["All",...new Set(products.map(x=>x.category))];
 cats.innerHTML=list.map(c=>`<button type="button" class="${c===active?"active":""}" data-category="${escapeHTML(c)}">${escapeHTML(categoryLabel(c))}</button>`).join("");
}

cats.addEventListener("click",e=>{
 const button=e.target.closest("button[data-category]");
 if(!button)return;
 active=button.dataset.category;
 renderCats();
 render();
 button.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
 updateCatArrows();
});

function render(){
 const q=search.value.toLowerCase().trim();
 const list=products.filter(x=>(active==="All"||x.category===active)&&(!q||(x.name+" "+x.desc).toLowerCase().includes(q)));
 grid.innerHTML=list.map(x=>`
 <article class="card">
  <div class="photo"><img loading="lazy" src="${escapeHTML(x.img||"assets/dish-placeholder.svg")}" alt="${escapeHTML(x.name)}" onerror="this.onerror=null;this.src='assets/dish-placeholder.svg';this.closest('.photo').classList.add('image-missing')"></div>
  <div class="card-body">
   <div class="card-top"><h3>${escapeHTML(x.name)}</h3><div class="price">${x.price==null?"On selection":"EGP "+Number(x.price).toLocaleString()}</div></div>
   <p class="desc">${escapeHTML(x.desc)}</p>
   <button type="button" class="add" data-add="${escapeHTML(x.name)}">Add to order +</button>
  </div>
 </article>`).join("")||`<div class="menu-empty">No dishes found.</div>`;
}

grid.addEventListener("click",e=>{
 const button=e.target.closest("button[data-add]");
 if(button)add(button.dataset.add);
});
search.addEventListener("input",render);

function add(name){
 const p=products.find(x=>x.name===name);
 if(!p)return;
 if(!p.price){alert("This item is priced on selection. Please contact RICCHI on WhatsApp.");return;}
 const found=cart.find(x=>x.name===name);
 found?found.qty++:cart.push({...p,qty:1});
 updateCart();openCart();
}

function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.getElementById("cartItems"),empty=document.getElementById("cartEmpty");
 empty.style.display=cart.length?"none":"block";
 box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${escapeHTML(x.name)}</b><small>EGP ${Number(x.price).toLocaleString()} × ${x.qty}</small></div><div class="qty"><button type="button" data-change="-1" data-name="${escapeHTML(x.name)}">−</button><span>${x.qty}</span><button type="button" data-change="1" data-name="${escapeHTML(x.name)}">+</button></div><button type="button" class="remove" data-remove="${escapeHTML(x.name)}">×</button></div>`).join("");
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("total").textContent="EGP "+total.toLocaleString();
}

document.getElementById("cartItems").addEventListener("click",e=>{
 const change=e.target.closest("button[data-change]");
 const remove=e.target.closest("button[data-remove]");
 if(change)changeQty(change.dataset.name,Number(change.dataset.change));
 if(remove)removeItem(remove.dataset.remove);
});
function changeQty(n,d){const x=cart.find(x=>x.name===n);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(y=>y.name!==n);updateCart();}
function removeItem(n){cart=cart.filter(x=>x.name!==n);updateCart();}
function openCart(){cartEl.classList.add("open");backdrop.classList.add("show");document.body.classList.add("cart-open");}
function closeCart(){cartEl.classList.remove("open");backdrop.classList.remove("show");document.body.classList.remove("cart-open");}
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
backdrop.onclick=closeCart;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});

document.getElementById("sendWhatsApp").onclick=()=>{
 if(!cart.length){alert("Please add at least one item.");return;}
 const name=document.getElementById("customerName").value.trim();
 if(!name){alert("Please enter your name first.");document.getElementById("customerName").focus();return;}
 const notes=document.getElementById("notes").value.trim();
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const lines=cart.map(x=>`• ${x.name} — ${x.qty} × EGP ${x.price} = EGP ${x.price*x.qty}`).join("\n");
 const msg=`*New RICCHI LOUNGE Order*\n\n*Customer:* ${name}\n\n${lines}\n\n*Items:* ${cart.reduce((s,x)=>s+x.qty,0)}\n*Total:* EGP ${total.toLocaleString()}${notes?`\n*Notes:* ${notes}`:""}`;
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
};

function updateCatArrows(){
 if(!catViewport||!catPrev||!catNext)return;
 const max=catViewport.scrollWidth-catViewport.clientWidth;
 const has= max>4;
 catViewport.classList.toggle("has-overflow",has);
 catPrev.disabled=!has||catViewport.scrollLeft<4;
 catNext.disabled=!has||catViewport.scrollLeft>max-4;
}
function scrollCats(amount){catViewport.scrollBy({left:amount,behavior:"smooth"});setTimeout(updateCatArrows,300);}
catPrev.onclick=()=>scrollCats(-260);
catNext.onclick=()=>scrollCats(260);
catViewport.addEventListener("scroll",updateCatArrows,{passive:true});
window.addEventListener("resize",updateCatArrows);
updateCart();
