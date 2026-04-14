const galleryItems = [
  {
    title: "Corridor Walk",
    category: "leadership",
    description: "Hero image with movement, architecture, and political gravitas.",
    image: "assets/images/hero-corridor.jpeg",
    alt: "Abhishek Kaushik walking through a corridor with columns"
  },
  {
    title: "Formal Chair Portrait",
    category: "leadership",
    description: "A composed seated look suited to leadership branding.",
    image: "assets/images/leadership-formal-chair.jpeg",
    alt: "Abhishek Kaushik in a formal chair portrait"
  },
  {
    title: "Black Suit Presence",
    category: "leadership",
    description: "Strong formal styling for premium public-facing visuals.",
    image: "assets/images/leadership-black-suit.jpeg",
    alt: "Abhishek Kaushik in a black suit seated in a formal space"
  },
  {
    title: "Institutional Frame",
    category: "leadership",
    description: "A wide leadership image with a refined official setting.",
    image: "assets/images/leadership-chair-wide.jpeg",
    alt: "Abhishek Kaushik seated in an official room"
  },
  {
    title: "Centered Authority",
    category: "leadership",
    description: "Balanced framing for banners, posters, or public profiles.",
    image: "assets/images/leadership-chair-centered.jpeg",
    alt: "Abhishek Kaushik centered in a formal chair portrait"
  },
  {
    title: "Public Address",
    category: "public",
    description: "The key podium photograph that anchors the authority section.",
    image: "assets/images/public-speech.jpeg",
    alt: "Abhishek Kaushik speaking at a podium"
  },
  {
    title: "Speech Alternate",
    category: "public",
    description: "An alternate angle for campaign or event storytelling.",
    image: "assets/images/speech-podium-alt.jpeg",
    alt: "Abhishek Kaushik giving a public speech"
  },
  {
    title: "Lok Sabha Presence",
    category: "public",
    description: "A high-recognition visual for institutional association.",
    image: "assets/images/public-lok-sabha.jpeg",
    alt: "Abhishek Kaushik standing near Lok Sabha signage"
  },
  {
    title: "Office Profile",
    category: "public",
    description: "Professional desk image reinforcing administrative credibility.",
    image: "assets/images/public-office-desk.jpeg",
    alt: "Abhishek Kaushik seated at an office desk"
  },
  {
    title: "Office Alternate",
    category: "public",
    description: "Secondary office frame for broader public-life coverage.",
    image: "assets/images/office-desk-alt.jpeg",
    alt: "Abhishek Kaushik at an office desk with decorative wall art"
  },
  {
    title: "Shawl Portrait",
    category: "personal",
    description: "Warm, trustworthy, and ideal for approachable branding.",
    image: "assets/images/about-shawl-portrait.jpeg",
    alt: "Close-up shawl portrait of Abhishek Kaushik"
  },
  {
    title: "White Kurta",
    category: "personal",
    description: "Calm and minimal, useful for softer personal positioning.",
    image: "assets/images/personal-white-kurta.jpeg",
    alt: "Abhishek Kaushik in a white kurta looking at a phone"
  },
  {
    title: "Tea Moment",
    category: "personal",
    description: "Relatable and human, best kept to gallery use.",
    image: "assets/images/personal-tea.jpeg",
    alt: "Abhishek Kaushik sitting casually with tea"
  },
  {
    title: "Casual Sofa",
    category: "personal",
    description: "Included for completeness, but intentionally not used as a lead image.",
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
