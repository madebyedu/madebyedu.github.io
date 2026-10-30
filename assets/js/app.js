// Portfolio Website JavaScript
// Handles mobile menu toggle and smooth interactions

const reducedMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

class PortfolioApp {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.body = document.body;
    this.mobileMenuLinks = document.querySelectorAll(".mobile-menu__list a");
    this.focusTimer = null;

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

    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const firstMenuItem = this.mobileMenu.querySelector(
        ".mobile-menu__list a",
      );
      if (firstMenuItem) {
        firstMenuItem.focus({ preventScroll: true });
      }
    }, 100);
  }

  closeMobileMenu() {
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

    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const focusTarget = window.matchMedia(
        "(width >= calc(755 / 16 * 1rem))",
      ).matches
        ? document.querySelector(".desktop-nav a")
        : this.hamburger;
      focusTarget?.focus({ preventScroll: true });
    }, 100);
  }

  handleResize() {
    if (
      window.matchMedia("(width >= calc(755 / 16 * 1rem))").matches &&
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

// Shared entrance preset. Add data-reveal="rise" to a content block on any page.
class RevealAnimator {
  constructor() {
    this.elements = [...document.querySelectorAll('[data-reveal="rise"]')];
    if (reducedMotionPreference.matches || !("IntersectionObserver" in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.reveal(entry.target, Math.min(index++, 3));
      }
    }, { rootMargin: "0px 0px 40px 0px" });

    this.elements.forEach((element) => {
      element.classList.add("reveal-pending");
      this.observer.observe(element);
    });

    // Keyboard navigation must never land in invisible content.
    document.addEventListener("focusin", (event) => {
      const element = event.target.closest('[data-reveal="rise"]');
      if (element) {
        this.reveal(element);
        element.getAnimations().forEach((animation) => animation.finish());
      }
    });

    reducedMotionPreference.addEventListener("change", (event) => {
      if (!event.matches) return;
      // Stabilize all content so restoring normal motion cannot replay old entries.
      this.observer.disconnect();
      this.elements.forEach((element) => {
        element.classList.remove("reveal-pending", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    });
  }

  reveal(element, index = 0) {
    if (!element.classList.contains("reveal-pending")) return;
    element.style.setProperty("--reveal-delay", `calc(var(--reveal-step) * ${index})`);
    element.classList.remove("reveal-pending");
    element.classList.add("is-revealed");
    this.observer.unobserve(element);
  }
}

// Native horizontal scrolling, keyboard navigation and mouse dragging.
class ProjectCarousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".project-carousel__track");
    this.cards = [...root.querySelectorAll(".project-card")];
    this.drag = null;
    this.suppressClick = false;

    if (!this.track || !this.cards.length) return;
    this.track.addEventListener("keydown", (event) => {
      if (event.target !== this.track) return;
      const destinations = {
        ArrowLeft: this.track.scrollLeft - this.step,
        ArrowRight: this.track.scrollLeft + this.step,
        Home: 0,
        End: this.track.scrollWidth,
      };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      this.scrollTo(destinations[event.key]);
    });
    this.bindDragging();
    reducedMotionPreference.addEventListener("change", (event) => {
      if (event.matches) {
        this.track.scrollTo({ left: this.track.scrollLeft, behavior: "instant" });
      }
    });
    this.resizeObserver = new ResizeObserver(() => this.updateBleed());
    this.resizeObserver.observe(this.root);
    window.addEventListener("resize", () => this.updateBleed());
    this.updateBleed();
  }

  get step() {
    const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
    return this.cards[0].getBoundingClientRect().width + gap;
  }

  scrollTo(left) {
    this.track.scrollTo({
      left,
      behavior: reducedMotionPreference.matches ? "instant" : "smooth",
    });
  }

  updateBleed() {
    // Extend to the viewport edge, capped by the visual frame defined in CSS.
    const bounds = this.root.getBoundingClientRect();
    const viewportRight = document.documentElement.clientWidth;
    const maximumWidth = parseFloat(getComputedStyle(this.root).maxWidth);
    const frameRight = Number.isFinite(maximumWidth)
      ? bounds.left + (bounds.width + maximumWidth) / 2
      : viewportRight;
    const bleed = Math.max(0, Math.min(viewportRight, frameRight) - bounds.right);
    this.root.style.setProperty("--carousel-bleed", `${bleed}px`);
  }

  bindDragging() {
    this.track.addEventListener("dragstart", (event) => event.preventDefault());
    this.track.addEventListener("pointerdown", (event) => {
      if (
        event.pointerType !== "mouse" || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
      ) return;
      this.suppressClick = false;
      this.drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: this.track.scrollLeft,
        moved: false,
      };
    });
    this.track.addEventListener("pointermove", (event) => {
      if (!this.drag || this.drag.pointerId !== event.pointerId) return;
      const distance = event.clientX - this.drag.startX;
      if (!this.drag.moved && Math.abs(distance) < 8) return;
      if (!this.drag.moved) {
        this.drag.moved = true;
        this.track.classList.add("is-dragging");
        this.track.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      this.track.scrollLeft = this.drag.scrollLeft - distance;
    });
    const finish = (event) => {
      if (!this.drag || this.drag.pointerId !== event.pointerId) return;
      this.suppressClick = this.drag.moved;
      this.drag = null;
      this.track.classList.remove("is-dragging");
      if (this.track.hasPointerCapture(event.pointerId)) {
        this.track.releasePointerCapture(event.pointerId);
      }
      // The synthetic click following pointerup must not open a dragged card.
      setTimeout(() => {
        this.suppressClick = false;
      }, 0);
    };
    this.track.addEventListener("pointerup", finish);
    this.track.addEventListener("pointercancel", finish);
    this.track.addEventListener("pointerleave", (event) => {
      if (this.drag && !this.drag.moved) finish(event);
    });
    this.track.addEventListener("click", (event) => {
      if (!this.suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }
}

// Autoplay is enhanced in JS so reduced motion is respected before playback starts.
class MotionAwareVideos {
  constructor() {
    this.videos = [...document.querySelectorAll("video[data-autoplay]")];
    this.loopingVideos = new Set(this.videos.filter((video) => video.loop));
    this.updatePreference();

    if (!reducedMotionPreference.matches) {
      this.videos.forEach((video) => {
        video.autoplay = true;
        // A browser may require a gesture; native controls remain available.
        video.play().catch(() => {});
      });
    }

    reducedMotionPreference.addEventListener("change", () => {
      this.updatePreference();
    });
  }

  updatePreference() {
    this.videos.forEach((video) => {
      video.loop = !reducedMotionPreference.matches && this.loopingVideos.has(video);
      if (reducedMotionPreference.matches) {
        video.autoplay = false;
        video.pause();
      }
    });
    // Returning to normal motion never overrides a visitor's playback/pause choice.
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
