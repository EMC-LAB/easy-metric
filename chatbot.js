
(function(){
  const root=document.getElementById('chatbot');
  if(!root) return;
  const open=document.getElementById('chatOpen');
  const invite=document.getElementById('chatInvite');
  const win=document.getElementById('chatWindow');
  const close=document.getElementById('chatClose');
  const form=document.getElementById('chatForm');
  const input=document.getElementById('chatInput');
  const messages=document.getElementById('chatMessages');

  function toggle(force){
    const show=force ?? win.classList.contains('hidden');
    win.classList.toggle('hidden',!show);
    if(show){
      invite?.classList.add('hidden');
      setTimeout(()=>input?.focus(),40);
    }
  }
  open?.addEventListener('click',()=>toggle());
  invite?.addEventListener('click',()=>toggle(true));
  close?.addEventListener('click',()=>toggle(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false);});

  const answers={
    flujo:'Para revisar una calibración de flujo comparte tipo de medidor o tecnología, marca, modelo, diámetro, fluido, rango, unidad, salida y cantidad. El rango y método se confirman contra el alcance aplicable.',
    presion:'Para presión comparte tipo de instrumento, marca, modelo, rango, unidad, conexión, exactitud o tolerancia y cantidad. EMC maneja un rango comercial indicado de 1 a 5,000 PSI, sujeto al alcance aplicable.',
    temperatura:'Para temperatura indica tipo de sensor o indicador, elemento (RTD, termopar, termistor u otro), rango, puntos requeridos, longitud/diámetro de vaina si aplica y cantidad.',
    inspeccion:'Para Unidad de Inspección comparte ubicación, tipo de aprovechamiento, datos del medidor y tren de medición, fotografías, planos o isométricos disponibles, documentos previos y fecha objetivo.',
    verificacion:'La Unidad de Inspección revisa documentación, instalación, sistema de medición y evidencia conforme a su alcance acreditado. No se puede prometer un resultado favorable antes de la inspección.',
    certificado:'El certificado documenta el resultado de la calibración y la información metrológica aplicable. Para conocer un requisito específico de auditoría, compártelo con el equipo técnico.',
    cenam:'La trazabilidad metrológica relaciona los resultados con referencias reconocidas mediante una cadena documentada de calibraciones. EMC trabaja con patrones dentro de esa cadena metrológica.',
    tiempo:'La programación y entrega dependen de magnitud, cantidad, ubicación y alcance. En servicios elegibles, EMC maneja entrega documental ágil de hasta 72 horas después del cierre técnico.',
    costo:'El precio depende del instrumento, rango, cantidad, ubicación y modalidad. La herramienta de cotización del sitio organiza los datos para que el equipo pueda revisar el alcance.',
    cotizar:'Usa “Solicitar cotización” en el menú. Con marca, modelo, rango, cantidad y ubicación podemos iniciar una revisión comercial-técnica.',
    whatsapp:'Puedes comunicarte al 55 7916 6300 mediante el botón verde de WhatsApp.'
  };

  function add(text,user=false){
    const row=document.createElement('div');
    row.className='msg'+(user?' user':'');
    const bubble=document.createElement('div');
    bubble.className='bubble';
    bubble.textContent=text;
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop=messages.scrollHeight;
  }
  function reply(question){
    const s=question.toLowerCase();
    const key=Object.keys(answers).find(k=>s.includes(k));
    const fallback='Puedo orientarte sobre flujo, presión, temperatura, Unidad de Inspección, certificados, trazabilidad, tiempos y cotización. Para un caso específico, envía marca, modelo, rango, cantidad y ubicación.';
    setTimeout(()=>add(key?answers[key]:fallback),250);
  }
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const question=input.value.trim();
    if(!question) return;
    add(question,true);
    input.value='';
    reply(question);
  });
  root.querySelectorAll('[data-question]').forEach(button=>{
    button.addEventListener('click',()=>{
      const q=button.dataset.question;
      add(q,true);
      reply(q);
    });
  });
})();
