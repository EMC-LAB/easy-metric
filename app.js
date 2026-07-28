(function(){
 const menu=document.querySelector('[data-menu]'),nav=document.querySelector('.nav-links');
 if(menu&&nav){
   const cerrarMenu=()=>{
     nav.classList.remove('open');
     menu.setAttribute('aria-expanded','false');
     menu.textContent='☰';
     document.body.classList.remove('menu-movil-abierto');
   };

   menu.addEventListener('click',()=>{
     const open=nav.classList.toggle('open');
     menu.setAttribute('aria-expanded',String(open));
     menu.textContent=open?'✕':'☰';
     document.body.classList.toggle('menu-movil-abierto',open);
   });

   nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',cerrarMenu));

   document.addEventListener('keydown',evento=>{
     if(evento.key==='Escape') cerrarMenu();
   });

   window.addEventListener('resize',()=>{
     if(window.innerWidth>900) cerrarMenu();
   });
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
 const slides=[...document.querySelectorAll('.slide')];let current=0;if(slides.length>1){setInterval(()=>{slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active')},3500)}
 const contact=document.getElementById('contactForm');if(contact){contact.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(contact);const msg=['Hola, solicito una cotización con Easy Metric Calibration.','','Nombre: '+(fd.get('nombre')||''),'Empresa: '+(fd.get('empresa')||''),'Teléfono: '+(fd.get('telefono')||''),'Correo: '+(fd.get('correo')||''),'Servicio: '+(fd.get('servicio')||''),'Mensaje: '+(fd.get('mensaje')||'')].join('\n');window.open('https://wa.me/525579166300?text='+encodeURIComponent(msg),'_blank','noopener')})}
 const q=document.getElementById('quoteForm');if(q){const result=document.getElementById('quotePreview'),wa=document.getElementById('quoteWhatsapp'),copy=document.getElementById('copyQuote');const ids=['empresa','nombre','telefono','correo','servicio','instrumento','marca','modelo','rango','cantidad','ubicacion','modalidad','fecha','detalle'];const get=id=>(document.getElementById(id)?.value||'').trim();function build(){const t=['Hola, solicito apoyo para cotizar un servicio de Easy Metric Calibration.','','DATOS DE CONTACTO','Empresa: '+(get('empresa')||'No indicada'),'Nombre: '+(get('nombre')||'No indicado'),'Teléfono: '+(get('telefono')||'No indicado'),'Correo: '+(get('correo')||'No indicado'),'','DATOS TÉCNICOS','Servicio: '+(get('servicio')||'Por definir'),'Instrumento: '+(get('instrumento')||'No indicado'),'Marca: '+(get('marca')||'No indicada'),'Modelo: '+(get('modelo')||'No indicado'),'Rango y unidad: '+(get('rango')||'No indicado'),'Cantidad: '+(get('cantidad')||'No indicada'),'Ubicación: '+(get('ubicacion')||'No indicada'),'Modalidad: '+(get('modalidad')||'Por definir'),'Fecha requerida: '+(get('fecha')||'Por definir'),'','Detalles: '+(get('detalle')||'Sin comentarios adicionales')].join('\n');result.textContent=t;wa.href='https://wa.me/525579166300?text='+encodeURIComponent(t);return t}ids.forEach(id=>document.getElementById(id)?.addEventListener('input',build));q.addEventListener('submit',e=>{e.preventDefault();build();wa.click()});copy?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(build());copy.textContent='Copiado';setTimeout(()=>copy.textContent='Copiar datos',1500)}catch{copy.textContent='Selecciona y copia el texto'}});build()}
})();