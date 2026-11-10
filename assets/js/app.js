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

    const focusTarget = window.matchMedia(
      "(width >= calc(755 / 16 * 1rem))",
    ).matches
      ? document.querySelector(".desktop-nav a")
      : this.hamburger;
    focusTarget?.focus({ preventScroll: true });
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

// Native horizontal scrolling, keyboard navigation and mouse dragging.
class ProjectCarousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".project-carousel__track");
    this.cards = [...root.querySelectorAll(".project-card")];
    this.controls = root.querySelector(".project-carousel__controls");
    this.previous = root.querySelector("[data-carousel-prev]");
    this.next = root.querySelector("[data-carousel-next]");
    this.position = root.querySelector("[data-carousel-position]");
    this.returnKey = `portfolio:carousel:${location.pathname}`;
    this.drag = null;
    this.motionTarget = null;
    this.suppressClick = false;

    if (!this.track || !this.cards.length) return;
    this.markers = this.cards.map(() => document.createElement("span"));
    root.querySelector("[data-carousel-markers]")?.append(...this.markers);
    this.track.addEventListener("keydown", (event) => {
      if (event.target !== this.track) return;
      const destinations = {
        ArrowLeft: this.adjacentPosition(-1),
        ArrowRight: this.adjacentPosition(1),
        Home: 0,
        End: this.maxScroll,
      };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      this.scrollTo(destinations[event.key]);
    });
    this.bindDragging();
    this.previous?.addEventListener("click", () => {
      this.scrollTo(this.adjacentPosition(-1));
    });
    this.next?.addEventListener("click", () => {
      this.scrollTo(this.adjacentPosition(1));
    });
    const settle = () => {
      if (!this.drag && this.motionTarget === null) this.updateControls();
    };
    if ("onscrollend" in this.track) {
      this.track.addEventListener("scrollend", settle);
    } else {
      this.track.addEventListener("scroll", () => {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(settle, 120);
      }, { passive: true });
    }
    this.track.addEventListener("click", (event) => this.rememberPosition(event));
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) this.restorePosition();
    });
    // Native touch/trackpad scrolling and keyboard focus interrupt mouse momentum.
    this.track.addEventListener("wheel", () => {
      if (this.motionTarget !== null) this.stopMotion();
    }, { passive: true });
    this.track.addEventListener("focusin", () => {
      if (this.motionTarget !== null) this.stopMotion();
    });
    reducedMotionPreference.addEventListener("change", (event) => {
      if (event.matches && !this.drag) this.stopMotion();
    });
    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(() => this.updateBleed());
      this.resizeObserver.observe(this.root);
    }
    window.addEventListener("resize", () => this.updateBleed());
    this.updateBleed();
    this.restorePosition();
  }

  get maxScroll() {
    return this.track.scrollWidth - this.track.clientWidth;
  }

  get widthFromGutter() {
    const padding = parseFloat(getComputedStyle(this.track).paddingInlineStart) || 0;
    return this.track.clientWidth - padding;
  }

  get step() {
    const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
    return this.cards[0].getBoundingClientRect().width + gap;
  }

  adjacentPosition(direction) {
    const left = this.motionTarget ?? this.track.scrollLeft;
    const step = this.step;
    if (!step || (direction < 0 ? left <= 1 : left >= this.maxScroll - 1)) return left;
    return direction < 0
      ? Math.max(0, (Math.ceil((left - 1) / step) - 1) * step)
      : Math.min(this.maxScroll, (Math.floor((left + 1) / step) + 1) * step);
  }

  updateControls() {
    if (!this.controls) return;
    const left = this.track.scrollLeft;
    const viewport = this.track.clientWidth;
    const maximum = this.track.scrollWidth - viewport;
    this.controls.hidden = maximum <= 1;
    if (this.controls.hidden) return;

    const width = this.cards[0].getBoundingClientRect().width;
    const step = width + (parseFloat(getComputedStyle(this.track).columnGap) || 0);
    if (!step) return;
    const count = this.cards.length;
    const clampCard = (index) => Math.max(1, Math.min(count, index));
    const visibleStart = left + this.widthFromGutter - viewport;
    let first = clampCard(Math.ceil((visibleStart - 1) / step) + 1);
    let last = clampCard(Math.floor((visibleStart + viewport - width + 1) / step) + 1);
    // A free scroll can end between cards. Use the one nearest the center.
    if (first > last) {
      first = last = clampCard(Math.round((visibleStart + (viewport - width) / 2) / step) + 1);
    }
    const range = first === last ? String(first) : `${first}–${last}`;
    const label = `${range} / ${count}`;
    if (this.position.textContent !== label) {
      this.position.textContent = label;
      this.markers.forEach((marker, index) => {
        marker.toggleAttribute("data-visible", index + 1 >= first && index + 1 <= last);
      });
    }
    this.updateButtons(left, maximum);
  }

  updateButtons(left, maximum = this.maxScroll) {
    for (const [button, unavailable] of [[this.previous, left <= 1], [this.next, left >= maximum - 1]]) {
      const value = String(unavailable);
      if (button && button.getAttribute("aria-disabled") !== value) {
        button.setAttribute("aria-disabled", value);
      }
    }
  }

  rememberPosition(event) {
    if (event.defaultPrevented || event.button !== 0 ||
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.target.closest(".project-card a[href]");
    const step = this.step;
    if (!link || !step || (link.target && link.target !== "_self")) return;

    const entry = {
      offset: this.track.scrollLeft / step,
      visibleSteps: this.widthFromGutter / step,
      project: link.href,
      card: this.cards.indexOf(link.closest(".project-card")),
      focusLink: event.detail === 0
        ? (link.classList.contains("projects__image-link") ? "image" : "action")
        : null,
    };
    // History keeps the position per entry. Session storage also supports the
    // link back to selected work, which creates a different history entry.
    try {
      history.replaceState({ ...history.state, projectCarousel: entry }, "");
    } catch {
      // The browser can still restore its own scroll state.
    }
    try {
      sessionStorage.setItem(this.returnKey, JSON.stringify(entry));
    } catch {
      // Storage may be disabled.
    }
  }

  restorePosition() {
    let entry = history.state?.projectCarousel;
    if (!entry && location.hash === "#projects") {
      try {
        const saved = JSON.parse(sessionStorage.getItem(this.returnKey));
        if (saved?.project === document.referrer) {
          entry = saved;
          sessionStorage.removeItem(this.returnKey);
        }
      } catch {
        // Keep the normal anchor navigation if storage is unavailable.
      }
    }
    const step = this.step;
    if (!Number.isFinite(entry?.offset) || !step) return;

    const card = this.cards[entry.card];
    let left = entry.offset * step;
    const widthFromGutter = this.widthFromGutter;
    if (card && widthFromGutter / step < entry.visibleSteps - 0.01) {
      // A narrower viewport should still show the card that was opened.
      const cardStart = entry.card * step;
      const cardEnd = cardStart + card.getBoundingClientRect().width;
      left = Math.min(cardStart, Math.max(left, cardEnd - widthFromGutter));
    }
    this.track.scrollTo({
      left: Math.max(0, Math.min(left, this.maxScroll)),
      behavior: "instant",
    });
    if (card && entry.focusLink && document.activeElement === document.body) {
      const selector = entry.focusLink === "image" ? ".projects__image-link" : ".project-link";
      card.querySelector(selector)?.focus({ preventScroll: true });
    }
    this.updateControls();
  }

  scrollTo(left) {
    if (this.drag || Math.abs(left - (this.motionTarget ?? this.track.scrollLeft)) < 1) return;
    this.moveTo(left);
  }

  stopMotion() {
    cancelAnimationFrame(this.motionFrame);
    this.motionTarget = null;
    this.track.classList.remove("is-positioning");
    this.updateControls();
  }

  coast(velocity) {
    const start = this.track.scrollLeft;
    const maximum = this.maxScroll;
    const step = this.step;
    if (!step) {
      this.stopMotion();
      return;
    }
    // Pick the destination from the impulse before animating, not after it stops.
    const impulse = reducedMotionPreference.matches ? 0 : velocity * 160;
    const projected = Math.max(0, Math.min(maximum, start + impulse));
    const snap = Math.min(maximum, Math.round(projected / step) * step);
    const target = maximum - projected < Math.abs(projected - snap) ? maximum : snap;
    this.moveTo(target, velocity);
  }

  moveTo(target, velocity = 0) {
    cancelAnimationFrame(this.motionFrame);
    const start = this.track.scrollLeft;
    const distance = target - start;
    this.track.classList.add("is-positioning");
    if (reducedMotionPreference.matches || Math.abs(distance) < 1) {
      this.track.scrollLeft = target;
      this.stopMotion();
      return;
    }

    this.motionTarget = target;
    this.updateButtons(target);
    const followsImpulse = distance * velocity > 0 && Math.abs(velocity) >= 0.12;
    const duration = Math.min(320, 160 + Math.abs(distance) * 0.28);
    const initialSlope = followsImpulse
      ? Math.min(3, velocity * duration / distance)
      : 0;
    const began = performance.now();
    const animate = (now) => {
      const progress = Math.max(0, Math.min(1, (now - began) / duration));
      // Carry the release speed into the curve; button navigation decelerates from the start.
      const eased = followsImpulse
        ? progress ** 2 * (3 - 2 * progress) +
          initialSlope * progress * (1 - progress) ** 2
        : 1 - (1 - progress) ** 4;
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
    // Keep both scroll edges at the usable viewport; padding preserves the gutters.
    const bounds = this.root.getBoundingClientRect();
    const start = Math.max(0, bounds.left);
    const end = Math.max(0, document.documentElement.clientWidth - bounds.right);
    this.root.style.setProperty("--carousel-bleed-start", `${start}px`);
    this.root.style.setProperty("--carousel-bleed-end", `${end}px`);
    if (this.motionTarget !== null) this.stopMotion();
    else if (!this.drag) this.updateControls();
  }

  bindDragging() {
    this.track.addEventListener("dragstart", (event) => event.preventDefault());
    this.track.addEventListener("pointerdown", (event) => {
      this.stopMotion();
      if (
        event.pointerType !== "mouse" || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
      ) return;
      this.track.classList.add("is-positioning");
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
        this.track.classList.add("is-dragging");
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
