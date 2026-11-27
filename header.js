
fetch("header.html")
  .then(response => {
    if (!response.ok) throw new Error("Header yüklənmədi");
    return response.text();
  })
  .then(html => {
    const container = document.getElementById("siteHeader");
    if (!container) return;

    container.innerHTML = html;

    const currentPage = location.pathname.split("/").pop() || "index.html";
    const nav = container.querySelector("#mainNav");
    const links = nav.querySelectorAll("a");

    links.forEach(link => {
      const url = new URL(link.getAttribute("href"), location.href);
      const targetPage = url.pathname.split("/").pop() || "index.html";

      if (targetPage === currentPage && !url.hash) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });

    const menuToggle = container.querySelector("#menuToggle");

    menuToggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(opened));
      menuToggle.textContent = opened ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  })
  .catch(error => console.error(error));
