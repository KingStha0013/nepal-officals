// नेपाल सरकारी अधिकारीहरूको सूची (sample names)
// --- यहाँ तपाईंले वास्तविक नाम राख्दै जान सक्नुहुन्छ ---
// Example: { name: "Susila Karki", role: "प्रधानमन्त्री", ministry: "प्रधानमन्त्री तथा मन्त्रिपरिषद् कार्यालय" }

let officials = [
  { name: "रामचन्द्र पौडेल", role: "राष्ट्रपति", ministry: "राष्ट्रपति कार्यालय" },
  { name: "not for now'", role: "प्रधानमन्त्री", ministry: "प्रधानमन्त्री तथा मन्त्रिपरिषद् कार्यालय" },
  { name: "नारायणकाजी श्रेष्ठ", role: "उपप्रधानमन्त्री", ministry: "गृह मन्त्रालय" },
  { name: "प्रदीप यादव", role: "शिक्षा मन्त्री", ministry: "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय" },
  { name: "रघुवीर महत", role: "वित्त मन्त्री", ministry: "वित्त मन्त्रालय" }
];

// DOM elements
const listEl = document.getElementById('list');
const searchEl = document.getElementById('search');
const filterEl = document.getElementById('filter');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const mName = document.getElementById('mName');
const mRole = document.getElementById('mRole');
const mMinistry = document.getElementById('mMinistry');

// मन्त्रालय filter भर्न
function populateMinistries(){
  const set = new Set(officials.map(o => o.ministry));
  filterEl.innerHTML = '<option value="">सबै मन्त्रालयहरू</option>';
  [...set].sort().forEach(m=>{
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = m;
    filterEl.appendChild(opt);
  });
}

// लिस्ट देखाउने
function renderList(){
  const q = searchEl.value.trim().toLowerCase();
  const ministryFilter = filterEl.value;
  listEl.innerHTML = '';

  const filtered = officials.filter(o=>{
    const matchesQ = q === '' || 
      o.name.toLowerCase().includes(q) || 
      o.role.toLowerCase().includes(q) || 
      o.ministry.toLowerCase().includes(q);
    const matchesMin = ministryFilter === '' || o.ministry === ministryFilter;
    return matchesQ && matchesMin;
  });

  if(filtered.length === 0){
    listEl.innerHTML = '<p style="color:#666">कुनै अधिकारी भेटिएन।</p>';
    return;
  }

  filtered.forEach(o=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${o.name}</h3><p>${o.role}</p><p style="font-size:12px;color:#888">${o.ministry}</p>`;
    card.addEventListener('click', ()=> openModal(o));
    listEl.appendChild(card);
  });
}

// Modal देखाउने
function openModal(o){
  mName.textContent = o.name;
  mRole.textContent = 'पद: ' + o.role;
  mMinistry.textContent = 'मन्त्रालय: ' + o.ministry;
  modal.classList.remove('hidden');
}
closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
modal.addEventListener('click', (e)=> { if(e.target === modal) modal.classList.add('hidden'); });

// सुरुवात
populateMinistries();
renderList();