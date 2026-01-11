/* =========================================================
 * GLOBAL UI HANDLER
 * ========================================================= */

/* =====================
 * NAVBAR
 * ===================== */
async function updateNavbarTitle(fileName) {
  const { files } = await import("./files.js");
  const file = files[fileName];
  if (!file) return;

  const titleElement = document.getElementById("navbar-title");
  if (titleElement) {
    titleElement.textContent = `${file.title} — Portfolio — Visual Studio Code`;
  }
}

window.addEventListener("activeFileChanged", (event) => {
  updateNavbarTitle(event.detail.name);
});

/* =====================
 * SIDEBAR
 * ===================== */
function updateSidebarUI(fileName) {
  document.querySelectorAll(".file-item").forEach((item) => {
    const isActive = item.dataset.file === fileName;
    const text = item.querySelector("span");

    item.classList.toggle("bg-[#37373d]", isActive);
    // item.classList.toggle("hover:bg-[#2a2d2e]", !isActive);
    text.classList.toggle("text-white", isActive);
    text.classList.toggle("text-gray-400", !isActive);
  });
}

window.setActiveFile = async function (fileName) {
  const module = await import("./files.js");
  module.setActiveFile(fileName);
};

/* =====================
 * TAB BAR
 * ===================== */
function updateTabBarUI(fileName) {
  document.querySelectorAll(".tab-item").forEach((tab) => {
    const isActive = tab.dataset.file === fileName;
    const title = tab.querySelector(".tab-title");

    tab.classList.toggle("bg-[#1e1e1e]", isActive);
    tab.classList.toggle("border-t", isActive);
    tab.classList.toggle("border-primary", isActive);
    tab.classList.toggle("cursor-default", isActive);

    tab.classList.toggle("bg-[#2d2d2d]", !isActive);
    // tab.classList.toggle("hover:bg-[#2a2d2e]", !isActive);
    tab.classList.toggle("cursor-pointer", !isActive);

    title.classList.toggle("text-white", isActive);
    title.classList.toggle("text-gray-400", !isActive);
  });

  window.activeFileName = fileName;
}

async function updateBreadcrumbUI(fileName) {
  const { files } = await import("./files.js");
  const file = files[fileName];
  if (!file) return;

  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb) return;

  breadcrumb.innerHTML = "";

  const parts = file.path.split("/");

  parts.slice(0, -1).forEach((part) => {
    const span = document.createElement("span");
    span.textContent = part;

    const chevron = document.createElement("span");
    chevron.className = "material-symbols-outlined !text-[14px]";
    chevron.textContent = "chevron_right";

    breadcrumb.append(span, chevron);
  });

  const wrapper = document.createElement("div");
  wrapper.className = "flex items-center gap-1";

  const icon = document.createElement("i");
  icon.className = `fa-brands fa-${file.icon} !text-[14px] ${file.iconColor}`;

  const title = document.createElement("span");
  title.className = "text-gray-300";
  title.textContent = file.title;

  wrapper.append(icon, title);
  breadcrumb.append(wrapper);
}

window.switchToTab = function (fileName) {
  window.setActiveFile(fileName);
};

window.closeTab = function (fileName, event) {
  if (event) event.stopPropagation();

  const tabs = document.querySelectorAll(".tab-item");
  if (tabs.length <= 1) return;

  const tab = document.querySelector(`[data-file="${fileName}"]`);
  if (!tab) return;

  tab.remove();

  if (fileName === window.activeFileName) {
    const firstTab = document.querySelector(".tab-item");
    if (firstTab) {
      window.switchToTab(firstTab.dataset.file);
    }
  }
};

/* =====================
 * PAGE CONTENT
 * ===================== */
async function updateContent(fileName) {
  const { files } = await import("./files.js");
  const file = files[fileName];
  if (!file) return;

  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.add("hidden");
  });

  const activePage = document.querySelector(`[data-page="${file.content}"]`);

  if (activePage) {
    activePage.classList.remove("hidden");
  }

  window.dispatchEvent(
    new CustomEvent("pageContentChanged", {
      detail: {
        title: file.title,
        content: file.content,
      },
    })
  );
}

window.addEventListener("activeFileChanged", (event) => {
  updateTabBarUI(event.detail.name);
  updateBreadcrumbUI(event.detail.name);
  updateContent(event.detail.name);
});

/* =====================
 * INIT
 * ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_FILE = "About.js";

  updateNavbarTitle(DEFAULT_FILE);
  updateSidebarUI(DEFAULT_FILE);
  updateTabBarUI(DEFAULT_FILE);
  updateBreadcrumbUI(DEFAULT_FILE);
  updateContent(DEFAULT_FILE);
});
