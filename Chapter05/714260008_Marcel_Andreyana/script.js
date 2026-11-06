// --- Data Dummy Kursus ---
const coursesData = [
  {
    id: 1,
    title: "Dasar Pemrograman Web Modern (HTML, CSS, JS)",
    category: "programming",
    duration: "12 Jam",
    lessons: 24,
    price: "Rp 199.000",
    image: "coding.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Pelajari fondasi utama pengembangan web modern lengkap dengan proyek portofolio interaktif."
  },
  {
    id: 2,
    title: "Desain UI/UX Lengkap dari Nol hingga Mahir",
    category: "design",
    duration: "15 Jam",
    lessons: 30,
    price: "Rp 249.000",
    image: "uiux.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Kuasai Figma, wireframing, dan riset pengguna untuk membuat antarmuka aplikasi berstandar profesional."
  },
  {
    id: 3,
    title: "Strategi Digital Marketing untuk Bisnis",
    category: "marketing",
    duration: "8 Jam",
    lessons: 16,
    price: "Rp 149.000",
    image: "strategi.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Tingkatkan penjualan online menggunakan SEO, Facebook Ads, dan strategi Konten Media Sosial."
  },
  {
    id: 4,
    title: "Manajemen Bisnis & Kewirausahaan",
    category: "business",
    duration: "10 Jam",
    lessons: 20,
    price: "Rp 179.000",
    image: "presentasi.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Pelajari penyusunan rencana bisnis, pengelolaan dana operasional, hingga strategi validasi produk."
  }
];

const studentProgress = [
  { title: "Dasar Pemrograman Web Modern", progress: 75 },
  { title: "Desain UI/UX Lengkap", progress: 30 }
];

// --- DOM Elements ---
const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const modal = document.getElementById("courseModal");
const closeModal = document.getElementById("closeModal");
const videoPlayer = document.getElementById("videoPlayer");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const playlistList = document.getElementById("playlistList");
const myCoursesList = document.getElementById("myCoursesList");

// --- Functions ---

// Render Kursus
function renderCourses(courses) {
  courseGrid.innerHTML = "";
  if (courses.length === 0) {
    courseGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">Kursus tidak ditemukan.</p>`;
    return;
  }

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-thumbnail">
        <img src="${course.image}" alt="${course.title}">
        <span class="course-category">${course.category}</span>
      </div>
      <div class="course-body">
        <h3>${course.title}</h3>
        <div class="course-info">
          <span><i class="fa-regular fa-clock"></i> ${course.duration}</span>
          <span><i class="fa-regular fa-file-video"></i> ${course.lessons} Materi</span>
        </div>
        <div class="course-footer">
          <span class="course-price">${course.price}</span>
          <button class="btn btn-primary" onclick="openCourseModal(${course.id})">Belajar</button>
        </div>
      </div>
    `;
    courseGrid.appendChild(card);
  });
}

// Render Dashboard Siswa
function renderDashboard() {
  myCoursesList.innerHTML = "";
  studentProgress.forEach(item => {
    const progressEl = document.createElement("div");
    progressEl.className = "progress-item";
    progressEl.innerHTML = `
      <div class="progress-title">
        <span>${item.title}</span>
        <span>${item.progress}%</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${item.progress}%"></div>
      </div>
    `;
    myCoursesList.appendChild(progressEl);
  });
}

// Open Course Modal Player
function openCourseModal(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return;

  modalTitle.textContent = course.title;
  modalDescription.textContent = course.description;
  videoPlayer.src = course.videoUrl;

  // Mock playlist items
  playlistList.innerHTML = `
    <li class="playlist-item"><span>1. Pengenalan & Persiapan</span> <span>10:00</span></li>
    <li class="playlist-item"><span>2. Konsep Dasar & Teori</span> <span>25:40</span></li>
    <li class="playlist-item"><span>3. Praktik & Latihan Mandiri</span> <span>45:15</span></li>
  `;

  modal.classList.add("open");
}

// Close Modal Player
function hideModal() {
  modal.classList.remove("open");
  videoPlayer.src = "";
}

// Filter Courses
function filterCourses() {
  const searchTerm = searchInput.value.toLowerCase();
  const activeCategory = document.querySelector(".filter-btn.active").dataset.category;

  const filtered = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm);
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  renderCourses(filtered);
}

// --- Event Listeners ---

// Navigation Menu Mobile Toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Search Event
searchInput.addEventListener("input", filterCourses);

// Category Filter Buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterCourses();
  });
});

// Modal Events
closeModal.addEventListener("click", hideModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

// --- Initializing App ---
document.addEventListener("DOMContentLoaded", () => {
  renderCourses(coursesData);
  renderDashboard();
});