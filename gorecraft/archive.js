/* Crimson Codex and The Keep share the site's project catalogue. */
(() => {
  'use strict';
  const archive = window.MAYK;
  if (!archive) return;
  const design = document.body.dataset.design;
  const categories = archive.categories;
  const count = archive.counts();
  const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const pad = number => String(number).padStart(2, '0');
  const chamberInfo = [
    ['Web apps', 'BROWSER-BASED ODDITIES', 'Small worlds that run in your browser. Creative prompts, chiptunes and a little sacred geometry.'],
    ['TTRPG tools', 'THE GAME MASTER’S QUARTERS', 'Tools for the table: character primers, spellbooks, party tracking and Pathfinder subsystems.'],
    ['LifeBranch', 'A LIVING DESKTOP', 'A desktop built around one cellular automaton, with a family of tools that share its visual language.'],
    ['ASCII art', 'THE GLYPH WORKSHOP', 'Fluids, camera feeds and moving pictures, translated into the language of the terminal.'],
    ['Audio & sound', 'THE LISTENING ROOM', 'Old sound chips, game music and the tools to play, collect and explore them.'],
    ['Userscripts', 'THE COLLECTOR’S PASSAGE', 'Little helpers for gathering things from the web.'],
    ['Software', 'THE MACHINE ROOM', 'Standalone tools for archiving, converting, decoding and making things behave differently.']
  ];
  document.querySelectorAll('[data-total]').forEach(element => { element.textContent = count.items; });
  document.querySelectorAll('[data-categories]').forEach(element => { element.textContent = count.categories; });

  const projectHTML = item => `<li><a class="project${item.sub ? ' sub' : ''}" href="${escape(item.url)}" target="_blank" rel="noopener"><div class="project-title"><span>${escape(item.name)}</span><span class="badge">${escape(item.badge.toUpperCase())}</span><span class="project-arrow" aria-hidden="true">↗</span></div><p>${escape(item.desc)}</p></a></li>`;
  let selectedCategory = -1;
  let query = '';
  const mount = document.querySelector('[data-archive]');
  const filterNav = document.querySelector('[data-category-tabs]');
  if (filterNav) {
    filterNav.innerHTML = [{name:'All projects', index:-1}, ...categories.map((category, index) => ({name:category.name, index}))].map(({name,index}) => `<button type="button" data-category="${index}" aria-pressed="${index === -1}">${escape(name)}</button>`).join('');
    filterNav.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      selectedCategory = Number(button.dataset.category);
      filterNav.querySelectorAll('button').forEach(element => element.setAttribute('aria-pressed', String(element === button)));
      renderArchive();
    });
  }
  function renderArchive() {
    let visibleCount = 0;
    mount.innerHTML = categories.map((category, index) => {
      if (selectedCategory !== -1 && selectedCategory !== index) return '';
      const items = category.items.filter(item => `${item.name} ${item.desc} ${category.name} ${item.badge}`.toLowerCase().includes(query));
      if (!items.length) return '';
      visibleCount += items.length;
      return `<section class="project-category" aria-labelledby="category-${index}"><div class="category-heading"><span class="category-code" aria-hidden="true">${pad(index + 1)}</span><h3 id="category-${index}">${escape(category.name)}</h3><span>${pad(items.length)} ENTRIES</span></div><ul class="projects">${items.map(projectHTML).join('')}</ul></section>`;
    }).join('');
    document.querySelector('[data-empty]').hidden = visibleCount !== 0;
    document.querySelector('[data-results]').textContent = `${visibleCount} of ${count.items} projects shown.`;
  }
  document.querySelector('[data-search]').addEventListener('input', event => {
    query = event.target.value.trim().toLowerCase();
    renderArchive();
  });
  renderArchive();

  // Draw at the artwork's native pixel grid; CSS scales with nearest neighbours.
  function polygon(context, points, fill, stroke) {
    context.beginPath();
    points.forEach(([x,y], index) => { if (index) context.lineTo(Math.round(x), Math.round(y)); else context.moveTo(Math.round(x), Math.round(y)); });
    context.closePath();
    if (fill) { context.fillStyle = fill; context.fill(); }
    if (stroke) { context.strokeStyle = stroke; context.lineWidth = 1; context.stroke(); }
  }
  function line(context, points, color, width = 1) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    points.forEach(([x,y], index) => { if (index) context.lineTo(x,y); else context.moveTo(x,y); });
    context.stroke();
  }
  function stipple(context, colorA, colorB) {
    const tile = document.createElement('canvas');
    tile.width = tile.height = 2;
    const tileContext = tile.getContext('2d');
    tileContext.fillStyle = colorA;
    tileContext.fillRect(0,0,2,2);
    tileContext.fillStyle = colorB;
    tileContext.fillRect(0,0,1,1);
    tileContext.fillRect(1,1,1,1);
    return context.createPattern(tile, 'repeat');
  }
  function drawRoom(context, cx, cy, size, halfWidth, height, palette, selected) {
    const [background, deep, ink, light] = palette;
    const halfHeight = halfWidth / 2;
    const originY = cy - (size - 1) * halfHeight;
    const point = (x,y,z=0) => [cx + (x-y) * halfWidth, originY + (x+y) * halfHeight - z];
    const diamond = (x,y,z=0) => {
      const [px,py] = point(x,y,z);
      return [[px,py-halfHeight],[px+halfWidth,py],[px,py+halfHeight],[px-halfWidth,py]];
    };
    const grain = stipple(context, deep, background);
    const stone = stipple(context, deep, ink);
    for (let sum=0; sum < size*2; sum++) {
      for(let y=0; y<size; y++) {
        const x=sum-y;
        if(x<0 || x>=size) continue;
        polygon(context, diamond(x,y), deep, background);
        const [px,py]=point(x,y);
        if((x*7+y*11)%5===0) {
          context.fillStyle = ink;
          context.fillRect(px-3,py,1,1);
          context.fillRect(px+2,py+2,1,1);
        }
      }
    }
    const bottom = point(size-1,size-1);
    polygon(context, [[cx-size*halfWidth,cy],[bottom[0],bottom[1]+halfHeight],[cx+size*halfWidth,cy],[cx+size*halfWidth,cy+7],[bottom[0],bottom[1]+halfHeight+7],[cx-size*halfWidth,cy+7]], grain, ink);
    function block(x,y,tall) {
      const top = diamond(x,y,tall);
      const base = diamond(x,y);
      polygon(context, [top[1],top[2],base[2],base[1]], deep, background);
      polygon(context, [top[2],top[3],base[3],base[2]], stone, background);
      polygon(context, top, background, selected ? light : ink);
      line(context, [top[2],base[2]], ink);
    }
    for(let index=0;index<size;index++) {
      block(index,0,height);
      if(index>0) block(0,index,height);
    }
    block(size-1,size-1,5);
    block(size-1,0,height);
    block(0,size-1,height);
    if(selected) {
      context.fillStyle = light;
      context.font='14px VGA';
      context.fillText('@',cx+15,cy+17);
    }
  }
  function crisp(canvas) {
    // Canvas text and polygon edges are quantized too, preserving four exact inks.
    const context=canvas.getContext('2d');
    const image=context.getImageData(0,0,canvas.width,canvas.height);
    const palette = ['#000000','#012429','#13d5ec','#cef7fe'].map(hex => [1,3,5].map(index=>parseInt(hex.slice(index,index+2),16)));
    for(let index=0;index<image.data.length;index+=4) {
      let closest=palette[0], best=Infinity;
      for(const color of palette) {
        const distance=(image.data[index]-color[0])**2+(image.data[index+1]-color[1])**2+(image.data[index+2]-color[2])**2;
        if(distance<best) {best=distance;closest=color;}
      }
      image.data[index]=closest[0];image.data[index+1]=closest[1];image.data[index+2]=closest[2];image.data[index+3]=255;
    }
    context.putImageData(image,0,0);
  }
  const positions=[[280,64],[145,133],[414,133],[280,202],[145,271],[414,271],[280,340]];
  let selectedChamber=0;
  function drawMap() {
    const canvas=document.querySelector('[data-art="map"]');
    if(!canvas) return;
    const context=canvas.getContext('2d');
    context.imageSmoothingEnabled=false;
    context.fillStyle='#000';context.fillRect(0,0,560,400);
    const routes=[[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]];
    routes.forEach(([start,end]) => {
      line(context,[positions[start],positions[end]],'#012429',16);
      context.setLineDash([2,5]);
      line(context,[positions[start],positions[end]],'#13d5ec');
      context.setLineDash([]);
    });
    positions.forEach(([x,y],index)=>drawRoom(context,x,y,5,13,18,['#000000','#012429','#13d5ec','#cef7fe'],index===selectedChamber));
    crisp(canvas);
  }
  function selectChamber(index) {
    selectedChamber=index;
    const category=categories[index];
    document.querySelector('[data-chamber-code]').textContent=`${pad(index+1)} / ${pad(categories.length)}`;
    document.querySelector('[data-chamber-title]').textContent=category.name;
    document.querySelector('[data-chamber-subtitle]').textContent=chamberInfo[index][1];
    document.querySelector('[data-chamber-description]').textContent=chamberInfo[index][2];
    document.querySelector('[data-chamber-projects]').innerHTML=`<ul class="projects">${category.items.map(projectHTML).join('')}</ul>`;
    document.querySelector('[data-chamber-projects]').scrollTop=0;
    document.querySelector('[data-chamber-status]').textContent=`${category.name}: ${category.items.length} projects.`;
    document.querySelectorAll('[data-chamber]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.chamber)===index)));
    drawMap();
  }
  if(design==='keep') {
    document.querySelector('[data-map-markers]').innerHTML=positions.map(([x,y],index)=>`<button class="map-marker" type="button" style="left:${x/560*100}%;top:${y/400*100}%" data-chamber="${index}" aria-label="Chamber ${index+1}: ${escape(categories[index].name)}" aria-controls="chamber-projects" aria-pressed="${index===0}">${pad(index+1)}</button>`).join('');
    document.querySelector('[data-chamber-nav]').innerHTML=categories.map((category,index)=>`<button type="button" data-chamber="${index}" aria-controls="chamber-projects" aria-pressed="${index===0}"><span>${pad(index+1)}</span>${escape(chamberInfo[index][0])}</button>`).join('');
    document.querySelector('.map-panel').addEventListener('click',event => {
      const button=event.target.closest('[data-chamber]');
      if(button) selectChamber(Number(button.dataset.chamber));
    });
    selectChamber(0);
  }
  document.fonts.ready.then(drawMap);
  archive.intro({duration:600, stagger:['.project-category']});
})();
