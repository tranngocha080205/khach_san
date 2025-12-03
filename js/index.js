async function processIncludes() {
  const includes = document.querySelectorAll("include[src]");
  for (const inc of includes) {
    const src = inc.getAttribute("src");
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Failed to fetch ${src}`);
      const html = await res.text();
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      inc.replaceWith(wrapper);
    } catch (err) {
      console.error(err);
    }
  }
}

document.addEventListener("DOMContentLoaded", processIncludes);
