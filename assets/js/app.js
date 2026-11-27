// Portfolio Website JavaScript
// Handles mobile menu toggle and smooth interactions

const reducedMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

// Keep this in sync with the wide navigation media query in style.css.
const wideLayout = window.matchMedia(
  "(width >= 75rem), (width >= 49rem) and (height >= 49rem)",
);

class PortfolioApp {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.body = document.body;
    this.mobileMenuLinks = document.querySelectorAll(".mobile-menu__list a");

    if (this.mobileMenu && this.hamburger) {
      this.init();
    }
  }

  init() {
    this.mobileMenu.inert = true;
    this.mobileMenu.setAttribute("aria-hidden", "true");
    this.hamburger.setAttribute("aria-controls", this.mobileMenu.id);
    this.hamburger.setAttribute("aria-label", "Open mobile menu");
    this.bindEvents();
    this.handleKeyboardNavigation();
  }

  bindEvents() {
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    this.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", (e) => {
        if (e.target === this.mobileMenu) {
          this.closeMobileMenu();
        }
      });
    }

    window.addEventListener("resize", () => {
      this.handleResize();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenu.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });

    // No IMG Right Click
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  toggleMobileMenu() {
    const isActive = this.mobileMenu.classList.contains("active");
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const scrollY = window.scrollY;
    this.hamburger.classList.add("active");
    this.hamburger.setAttribute("aria-expanded", "true");
    this.hamburger.setAttribute("aria-label", "Close mobile menu");
    this.mobileMenu.inert = false;
    this.mobileMenu.setAttribute("aria-hidden", "false");
    this.mobileMenu.classList.add("active");
    this.body.classList.add("menu-open");
    this.body.style.top = `-${scrollY}px`;

    this.mobileMenuLinks[0]?.focus({ preventScroll: true });
  }

  closeMobileMenu() {
    if (!this.mobileMenu.classList.contains("active")) return;
    const scrollY = this.body.style.top;
    this.hamburger.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.hamburger.setAttribute("aria-label", "Open mobile menu");
    this.mobileMenu.inert = true;
    this.mobileMenu.setAttribute("aria-hidden", "true");
    this.mobileMenu.classList.remove("active");
    this.body.classList.remove("menu-open");
    this.body.style.top = "";
    window.scrollTo({ top: parseInt(scrollY || "0", 10) * -1, behavior: "instant" });

    const focusTarget = wideLayout.matches
      ? document.querySelector(".desktop-nav a")
      : this.hamburger;
    focusTarget?.focus({ preventScroll: true });
  }

  handleResize() {
    if (
      wideLayout.matches &&
      this.mobileMenu.classList.contains("active")
    ) {
      this.closeMobileMenu();
    }
  }

  handleKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (!this.mobileMenu.classList.contains("active")) return;

      const focusableElements = [this.hamburger, ...this.mobileMenuLinks];
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
  }
}

// Smooth scroll functionality for anchor links
class SmoothScroll {
  constructor() {
    this.init();
    reducedMotionPreference.addEventListener("change", (event) => {
      if (event.matches) {
        window.scrollTo({
          top: window.scrollY,
          left: window.scrollX,
          behavior: "instant",
        });
      }
    });
  }

  init() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href === "#" || href === "#about" || href === "#contact") {
          e.preventDefault();
          console.log(
            `Navigation to ${href} - This would navigate to the ${href.slice(1)} page in a full implementation`,
          );
          return;
        }
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: reducedMotionPreference.matches ? "instant" : "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Performance monitoring (optional)
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      if ("performance" in window) {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        if (loadTime > 3000) {
          console.warn("Page load time exceeds 3 seconds");
        }
      }
    });
  }
}

// Reveal each editorial block once, as it enters the viewport.
class RevealAnimator {
  constructor() {
    const elements = [...document.querySelectorAll('[data-reveal="rise"]')];
    if (!elements.length || reducedMotionPreference.matches ||
        !("IntersectionObserver" in window)) return;

    const order = new Map(elements.map((element, index) => [element, index]));
    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter(({ isIntersecting, target }) => isIntersecting && target.classList.contains("reveal-pending"))
        .map(({ target }) => target)
        .sort((a, b) => order.get(a) - order.get(b));
      // Keep the sequence distinct even when more than four blocks enter together.
      const stride = Math.min(1, 3 / Math.max(1, entering.length - 1));
      entering.forEach((element, index) => {
        element.style.setProperty("--reveal-slot", index * stride);
        element.classList.replace("reveal-pending", "is-revealed");
        observer.unobserve(element);
      });
    }, { rootMargin: "0px 0px 40px 0px" });

    elements.forEach((element) => {
      observer.observe(element);
      element.classList.add("reveal-pending");
    });

    const showImmediately = (element) => {
      element.classList.remove("reveal-pending", "is-revealed");
      element.style.removeProperty("--reveal-slot");
    };
    const onFocus = (event) => {
      const element = event.target.closest('[data-reveal="rise"]');
      if (!element) return;
      observer.unobserve(element);
      showImmediately(element);
    };
    document.addEventListener("focusin", onFocus);

    reducedMotionPreference.addEventListener("change", (event) => {
      if (!event.matches) return;
      observer.disconnect();
      document.removeEventListener("focusin", onFocus);
      elements.forEach(showImmediately);
    });
  }
}

// Balance the Home's spare height without restricting content or its reading order.
class HomeComposition {
  constructor(root) {
    this.root = root;
    this.intro = root.querySelector(".home-intro");
    this.projects = root.querySelector(".projects");
    this.header = document.querySelector("header");
    this.footer = document.querySelector("footer");
    if (!this.intro || !this.projects || !this.header || !this.footer ||
        !("ResizeObserver" in window)) return;

    const schedule = () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.update());
    };
    this.observer = new ResizeObserver(schedule);
    [this.intro, this.projects, this.header, this.footer].forEach((element) => {
      this.observer.observe(element);
    });
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    this.update();
  }

  update() {
    const bodyStyle = getComputedStyle(document.body);
    const rootStyle = getComputedStyle(this.root);
    const currentSpace = parseFloat(rootStyle.getPropertyValue("--home-extra-space")) || 0;
    const minimumGap = parseFloat(rootStyle.rowGap) - currentSpace;
    const available = window.innerHeight -
      parseFloat(bodyStyle.paddingTop) - parseFloat(bodyStyle.paddingBottom) -
      this.header.offsetHeight - this.footer.offsetHeight - 2 * parseFloat(bodyStyle.rowGap);
    const contentHeight = this.intro.offsetHeight + this.projects.offsetHeight + minimumGap;

    // Give the introduction room to breathe without pushing the work down on tall screens.
    const extra = Math.min(minimumGap, Math.max(0, (available - contentHeight) / 3));
    const pixels = `${extra.toFixed(3)}px`;
    if (this.root.style.getPropertyValue("--home-extra-space") !== pixels) {
      this.root.style.setProperty("--home-extra-space", pixels);
    }
  }
}

// The wide carousel swaps projects in place. The narrow carousel scrolls between them.
class ProjectCarousel {
  constructor(root) {
    this.track = root.querySelector(".project-carousel__track");
    this.cards = [...root.querySelectorAll(".project-card")];
    this.controls = root.querySelector(".project-carousel__controls");
    this.previous = root.querySelector("[data-carousel-prev]");
    this.next = root.querySelector("[data-carousel-next]");
    this.position = root.querySelector("[data-carousel-position]");
    if (!this.track || !this.controls || this.cards.length < 2) return;

    this.returnKey = `portfolio:carousel:${location.pathname}`;
    this.markers = this.cards.map((card, index) => {
      const marker = document.createElement("span");
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", card.querySelector("h2").textContent.trim());
      button.setAttribute("aria-controls", this.track.id);
      button.addEventListener("click", () => this.show(index, true));
      marker.append(button);
      return marker;
    });
    root.querySelector("[data-carousel-markers]").append(...this.markers);
    this.controls.hidden = false;
    this.track.tabIndex = 0;
    const saved = this.restoredProject();
    this.index = saved?.card ?? 0;
    this.updateLayout();
    wideLayout.addEventListener("change", () => this.updateLayout());
    if ("onscrollend" in this.track) {
      this.track.addEventListener("scrollend", () => this.settleScroll());
    } else {
      let settleTimer;
      this.track.addEventListener("scroll", () => {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => this.settleScroll(), 150);
      });
    }
    if (saved?.focusLink && document.activeElement === document.body) {
      const target = saved.focusLink === "image" ? ".projects__image-link" : ".project-link";
      this.cards[this.index].querySelector(target)?.focus({ preventScroll: true });
    }

    this.previous.addEventListener("click", () => this.step(-1));
    this.next.addEventListener("click", () => this.step(1));
    this.track.addEventListener("keydown", (event) => this.handleKey(event));
    this.track.addEventListener("click", (event) => this.rememberProject(event));
    this.bindSwipe();
    this.bindWheel();
  }

  show(index, animate = false) {
    const count = this.cards.length;
    const nextIndex = (index + count) % count;
    if (!wideLayout.matches) {
      this.scrollToSlide(this.slides[index + 1], animate);
    }
    if (this.index === nextIndex) return;
    if (wideLayout.matches && this.cards[this.index].contains(document.activeElement)) {
      this.track.focus({ preventScroll: true });
    }
    this.index = nextIndex;
    this.render(animate);
  }

  render(animate = false) {
    const paged = wideLayout.matches;
    this.cards.forEach((card, i) => {
      const current = i === this.index;
      card.hidden = paged && !current;
      card.classList.toggle("is-changing", paged && animate && current);
      this.markers[i].toggleAttribute("data-visible", current);
      this.markers[i].firstElementChild.setAttribute("aria-current", String(current));
    });
    const count = this.cards.length;
    for (const offset of [-1, 0, 1]) {
      this.cards[(this.index + offset + count) % count].querySelector("img").loading = "eager";
    }
    const title = this.cards[this.index].querySelector("h2").textContent.trim();
    this.position.textContent = `${this.index + 1} / ${count} · ${title}`;
  }

  updateLayout() {
    const paged = wideLayout.matches;
    this.track.classList.toggle("is-paged", paged);
    this.track.classList.toggle("is-scrolling", !paged);
    this.track.classList.remove("is-dragging");

    if (paged) {
      this.copies?.forEach((copy) => copy.remove());
      if (this.cards.some((card, i) => i !== this.index && card.contains(document.activeElement))) {
        this.track.focus({ preventScroll: true });
      }
    } else {
      // The extra card after the first copy keeps the next project's preview visible.
      this.copies ??= [this.cards.length - 1, 0, 1].map((index) => this.copyCard(index));
      const [last, first, preview] = this.copies;
      this.track.prepend(last);
      this.track.append(first, preview);
      preview.classList.add("is-preview");
      this.slides = [last, ...this.cards, first];
    }
    this.render();
    if (!paged) this.scrollToSlide(this.cards[this.index]);
  }

  copyCard(index) {
    const copy = this.cards[index].cloneNode(true);
    copy.hidden = false;
    copy.classList.remove("is-changing");
    copy.dataset.carouselCopy = index;
    copy.setAttribute("aria-hidden", "true");
    copy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    copy.querySelectorAll("a").forEach((link) => { link.tabIndex = -1; });
    return copy;
  }

  scrollToSlide(slide, animate = false) {
    this.track.scrollTo({
      left: slide.offsetLeft,
      behavior: animate && !reducedMotionPreference.matches ? "smooth" : "instant",
    });
  }

  nearestSlide(left = this.track.scrollLeft) {
    return this.slides.reduce((nearest, slide) =>
      Math.abs(slide.offsetLeft - left) < Math.abs(nearest.offsetLeft - left) ? slide : nearest,
    );
  }

  settleScroll() {
    if (wideLayout.matches || this.track.classList.contains("is-dragging")) return;
    const slide = this.nearestSlide();
    const index = this.cardIndex(slide);
    if (slide !== this.cards[index]) this.scrollToSlide(this.cards[index]);
    if (this.index === index) return;
    this.index = index;
    this.render();
  }

  cardIndex(card) {
    return card.dataset.carouselCopy === undefined
      ? this.cards.indexOf(card)
      : Number(card.dataset.carouselCopy);
  }

  step(direction) {
    this.show(this.index + direction, true);
  }

  handleKey(event) {
    if (event.target !== this.track || event.altKey || event.ctrlKey || event.metaKey) return;
    const positions = {
      ArrowLeft: this.index - 1,
      ArrowRight: this.index + 1,
      Home: 0,
      End: this.cards.length - 1,
    };
    if (!(event.key in positions)) return;
    event.preventDefault();
    this.show(positions[event.key], true);
  }

  rememberProject(event) {
    if (event.defaultPrevented || event.button !== 0 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.target.closest(".project-card a[href]");
    if (!link || (link.target && link.target !== "_self")) return;

    const entry = {
      project: link.href,
      card: this.cardIndex(link.closest(".project-card")),
      focusLink: event.detail === 0
        ? (link.classList.contains("projects__image-link") ? "image" : "action")
        : null,
    };
    // Per-entry history handles Back. The project link to #projects uses a new entry.
    try {
      history.replaceState({ ...history.state, projectCarousel: entry }, "");
    } catch {
      // Navigation remains available when history state cannot be written.
    }
    try {
      sessionStorage.setItem(this.returnKey, JSON.stringify(entry));
    } catch {
      // Session storage can be unavailable.
    }
  }

  restoredProject() {
    let entry = history.state?.projectCarousel;
    if (!entry && location.hash === "#projects") {
      try {
        const saved = JSON.parse(sessionStorage.getItem(this.returnKey));
        if (saved?.project === document.referrer) {
          entry = saved;
          sessionStorage.removeItem(this.returnKey);
        }
      } catch {
        // Keep regular anchor navigation when the previous project is unavailable.
      }
    }
    if (Number.isInteger(entry?.card) && this.cards[entry.card]) return entry;
    return null;
  }

  bindSwipe() {
    const dragThreshold = 10;
    const swipeThreshold = 40;
    let gesture;
    let suppressClick = false;

    this.track.addEventListener("dragstart", (event) => event.preventDefault());
    this.track.addEventListener("pointerdown", (event) => {
      suppressClick = false;
      if (!event.isPrimary || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      if (!wideLayout.matches && event.pointerType !== "mouse") return;
      const { left, right } = this.track.getBoundingClientRect();
      gesture = {
        id: event.pointerId, x: event.clientX, y: event.clientY, left, right,
        scrollLeft: this.track.scrollLeft, horizontal: false,
      };
    });
    this.track.addEventListener("pointermove", (event) => {
      if (gesture?.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const x = Math.abs(dx);
      const y = Math.abs(event.clientY - gesture.y);
      if (!gesture.horizontal) {
        if (Math.max(x, y) < dragThreshold) return;
        if (y >= x) {
          suppressClick = event.pointerType === "mouse";
          gesture = null;
          return;
        }
        gesture.horizontal = true;
        if (event.pointerType === "mouse") this.track.setPointerCapture(event.pointerId);
        this.track.classList.add("is-dragging");
      }
      if (wideLayout.matches) {
        const edge = dx < 0 ? gesture.left : gesture.right;
        const distanceToEdge = Math.abs(gesture.x - edge);
        const opacity = dx ? Math.max(0, 1 - x / distanceToEdge) : 1;
        this.track.style.setProperty("--drag-opacity", opacity);
      } else {
        this.track.scrollLeft = gesture.scrollLeft - dx;
      }
      event.preventDefault();
    });
    const endGesture = (event) => {
      if (gesture?.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      this.track.classList.remove("is-dragging");
      this.track.style.removeProperty("--drag-opacity");
      if (gesture.horizontal && !wideLayout.matches) {
        let slide = this.nearestSlide();
        const start = this.nearestSlide(gesture.scrollLeft);
        suppressClick = event.type === "pointerup";
        if (suppressClick && Math.abs(dx) >= swipeThreshold && slide === start) {
          const adjacent = this.slides.indexOf(start) - Math.sign(dx);
          slide = this.slides[adjacent] ?? slide;
        }
        this.scrollToSlide(slide, true);
      } else if (gesture.horizontal && event.type === "pointerup") {
        suppressClick = true;
        const reachedEdge = dx < 0 ? event.clientX <= gesture.left : event.clientX >= gesture.right;
        if (dx && (Math.abs(dx) >= swipeThreshold || reachedEdge)) {
          this.step(dx < 0 ? 1 : -1);
        }
      }
      gesture = null;
    };
    for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) {
      this.track.addEventListener(type, endGesture);
    }
    this.track.addEventListener("pointerleave", (event) => {
      if (!gesture?.horizontal) endGesture(event);
    });
    this.track.addEventListener("click", (event) => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }

  bindWheel() {
    let lastEvent = -Infinity;
    let delta = 0;
    let consumed = false;
    this.track.addEventListener("wheel", (event) => {
      // Vertical scrolling and pinch-to-zoom keep their native behaviour.
      if (!wideLayout.matches || event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (event.timeStamp - lastEvent > 160) {
        delta = 0;
        consumed = false;
      }
      lastEvent = event.timeStamp;
      if (consumed) return;
      delta += event.deltaX;
      const threshold = event.deltaMode === 0 ? 35 : 1;
      if (Math.abs(delta) < threshold) return;
      consumed = true;
      this.step(Math.sign(delta));
    }, { passive: false });
  }
}

// Ambient video plays only while it is in view, unless the visitor has paused it.
class MotionAwareVideos {
  constructor() {
    document.querySelectorAll("video[data-autoplay]").forEach((video) => {
      let inView = false;
      let userPaused = false;
      let pausedBySite = false;
      const syncPlayback = () => {
        const canAutoplay = inView && !document.hidden && !reducedMotionPreference.matches;
        video.loop = canAutoplay;
        if (!canAutoplay) {
          if (!video.paused) {
            pausedBySite = true;
            video.pause();
          }
        } else if (!userPaused && video.paused) {
          // The native controls are available when autoplay is blocked.
          video.play().catch(() => {});
        }
      };
      video.addEventListener("pause", () => {
        if (!pausedBySite) userPaused = true;
        pausedBySite = false;
      });
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio >= 0.6;
          syncPlayback();
        }, { threshold: 0.6 });
        observer.observe(video);
      }
      reducedMotionPreference.addEventListener("change", syncPlayback);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();
    });
  }
}

// Form validation keeps the native constraints and the existing inline messages.
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  // Without JS, HTML retains interactive native validation.
  form.noValidate = true;
  const fields = [...form.querySelectorAll(
    ".contact-form__field input, .contact-form__field textarea",
  )];
  let validationAttempted = false;
  let submitting = false;

  function updateFieldError(field, showError) {
    const error = field.parentElement.querySelector(".contact-form__field-error");
    if (!error) return;
    const invalid = showError && !field.validity.valid;
    const descriptions = new Set(
      (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean),
    );
    descriptions.delete(error.id);
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
      descriptions.add(error.id);
    } else {
      field.removeAttribute("aria-invalid");
    }
    if (descriptions.size) {
      field.setAttribute("aria-describedby", [...descriptions].join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  }

  fields.forEach((field) => {
    const syncError = () => updateFieldError(
      field,
      validationAttempted || field.matches(":user-invalid"),
    );
    field.addEventListener("input", syncError);
    field.addEventListener("blur", syncError);
    field.addEventListener("invalid", () => updateFieldError(field, true));
  });

  form.addEventListener("reset", () => {
    validationAttempted = false;
    fields.forEach((field) => updateFieldError(field, false));
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (submitting) return;

    validationAttempted = true;
    formMessage.textContent = "";
    fields.forEach((field) => updateFieldError(field, true));
    if (!form.checkValidity()) {
      fields.find((field) => !field.validity.valid)?.focus();
      return;
    }

    const formData = new FormData(form);
    submitting = true;
    form.setAttribute("aria-busy", "true");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        formMessage.textContent = "Message sent! I'll get back to you soon.";
        formMessage.style.color = "var(--color-success)";
        form.reset();
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.style.color = "var(--color-error)";
      }
    } catch (error) {
      formMessage.textContent = "Network error. Please check your connection.";
      formMessage.style.color = "var(--color-error)";
    } finally {
      submitting = false;
      form.removeAttribute("aria-busy");
    }
  });
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
  new SmoothScroll();
  new RevealAnimator();
  new MotionAwareVideos();
  document.querySelectorAll("[data-project-carousel]").forEach((root) => {
    new ProjectCarousel(root);
  });
  const home = document.querySelector(".home-content");
  if (home) new HomeComposition(home);

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    new PerformanceMonitor();
  }

  document.body.classList.add("loaded");
  console.log("Portfolio website initialized successfully!");
});

// Export for potential testing or module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PortfolioApp,
    SmoothScroll,
    PerformanceMonitor,
    ProjectCarousel,
  };
}
