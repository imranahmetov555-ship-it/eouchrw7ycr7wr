const milkyProductsData = [
  {
    id: 1,
    title: "Льняная одежда 'Oat'",
    price: "4 200 KGS",
    description: "Минималистичная ваза ручной работы, выполненная из шамотной глины. Идеально подходит для сухоцветов и живых композиций, подчеркивая текстуру интерьера.",
    images: [
      "WhatsApp Image 2026-05-27 at 06.39.31 (1).jpeg",
      "https://unsplash.com"
    ],
    specs: { "Размер": "Керамика", "Высота": "24 см", "Производство": "Россия" }
  },
  {
    id: 2,
    title: "Льняная одежда 'Mousse'",
    price: "28 500 KGS",
    description: "Уютное кресло с обивкой из натурального премиального льна. Мягкие обтекаемые формы создают идеальные условия для вечернего отдыха.",
    images: [
      "WhatsApp Image 2026-05-28 at 18.56.40.jpeg",
      "https://unsplash.com"
    ],
    specs: { "Обивка": "100% Лён", "Каркас": "Дуб", "Ширина": "85 см" }
  },
   {
    id: 1,
    title: "Льняная одежда 'Oat'",
    price: "4 200 KGS",
    description: "Минималистичная ваза ручной работы, выполненная из шамотной глины. Идеально подходит для сухоцветов и живых композиций, подчеркивая текстуру интерьера.",
    images: [
      "WhatsApp Image 2026-05-27 at 06.39.31 (1).jpeg",
      "https://unsplash.com"
    ],
    specs: { "Размер": "Керамика", "Высота": "24 см", "Производство": "Россия" }
  },
   {
    id: 1,
    title: "Льняная одежда 'Oat'",
    price: "4 200 KGS",
    description: "Минималистичная ваза ручной работы, выполненная из шамотной глины. Идеально подходит для сухоцветов и живых композиций, подчеркивая текстуру интерьера.",
    images: [
      "WhatsApp Image 2026-05-27 at 06.39.31 (1).jpeg",
      "https://unsplash.com"
    ],
    specs: { "Размер": "Керамика", "Высота": "24 см", "Производство": "Россия" }
  },
   {
    id: 1,
    title: "Льняная одежда 'Oat'",
    price: "4 200 KGS",
    description: "Минималистичная ваза ручной работы, выполненная из шамотной глины. Идеально подходит для сухоцветов и живых композиций, подчеркивая текстуру интерьера.",
    images: [
      "WhatsApp Image 2026-05-27 at 06.39.31 (1).jpeg",
      "https://unsplash.com"
    ],
    specs: { "Размер": "Керамика", "Высота": "24 см", "Производство": "Россия" }
  },
  {
    id: 3,
    title: "Льняная одежда 'Sand'",
    price: "1 900 KGS",
    description: "Свеча из соевого воска с древесным фитилем, который уютно потрескивает при горении. Тонкий аромат сандала, ванили и свежего инжира.",
    images: [
      "WhatsApp Image 2026-05-28 at 18.56.40 (1).jpeg",
      "https://unsplash.com"
    ],
    specs: { "Состав": "Соевый воск", "Время горения": "40 часов", "Объем": "200 мл" }
  }
  
];

const STORAGE_KEY = 'kanoMilkyProducts';

const milkyGrid = document.getElementById('milkyCatalogGrid');
const milkyModal = document.getElementById('milkyCatalogModal');
const milkyCloseModal = document.getElementById('milkyCloseModal');
const milkyCarouselTrack = document.getElementById('milkyCarouselTrack');
const milkyCarouselPrev = document.getElementById('milkyCarouselPrev');
const milkyCarouselNext = document.getElementById('milkyCarouselNext');
const milkyModalBuyBtn = document.getElementById('milkyModalBuyBtn');
const adminToggle = document.getElementById('admin-toggle');
const adminLoginPanel = document.getElementById('adminLoginPanel');
const adminLoginCloseBtn = document.getElementById('adminLoginCloseBtn');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginError = document.getElementById('adminLoginError');
const adminPanel = document.getElementById('adminPanel');
const adminCloseBtn = document.getElementById('adminCloseBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminProductForm = document.getElementById('adminProductForm');
const adminProductList = document.getElementById('adminProductList');

const ADMIN_LOGIN_KEY = 'kanoAdminLoggedIn';
const ADMIN_USERNAME = 'Admin Kano';
const ADMIN_PASSWORD = '2345678azaz';

let milkyActiveSlideIdx = 0;
let milkyActiveImagesCount = 0;

const initialMilkyProducts = JSON.parse(JSON.stringify(milkyProductsData));
let milkyProducts = loadMilkyProducts();

function loadMilkyProducts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return JSON.parse(JSON.stringify(initialMilkyProducts));
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : JSON.parse(JSON.stringify(initialMilkyProducts));
  } catch (error) {
    return JSON.parse(JSON.stringify(initialMilkyProducts));
  }
}

function saveMilkyProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(milkyProducts));
}

function createMilkyCard(item) {
  const cardNode = document.createElement('div');
  cardNode.className = 'milky-cat-card';
  cardNode.innerHTML = `
    <div class="milky-cat-card__img-wrapper">
      <img src="${item.images[0]}" alt="${item.title}" class="milky-cat-card__img">
    </div>
    <div class="milky-cat-card__info">
      <h3 class="milky-cat-card__title">${item.title}</h3>
      <div class="milky-cat-card__price">${item.price}</div>
      <div class="milky-cat-card__actions">
        <button class="milky-cat-btn milky-cat-btn--secondary milky-btn-details">Подробнее</button>
        <button class="milky-cat-btn milky-cat-btn--primary milky-btn-buy">Купить</button>
      </div>
    </div>
  `;

  cardNode.querySelector('.milky-btn-details').addEventListener('click', () => openMilkyModal(item));
  cardNode.querySelector('.milky-btn-buy').addEventListener('click', () => triggerPurchase(item.id));

  return cardNode;
}

function renderMilkyGrid() {
  milkyGrid.innerHTML = '';

  if (!milkyProducts.length) {
    const emptyNode = document.createElement('div');
    emptyNode.className = 'milky-cat-empty';
    emptyNode.textContent = 'Каталог пуст. Добавьте товар через админ-панель.';
    milkyGrid.appendChild(emptyNode);
    return;
  }

  milkyProducts.forEach(item => {
    milkyGrid.appendChild(createMilkyCard(item));
  });
}

function renderAdminProductList() {
  if (!adminProductList) return;

  if (!milkyProducts.length) {
    adminProductList.innerHTML = '<div class="admin-panel__empty">Каталог пуст.</div>';
    return;
  }

  adminProductList.innerHTML = milkyProducts.map(item => `
    <div class="admin-panel__product">
      <div class="admin-panel__product-row">
        <strong>${item.title}</strong>
        <span>${item.price}</span>
      </div>
      <button type="button" class="admin-panel__remove-btn" data-id="${item.id}">Удалить</button>
    </div>
  `).join('');

  adminProductList.querySelectorAll('.admin-panel__remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      removeProduct(id);
    });
  });
}

function openAdminPanel() {
  if (!adminPanel) return;
  adminPanel.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAdminPanel() {
  if (!adminPanel) return;
  adminPanel.classList.remove('active');
  document.body.style.overflow = '';
}

function parseSpecs(raw) {
  const specs = {};
  raw.split('\n').map(line => line.trim()).filter(Boolean).forEach(line => {
    const [key, ...rest] = line.split(':');
    if (!key || !rest.length) return;
    specs[key.trim()] = rest.join(':').trim();
  });
  return specs;
}

function addProduct(product) {
  milkyProducts.push(product);
  saveMilkyProducts();
  renderMilkyGrid();
  renderAdminProductList();
}

function removeProduct(id) {
  milkyProducts = milkyProducts.filter(item => item.id !== id);
  saveMilkyProducts();
  renderMilkyGrid();
  renderAdminProductList();
}

function handleAdminProductForm(event) {
  event.preventDefault();
  if (!adminProductForm) return;

  const title = adminProductForm.querySelector('[name="product-title"]').value.trim();
  const price = adminProductForm.querySelector('[name="product-price"]').value.trim();
  const imageUrl = adminProductForm.querySelector('[name="product-image"]').value.trim();
  const description = adminProductForm.querySelector('[name="product-description"]').value.trim();
  const specsRaw = adminProductForm.querySelector('[name="product-specs"]').value.trim();

  if (!title || !price || !imageUrl || !description) {
    return;
  }

  const newProduct = {
    id: Date.now(),
    title,
    price,
    description,
    images: [imageUrl],
    specs: parseSpecs(specsRaw)
  };

  addProduct(newProduct);
  adminProductForm.reset();
}

function triggerPurchase(id) {
  const product = milkyProducts.find(item => item.id === id);
  if (!product) {
    alert('Товар не найден.');
    return;
  }
  alert(`Вы выбрали товар: ${product.title}. Мы свяжемся с вами для оформления покупки.`);
}

function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_LOGIN_KEY) === 'true';
}

function setAdminLoggedIn(value) {
  localStorage.setItem(ADMIN_LOGIN_KEY, value ? 'true' : 'false');
}

function openLoginPanel() {
  if (!adminLoginPanel) return;
  adminLoginPanel.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (adminLoginError) {
    adminLoginError.textContent = '';
  }
  if (adminLoginForm) {
    adminLoginForm.reset();
  }
}

function closeLoginPanel() {
  if (!adminLoginPanel) return;
  adminLoginPanel.classList.remove('active');
  document.body.style.overflow = '';
  if (adminLoginError) {
    adminLoginError.textContent = '';
  }
}

function handleAdminToggle() {
  if (isAdminLoggedIn()) {
    openAdminPanel();
  } else {
    openLoginPanel();
  }
}

function handleAdminLogout() {
  setAdminLoggedIn(false);
  closeAdminPanel();
}

if (adminToggle) {
  adminToggle.addEventListener('click', handleAdminToggle);
}

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', handleAdminLogout);
}

if (adminLoginCloseBtn) {
  adminLoginCloseBtn.addEventListener('click', closeLoginPanel);
}

if (adminLoginPanel) {
  adminLoginPanel.addEventListener('click', (event) => {
    if (event.target === adminLoginPanel) {
      closeLoginPanel();
    }
  });
}

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginValue = adminLoginForm.querySelector('[name="admin-login"]').value.trim();
    const passwordValue = adminLoginForm.querySelector('[name="admin-password"]').value;

    if (loginValue === ADMIN_USERNAME && passwordValue === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      closeLoginPanel();
      openAdminPanel();
      return;
    }

    if (adminLoginError) {
      adminLoginError.textContent = 'Неверный логин или пароль.';
    }
  });
}

if (adminCloseBtn) {
  adminCloseBtn.addEventListener('click', closeAdminPanel);
}

if (adminPanel) {
  adminPanel.addEventListener('click', (event) => {
    if (event.target === adminPanel) {
      closeAdminPanel();
    }
  });
}

if (adminProductForm) {
  adminProductForm.addEventListener('submit', handleAdminProductForm);
}

renderMilkyGrid();
renderAdminProductList();

function openMilkyModal(item) {
  document.getElementById('milkyModalTitle').textContent = item.title;
  document.getElementById('milkyModalPrice').textContent = item.price;
  document.getElementById('milkyModalDesc').textContent = item.description;

  milkyModalBuyBtn.onclick = () => triggerPurchase(item.id);

  const specsContainer = document.getElementById('milkyModalSpecs');
  specsContainer.innerHTML = '';
  for (const [name, val] of Object.entries(item.specs)) {
    specsContainer.innerHTML += `
      <div class="milky-cat-modal__spec-row">
        <span class="milky-cat-modal__spec-label">${name}</span>
        <span class="milky-cat-modal__spec-value">${val}</span>
      </div>
    `;
  }

  milkyCarouselTrack.innerHTML = '';
  item.images.forEach(url => {
    const slideNode = document.createElement('div');
    slideNode.className = 'milky-cat-carousel__slide';
    slideNode.innerHTML = `<img src="${url}" alt="">`;
    milkyCarouselTrack.appendChild(slideNode);
  });

  milkyActiveSlideIdx = 0;
  milkyActiveImagesCount = item.images.length;
  moveMilkyCarousel();

  milkyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function moveMilkyCarousel() {
  milkyCarouselTrack.style.transform = `translateX(-${milkyActiveSlideIdx * 100}%)`;
}

milkyCarouselPrev.addEventListener('click', () => {
  milkyActiveSlideIdx = (milkyActiveSlideIdx === 0) ? milkyActiveImagesCount - 1 : milkyActiveSlideIdx - 1;
  moveMilkyCarousel();
});

milkyCarouselNext.addEventListener('click', () => {
  milkyActiveSlideIdx = (milkyActiveSlideIdx === milkyActiveImagesCount - 1) ? 0 : milkyActiveSlideIdx + 1;
  moveMilkyCarousel();
});

function closeMilkyModal() {
  milkyModal.classList.remove('active');
  document.body.style.overflow = '';
}

milkyCloseModal.addEventListener('click', closeMilkyModal);
milkyModal.addEventListener('click', (e) => {
  if (e.target === milkyModal) closeMilkyModal();
});





 
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');



    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && e.target !== searchToggle) {
            searchBox.classList.remove('active');
        }
    });


    
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });










if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}


document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');


    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');


        if (document.body.classList.contains('dark-theme') && themeIcon) {
            themeIcon.className = 'fas fa-moon';
        } else if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }

     
        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('clicked');
            
            setTimeout(() => {
                document.body.classList.toggle('dark-theme');
                
                if (document.body.classList.contains('dark-theme')) {
                    if (themeIcon) themeIcon.className = 'fas fa-moon';
                    localStorage.setItem('theme', 'dark');  
                } else {
                    if (themeIcon) themeIcon.className = 'fas fa-sun';
                    localStorage.setItem('theme', 'light'); 
                }
                
                themeToggle.classList.remove('clicked');
            }, 250);
        });
    }
});



 if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        
       
        document.addEventListener("DOMContentLoaded", function() {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const themeIcon = themeToggle.querySelector('i');
                if (themeIcon) {
                    themeIcon.className = 'fas fa-moon';
                }
            }
        });
    }



    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        
        document.addEventListener("DOMContentLoaded", function() {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const themeIcon = themeToggle.querySelector('i');
                if (themeIcon) {
                    themeIcon.className = 'fas fa-moon';
                }
            }
        });
    }






    const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 
});


document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-grid').forEach((el) => {
    scrollObserver.observe(el);
});


    



