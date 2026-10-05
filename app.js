const RF=`RF-01 Inicio de sesión|Validar usuario - contraseña obligatorios - verificar credenciales - rechazar credenciales inválidas.
RF-02 Cierre de sesión|Solicitar confirmación - finalizar la sesión - impedir acceso posterior sin autenticación.
RF-03 Recuperación de acceso|Validar correo obligatorio y formato válido - permitir cambio de contraseña
RF-04 Gestión de usuarios|Registrar, consultar, modificar, activar y desactivar - validar nombres, documento, correo, teléfono y rol - documento y correo únicos
RF-05 Roles y permisos|Asignar rol obligatorio - restringir funciones según permisos - roles: Administrador, Atención al Cliente
RF-06 Registrar objeto perdido|Campos obligatorios: categoría, nombre, descripción, fecha, hora - formatos y longitudes válidas; generar código - estado inicial ENCONTRADO - registrar usuario y fecha/hora.
RF-07 Adjuntar fotografía|Permitir tomar/cargar imagen - formatos JPG/JPEG/PNG - rechazar archivo inválido - asociar imagen al objeto.
RF-08 Generar código único|Generación automática - unico
RF-09 Consultar objeto|Buscar y mostrar código, categoría, nombre, descripción, fecha/hora, lugar, estado, usuario - objeto inexistente genera mensaje informativo.
RF-10 Buscar objeto|Permitir búsqueda por código, nombre, categoría, descripción, fecha, lugar y estado - no distinguir mayúsculas/minúsculas - mostrar mensaje cuando no existan resultados.
RF-11 Filtrar objetos|Filtros combinables por estado, categoría, fecha desde/hasta y lugar - fecha desde no puede ser posterior a fecha hasta - opción para limpiar filtros.
RF-12 Actualizar información del objeto|Código, fecha original y usuario creador no modificables - validar campos obligatorios - restringir modificación de objetos entregados salvo Administrador.
RF-13 Cambiar estado del objeto|Controlar transiciones válidas - ENTREGADO no retorna a ENCONTRADO - registrar usuario, fecha y hora; guardar historial.
RF-14 Consultar historial del objeto|Mostrar fecha/hora, acción, usuario y estado - historial de solo lectura para usuarios normales - conservar trazabilidad.
RF-15 Registrar reclamación|Objeto debe existir y no estar entregado - registrar reclamante, documento, fecha/hora y descripción - impedir reclamaciones activas duplicadas - cambiar estado RECLAMADO.
RF-16 Consultar reclamación|Mostrar reclamante - objeto, fecha, estado, resultado de verificación y entrega - proteger datos personales mediante permisos.
RF-17 Verificar identidad|Registrar documento presentado, tipo, resultado, observaciones, responsable, fecha y hora - impedir entrega sin verificación aprobada.
RF-18 Registrar resultado de verificación|Resultado APROBADA/RECHAZADA; si es rechazada, motivo obligatorio, debe existir reclamación - registrar responsable y fecha/hora; rechazo bloquea entrega.
RF-19 Autorizar devolución|Requiere reclamación registrada, identidad verificada y resultado aprobado - si alguna condición falla, bloquear la devolución.
RF-20 Registrar entrega|Objeto existente - estado VERIFICADO - reclamación aprobada; - identidad verificada - usuario autorizado - no entregado previamente - registrar receptor, responsable, fecha, hora y observaciones.
RF-21 Generar constancia de entrega|Generar constancia después de registrar la entrega; incluir código, objeto, receptor, documento, fecha/hora y responsable
RF-22 Actualizar estado después de la entrega|Al confirmar la entrega, cambiar automáticamente a ENTREGADO; retirar de disponibles; si falla el registro, no cambiar estado.
RF-23 Dashboard de indicadores|Mostrar encontrados - reclamados, verificados, entregados y no reclamados - datos calculados desde la información almacenada
RF-24 Reporte de objetos|Filtrar por fecha, categoría, estado y lugar; fecha inicial no mayor que fecha final; respetar permisos; permitir exportación si se implementa.
RF-25 Reporte de objetos entregados|Mostrar únicamente objetos ENTREGADOS; incluir código, objeto, reclamante, fecha y responsable; permitir filtros por fecha.
RF-26 Reporte de objetos pendientes|Incluir objetos encontrados, en custodia o con reclamación pendiente; excluir objetos entregados; permitir filtros.
RF-27 Gestión de categorías|Crear, consultar, modificar y activar/desactivar; nombre obligatorio y único - no eliminar categorías utilizadas; preferir desactivación lógica.
RF-28 Gestión de lugares|Crear, consultar, modificar y activar/desactivar; nombre obligatorio y único; no eliminar lugares usados históricamente.
RF-29 Configuración del sistema|Solo Administrador; gestionar parámetros permitidos; auditar cambios críticos
RF-30 Auditoría del sistema|Registrar ID, usuario, acción, módulo, registro afectado, fecha/hora y resultado; solo Administrador consulta; usuarios normales no modifican; conservar auditorías, aunque el usuario se desactive.`.split("\n").map(l=>{const[a,b]=l.split("|");return{id:a.slice(0,5),n:a.slice(6),v:b}});
const GR={0:"Acceso, usuarios y permisos",5:"Registro de objetos",8:"Consulta, búsqueda y trazabilidad",14:"Reclamación, verificación y entrega",22:"Reportes e indicadores",26:"Administración y auditoría"};
GR[14]="Reclamación, verificación y entrega";
const RNF=[["RNF-01","La aplicación deberá funcionar en las plataformas definidas para el proyecto, utilizando Flutter."],["RNF-02","La interfaz deberá ser clara, consistente e intuitiva para el personal autorizado."],["RNF-03","El sistema deberá aplicar autenticación y autorización según el rol del usuario."],["RNF-04","El sistema deberá impedir duplicidades e inconsistencias en registros y estados."],["RNF-05","La solución deberá permitir crecimiento de usuarios, registros y futuras funcionalidades."],["RNF-06","El código deberá mantenerse modular, organizado y documentado."],["RNF-07","La interfaz deberá adaptarse a los tamaños de pantalla de las plataformas objetivo."],["RNF-08","Los errores no deberán generar registros incompletos ni pérdida de información."]];
const ROLES=[["po","Product Owner","Prioriza el Product Backlog y valida el valor de cada entrega."],["sm","Scrum Master","Facilita ceremonias, remueve impedimentos y vela por Scrum adaptativo."],["fe","Developer 1 · Front End","Interfaz multiplataforma en Flutter, responsive y consistente."],["be","Developer 2 · Back End","Lógica, base de datos, seguridad, estados y auditoría."],["qa","Stakeholder · QA","Valida criterios de aceptación, pruebas y retroalimentación."]];
const ACT=[["Diagnóstico del proceso actual en Makro Chincha","po",1,2],["Formación del equipo y roles Scrum · Product Backlog","sm",1,2],["Selección y justificación del enfoque ágil (Scrum adaptativo)","sm",2,3],["Sprint 1 · Acceso, usuarios, roles (RF-01 a RF-05)","be",3,5],["Sprint 1 · Diseño UI y navegación Flutter (RNF-01, 02, 07)","fe",3,5],["Sprint 2 · Registro, foto, código y consulta (RF-06 a RF-14)","be",6,8],["Sprint 2 · Pantallas de objetos, búsqueda y filtros","fe",6,8],["Sprint 3 · Reclamación, verificación y entrega (RF-15 a RF-22)","be",9,11],["Sprint 3 · Pantallas de reclamo y constancia de entrega","fe",9,11],["Sprint 4 · Dashboard, reportes, categorías, lugares, auditoría (RF-23 a RF-30)","be",12,14],["Sprint 4 · Interfaces de reportes y administración","fe",12,14],["Pruebas QA y validación de criterios de aceptación","qa",5,14],["Validación de valor y reajuste de backlog con Makro","po",5,14],["Informe final, consolidación de evidencias y revisión de entrega","sm",14,14],["ENTREGA FINAL del producto (lunes 30 nov 2026)","po",15,15]];
const $=i=>document.getElementById(i);
const DAY=864e5,START=Date.UTC(2026,7,24),DEAD=Date.UTC(2026,10,30,5);
const LIMA_TZ="America/Lima",limaNow=()=>new Date();
const o={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:LIMA_TZ};
const fmt=d=>d.toLocaleString("es-PE",o),fmtS=fmt;
const sd=d=>new Date(d).toLocaleDateString("es-PE",{day:"2-digit",month:"short",timeZone:"UTC"});
const wd=w=>START+(w-1)*7*DAY;
const today=()=>{const parts=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:LIMA_TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(limaNow()).filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));return `${parts.year}-${parts.month}-${parts.day}`};
const weekOf=t=>Math.floor((t-START)/DAY/7)+1,curW=()=>{const w=weekOf(Date.parse(`${today()}T12:00:00Z`));return w<1?0:w};
const SP=[["Sprint 0 · Inicio y planificación",1,2],["Sprint 1",3,5],["Sprint 2",6,8],["Sprint 3",9,11],["Sprint 4",12,14],["Entrega final",15,15]];
const spW=w=>SP.find(x=>w>=x[1]&&w<=x[2]);
const ph=w=>(spW(w)||["—"])[0];
const CC=[["m","Reunión Zoom/Meet"],["d","Daily / seguimiento"],["e","Captura en Drive"],["r","Review + Retro"]];
const ATR=["Portabilidad","Usabilidad","Seguridad","Integridad","Escalabilidad","Mantenibilidad","Adaptabilidad","Fiabilidad"];
const spIdx=i=>i<5?0:i<14?1:i<22?2:3,dueRF=i=>[5,8,11,14][spIdx(i)],dueRNF=i=>[0,1,6].includes(i)?5:14;
let st={},att={},names={},db=null,user=null,me={id:null,name:""},mode="cargando",sel=today(),cm=Number(today().slice(5,7))-1,cy=Number(today().slice(0,4)),onlyP=false,prompted=false,attReady=false;
const ENTRY=new Date(),L=k=>{try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){console.error(`No se pudo leer ${k} del almacenamiento local.`,e);return {}}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){console.error(`No se pudo guardar ${k} en el almacenamiento local.`,e);return false}};
const nm=id=>id===me.id?(me.name||"Tú"):(names[id]||""),by=x=>x&&x.by?" · "+x.by:"";
const ok=k=>st[k]&&st[k].v==1,WHO=[["Piero","Scrum Master"],["María","Product Owner"],["Airton","Developer 1 · Front End"],["Dayron","Developer 2 · Back End"],["Patricia","Stakeholder · QA"]],wid=()=>{const i=WHO.findIndex(x=>x[0]==who);return i<0?null:today()+"_u"+i},myAtt=()=>wid()?att[wid()]:null;let who="";try{who=localStorage.getItem("mkwho")||""}catch(e){}
const sg=k=>{const x=st[k],v=x?x.v:-1;return `<span class="sg"><button class="y ${v==1?"on":""}" data-k="${k}" data-v="1" ${v==1?"disabled":""} title="Cumplido (permanente)">✓</button><button class="x ${v==0?"on":""}" data-k="${k}" data-v="0" ${v>=0?"disabled":""} title="No cumplido">✗</button></span>`};
const tsl=k=>{const x=st[k];return x?(x.v?"✓ ":"✗ ")+x.t+by(x):"Pendiente"};
const row=(k,id,n,v,sp)=>{const x=st[k];return `<tr class="${x?(x.v?"ok":"no"):""}"><td><b>${id}</b></td><td>${n}</td><td class="v">${v}</td><td>${sp}</td><td>${sg(k)}</td><td class="ts">${tsl(k)}</td></tr>`};
function rfHtml(){const q=$("q").value.toLowerCase();let h="<tr><th>Código</th><th>Requerimiento</th><th>Validación</th><th>Sprint</th><th>Estado</th><th>Fecha y hora</th></tr>";
RF.forEach((r,i)=>{if(GR[i]!==undefined&&!q&&!onlyP)h+=`<tr class="gh"><td colspan="6">${GR[i]}</td></tr>`;
if(onlyP&&st[r.id])return;if(q&&!(r.id+r.n+r.v).toLowerCase().includes(q))return;h+=row(r.id,r.id,r.n,r.v,"S"+(spIdx(i)+1))});$("rft").innerHTML=h}
function rnfHtml(){let h="<tr><th>Código</th><th>Requerimiento</th><th>Atributo de calidad</th><th>Sprint</th><th>Estado</th><th>Fecha y hora</th></tr>";
RNF.forEach((r,i)=>h+=row(r[0],r[0],r[1],ATR[i],[0,1,6].includes(i)?"S1":"Transversal"));$("rnt").innerHTML=h}
function ganttHtml(){const cw=curW();let h="<tr><th>Cumple</th><th class='l'>Actividad</th>";
for(let w=1;w<=15;w++)h+=`<th class="${w==cw?"cur":""}">S${w}<br><small>${sd(wd(w))}</small></th>`;h+="<th>Estado</th></tr>";
ACT.forEach((a,i)=>{const k="g"+i,x=st[k];let e="Por iniciar",cl="";
if(x&&x.v==1){e="Cumplida";cl="ok"}else if(x&&x.v==0){e="No cumplida";cl="no"}else if(a[3]<cw){e="Atrasada";cl="no"}else if(a[2]<=cw){e="En curso";cl="wip"}
h+=`<tr><td>${sg(k)}</td><td class="n">${a[0]}<small class="ts">${tsl(k)}</small></td>`;
for(let w=1;w<=15;w++){const on=w>=a[2]&&w<=a[3];h+=`<td class="${w==cw?"cur":""}"><div class="cell ${on?"on":""}" style="${on?`background:var(--${a[1]});opacity:${w<=cw?1:.4}`:""}"></div></td>`}
h+=`<td><span class="chip ${cl}">${e}</span></td></tr>`});$("gt").innerHTML=h}
function rolesHtml(){const cw=curW();$("roles").innerHTML=ROLES.map(r=>{const A=ACT.map((a,i)=>[a,i]).filter(x=>x[0][1]==r[0]);const due=A.filter(x=>x[0][3]<cw).length,done=A.filter(x=>ok("g"+x[1])).length;
return `<div class="role" style="border-top-color:var(--${r[0]})"><b>${r[1]}</b>${r[2]}<small>Debían estar listas: ${due} · Cumplidas: ${done}/${A.length}</small></div>`}).join("")}
function cerHtml(){const cw=curW();let h="<tr><th>Semana</th><th>Fase</th>"+CC.map(c=>`<th>${c[1]}</th>`).join("")+"</tr>";
for(let w=1;w<=14;w++)h+=`<tr class="${w==cw?"cur":""}"><td><b>Semana ${w}</b><small class="ts">${sd(wd(w))} – ${sd(wd(w)+6*DAY)}</small></td><td class="ph">${ph(w)}</td>`+CC.map(c=>{const k="c"+w+c[0];return `<td>${sg(k)}<small class="ts">${tsl(k)}</small></td>`}).join("")+"</tr>";
h+=`<tr class="${cw>=15?"cur":""}"><td><b>Semana 15</b><small class="ts">Lun 30 nov</small></td><td class="ph" colspan="5">ENTREGA FINAL del producto</td></tr>`;$("ct").innerHTML=h}
function stats(){const cnt=ks=>[ks.filter(ok).length,ks.filter(k=>st[k]&&st[k].v==0).length,ks.length];
const card=(t,[a,b,n])=>`<div class="st"><small>${t}</small><b>${a}/${n}</b> <small style="display:inline">(${Math.round(a/n*100)}% · ✗ ${b})</small><div class="bar"><i style="width:${a/n*100}%"></i></div></div>`;
const cer=[];for(let w=1;w<=14;w++)CC.forEach(c=>cer.push("c"+w+c[0]));
$("stats").innerHTML=card("Funcionales",cnt(RF.map(r=>r.id)))+card("No funcionales",cnt(RNF.map(r=>r[0])))+card("Actividades Gantt",cnt(ACT.map((a,i)=>"g"+i)))+card("Ceremonias y evidencias",cnt(cer))}
function banner(){const cw=curW(),m=myAtt(),s=spW(Math.min(cw,15));
$("wkb").innerHTML=`<div><small>Hora exacta (Lima)</small><b id="ck"></b></div><div><small>Ingresaste a esta página</small><b>${fmtS(ENTRY)}</b></div><div><small>Semana del proyecto</small><b>${cw==0?"Inicia el 24 ago":cw>15?"Plazo concluido":`${cw} de 15`+(cw<=15?` · ${sd(wd(cw))} – ${sd(wd(cw)+6*DAY)}`:"")}</b></div><div><small>Entrega final · lunes 30 nov 2026</small><b id="cd"></b></div><div><small>Mi asistencia de hoy</small>${m?`<b class="good">✓ ${m.p} · ${m.t}</b><small>${m.r} · <a href="#" id="chg">cambiar persona/rol</a></small>`:`<button class="pri" id="atb">☑ Marcar asistencia${who?` · ${who}`:""}</button>`}</div><div><small>Datos</small><b>${mode=="compartido"?"🟢 Compartidos con el equipo":mode=="local"?"🟠 Solo en este navegador":mode=="error"?"🔴 Error de sincronización":"⏳ Cargando…"}</b></div>`;tick()}
function tick(){const a=$("ck"),c=$("cd");if(a)a.textContent=fmtS(new Date());if(!c)return;const d=DEAD-limaNow().getTime();
if(d>0){const D=Math.floor(d/DAY),H=Math.floor(d%DAY/36e5),M=Math.floor(d%36e5/6e4),S=Math.floor(d%6e4/1e3);c.textContent=`${D}d ${H}h ${M}m ${S}s`}else c.textContent=d>-DAY?"¡HOY es la entrega!":"Plazo concluido"}
function panel(){const cw=curW(),c=Math.min(cw,15),s=spW(c);let sc="";
if(cw==0)sc="El proyecto inicia el lunes 24 de agosto de 2026.";
else if(cw>15)sc="La fecha de entrega final ya pasó.";
else{const i=c-s[1]+1,n=s[2]-s[1]+1,left=Math.ceil((wd(s[2])+7*DAY-limaNow().getTime())/DAY);
const ev=c==15?"Entrega final del producto":i==1?"Sprint Planning: definir el Sprint Backlog":i==n&&n>1?"Sprint Review + Retrospectiva: demo a Makro y mejoras":"Daily Scrum + refinamiento del Product Backlog";
sc=`<p><b>${s[0]}</b> · semana ${i} de ${n} del sprint · faltan ${left} días para cerrarlo.</p><p>Evento Scrum de esta semana: <b>${ev}</b>.</p>`}
const A=[];ACT.forEach((a,i)=>{if(a[3]<cw&&!ok("g"+i))A.push(["Actividades",a[0]])});
RF.forEach((r,i)=>{if(dueRF(i)<cw&&!ok(r.id))A.push(["Funcionales",r.id+" "+r.n])});
RNF.forEach((r,i)=>{if(dueRNF(i)<cw&&!ok(r[0]))A.push(["No funcionales",r[0]])});
for(let w=1;w<cw&&w<=14;w++)CC.forEach(x=>{if(!ok("c"+w+x[0]))A.push(["Ceremonias/evidencias","Sem "+w+" · "+x[1]])});
const G={};A.forEach(x=>(G[x[0]]=G[x[0]]||[]).push(x[1]));
const al=A.length?`<p class="bad">⚠ ${A.length} elemento(s) atrasado(s)</p>`+Object.keys(G).map(k=>`<details><summary>${k} (${G[k].length})</summary><ul>${G[k].map(t=>`<li>${t}</li>`).join("")}</ul></details>`).join(""):`<p class="good">✓ Sin atrasos por ahora</p>`;
const T=[];ACT.forEach((a,i)=>{if(a[2]<=cw&&cw<=a[3]&&!ok("g"+i))T.push(a[0])});
const cp=[];CC.forEach(x=>{if(cw>=1&&cw<=14&&!ok("c"+cw+x[0]))cp.push(x[1])});
const tw=cw>=1&&cw<=15?`<p>Actividades en curso sin cumplir: <b>${T.length}</b></p>${T.length?`<details><summary>Ver</summary><ul>${T.map(t=>`<li>${t}</li>`).join("")}</ul></details>`:""}<p>Ceremonias/evidencias de la semana pendientes: <b>${cp.length}</b>${cp.length?` (${cp.join(", ")})`:""}</p>`:"<p>—</p>";
$("pn").innerHTML=`<div class="pc"><h3>🧭 ¿En qué parte de Scrum estamos?</h3>${sc}</div><div class="pc"><h3>⏰ Lo que toca esta semana</h3>${tw}</div><div class="pc"><h3>🚨 Atrasos a recuperar</h3>${al}</div>`}
function attBy(){const m={};Object.values(att).forEach(a=>(m[a.d]=m[a.d]||[]).push(a));return m}
function calHtml(){const B=attBy(),first=Date.UTC(cy,cm,1),off=(new Date(first).getUTCDay()+6)%7,dim=new Date(Date.UTC(cy,cm+1,0)).getUTCDate(),rows=Math.ceil((off+dim)/7),td=today();
$("cmt").textContent=new Date(first).toLocaleDateString("es-PE",{month:"long",year:"numeric",timeZone:"UTC"});
let h='<div class="ch">Sem</div>'+["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(x=>`<div class="ch">${x}</div>`).join("");
for(let r=0;r<rows;r++){const mon=first+(r*7-off)*DAY,w=weekOf(mon+12*36e5);h+=`<div class="cw">${w>=1&&w<=15?"S"+w:""}</div>`;
for(let c=0;c<7;c++){const t=mon+c*DAY,d=new Date(t),k=d.toISOString().slice(0,10),n=(B[k]||[]).length;
h+=`<div class="cd ${d.getUTCMonth()==cm?"":"oth"} ${k==td?"tdy":""} ${k=="2026-11-30"?"dl":""} ${k==sel?"sel":""}" data-d="${k}">${d.getUTCDate()}${k=="2026-11-30"?"🏁":""}${n?`<i>✓${n}</i>`:""}</div>`}}
$("cgr").innerHTML=h;
const t=Date.parse(`${sel}T12:00:00Z`),w=weekOf(t),s=spW(w),L2=(B[sel]||[]).slice().sort((a,b)=>{const aTime=Date.parse(a.at),bTime=Date.parse(b.at);return (Number.isNaN(aTime)?0:aTime)-(Number.isNaN(bTime)?0:bTime)});
$("cdt").innerHTML=`<b>${new Date(t).toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</b><br>${w>=1&&w<=15?`Semana ${w} · ${s[0]}`:"Fuera del cronograma"}${sel=="2026-11-30"?" · 🏁 ENTREGA FINAL":""}<p><b>Asistencia del día (${L2.length}):</b></p>${L2.length?"<ul class=\"attendance-list\">"+L2.map(a=>`<li><b>${a.p}</b> · ${a.r} · ${a.d} · <time datetime="${a.at||""}">${a.at?fmtS(new Date(a.at)):a.t}</time></li>`).join("")+"</ul>":"<p>Nadie registró asistencia.</p>"}${sel==td&&!myAtt()?'<button class="pri" id="mak">☑ Marcar mi asistencia de hoy</button>':""}`}
function render(){rfHtml();rnfHtml();ganttHtml();rolesHtml();cerHtml();stats();banner();panel();if(!$("mdc").hidden)calHtml()}
async function getNames(){if(!user||!user.profiles)return;const ids=[...new Set([...Object.values(st).map(x=>x.by),...Object.values(att).map(x=>x.uid)])].filter(i=>i&&i!==me.id&&!(i in names));if(!ids.length)return;
ids.forEach(i=>names[i]="");try{const p=await user.profiles(ids);ids.forEach(i=>names[i]=(p[i]&&p[i].name)||"");render()}catch(e){console.error("No se pudieron cargar los nombres de los usuarios.",e)}}
function maybePrompt(){if(prompted||!attReady)return;prompted=true;if(!who)openAtt()}
function openAtt(){$("mwho").innerHTML=WHO.map(w=>`<button class="pw" data-w="${w[0]}"><b>${w[0]}</b><small>${w[1]}</small></button>`).join("");$("mda").hidden=false}
async function saveMark(k,v){if(!who){openAtt();return}const x={v,t:fmt(new Date()),by:who};st[k]=x;if(db){try{await db.doc("marks/"+k).set(x)}catch(e){delete st[k];alert("No se pudo guardar. Pide acceso de Colaborador al dueño de la página.")}}else SV("mk3m",st);render()}
async function saveAtt(n){const i=WHO.findIndex(x=>x[0]==n);if(i<0)return;who=n;try{localStorage.setItem("mkwho",n)}catch(e){}$("mda").hidden=true;const d=today(),id=d+"_u"+i;
if(!att[id]){const now=new Date(),x={d,p:n,r:WHO[i][1],at:now.toISOString(),t:fmt(now)};att[id]=x;if(db){try{await db.doc("asist/"+id).set(x)}catch(e){delete att[id];console.error("No se pudo guardar la asistencia compartida.",e);alert("No se pudo registrar la asistencia compartida. Verifica el acceso al servicio y vuelve a intentarlo.")}}else if(!SV("mk3a",att)){delete att[id];alert("No se pudo guardar la asistencia en este navegador. Comprueba el espacio disponible y vuelve a intentarlo.")}}render()}
document.addEventListener("click",e=>{const t=e.target,b=t.closest("button[data-k]");
if(b){const k=b.dataset.k,v=+b.dataset.v,x=st[k];if(x&&(x.v==1||x.v===v))return;saveMark(k,v);return}
const w=t.closest("button[data-w]");if(w)return saveAtt(w.dataset.w);if(t.id=="chg"){e.preventDefault();return openAtt()}if(t.id=="atb"||t.id=="mak")return openAtt();
const d=t.closest(".cd");if(d){sel=d.dataset.d;calHtml()}});
$("calb").onclick=()=>{sel=today();cm=Number(sel.slice(5,7))-1;cy=Number(sel.slice(0,4));$("mdc").hidden=false;calHtml()};
$("cx").onclick=()=>$("mdc").hidden=true;$("cp").onclick=()=>{cm--;if(cm<0){cm=11;cy--}calHtml()};$("cn").onclick=()=>{cm++;if(cm>11){cm=0;cy++}calHtml()};
$("man").onclick=()=>$("mda").hidden=true;
$("q").oninput=rfHtml;$("fp").onclick=e=>{onlyP=!onlyP;e.target.textContent=onlyP?"Ver todos":"Ver solo pendientes";rfHtml()};
$("th").onclick=()=>{const r=document.documentElement;r.dataset.theme=getComputedStyle(r).getPropertyValue("--bg").trim()=="#0d1324"?"light":"dark"};
$("lg").innerHTML=ROLES.map(r=>`<span><i style="background:var(--${r[0]})"></i>${r[1]}</span>`).join("");

$("dl").value=L("mk3d").u||"";$("dl").onchange=()=>SV("mk3d",{u:$("dl").value});
$("dgo").onclick=()=>{const u=$("dl").value.trim();if(/^https?:\/\//.test(u))window.open(u,"_blank","noopener")};
render();setInterval(tick,1000);setInterval(render,60000);
(async()=>{try{if(window.claude){user=await claude.use("user");db=await claude.use("db")}}catch(e){console.error("No se pudo conectar con el servicio compartido; se usará almacenamiento local.",e)}
if(user){try{me=await user.me();if(me.id)names[me.id]=me.name}catch(e){console.error("No se pudo identificar al usuario conectado.",e)}}
if(db){mode="compartido";const syncError=(message,e)=>{mode="error";console.error(message,e);render();alert(message)};
db.collection("marks").onSnapshot(s=>{st={};s.docs.forEach(d=>st[d.id]=d.data());getNames();render()},e=>syncError("Se perdió la sincronización de las tareas compartidas. Recarga la página o verifica el servicio.",e));
db.collection("asist").onSnapshot(s=>{att={};s.docs.forEach(d=>att[d.id]=d.data());attReady=true;getNames();render();maybePrompt()},e=>syncError("No se pudo cargar la asistencia compartida. Verifica el acceso al servicio y recarga la página.",e))}
else{mode="local";st=L("mk3m");att=L("mk3a");attReady=true;render();maybePrompt()}})();
