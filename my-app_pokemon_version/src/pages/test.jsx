import React, { useEffect } from "react";
import mixitup from "mixitup";

export default function Test() {
  useEffect(() => {
    const mixer = mixitup(".container", {
      selectors: {
        target: ".mix",
      },
      animation: {
        duration: 600,
      },
    });

    return () => mixer.destroy();
  }, []);

  return (
    <div>
      <button type="button" data-filter="all">
        Rartée
      </button>
      <button type="button" data-filter=".category-a">
        Illustration Rare
      </button>
      <button type="button" data-filter=".category-b">
        Illustration Speciale Rare
      </button>
      <button type="button" data-filter=".category-c">
        Illustration Hyper Rare
      </button>
      <div className="container">
        <div className="mix category-a" data-order="1">
        </div>
        <div className="mix category-b" data-order="2">
          2
        </div>
        <div className="mix category-b category-c" data-order="3">
          3
        </div>
        <div className="mix category-a category-d" data-order="4">
          4
        </div>
      </div>
    </div>
  );
}
