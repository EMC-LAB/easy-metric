
(function(){
  const menu=document.querySelector('[data-menu]');
  const nav=document.querySelector('.nav-links');
  if(menu&&nav){
    const closeMenu=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';};
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
      menu.textContent=open?'✕':'☰';
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu();});
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

  // Meta Pixel: track real WhatsApp intent as Contact.
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href*="wa.me/"]');
    if(link && typeof window.fbq==='function'){
      window.fbq('track','Contact',{content_name:'WhatsApp EMC'});
    }
  });

  // Technical quote tool
  const q=document.getElementById('quoteForm');
  if(q){
    const preview=document.getElementById('quotePreview');
    const wa=document.getElementById('quoteWhatsapp');
    const copy=document.getElementById('copyQuote');
    const message=document.getElementById('formMessage');
    const ids=['empresa','nombre','puesto','telefono','correo','servicio','instrumento','cantidad','marca','modelo','serie','rango','ubicacion','modalidad','fecha','detalle'];
    const get=id=>(document.getElementById(id)?.value||'').trim();

    const urlParams=new URLSearchParams(location.search);
    const requestedService=urlParams.get('servicio');
    if(requestedService && document.getElementById('servicio')){
      const sel=document.getElementById('servicio');
      const match=[...sel.options].find(o=>o.text.toLowerCase()===requestedService.toLowerCase());
      if(match) sel.value=match.value || match.text;
    }

    function build(){
      const text=[
        'Hola, solicito una cotización con Easy Metric Calibration.',
        '',
        'DATOS DE CONTACTO',
        'Empresa: '+(get('empresa')||'No indicada'),
        'Responsable: '+(get('nombre')||'No indicado'),
        'Área/Puesto: '+(get('puesto')||'No indicado'),
        'Teléfono: '+(get('telefono')||'No indicado'),
        'Correo: '+(get('correo')||'No indicado'),
        '',
        'DATOS TÉCNICOS',
        'Servicio: '+(get('servicio')||'Por definir'),
        'Instrumento: '+(get('instrumento')||'No indicado'),
        'Cantidad: '+(get('cantidad')||'No indicada'),
        'Marca: '+(get('marca')||'No indicada'),
        'Modelo: '+(get('modelo')||'No indicado'),
        'Serie: '+(get('serie')||'No indicada'),
        'Rango y unidad: '+(get('rango')||'No indicado'),
        'Ubicación: '+(get('ubicacion')||'No indicada'),
        'Modalidad: '+(get('modalidad')||'Por definir'),
        'Fecha requerida: '+(get('fecha')||'Por definir'),
        '',
        'DETALLES',
        get('detalle')||'Sin comentarios adicionales'
      ].join('\n');
      if(preview) preview.textContent=text;
      if(wa) wa.href='https://wa.me/525579166300?text='+encodeURIComponent(text);
      return text;
    }

    ids.forEach(id=>document.getElementById(id)?.addEventListener('input',build));
    q.addEventListener('submit',e=>{
      e.preventDefault();
      if(!q.reportValidity()) return;
      const text=build();
      if(typeof window.fbq==='function'){
        window.fbq('track','Lead',{
          content_name:'Solicitud de cotización EMC',
          content_category:get('servicio')||'Cotización'
        });
      }
      if(message) message.textContent='Solicitud preparada. Abriendo WhatsApp...';
      window.open('https://wa.me/525579166300?text='+encodeURIComponent(text),'_blank','noopener');
    });
    copy?.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText(build());
        copy.textContent='Copiado';
        setTimeout(()=>copy.textContent='Copiar datos',1300);
      }catch{
        if(message) message.textContent='No fue posible copiar automáticamente. Selecciona el texto de la vista previa.';
      }
    });
    build();
  }

  // Horizontal galleries
  document.querySelectorAll('[data-gallery]').forEach(gallery=>{
    const track=gallery.querySelector('.gallery-track');
    const prev=gallery.querySelector('.gallery-arrow.prev');
    const next=gallery.querySelector('.gallery-arrow.next');
    const step=()=>Math.max(280,track.clientWidth*.78);
    prev?.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
    next?.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
  });
})();
