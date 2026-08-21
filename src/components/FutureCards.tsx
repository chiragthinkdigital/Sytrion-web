"use client";

const cards = [
  {
    name: "Artificial Intelligence",
    desc: "Enhances human capability",
    image: "/about/artificial-intelligence.jpg",
  },
  {
    name: "Automation",
    desc: "Accelerates productivity",
    image: "/about/automation.jpg",
  },
  {
    name: "Data",
    desc: "Drives better decisions",
    image: "/about/data.jpg",
  },
  {
    name: "People",
    desc: "Create lasting impact",
    image: "/about/people.png",
  },
];

export default function FutureCards() {
  return (
    <>
      <style>{`
        .fut-cards-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 14px;
          scrollbar-width: thin;
          scrollbar-color: #C6E84A #1a1d24;
        }
        .fut-cards-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .fut-cards-scroll::-webkit-scrollbar-track {
          background: #1a1d24;
          border-radius: 4px;
        }
        .fut-cards-scroll::-webkit-scrollbar-thumb {
          background: #C6E84A;
          border-radius: 4px;
        }

        .fut-card {
          flex: 0 0 440px;
          width: 440px;
          border-radius: 6px;
          overflow: hidden;
          background: #2b2e35;
          display: flex;
          flex-direction: column;
        }
        .fut-card-img {
          height: 290px;
          overflow: hidden;
        }
        .fut-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fut-card-body {
          position: relative;
          flex: 1;
          min-height: 220px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
        }
        .fut-card-name {
          font-size: 32px;
          font-weight: 700;
          color: #fffffe;
          line-height: 1.1;
          margin: 0 0 14px;
        }
        .fut-card-copy {
          font-size: 14px;
          font-weight: 400;
          color: #9ca3af;
          line-height: 1.6;
          margin: 0;
          padding-right: 40px;
        }
        .fut-card-btn {
          position: absolute;
          bottom: 26px;
          right: 24px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #C6E84A;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fut-card-btn svg {
          color: #111827;
        }

        @media (max-width: 600px) {
          .fut-card {
            flex: 0 0 320px;
            width: 320px;
          }
        }
      `}</style>

      <div className="fut-cards-scroll">
        {cards.map((card) => (
          <div key={card.name} className="fut-card">
            <div className="fut-card-img">
              <img
                src={card.image}
                alt={card.name}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="fut-card-body">
              <h3 className="fut-card-name">{card.name}</h3>
              <p className="fut-card-copy">{card.desc}</p>
              <span className="fut-card-btn" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
