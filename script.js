const galleryItems = [
  {
    title: "Leadership March",
    category: "leadership",
    description: "A defining leadership moment marked by institutional poise and forward movement.",
    image: "assets/images/hero-corridor.jpeg",
    alt: "Abhishek Kaushik walking through a corridor with columns"
  },
  {
    title: "Official Portrait",
    category: "leadership",
    description: "An official leadership setting suited to campaign communication and premium public branding.",
    image: "assets/images/leadership-formal-chair.jpeg",
    alt: "Abhishek Kaushik in a formal chair portrait"
  },
  {
    title: "Commanding Presence",
    category: "leadership",
    description: "A confident formal moment that projects command, composure, and political polish.",
    image: "assets/images/leadership-black-suit.jpeg",
    alt: "Abhishek Kaushik in a black suit seated in a formal space"
  },
  {
    title: "Institutional Stature",
    category: "leadership",
    description: "A refined official setting that reinforces discipline, stature, and leadership presence.",
    image: "assets/images/leadership-chair-wide.jpeg",
    alt: "Abhishek Kaushik seated in an official room"
  },
  {
    title: "Executive Authority",
    category: "leadership",
    description: "A balanced official moment built for posters, profiles, and strong public recall.",
    image: "assets/images/leadership-chair-centered.jpeg",
    alt: "Abhishek Kaushik centered in a formal chair portrait"
  },
  {
    title: "National Address",
    category: "public",
    description: "A signature public-speaking moment that conveys conviction, authority, and message discipline.",
    image: "assets/images/public-speech.jpeg",
    alt: "Abhishek Kaushik speaking at a podium"
  },
  {
    title: "Speech Alternate",
    category: "public",
    description: "A campaign-ready speaking moment shaped by confidence, reach, and public connection.",
    image: "assets/images/speech-podium-alt.jpeg",
    alt: "Abhishek Kaushik giving a public speech"
  },
  {
    title: "Lok Sabha Presence",
    category: "public",
    description: "A strong institutional association that elevates recognition, stature, and political presence.",
    image: "assets/images/public-lok-sabha.jpeg",
    alt: "Abhishek Kaushik standing near Lok Sabha signage"
  },
  {
    title: "Office Profile",
    category: "public",
    description: "An executive-style professional moment that reinforces credibility, order, and command.",
    image: "assets/images/public-office-desk.jpeg",
    alt: "Abhishek Kaushik seated at an office desk"
  },
  {
    title: "Office Alternate",
    category: "public",
    description: "A composed administrative setting suited to official communication and public-facing credibility.",
    image: "assets/images/office-desk-alt.jpeg",
    alt: "Abhishek Kaushik at an office desk with decorative wall art"
  },
  {
    title: "Shawl Portrait",
    category: "personal",
    description: "A dignified personal frame that adds warmth without reducing stature.",
    image: "assets/images/about-shawl-portrait.jpeg",
    alt: "Close-up shawl portrait of Abhishek Kaushik"
  },
  {
    title: "White Kurta",
    category: "personal",
    description: "A composed personal moment that keeps the overall profile rooted and accessible.",
    image: "assets/images/personal-white-kurta.jpeg",
    alt: "Abhishek Kaushik in a white kurta looking at a phone"
  },
  {
    title: "Tea Moment",
    category: "personal",
    description: "A grounded off-stage moment that adds relatability to a polished public image.",
    image: "assets/images/personal-tea.jpeg",
    alt: "Abhishek Kaushik sitting casually with tea"
  },
  {
    title: "Casual Sofa",
    category: "personal",
    description: "A secondary lifestyle frame kept within the gallery for softer personal context.",
    image: "assets/images/personal-casual-sofa.jpeg",
    alt: "Abhishek Kaushik seated casually on a sofa"
  }
];

const sliderTrack = document.getElementById("slider-track");
const galleryGrid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const nextButton = document.getElementById("slider-next");
const prevButton = document.getElementById("slider-prev");
const placeholderSocialLinks = document.querySelectorAll('.social-links a[href="#"]');

let activeFilter = "all";
let sliderIndex = 0;

function filteredItems() {
  return activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);
}

function cardTemplate(item) {
  return `
    <article class="gallery-card" data-category="${item.category}">
      <img src="${item.image}" alt="${item.alt}" loading="lazy">
      <div class="gallery-meta">
        <span class="story-tag">${item.category === "public" ? "Public Presence" : item.category === "leadership" ? "Leadership" : "Personal Moment"}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

function renderGallery() {
  const items = filteredItems();

  galleryGrid.innerHTML = items.map(cardTemplate).join("");
  sliderTrack.innerHTML = items.slice(0, Math.min(items.length, 6)).map(cardTemplate).join("");

  sliderIndex = 0;
  sliderTrack.style.transform = "translateX(0)";
}

function updateFilter(nextFilter) {
  activeFilter = nextFilter;
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === nextFilter);
  });
  renderGallery();
}

function moveSlider(direction) {
  const cards = sliderTrack.querySelectorAll(".gallery-card");
  if (!cards.length) {
    return;
  }

  const cardWidth = cards[0].getBoundingClientRect().width + 16;
  const visibleCount = window.innerWidth < 760 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  const maxIndex = Math.max(cards.length - visibleCount, 0);

  sliderIndex = Math.min(Math.max(sliderIndex + direction, 0), maxIndex);
  sliderTrack.style.transform = `translateX(-${sliderIndex * cardWidth}px)`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => updateFilter(button.dataset.filter));
});

nextButton.addEventListener("click", () => moveSlider(1));
prevButton.addEventListener("click", () => moveSlider(-1));
placeholderSocialLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

window.addEventListener("resize", () => {
  sliderIndex = 0;
  sliderTrack.style.transform = "translateX(0)";
});

renderGallery();
