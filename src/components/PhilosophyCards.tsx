"use client";

const cards = [
  {
    letter: "SY",
    description:
      "People, process, and technology working as one connected system.",
    image: "/Synergy \u00B7 Systems.jpg",
  },
  {
    letter: "TR",
    description:
      "Reimagining how businesses operate, not just adopting new tools.",
    image: "/Transformation.jpg",
  },
  {
    letter: "I",
    description:
      "AI, automation, and analytics applied with creativity and precision.",
    image: "/Innovation.jpg",
  },
  {
    letter: "O",
    description:
      "Turning strategy into measurable efficiency and lasting resilience.",
    image: "/Operations.jpg",
  },
  {
    letter: "N",
    description:
      "Building agile, future-ready solutions for an evolving digital world.",
    image: "/Next Generation.jpg",
  },
];

export default function PhilosophyCards() {
  return (
    <>
      <style>{`
        .phil-cards-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 14px;
          scrollbar-width: thin;
          scrollbar-color: #c6ff3d #1a1d24;
        }
        .phil-cards-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .phil-cards-scroll::-webkit-scrollbar-track {
          background: #1a1d24;
          border-radius: 4px;
        }
        .phil-cards-scroll::-webkit-scrollbar-thumb {
          background: #c6ff3d;
          border-radius: 4px;
        }

        .phil-card {
          flex: 0 0 440px;
          width: 440px;
          border-radius: 6px;
          overflow: hidden;
          background: #2b2e35;
          display: flex;
          flex-direction: column;
        }
        .phil-card-img {
          height: 290px;
          overflow: hidden;
        }
        .phil-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .phil-card-body {
          position: relative;
          flex: 1;
          min-height: 220px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
        }
        .phil-card-letter {
          font-size: 32px;
          font-weight: 700;
          color: #c6ff3d;
          line-height: 1.1;
          margin: 0 0 14px;
        }
        .phil-card-copy {
          font-size: 14px;
          font-weight: 400;
          color: #9ca3af;
          line-height: 1.6;
          margin: 0;
          padding-right: 40px;
        }
        .phil-card-btn {
          position: absolute;
          bottom: 26px;
          right: 24px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #c6ff3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phil-card-btn svg {
          color: #111827;
        }

        @media (max-width: 600px) {
          .phil-card {
            flex: 0 0 320px;
            width: 320px;
          }
        }
      `}</style>

      <div className="phil-cards-scroll">
        {cards.map((card) => (
          <div key={card.letter} className="phil-card">
            <div className="phil-card-img">
              <img
                src={card.image}
                alt={`${card.letter} — ${card.description}`}
                loading="lazy"
              />
            </div>
            <div className="phil-card-body">
              <h3 className="phil-card-letter">{card.letter}</h3>
              <p className="phil-card-copy">{card.description}</p>
              <span className="phil-card-btn" aria-hidden="true">
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
