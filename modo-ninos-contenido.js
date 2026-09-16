(()=>{
'use strict';
if(window.__ANDINA_KIDS_CONTENT_SIMPLE__) return;
window.__ANDINA_KIDS_CONTENT_SIMPLE__=true;
const simple={
'Ubicación geográfica':['¿Dónde está?','Está en el centro y parte del occidente de Colombia. Tiene montañas, valles y lugares altos.'],
'Departamentos y delimitación':['¿Qué territorios incluye?','La Región Andina reúne territorios de varios departamentos. La lista puede cambiar según la fuente y la forma de delimitar la región.'],
'Relieve':['Montañas y relieve','Tiene tres cordilleras principales: Occidental, Central y Oriental. También hay valles, cañones y altiplanos.'],
'Clima y pisos térmicos':['Clima según la altura','La altura cambia la temperatura. Por eso encontramos zonas cálidas, templadas, frías y de páramo.'],
'Precipitaciones':['¿Cuánto llueve?','La lluvia no es igual en toda la región. Cambia según la altura, el relieve y el lugar.'],
'Hidrografía':['Ríos y agua','Los ríos Magdalena y Cauca forman valles importantes. Los páramos, humedales y bosques ayudan a cuidar el agua.'],
'Ecosistemas':['Lugares de la naturaleza','Hay bosques, humedales, páramos y otros ecosistemas de montaña.'],
'Biodiversidad':['Animales y plantas','Hay muchas especies de plantas y animales adaptadas a las diferentes alturas.'],
'Especies amenazadas y conservación':['Especies que debemos cuidar','Algunas especies y sus hogares necesitan protección. Las áreas protegidas y la restauración ayudan a conservarlos.'],
'Población':['¿Dónde vive la gente?','En el Atlas del DANE de 2005, cerca del 70 % de la población de Colombia estaba en la Región Andina. Es un dato histórico.'],
'Distribución urbana y rural':['Ciudad y campo','Muchas personas viven en ciudades, pero también hay comunidades rurales relacionadas con la agricultura y otras actividades.'],
'Principales ciudades':['Ciudades importantes','Entre las ciudades destacadas están Bogotá, Medellín, Cali, Bucaramanga, Cúcuta, Manizales, Pereira, Armenia, Ibagué, Neiva, Popayán, Tunja y Pasto.'],
'Comunidades y diversidad cultural':['Personas y culturas','Hay comunidades campesinas, indígenas y poblaciones urbanas. Sus costumbres cambian entre territorios.'],
'Cultura':['Tradiciones','La cultura se expresa en comidas, música, fiestas, artesanías, ropa y otras tradiciones.'],
'Urbanización':['Crecimiento de las ciudades','Cuando las ciudades crecen, cambian las viviendas, los caminos y la relación con el campo.'],
'Problemáticas sociales':['Retos de las personas','Hay diferencias en oportunidades, educación, salud, empleo y servicios entre distintos lugares.'],
'Sector primario':['Trabajo del campo','Incluye agricultura, ganadería, minería y otros recursos. Algunos productos son café, papa, maíz, flores, frutas y leche.'],
'Sector secundario':['Fábricas y transformación','Aquí se transforman materias primas. Hay industrias de alimentos, bebidas, textiles y otras manufacturas.'],
'Sector terciario':['Servicios','Incluye comercio, transporte, turismo, educación, salud, tecnología, cultura y servicios financieros.'],
'Productos principales':['Productos','El café, la papa, el maíz, las flores, el fique, la panela, la leche, el cacao y frutas aparecen en el proyecto.'],
'Comercio y exportaciones':['Comercio','Los productos se transportan y venden en otros lugares. Algunos, como el café y las flores, también se exportan.'],
'Vías y conectividad':['Caminos y conexiones','Las personas y los productos se mueven por carreteras, terminales, aeropuertos y otros corredores.'],
'Turismo':['Viajes y turismo','Hay turismo cultural, de naturaleza y de aventura. Las ciudades, el paisaje cafetero y las montañas son parte de esta actividad.'],
'Problemáticas económicas':['Retos de la economía','Algunos retos son el empleo, la informalidad, las diferencias económicas y los impactos sobre la naturaleza.'],
'Presión sobre el agua':['Cuidemos el agua','Problema: el agua puede contaminarse o escasear. Causas: cambios en el territorio y algunas actividades humanas. Consecuencias: afecta a personas, trabajos y ecosistemas. Afectados: comunidades y naturaleza. Soluciones: proteger cuencas y páramos, usar el agua con cuidado y restaurar ecosistemas.'],
'Pérdida de ecosistemas':['Cuidemos la naturaleza','Problema: algunos bosques y páramos se reducen o se separan. Causas: cambios en el uso del suelo y actividades humanas. Consecuencias: se pierden hábitats y biodiversidad. Afectados: animales, plantas y personas. Soluciones: proteger, restaurar y cuidar los ecosistemas.'],
'Cambio climático':['Cuidemos el clima','Problema: el clima está cambiando y afecta ecosistemas y agua. Causas: calentamiento global y otras presiones. Consecuencias: cambios en la naturaleza y en el agua disponible. Afectados: especies, ecosistemas y comunidades. Soluciones: conservar, restaurar y adaptarnos a los cambios.']
};
function apply(){
 document.querySelectorAll('.guide-detail').forEach(card=>{
  const title=card.querySelector('summary b');
  const data=title&&simple[title.textContent.trim()];
  if(!data)return;
  title.textContent=data[0];
  const p=card.querySelector('p'); if(p)p.textContent=data[1];
 });
 document.querySelectorAll('.problem-guide-grid article').forEach(card=>{
  const h=card.querySelector('h3'); if(!h)return;
  const key=Object.keys(simple).find(k=>h.textContent.includes(k));
  if(!key)return;
  const text=simple[key][1];
  const parts=text.split(' ');
  const labels=['Problema:','Causas:','Consecuencias:','Afectados:','Soluciones:'];
  const dl=card.querySelector('dl');
  if(dl){ const ds=[...dl.querySelectorAll('dt')], dds=[...dl.querySelectorAll('dd')];
    const chunks=labels.map(l=>{const i=text.indexOf(l);return i<0?'':text.slice(i+labels[labels.indexOf(l)].length,text.indexOf(labels[labels.indexOf(l)+1]||'\uFFFF')).trim()});
    ds.forEach((d,i)=>{if(labels[i])d.textContent=labels[i]});
    dds.forEach((d,i)=>{if(chunks[i])d.textContent=chunks[i]});
  }
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,2800),{once:true});
else setTimeout(apply,2800);
setTimeout(apply,5000);
})();
