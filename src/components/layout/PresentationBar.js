import React from "react";

export default function PresentationBar() {
  const base = process.env.PUBLIC_URL;

  const brands = [
    {
      name: "Lora Iris",
      logo: `${base}/content-img/lora-iris-logo.png`,
    },
    {
      name: "Acousma",
      logo: `${base}/content-img/acousma-logo.png`,
    },
    {
      name: "Balaloum",
      logo: `${base}/content-img/balaloum-logo.png`,
    },
    {
      name: "Ease Light",
      logo: `${base}/content-img/easy-light-logo.png`,
    },
    {
      name: "Ellen",
      logo: `${base}/content-img/ellen-logo.png`,
    },
    {
      name: "Luna",
      logo: `${base}/content-img/luna-logo.png`,
    },
    {
      name: "Your Touch",
      logo: `${base}/content-img/your-touch-logo.png`,
    },
    {
      name: "Julia Ulich",
      logo: `${base}/content-img/julia-ulich-logo.webp`,
    },
  ];

  return (
    <div className="presentation-bar">
      <ul className="presentation-list">
        {brands.map((brand) => (
          <li className="presentation-item" key={brand.name}>
            <a href={base + "/"} className="presentation-link">
              <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
