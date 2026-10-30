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
    const footerStyle = getComputedStyle(this.footer);
    const bodyGap = parseFloat(bodyStyle.rowGap);
    const minimumGap = parseFloat(rootStyle.rowGap) -
      (parseFloat(rootStyle.getPropertyValue("--home-space-between")) || 0);
    const introHeight = this.intro.getBoundingClientRect().height;
    const projectsHeight = this.projects.getBoundingClientRect().height;
    const available = window.innerHeight -
      parseFloat(bodyStyle.paddingTop) - parseFloat(bodyStyle.paddingBottom) -
      this.header.getBoundingClientRect().height - this.footer.getBoundingClientRect().height -
      2 * bodyGap;

    // The editorial field spans the header's bottom and the footer's text.
    const field = available + 2 * bodyGap + parseFloat(footerStyle.paddingTop);
    const projectsTop = Math.max(introHeight + minimumGap, Math.min(
      field * 2 / 3 - bodyGap - projectsHeight / 2,
      available - projectsHeight
    ));
    // Center the introduction in the area above the projects, keeping a safe gap.
    const above = Math.max(0, Math.min(
      (projectsTop - bodyGap - introHeight) / 2,
      projectsTop - introHeight - minimumGap
    ));
    const spaces = {
      above,
      between: Math.max(0, projectsTop - above - introHeight - minimumGap),
      below: Math.max(0, available - projectsTop - projectsHeight),
    };
    for (const [position, value] of Object.entries(spaces)) {
      const property = `--home-space-${position}`;
      const pixels = `${value.toFixed(3)}px`;
      if (this.root.style.getPropertyValue(property) !== pixels) {
        this.root.style.setProperty(property, pixels);
      }
    }
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
    // Native touch/trackpad scrolling and keyboard focus interrupt mouse momentum.
    this.track.addEventListener("wheel", () => this.stopMotion(), { passive: true });
    this.track.addEventListener("focusin", () => {
      if (!this.drag) this.stopMotion();
    });
    reducedMotionPreference.addEventListener("change", (event) => {
      if (event.matches) {
        this.stopMotion();
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
    this.stopMotion();
    this.track.scrollTo({
      left,
      behavior: reducedMotionPreference.matches ? "instant" : "smooth",
    });
  }

  stopMotion() {
    cancelAnimationFrame(this.motionFrame);
    this.track.classList.remove("is-coasting");
  }

  coast(velocity) {
    const start = this.track.scrollLeft;
    const maximum = this.track.scrollWidth - this.track.clientWidth;
    // Pick the destination from the impulse before animating, not after it stops.
    const projected = Math.max(0, Math.min(maximum, start + (reducedMotionPreference.matches ? 0 : velocity * 260)));
    const target = Math.max(0, Math.min(maximum, Math.round(projected / this.step) * this.step));
    const distance = target - start;
    if (reducedMotionPreference.matches || Math.abs(distance) < 1) {
      this.track.scrollLeft = target;
      this.stopMotion();
      return;
    }

    const followsImpulse = distance * velocity > 0 && Math.abs(velocity) >= 0.12;
    const duration = followsImpulse
      ? Math.min(1200, Math.max(550, 2.5 * Math.abs(distance / velocity)))
      : Math.min(900, Math.max(500, Math.abs(distance) * 2.2));
    const initialSlope = followsImpulse
      ? Math.min(3, velocity * duration / distance)
      : 0;
    const began = performance.now();
    const animate = (now) => {
      const progress = Math.min(1, (now - began) / duration);
      // A single trajectory carries the release speed to zero at the card.
      // Without an impulse, retain the gentle start and finish of a small correction.
      const eased = followsImpulse
        ? progress ** 2 * (3 - 2 * progress) +
          initialSlope * progress * (1 - progress) ** 2
        : progress ** 3 * (10 - 15 * progress + 6 * progress ** 2);
      this.track.scrollLeft = start + distance * eased;
      if (progress < 1) {
        this.motionFrame = requestAnimationFrame(animate);
      } else {
        this.stopMotion();
      }
    };
    this.motionFrame = requestAnimationFrame(animate);
  }

  updateBleed() {
    // Extend the whole sequence to the usable viewport edge; CSS caps each card.
    const bounds = this.root.getBoundingClientRect();
    const bleed = Math.max(0, document.documentElement.clientWidth - bounds.right);
    this.root.style.setProperty("--carousel-bleed", `${bleed}px`);
  }

  bindDragging() {
    this.track.addEventListener("dragstart", (event) => event.preventDefault());
    this.track.addEventListener("pointerdown", (event) => {
      this.stopMotion();
      if (
        event.pointerType !== "mouse" || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
      ) return;
      this.track.classList.add("is-coasting");
      this.track.scrollTo({ left: this.track.scrollLeft, behavior: "instant" });
      this.suppressClick = false;
      this.drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: event.timeStamp,
        velocity: 0,
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
        this.track.classList.add("is-dragging", "is-coasting");
        this.track.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      const elapsed = event.timeStamp - this.drag.lastTime;
      if (elapsed > 0) {
        const velocity = (this.drag.lastX - event.clientX) / elapsed;
        this.drag.velocity = Math.max(-3.5, Math.min(3.5,
          this.drag.velocity * 0.4 + velocity * 0.6
        ));
      }
      this.drag.lastX = event.clientX;
      this.drag.lastTime = event.timeStamp;
      this.track.scrollLeft = this.drag.scrollLeft - distance;
    });
    const finish = (event) => {
      if (!this.drag || this.drag.pointerId !== event.pointerId) return;
      const drag = this.drag;
      this.suppressClick = drag.moved;
      this.drag = null;
      this.track.classList.remove("is-dragging");
      if (this.track.hasPointerCapture(event.pointerId)) {
        this.track.releasePointerCapture(event.pointerId);
      }
      if (drag.moved && event.type === "pointerup") {
        // Holding still before release deliberately removes the flick impulse.
        this.coast(event.timeStamp - drag.lastTime < 80 ? drag.velocity : 0);
      } else {
        this.stopMotion();
      }
      // The synthetic click following pointerup must not open a dragged card.
      setTimeout(() => {
        this.suppressClick = false;
      }, 0);
    };
    this.track.addEventListener("pointerup", finish);
    this.track.addEventListener("pointercancel", finish);
    this.track.addEventListener("lostpointercapture", finish);
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
