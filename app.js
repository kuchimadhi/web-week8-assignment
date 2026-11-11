const STORAGE_KEY = "spendwise-data-v1";
const DEFAULT_BUDGET = 50000;
const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Other"];
const categoryIcons = {Food:"utensils",Transport:"bus",Shopping:"shopping-bag",Bills:"receipt",Health:"heart-pulse",Other:"shapes"};
const today = new Date();
const dateString = (date) => { const d = new Date(date); return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
const sampleTransactions = [
  {id:1,name:"Weekly groceries",category:"Food",amount:2450,date:dateString(today)},
  {id:2,name:"Matatu fare",category:"Transport",amount:450,date:dateString(today)},
  {id:3,name:"Internet subscription",category:"Bills",amount:2500,date:dateString(new Date(today.getFullYear(),today.getMonth(),Math.max(1,today.getDate()-1)))},
  {id:4,name:"Pharmacy essentials",category:"Health",amount:980,date:dateString(new Date(today.getFullYear(),today.getMonth(),Math.max(1,today.getDate()-2)))},
  {id:5,name:"New notebook",category:"Shopping",amount:650,date:dateString(new Date(today.getFullYear(),today.getMonth(),Math.max(1,today.getDate()-3)))}
];
let state = loadState();
const $ = (selector) => document.querySelector(selector);
const money = (amount) => new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",maximumFractionDigits:0}).format(amount);
function loadState(){
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if(saved && Array.isArray(saved.transactions) && Number.isFinite(saved.budget)) return saved; } catch(error) { console.warn("Could not load saved SpendWise data.",error); }
  return {budget:DEFAULT_BUDGET,transactions:sampleTransactions};
}
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function monthTransactions(){ return state.transactions.filter(item => { const d=new Date(item.date+"T00:00:00"); return d.getMonth()===today.getMonth() && d.getFullYear()===today.getFullYear(); }); }
function totalSpent(){ return monthTransactions().reduce((sum,item)=>sum+item.amount,0); }
function render(){
  const spent=totalSpent(), remaining=state.budget-spent, percent=state.budget ? Math.round(spent/state.budget*100):0;
  $("#balance-value").textContent=money(Math.max(0,remaining));
  $("#budget-value").textContent=money(state.budget);
  $("#spent-value").textContent=money(spent);
  $("#remaining-value").textContent=money(remaining);
  $("#spent-caption").textContent=monthTransactions().length+" recorded expenses";
  $("#remaining-caption").textContent=remaining>=0?"You're within your budget":"You've exceeded your budget";
  $("#remaining-caption").style.color=remaining>=0?"var(--green)":"#c45d50";
  $("#budget-percent").textContent=percent+"%";
  $("#budget-summary").textContent=money(spent)+" of "+money(state.budget);
  $("#budget-progress").style.width=Math.min(percent,100)+"%";
  $("#budget-progress").style.background=percent>100?"#c45d50":"var(--green)";
  $("#snapshot-total").textContent=money(spent);
  renderCategories(); renderChart(); renderTransactions(); icons();
}
function renderCategories(){
  const totals=Object.fromEntries(categories.map(category=>[category,monthTransactions().filter(t=>t.category===category).reduce((sum,t)=>sum+t.amount,0)]));
  const used=categories.filter(category=>totals[category]>0).sort((a,b)=>totals[b]-totals[a]);
  $("#category-list").innerHTML=(used.length?used:categories.slice(0,3)).map(category=>{
    const amount=totals[category], percent=state.budget?Math.min(amount/state.budget*100,100):0;
    return `<div class="category-row"><div class="category-name"><span class="category-icon"><i data-lucide="${categoryIcons[category]}"></i></span>${category}</div><span class="category-amount">${money(amount)}</span><div class="category-track"><div class="category-fill" style="width:${percent}%"></div></div></div>`;
  }).join("");
}
function renderChart(){
  const totals=categories.map(category=>({category,amount:monthTransactions().filter(t=>t.category===category).reduce((sum,t)=>sum+t.amount,0)}));
  const max=Math.max(...totals.map(item=>item.amount),1);
  $("#spending-chart").innerHTML=totals.map(item=>`<div class="bar-column" title="${item.category}: ${money(item.amount)}"><div class="bar" style="height:${Math.max(item.amount/max*100,item.amount?5:2)}%"></div><span class="bar-label">${item.category.slice(0,4)}</span></div>`).join("");
}
function renderTransactions(){
  const query=$("#search-input").value.trim().toLowerCase(), filter=$("#category-filter").value;
  const items=[...state.transactions].filter(item=>(filter==="all"||item.category===filter)&&item.name.toLowerCase().includes(query)).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  $("#transaction-list").innerHTML=items.map(item=>`<tr><td><div class="expense-name"><span class="expense-symbol"><i data-lucide="${categoryIcons[item.category]||"circle-dollar-sign"}"></i></span>${escapeHtml(item.name)}</div></td><td><span class="category-pill">${item.category}</span></td><td>${new Intl.DateTimeFormat("en-KE",{day:"numeric",month:"short",year:"numeric"}).format(new Date(item.date+"T00:00:00"))}</td><td class="amount-cell">− ${money(item.amount)}</td><td><button class="delete-btn" data-delete="${item.id}" aria-label="Delete ${escapeHtml(item.name)}"><i data-lucide="trash-2"></i></button></td></tr>`).join("");
  $("#empty-state").hidden=items.length>0;
  $("table").style.display=items.length?"table":"none";
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function icons(){if(window.lucide) window.lucide.createIcons();}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400);}
function openDialog(dialog){if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");}
function closeDialogs(){document.querySelectorAll("dialog").forEach(dialog=>dialog.close());}
$("#today-label").textContent=new Intl.DateTimeFormat("en-KE",{month:"long",year:"numeric"}).format(today).toUpperCase()+" OVERVIEW";
$("#expense-date").value=dateString(today);
$("#open-expense").addEventListener("click",()=>{ $("#expense-form").reset(); $("#expense-date").value=dateString(today); openDialog($("#expense-modal")); });
$("#empty-add").addEventListener("click",()=>$("#open-expense").click());
$("#edit-budget").addEventListener("click",()=>{ $("#budget-input").value=state.budget; openDialog($("#budget-modal")); });
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",closeDialogs));
document.querySelectorAll("dialog").forEach(dialog=>dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();}));
$("#expense-form").addEventListener("submit",event=>{
  event.preventDefault(); const form=new FormData(event.currentTarget);
  const name=String(form.get("name")).trim(), amount=Number(form.get("amount")), category=String(form.get("category")), date=String(form.get("date"));
  if(!name||!Number.isFinite(amount)||amount<=0||!date){toast("Please enter valid expense details.");return;}
  state.transactions.push({id:Date.now(),name,amount,category,date});saveState();render();closeDialogs();event.currentTarget.reset();$("#expense-date").value=dateString(today);toast("Expense added successfully.");
});
$("#budget-form").addEventListener("submit",event=>{
  event.preventDefault();const amount=Number($("#budget-input").value);
  if(!Number.isFinite(amount)||amount<=0){toast("Enter a budget greater than zero.");return;}
  state.budget=amount;saveState();render();closeDialogs();toast("Monthly budget updated.");
});
$("#transaction-list").addEventListener("click",event=>{
  const button=event.target.closest("[data-delete]");if(!button)return;
  const id=Number(button.dataset.delete);state.transactions=state.transactions.filter(item=>item.id!==id);saveState();render();toast("Transaction removed.");
});
$("#search-input").addEventListener("input",renderTransactions);
$("#category-filter").addEventListener("change",renderTransactions);
render();