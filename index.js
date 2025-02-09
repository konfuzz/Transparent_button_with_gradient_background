let clipboard = new ClipboardJS('.copy');
let color1 = document.querySelector('#color1');
let color2 = document.querySelector('#color2');
let radius = document.querySelector('#radius');
let stroke = document.querySelector('#stroke');
renderLinkIcon(color1.value, color2.value, Number(radius.value), Number(stroke.value));
document.querySelectorAll('input').forEach(item => item.addEventListener('input', () => renderLinkIcon(color1.value, color2.value, Number(radius.value), Number(stroke.value))))

clipboard.on('success', function (e) {
  e.trigger.classList.add('copied');
  setTimeout(function () {
    e.trigger.classList.remove('copied');
  }, 2000);
});

function renderLinkIcon(color1, color2, radius, stroke) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const iconDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');

  stop1.setAttribute('stop-color', encodeURIComponent(color1));
  stop1.setAttribute('offset', '0');
  stop2.setAttribute('stop-color', encodeURIComponent(color2));
  stop2.setAttribute('offset', '1');

  linearGradient.appendChild(stop1);
  linearGradient.appendChild(stop2);
  linearGradient.setAttribute('id', 'Gradient');
  linearGradient.setAttribute('x1', '40%');
  linearGradient.setAttribute('x2', '55%');
  linearGradient.setAttribute('y1', '100%');
  linearGradient.setAttribute('y2', '0');
  linearGradient.setAttribute('gradientUnits', 'userSpaceOnUse');

  iconDefs.appendChild(linearGradient);
  svg.appendChild(iconDefs);

  iconPath.setAttribute('height', "100%");
  iconPath.setAttribute('width', "100%");
  // iconPath.setAttribute('rx', radius+stroke/2);
  iconPath.setAttribute('ry', radius);
  iconPath.setAttribute('fill', 'transparent');
  iconPath.setAttribute('stroke-width', stroke*2);
  iconPath.setAttribute('stroke', 'url(%23Gradient)');


  svg.appendChild(iconPath);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  let s = new XMLSerializer();
  let svgN = s.serializeToString(svg);
  document.querySelector('.button').style.background = "url('data: image/svg+xml; utf8," + svgN +"')";
  document.querySelector('.button').style.borderRadius = `${radius}px`;
  document.querySelector('.language-css').textContent = `background: url('data: image/svg+xml; utf8, ${svgN}')`;
  hljs.highlightAll();
}
