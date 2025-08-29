    // ======= App State =======
    const state = {
      likes: 0,
      coins: 100,
      copies: 0,
      history: []
    };
    // ======= Service Data =======
    
    const services = [
      { id: 's1', icon: '🚒', nameBn: 'ফায়ার সার্ভিস', nameEn: 'Fire Service', number: '999', category: 'ফায়ার' },
      { id: 's2', icon: '🚓', nameBn: 'পুলিশ', nameEn: 'Police', number: '999', category: 'পুলিশ' },
      { id: 's3', icon: '🚑', nameBn: 'অ্যাম্বুলেন্স', nameEn: 'Ambulance', number: '999', category: 'স্বাস্থ্য' },
      { id: 's4', icon: '📞', nameBn: 'জাতীয় জরুরি সেবা', nameEn: 'National Emergency', number: '999', category: 'সার্বজনীন' },
      { id: 's5', icon: '🚆', nameBn: 'রেলওয়ে হেল্পলাইন', nameEn: 'Railway Helpline', number: '109', category: 'পরিবহন' },
      { id: 's6', icon: '⚖️', nameBn: 'দুর্নীতি দমন কমিশন', nameEn: 'Anti-Corruption', number: '106', category: 'সরকারি' },
      { id: 's7', icon: '👩‍👧', nameBn: 'নারী ও শিশু সহায়তা', nameEn: 'Women & Child', number: '109', category: 'সহায়তা' },
      { id: 's8', icon: '📚', nameBn: 'তথ্যসেবা', nameEn: 'Gov Info Service', number: '333', category: 'তথ্য' },
      { id: 's9', icon: '🕌', nameBn: 'ইসলামী ফাউন্ডেশন', nameEn: 'islamic foundation', number: '333', category: 'ধর্ম ও শিক্ষা' }
    ];

    // ======= DOM Refs =======
    const cardsEl = document.getElementById('cards');
    const historyListEl = document.getElementById('historyList');
    const likeCountEl = document.getElementById('likeCount');
    const coinCountEl = document.getElementById('coinCount');
    const copyCountEl = document.getElementById('copyCount');
    const clearBtn = document.getElementById('clearHistory');

    // ======= Helpers =======
    const fmtTime = (d = new Date()) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    function renderCounts(){
      likeCountEl.textContent = state.likes;
      coinCountEl.textContent = state.coins;
      copyCountEl.textContent = state.copies;
    }

    // Copy to clipboard with graceful fallback
    async function copyText(text){
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch(err){
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch(e) { }
        document.body.removeChild(ta);
        return true;
      }
    }

    // ======= Render Cards =======
    function renderCards(){
      const frag = document.createDocumentFragment();
      services.forEach(svc => {
        const card = document.createElement('article');
        card.className = 'card';
        card.dataset.id = svc.id;
        card.innerHTML = 
        // `
        //   <div class="card-head">
        //     <div class="svc-ico" aria-hidden="true">${svc.icon}</div>
        //     <div>
        //       <div class="name-bn">${svc.nameBn}</div>
        //       <div class="name-en">${svc.nameEn}</div>
        //     </div>
        //     <button class="heart" type="button" title="Like this service" aria-label="like ${svc.nameEn}">❤️</button>
        //   </div>
        `<div class="card-head">
            <div class="top-row"> <div class="svc-ico" aria-hidden="true">${svc.icon}</div>
              <button class="heart" type="button" title="Like this service" aria-label="like ${svc.nameEn}">❤️</button>
            </div>
            <div class="name-row"> <div class="name-bn">${svc.nameBn}</div>
              <div class="name-en">${svc.nameEn}</div>
            </div>
          </div>
          <div>
            <div class="hotline" aria-label="hotline number">${svc.number}</div>
          </div>
            <span class="badge">${svc.category}</span>
          <div class="btns">
            <button class="btn copy" type="button" aria-label="copy number"><span aria-hidden="true">📋</span> Copy</button>
            <button class="btn call" type="button" aria-label="call number"><span aria-hidden="true">📞</span> Call</button>
          </div>
        `;
        frag.appendChild(card);
      });
      cardsEl.appendChild(frag);
    }

    // ======= Render History =======
    function pushHistory(item){
      state.history.unshift(item); // latest on top
      const row = document.createElement('div');
      row.className = 'h-item';
      row.innerHTML = `
        <div class="h-top">
          <div class="h-name">${item.name}</div>
          <div class="h-time">${item.time}</div>
        </div>
        <div class="h-num">📞 ${item.number}</div>
      `;
      historyListEl.prepend(row);
    }

    function clearHistory(){
      state.history = [];
      historyListEl.innerHTML = '';
    }

    // ======= Event Delegation for Cards =======
    cardsEl.addEventListener('click', async (e) => {
      const card = e.target.closest('.card');
      if(!card) return;
      const svc = services.find(s => s.id === card.dataset.id);
      if(!svc) return;

      // Like
      if(e.target.closest('.heart')){
        state.likes += 1;
        renderCounts();
        return;
      }

      // Copy
      if(e.target.closest('.copy')){
        await copyText(svc.number);
        state.copies += 1; renderCounts();
        alert(`Copied: ${svc.nameEn} — ${svc.number}`);
        return;
      }

      // Call
      if(e.target.closest('.call')){
        if(state.coins < 20){
          alert('Not enough coins! You need 20 coins to make a call.');
          return;
        }
        state.coins -= 20; renderCounts();
        alert(`Calling ${svc.nameEn} (${svc.number})...`);
        const time = fmtTime(new Date());
        pushHistory({ name: svc.nameEn, number: svc.number, time });
        return;
      }
    });

    // Clear history button
    clearBtn.addEventListener('click', () => clearHistory());

    // Init
    renderCards();
    renderCounts();