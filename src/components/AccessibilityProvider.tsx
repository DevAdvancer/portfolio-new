import { useEffect } from "react";

const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Inject focus-visible polyfill styles
    const style = document.createElement("style");
    style.textContent = `
      :focus:not(:focus-visible) {
        outline: none;
      }
      :focus-visible {
        outline: 2px solid var(--focus-color, #3b82f6);
        outline-offset: 2px;
        border-radius: 4px;
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      .focus\:not-sr-only:focus {
        position: fixed;
        width: auto;
        height: auto;
        padding: 0.5rem 1rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    `;
    document.head.appendChild(style);

    // Set focus color CSS var
    document.documentElement.style.setProperty("--focus-color", "#3b82f6");

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

export default AccessibilityProvider;
