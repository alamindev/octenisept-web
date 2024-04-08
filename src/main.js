/**
 * alpine
 */
const intersect = document.createElement("script");
intersect.onload = () => {
  const alpine = document.createElement("script");
  alpine.src =
    "https://www.gesundleben-apotheken.de/assets/vendor/alpinejs.3.10.5.min.js";
  document.body.append(alpine);
};
intersect.src = "https://unpkg.com/@alpinejs/intersect@3.x.x/dist/cdn.min.js";
document.body.append(intersect);

/**
 * js
 */
// import './js/index.js';

/**
 * css
 */
import './css/main.css';

/**
 * auto import all template files
 */
require.context('@/twig/templates', true, /\.twig$/)
