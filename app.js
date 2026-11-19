/**
 * MadeByMaa - Main Application Engine
 * Handles Catalogue, Search, Filters, WhatsApp Ordering, Custom Orders & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    selectedCategory: 'all',
    searchQuery: '',
    maxPrice: 1500,
    sortBy: 'featured',
    activeProduct: null,
    modalColor: '',
    modalSize: '',
    modalQty: 1,
    modalCustom: false,
    modalCustomNotes: '',
    cursorTrailActive: true
  };

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const categoryPillsContainer = document.getElementById('category-pills');
  const searchInput = document.getElementById('search-input');
  const priceSlider = document.getElementById('price-slider');
  const priceValueDisplay = document.getElementById('price-value-display');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  // Modal Elements
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // Initialize Cursor Trail
  let cursorTrail = null;
  if (window.CrochetCursorTrail) {
    cursorTrail = new CrochetCursorTrail();
  }

  // Initialize Signature Crochet Needle Animation
  let needleAnim = null;
  const heroCanvas = document.getElementById('crochet-hero-canvas');
  const heroReveal = document.getElementById('hero-content-reveal');
  const replayAnimBtn = document.getElementById('replay-anim-btn');
  const skipAnimBtn = document.getElementById('skip-anim-btn');

  if (heroCanvas && window.CrochetNeedleAnimation) {
    needleAnim = new CrochetNeedleAnimation('crochet-hero-canvas', 'hero-content-reveal', () => {
      if (heroReveal) {
        heroReveal.classList.add('revealed');
      }
    });

    // Run animation on page open
    needleAnim.start();

    if (replayAnimBtn) {
      replayAnimBtn.addEventListener('click', () => {
        if (heroReveal) heroReveal.classList.remove('revealed');
        needleAnim.start(true);
      });
    }

    if (skipAnimBtn) {
      skipAnimBtn.addEventListener('click', () => {
        needleAnim.skip();
        if (heroReveal) heroReveal.classList.add('revealed');
      });
    }
  }

  // Render Category Filter Pills
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = CATEGORIES.map(cat => `
      <button type="button" class="category-pill ${state.selectedCategory === cat.id ? 'active' : ''}" data-cat-id="${cat.id}">
        <span class="pill-icon">${cat.icon}</span>
        <span class="pill-name">${cat.name}</span>
      </button>
    `).join('');

    // Attach listeners
    categoryPillsContainer.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.getAttribute('data-cat-id');
        renderCategoryPills();
        filterAndRenderProducts();
      });
    });
  }

  // Render Category Showcase on Home Section
  const categoriesShowcase = document.getElementById('categories-showcase');
  if (categoriesShowcase) {
    categoriesShowcase.innerHTML = CATEGORIES.filter(c => c.id !== 'all').map(cat => `
      <div class="category-card" data-cat-id="${cat.id}">
        <div class="category-icon-bubble">${cat.icon}</div>
        <h4 class="category-card-title">${cat.name}</h4>
        <p class="category-card-desc">${cat.desc || ''}</p>
        <span class="category-card-link">Explore Collection &rarr;</span>
      </div>
    `).join('');

    categoriesShowcase.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat-id');
        state.selectedCategory = catId;
        renderCategoryPills();
        filterAndRenderProducts();
        const shopSection = document.getElementById('shop-section');
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Filter and Sort Products
  function filterAndRenderProducts() {
    if (!productsGrid) return;

    let filtered = PRODUCTS.filter(prod => {
      // Category filter
      if (state.selectedCategory !== 'all' && prod.category !== state.selectedCategory) {
        return false;
      }
      // Price slider filter
      if (prod.price > state.maxPrice) {
        return false;
      }
      // Search query filter
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesCat = prod.categoryName.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'name-az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Results count
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} handmade ${filtered.length === 1 ? 'creation' : 'creations'}`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results-box">
          <div class="no-results-icon">🧶</div>
          <h3>No creations found matching your filter</h3>
          <p>Try adjusting your search terms, resetting price filter, or browse all categories.</p>
          <button type="button" class="btn btn-secondary mt-3" id="reset-filter-inner-btn">Reset All Filters</button>
        </div>
      `;
      const innerReset = document.getElementById('reset-filter-inner-btn');
      if (innerReset) {
        innerReset.addEventListener('click', resetFilters);
      }
      return;
    }

    // Render Product Cards
    productsGrid.innerHTML = filtered.map(prod => `
      <div class="product-card" data-product-id="${prod.id}">
        <div class="product-card-media">
          ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          ${prod.customisable ? `<span class="custom-badge" title="Can be customized in your preferred colors">♡ Customisable</span>` : ''}
          <div class="product-svg-wrapper">
            ${createCrochetSVG(prod.artType, prod.primaryColor, prod.secondaryColor)}
          </div>
          <button type="button" class="btn-quick-view" data-product-id="${prod.id}">
            <span>Quick View & Customise</span>
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-card-category">${prod.categoryName}</div>
          <h3 class="product-card-title">${prod.name}</h3>
          
          <div class="product-color-swatches" title="Available in multiple hand-dyed yarn shades">
            ${prod.colors.slice(0, 4).map(c => `
              <span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join('')}
            ${prod.colors.length > 4 ? `<span class="color-dot-more">+${prod.colors.length - 4}</span>` : ''}
          </div>

          <p class="product-card-desc">${prod.description.slice(0, 85)}...</p>

          <div class="product-card-footer">
            <div class="product-price">
              <span class="currency">₹</span><span class="amount">${prod.price.toLocaleString('en-IN')}</span>
            </div>
            <div class="product-actions">
              <button type="button" class="btn btn-order-wa" data-product-id="${prod.id}" title="Order via WhatsApp">
                <span class="wa-icon">💬</span>
                <span>Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach card event listeners
    productsGrid.querySelectorAll('.product-card').forEach(card => {
      const prodId = card.getAttribute('data-product-id');
      const prod = PRODUCTS.find(p => p.id === prodId);

      // Card click opens modal
      card.addEventListener('click', (e) => {
        // Prevent opening if direct WhatsApp button clicked
        if (e.target.closest('.btn-order-wa')) return;
        openProductModal(prod);
      });

      // Quick view button
      const qvBtn = card.querySelector('.btn-quick-view');
      if (qvBtn) {
        qvBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openProductModal(prod);
        });
      }

      // Quick Order button opens modal ready to submit
      const waBtn = card.querySelector('.btn-order-wa');
      if (waBtn) {
        waBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openProductModal(prod);
        });
      }
    });
  }

  // Open Product Details Modal
  function openProductModal(prod) {
    if (!prod || !productModal) return;
    state.activeProduct = prod;
    state.modalColor = prod.colors[0]?.name || 'Standard';
    state.modalSize = prod.sizes[0] || 'Standard';
    state.modalQty = 1;
    state.modalCustom = false;
    state.modalCustomNotes = '';

    renderModalContent();
    productModal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    state.activeProduct = null;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
      closeProductModal();
    }
  });

  // Render Modal Content
  function renderModalContent() {
    const prod = state.activeProduct;
    if (!prod) return;

    const modalBody = document.getElementById('modal-dynamic-content');
    if (!modalBody) return;

    const totalPrice = prod.price * state.modalQty;

    modalBody.innerHTML = `
      <div class="modal-grid">
        <!-- Left: Product Art & Gallery -->
        <div class="modal-gallery-pane">
          <div class="modal-main-art">
            ${createCrochetSVG(prod.artType, prod.primaryColor, prod.secondaryColor)}
          </div>
          <div class="modal-art-badge-row">
            <span class="badge-pill">100% Handcrafted</span>
            <span class="badge-pill">Pan India Delivery</span>
            <span class="badge-pill">Estimated prep: ${prod.prepTime}</span>
          </div>
          <div class="modal-policy-notice">
            <span class="notice-icon">♡</span>
            <span>Handmade individually with care. As per brand policy, <strong>no returns or exchanges</strong> are accepted.</span>
          </div>
        </div>

        <!-- Right: Details, Customisation & WhatsApp Action -->
        <div class="modal-details-pane">
          <div class="modal-cat-tag">${prod.categoryName}</div>
          <h2 class="modal-prod-title">${prod.name}</h2>
          
          <div class="modal-price-row">
            <div class="modal-unit-price">
              <span class="currency">₹</span><span class="amount">${prod.price.toLocaleString('en-IN')}</span>
              <span class="price-fixed-label">Fixed client pricing</span>
            </div>
            ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          </div>

          <p class="modal-prod-desc">${prod.description}</p>

          <div class="modal-highlights">
            <h4>Craftsmanship Highlights:</h4>
            <ul>
              ${prod.highlights.map(h => `<li><span class="highlight-check">✓</span> ${h}</li>`).join('')}
            </ul>
          </div>

          <!-- Color Selector -->
          <div class="modal-option-group">
            <label class="option-label">
              <span>Select Color:</span>
              <strong id="selected-color-name">${state.modalColor}</strong>
            </label>
            <div class="color-options-grid">
              ${prod.colors.map(c => `
                <button type="button" class="color-option-btn ${state.modalColor === c.name ? 'active' : ''}" data-color-name="${c.name}">
                  <span class="color-swatch-box" style="background-color: ${c.hex}"></span>
                  <span class="color-name-text">${c.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Size Selector (if multiple sizes exist) -->
          ${prod.sizes.length > 1 ? `
            <div class="modal-option-group">
              <label class="option-label">
                <span>Select Size:</span>
                <strong id="selected-size-name">${state.modalSize}</strong>
              </label>
              <div class="size-options-row">
                ${prod.sizes.map(s => `
                  <button type="button" class="size-option-btn ${state.modalSize === s ? 'active' : ''}" data-size-val="${s}">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="modal-single-size-info">
              <span>Standard Size:</span> <strong>${prod.sizes[0]}</strong>
            </div>
          `}

          <!-- Quantity Selector -->
          <div class="modal-option-group">
            <label class="option-label"><span>Quantity:</span></label>
            <div class="quantity-stepper">
              <button type="button" class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
              <span class="qty-display" id="modal-qty-val">${state.modalQty}</span>
              <button type="button" class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
              <span class="qty-subtotal">Total: <strong>₹${totalPrice.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>

          <!-- Customisation Box -->
          <div class="modal-customisation-box">
            <label class="checkbox-container">
              <input type="checkbox" id="modal-custom-toggle" ${state.modalCustom ? 'checked' : ''}>
              <span class="checkmark"></span>
              <span class="checkbox-text">Request customisation for this piece (custom color palette, initials, or dimensions)</span>
            </label>
            <div class="custom-notes-field ${state.modalCustom ? 'expanded' : ''}" id="custom-notes-wrapper">
              <textarea id="modal-custom-text" placeholder="Please specify your desired colors, custom size or personal message..." rows="2">${state.modalCustomNotes}</textarea>
            </div>
          </div>

          <!-- Live WhatsApp Message Preview (PRD Section 11) -->
          <div class="wa-preview-card">
            <div class="wa-preview-header">
              <span class="wa-badge-icon">💬</span>
              <span>Live WhatsApp Message Preview:</span>
            </div>
            <pre class="wa-preview-text" id="wa-preview-content">${generateWhatsAppMessage(prod)}</pre>
          </div>

          <!-- Direct Order Action -->
          <div class="modal-cta-row">
            <a href="${generateWhatsAppLink(prod)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-large btn-wa-order" id="modal-submit-wa-btn">
              <span class="wa-icon-large">💬</span>
              <span>Send Order Enquiry on WhatsApp</span>
            </a>
            <div class="wa-guarantee-note">
              <span>✓ Direct connection to <strong>+91 99962 67995</strong></span>
              <span>✓ Availability & delivery confirmed in chat</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Modal listeners
    // Color click
    modalBody.querySelectorAll('.color-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.modalColor = btn.getAttribute('data-color-name');
        renderModalContent();
      });
    });

    // Size click
    modalBody.querySelectorAll('.size-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.modalSize = btn.getAttribute('data-size-val');
        renderModalContent();
      });
    });

    // Qty minus / plus
    const minusBtn = modalBody.querySelector('#qty-minus');
    const plusBtn = modalBody.querySelector('#qty-plus');
    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        if (state.modalQty > 1) {
          state.modalQty--;
          renderModalContent();
        }
      });
    }
    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        if (state.modalQty < 20) {
          state.modalQty++;
          renderModalContent();
        }
      });
    }

    // Custom toggle
    const customToggle = modalBody.querySelector('#modal-custom-toggle');
    const customText = modalBody.querySelector('#modal-custom-text');
    if (customToggle) {
      customToggle.addEventListener('change', (e) => {
        state.modalCustom = e.target.checked;
        const wrapper = modalBody.querySelector('#custom-notes-wrapper');
        if (wrapper) {
          if (state.modalCustom) wrapper.classList.add('expanded');
          else wrapper.classList.remove('expanded');
        }
        updateLiveWaPreview();
      });
    }

    if (customText) {
      customText.addEventListener('input', (e) => {
        state.modalCustomNotes = e.target.value;
        updateLiveWaPreview();
      });
    }
  }

  // Update Live Message & URL without re-rendering entire modal
  function updateLiveWaPreview() {
    const prod = state.activeProduct;
    if (!prod) return;
    const previewContent = document.getElementById('wa-preview-content');
    const submitBtn = document.getElementById('modal-submit-wa-btn');
    const msg = generateWhatsAppMessage(prod);
    const url = generateWhatsAppLink(prod);

    if (previewContent) previewContent.textContent = msg;
    if (submitBtn) submitBtn.setAttribute('href', url);
  }

  // Format WhatsApp message strictly according to PRD Section 11:
  /**
   * Hi! I would like to order from MadeByMaa.
   * 
   * Product Name: [Product Name]
   * Price: ₹[Price]
   * Colour: [Colour]
   * Size: [Size]
   * Quantity: [Quantity]
   * Customisation: [Yes/No - notes]
   * 
   * Please share the next steps for placing my order.
   */
  function generateWhatsAppMessage(prod) {
    if (!prod) return '';
    const customStatus = state.modalCustom 
      ? `Yes (${state.modalCustomNotes.trim() || 'Custom color/size details requested'})` 
      : 'No';

    return `Hi! I would like to order from MadeByMaa.

Product Name: ${prod.name}
Price: ₹${prod.price.toLocaleString('en-IN')}
Colour: ${state.modalColor}
Size: ${state.modalSize}
Quantity: ${state.modalQty}
Customisation: ${customStatus}

Please share the next steps for placing my order.`;
  }

  function generateWhatsAppLink(prod) {
    const msg = generateWhatsAppMessage(prod);
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encoded}`;
  }

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      filterAndRenderProducts();
    });
  }

  // Price Slider Listener
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      if (priceValueDisplay) {
        priceValueDisplay.textContent = `₹${state.maxPrice.toLocaleString('en-IN')}`;
      }
      filterAndRenderProducts();
    });
  }

  // Sort Select Listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      filterAndRenderProducts();
    });
  }

  // Reset Filters Function
  function resetFilters() {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.maxPrice = 1500;
    state.sortBy = 'featured';

    if (searchInput) searchInput.value = '';
    if (priceSlider) priceSlider.value = 1500;
    if (priceValueDisplay) priceValueDisplay.textContent = '₹1,500';
    if (sortSelect) sortSelect.value = 'featured';

    renderCategoryPills();
    filterAndRenderProducts();
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', resetFilters);
  }

  // Custom Orders Interactive Studio / Builder (PRD Section 7.5 & Section 10 FR-10)
  const customOrderForm = document.getElementById('custom-order-form');
  const customOrderWaBtn = document.getElementById('send-custom-wa-btn');

  function updateCustomOrderPreview() {
    const catSelect = document.getElementById('co-category');
    const colorInput = document.getElementById('co-colors');
    const budgetSelect = document.getElementById('co-budget');
    const detailsInput = document.getElementById('co-details');
    const previewBox = document.getElementById('co-wa-preview');

    const cat = catSelect ? catSelect.value : 'General Crochet Custom Piece';
    const colors = colorInput && colorInput.value.trim() ? colorInput.value.trim() : 'As suggested by MadeByMaa';
    const budget = budgetSelect ? budgetSelect.value : '₹500 - ₹1,000';
    const details = detailsInput && detailsInput.value.trim() ? detailsInput.value.trim() : 'Please guide me with design options.';

    const customMsg = `Hi MadeByMaa! I would like to enquire about a custom crochet creation.

Custom Category: ${cat}
Desired Colours: ${colors}
Budget Range: ${budget}
Specific Details: ${details}

Could you please confirm if this can be crafted and share next steps?`;

    if (previewBox) previewBox.textContent = customMsg;
    if (customOrderWaBtn) {
      customOrderWaBtn.setAttribute('href', `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(customMsg)}`);
    }
  }

  if (customOrderForm) {
    customOrderForm.addEventListener('input', updateCustomOrderPreview);
    customOrderForm.addEventListener('change', updateCustomOrderPreview);
    updateCustomOrderPreview();
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close all
        faqItems.forEach(f => f.classList.remove('active'));
        // Toggle current
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // Mobile Navigation Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.add('open');
      document.body.classList.add('menu-open');
    });
  }

  if (mobileNavClose && mobileNavDrawer) {
    mobileNavClose.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // Cursor Trail User Toggle Button
  const cursorToggleBtn = document.getElementById('cursor-toggle-btn');
  if (cursorToggleBtn && cursorTrail) {
    cursorToggleBtn.addEventListener('click', () => {
      const isNowOn = cursorTrail.toggle();
      cursorToggleBtn.classList.toggle('off', !isNowOn);
      cursorToggleBtn.querySelector('.cursor-toggle-status').textContent = isNowOn ? 'ON' : 'OFF';
    });
  }

  // Initial render
  renderCategoryPills();
  filterAndRenderProducts();
});
