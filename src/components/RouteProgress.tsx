import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteProgress = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.body;
    const start = performance.now();
    body.setAttribute("data-route-transitioning", "true");

    const onFinish = () => {
      const elapsed = performance.now() - start;
      if (elapsed < 400) {
        setTimeout(() => body.removeAttribute("data-route-transitioning"), 400 - elapsed);
      } else {
        body.removeAttribute("data-route-transitioning");
      }
    };

    window.addEventListener("load", onFinish, { once: true });
    return () => {
      window.removeEventListener("load", onFinish);
      body.removeAttribute("data-route-transitioning");
    };
  }, [pathname]);

  return null;
};

export default RouteProgress;
