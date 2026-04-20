// Portfolio Website JavaScript
// Handles mobile menu toggle and smooth interactions

class PortfolioApp {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.body = document.body;
    this.mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");

    if (this.mobileMenu) {
      this.init();
    }
  }

  init() {
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
    this.mobileMenu.classList.add("active");
    this.body.classList.add("menu-open");
    this.body.style.top = `-${scrollY}px`;

    setTimeout(() => {
      const firstMenuItem = this.mobileMenu.querySelector(".mobile-menu__link");
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }, 100);
  }

  closeMobileMenu() {
    const scrollY = this.body.style.top;
    this.hamburger.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.mobileMenu.classList.remove("active");
    this.body.classList.remove("menu-open");
    this.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    setTimeout(() => {
      this.hamburger.focus();
    }, 100);
  }

  handleResize() {
    if (
      window.innerWidth >= 768 &&
      this.mobileMenu.classList.contains("active")
    ) {
      this.closeMobileMenu();
    }
  }

  handleKeyboardNavigation() {
    this.mobileMenu.addEventListener("keydown", (e) => {
      if (!this.mobileMenu.classList.contains("active")) return;

      const focusableElements =
        this.mobileMenu.querySelectorAll(".mobile-menu__link");
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
          target.scrollIntoView({ behavior: "smooth", block: "start" });
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

// Scroll to Top Button functionality
class ScrollToTopButton {
  constructor() {
    this.button = document.getElementById("page-return");
    this.scrollThreshold = 300;
    this.init();
  }

  init() {
    if (!this.button) return;

    window.addEventListener("scroll", () => {
      this.toggleButtonVisibility();
    });

    this.button.addEventListener("click", () => {
      this.scrollToTop();
    });
  }

  toggleButtonVisibility() {
    const scrollPosition =
      window.scrollY ??
      window.pageYOffset ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      0;

    if (scrollPosition > this.scrollThreshold) {
      this.button.classList.add("visible");
    } else {
      this.button.classList.remove("visible");
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Scroll Animation functionality
class ScrollAnimator {
  constructor() {
    this.init();
  }

  init() {
    const options = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, options);

    const hiddenElements = document.querySelectorAll(".todo");
    hiddenElements.forEach((el) => observer.observe(el));
  }
}

// Form Error Messages — only runs if contact form exists on this page
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  function validateField(input) {
    const errorEl = document.getElementById(input.id + "-error");
    if (!errorEl) return true;

    let message = "";

    if (input.validity.valueMissing) {
      if (input.name === "name") message = "Please enter your name.";
      if (input.name === "email") message = "Please enter your e-mail.";
      if (input.name === "message") message = "Please write a message.";
    } else if (input.validity.typeMismatch) {
      if (input.name === "email")
        message = "That doesn't look like a valid e-mail address.";
    }

    errorEl.textContent = message;

    if (message) {
      input.setAttribute("aria-describedby", input.id + "-error");
      clearTimeout(errorEl._hideTimer);
      errorEl._hideTimer = setTimeout(() => {
        errorEl.textContent = "";
        input.removeAttribute("aria-describedby");
      }, 4000);
    } else {
      input.removeAttribute("aria-describedby");
    }

    return input.validity.valid;
  }

  const fields = form.querySelectorAll(
    'input:not([type="hidden"]):not([type="submit"]), textarea',
  );

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      const isValid = validateField(field);
      if (isValid) {
        setTimeout(() => {
          const errorEl = document.getElementById(field.id + "-error");
          if (errorEl) errorEl.textContent = "";
        }, 300);
      }
    });

    field.addEventListener("input", () => {
      if (!field.validity.valid) validateField(field);
    });
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });
    if (!isValid) return;

    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        formMessage.textContent = "Message sent! I'll get back to you soon.";
        formMessage.style.color = "var(--text)";
        form.reset();
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000);
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.style.color = "oklch(65% 0.18 25)";
      }
    } catch (error) {
      formMessage.textContent = "Network error. Please check your connection.";
      formMessage.style.color = "oklch(65% 0.18 25)";
    }
  });
} // end form guard

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
  new SmoothScroll();
  new ScrollToTopButton();
  new ScrollAnimator();

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
    ScrollToTopButton,
  };
}
