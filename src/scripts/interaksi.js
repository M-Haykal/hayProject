document.addEventListener("DOMContentLoaded", () => {
  // --- Elemen DOM yang akan kita manipulasi ---
  const sidebarFileContainer = document.querySelector(".explorer-content");
  const allTabs = document.querySelectorAll(".tab-item");
  const breadcrumbIcon = document.getElementById("breadcrumb-icon");
  const breadcrumbFilename = document.getElementById("breadcrumb-filename");

  // --- Fungsi untuk memperbarui Tab yang Aktif ---
  function updateActiveTab(fileKey) {
    // 1. Hapus kelas 'aktif' dari semua tab terlebih dahulu
    allTabs.forEach((tab) => {
      // Kelas untuk tab non-aktif
      tab.classList.remove(
        "bg-[#1e1e1e]",
        "border-t",
        "border-primary",
        "cursor-default"
      );
      tab.classList.add(
        "bg-[#2d2d2d]",
        "border-r",
        "border-[#1e1e1e]",
        "cursor-pointer",
        "hover:bg-[#2a2d2e]"
      );

      // Ubah warna teks tab non-aktif
      const tabName = tab.querySelector(".tab-name");
      if (tabName) {
        tabName.classList.remove("text-white");
        tabName.classList.add("text-gray-400");
      }
    });

    // 2. Tambahkan kelas 'aktif' ke tab yang dipilih
    const activeTab = document.querySelector(`[data-tab-for="${fileKey}"]`);
    if (activeTab) {
      // Kelas untuk tab aktif
      activeTab.classList.remove(
        "bg-[#2d2d2d]",
        "border-r",
        "border-[#1e1e1e]",
        "cursor-pointer",
        "hover:bg-[#2a2d2e]"
      );
      activeTab.classList.add(
        "bg-[#1e1e1e]",
        "border-t",
        "border-primary",
        "cursor-default"
      );

      // Ubah warna teks tab aktif
      const activeTabName = activeTab.querySelector(".tab-name");
      if (activeTabName) {
        activeTabName.classList.remove("text-gray-400");
        activeTabName.classList.add("text-white");
      }
    }
  }

  // --- Fungsi untuk memperbarui Breadcrumb ---
  function updateBreadcrumb(fileElement) {
    const icon = fileElement.dataset.icon;
    const iconColor = fileElement.dataset.iconColor;
    const filename = fileElement.querySelector("span:last-child").textContent;

    // Perbarui ikon
    breadcrumbIcon.textContent = icon;
    // Hapus semua kelas warna lama dan tambahkan yang baru
    breadcrumbIcon.className = `material-symbols-outlined !text-[14px] ${iconColor}`;

    // Perbarui nama file
    breadcrumbFilename.textContent = filename;
  }

  // --- Event Listener untuk Klik pada Sidebar ---
  // Kita gunakan "event delegation" untuk efisiensi
  sidebarFileContainer.addEventListener("click", (e) => {
    // Cari elemen .sidebar-file-item terdekat dari yang diklik
    const clickedFile = e.target.closest(".sidebar-file-item");

    // Pastikan yang diklik adalah sebuah file
    if (clickedFile) {
      const fileKey = clickedFile.dataset.file;

      // Perbarui tab dan breadcrumb
      updateActiveTab(fileKey);
      updateBreadcrumb(clickedFile);

      // (Opsional) Jika Anda juga ingin memperbarui highlight di sidebar
      document.querySelectorAll(".sidebar-file-item").forEach((item) => {
        item.classList.remove("bg-[#37373d]");
        item.querySelector("span:last-child").classList.remove("text-white");
        item.querySelector("span:last-child").classList.add("text-gray-400");
      });
      clickedFile.classList.add("bg-[#37373d]");
      clickedFile
        .querySelector("span:last-child")
        .classList.remove("text-gray-400");
      clickedFile.querySelector("span:last-child").classList.add("text-white");
    }
  });
});
