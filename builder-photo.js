// Load the matching product photo from AndyMark's public product search.
// A photo is accepted only when the result's SKU matches this BOM item.
const officialPhotoCache = new Map();
const partImageObserver = new MutationObserver(() => {
  const item = questions[currentQuestion];
  if (item) loadOfficialPhoto(item);
});

partImageObserver.observe(partImage, { attributes: true, attributeFilter: ['src'] });

async function loadOfficialPhoto(item) {
  const caption = document.getElementById('imageCaption');
  const skuMatch = item.name.match(/\(([^)]+)\)$/);
  if (!skuMatch) {
    caption.textContent = 'Could not find a part number for this item.';
    return;
  }
  const sku = skuMatch[1];
  const currentItem = () => questions[currentQuestion] === item;
  caption.textContent = `Finding the exact AndyMark photo for ${sku}…`;

  try {
    let photoPromise = officialPhotoCache.get(sku);
    if (!photoPromise) {
      photoPromise = findAndyMarkPhoto(sku);
      officialPhotoCache.set(sku, photoPromise);
    }
    const photo = await photoPromise;
    if (!currentItem()) return;

    if (!photo) {
      caption.textContent = `AndyMark did not return a verified product photo for ${sku}; this part is shown with a simplified illustration.`;
      return;
    }

    partImage.onload = () => {
      if (currentItem()) caption.textContent = `Official AndyMark product photo · ${sku}`;
    };
    partImage.onerror = () => {
      if (currentItem()) caption.textContent = `The official photo for ${sku} could not load; showing the simplified illustration instead.`;
    };
    partImage.src = photo;
  } catch (error) {
    if (currentItem()) caption.textContent = `Could not load the AndyMark photo for ${sku}; showing the simplified illustration instead.`;
  }
}

async function findAndyMarkPhoto(sku) {
  const searchUrl = new URL('https://www.andymark.com/search/suggest.json');
  searchUrl.searchParams.set('q', sku);
  searchUrl.searchParams.set('resources[type]', 'product');
  searchUrl.searchParams.set('resources[limit]', '10');

  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) throw new Error('AndyMark product search failed');
  const searchData = await searchResponse.json();
  const products = searchData.resources?.results?.products || [];
  const wantedSku = normalizeSku(sku);

  for (const product of products) {
    const handle = product.handle || String(product.url || '').match(/\/products\/([^/?]+)/)?.[1];
    if (!handle) continue;

    // Shopify's product JSON includes variant SKUs, allowing us to avoid showing a similar but wrong part.
    const productResponse = await fetch(`https://www.andymark.com/products/${encodeURIComponent(handle)}.js`);
    if (!productResponse.ok) continue;
    const details = await productResponse.json();
    const hasExactSku = (details.variants || []).some(variant => normalizeSku(variant.sku || '') === wantedSku);
    if (!hasExactSku) continue;

    const image = details.featured_image || details.images?.[0] || product.featured_image || product.image;
    if (typeof image === 'string' && image.length > 0) return new URL(image, 'https://www.andymark.com').href;
  }

  return null;
}

function normalizeSku(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Load the points/store/leaderboard UI without changing the existing Builder quiz.
const gameUiScript = document.createElement('script');
gameUiScript.src = 'game-ui.js';
document.body.appendChild(gameUiScript);
