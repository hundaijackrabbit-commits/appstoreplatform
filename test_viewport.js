// Script to test viewport sizes
const sizes = [
  { width: 360, height: 640, name: 'Mobile Small' },
  { width: 390, height: 844, name: 'Mobile Medium' }, 
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 1024, height: 768, name: 'Desktop Small' },
  { width: 1440, height: 900, name: 'Desktop Large' }
];

async function testViewport(size) {
  console.log(`\n=== Testing ${size.name} (${size.width}x${size.height}) ===`);
  
  // Check for text overflow
  const overflowElements = document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > el.clientWidth && el.tagName !== 'HTML' && el.tagName !== 'BODY') {
      console.log('Overflow detected:', el.tagName, el.className);
    }
  });
  
  // Check button widths
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    if (btn.offsetWidth > window.innerWidth) {
      console.log(`Button ${i} too wide:`, btn.offsetWidth, 'px vs', window.innerWidth, 'px');
    }
  });
  
  // Check text contrast
  const textElements = document.querySelectorAll('h1, h2, h3, p, span');
  // This would need more complex checking in a real scenario
}

console.log('Viewport testing script loaded. Run testViewport(size) to test specific sizes.');
