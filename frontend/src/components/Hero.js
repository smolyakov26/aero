import { useState, useEffect } from "react";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/slides/")
      .then((res) => res.json())
      .then((data) => {
        // Add base URL to image paths
        const slidesWithFullUrls = data.map(slide => ({
          ...slide,
          bg: `http://127.0.0.1:8000${slide.bg}`
        }));
        setSlides(slidesWithFullUrls);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return <div>Loading...</div>;

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === current ? "is-active" : ""}`}
            style={{ "--bg": `url(${slide.bg})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <a href="/programs" className="btn btn-primary">
                Подробнее
              </a>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          className="hero-control prev"
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          className="hero-control next"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-current={idx === current ? "true" : "false"}
              onClick={() => setCurrent(idx)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}