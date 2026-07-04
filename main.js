 // ----- live "tempo de show" counter -----
  const start = new Date(2022, 4, 31, 12, 0, 0); // 31/05/2022 12:00 (mês em índice 0)

  function pad(n){ return String(n).padStart(2,'0'); }

  function update(){
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if(days < 0){
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if(months < 0){
      years -= 1;
      months += 12;
    }

    const diffMs = now - start;
    let totalSeconds = Math.floor(diffMs / 1000);
    const hh = Math.floor((totalSeconds % 86400) / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;

    document.getElementById('t-anos').textContent = years;
    document.getElementById('t-meses').textContent = months;
    document.getElementById('t-dias').textContent = days;
    document.getElementById('t-tempo').textContent = pad(hh) + ':' + pad(mm) + ':' + pad(ss);
  }
  update();
  setInterval(update, 1000);

  // ----- encore button -----
  const btn = document.getElementById('encoreBtn');
  const msg = document.getElementById('encoreMsg');
  const sparksHost = document.getElementById('sparks');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  btn.addEventListener('click', () => {
    const willShow = !msg.classList.contains('show');
    msg.classList.toggle('show');
    btn.textContent = willShow ? 'Bis concedido' : 'Pedir bis';

    if(willShow && !reduceMotion){
      const rect = btn.getBoundingClientRect();
      for(let i=0;i<16;i++){
        const s = document.createElement('span');
        s.className = 'spark';
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random()*70;
        const dx = Math.cos(angle)*dist;
        const dy = Math.sin(angle)*dist;
        s.style.left = (rect.left + rect.width/2) + 'px';
        s.style.top = (rect.top + window.scrollY) + 'px';
        s.style.background = Math.random() > 0.5 ? 'var(--gold)' : 'var(--pink)';
        document.body.appendChild(s);
        s.animate([
          { transform:'translate(0,0)', opacity:1 },
          { transform:`translate(${dx}px, ${dy}px)`, opacity:0 }
        ], { duration: 700 + Math.random()*400, easing:'ease-out' });
        setTimeout(()=> s.remove(), 1200);
      }
    }
  });