// src/store/files.js
export const files = {
  "Home.css": {
    name: "Home.css",
    title: "Home.css",
    path: "src/pages/home.astro",
    icon: "css",
    iconColor: "text-purple-500",
    content: "home",
    active: false,
  },
  "About.js": {
    name: "About.js",
    title: "About.js",
    path: "src/pages/about.astro",
    icon: "js",
    iconColor: "text-yellow-500",
    content: "about",
    active: true,
  },
  "Skills.php": {
    name: "Skills.php",
    title: "Skills.php",
    path: "src/pages/skills.astro",
    icon: "php",
    iconColor: "text-green-500",
    content: "skills",
    active: false,
  },
  "Projects.dart": {
    name: "Projects.dart",
    title: "Projects.dart",
    path: "src/pages/projects.astro",
    icon: "dart-lang",
    iconColor: "text-blue-400",
    content: "projects",
    active: false,
  },
  "Contact.java": {
    name: "Contact.java",
    title: "Contact.java",
    path: "src/pages/contact.astro",
    icon: "java",
    iconColor: "text-blue-500",
    content: "contacts",
    active: false,
  },
};

export function setActiveFile(fileName) {
  // Reset semua file menjadi tidak aktif
  Object.keys(files).forEach((key) => {
    files[key].active = false;
  });

  // Set file yang dipilih menjadi aktif
  if (files[fileName]) {
    files[fileName].active = true;
  }

  // Dispatch event untuk update UI
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("activeFileChanged", {
        detail: files[fileName],
      })
    );
  }
}

export function getActiveFile() {
  return Object.values(files).find((file) => file.active) || files["Home.css"];
}

export function getActiveFileName() {
  return getActiveFile().name;
}


