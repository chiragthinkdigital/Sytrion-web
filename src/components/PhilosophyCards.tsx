"use client";

const cards = [
  {
    letter: "SY",
    name: "Synergy Systems",
    description:
      "People, process, and technology working as one connected system.",
    image: "/home/synergy-systems.png",
  },
  {
    letter: "TR",
    name: "Transformation",
    description:
      "Reimagining how businesses operate, not just adopting new tools.",
    image: "/home/Transformation.jpg",
  },
  {
    letter: "I",
    name: "Innovation",
    description:
      "AI, automation, and analytics applied with creativity and precision.",
    image: "/home/Innovation.png",
  },
  {
    letter: "O",
    name: "Operations",
    description:
      "Turning strategy into measurable efficiency and lasting resilience.",
    image: "/home/Operations.jpg",
  },
  {
    letter: "N",
    name: "Next Generation",
    description:
      "Building agile, future-ready solutions for an evolving digital world.",
    image: "/home/Next-Gen.png",
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
          flex: 0 0 calc(25% - 15px);
          width: calc(25% - 15px);
          border-radius: 6px;
          overflow: hidden;
          background: #2b2e35;
          display: flex;
          flex-direction: column;
        }
        .phil-card-img {
          height: 250px;
          overflow: hidden;
        }
        .phil-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .phil-card--innovation .phil-card-img img {
          transform: scale(1.07);
        }
        .phil-card-body {
          position: relative;
          flex: 1;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
        }
        .phil-card-letter {
          font-size: 28px;
          font-weight: 700;
          color: #c6ff3d;
          line-height: 1.1;
          margin: 0 0 10px;
        }
        .phil-card-name {
          font-size: 28px;
          font-weight: 700;
          color: #fffffe;
          line-height: 1.1;
        }
        .phil-card-copy {
          font-size: 14px;
          font-weight: 400;
          color: #9ca3af;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 900px) {
          .phil-card {
            flex: 0 0 calc(50% - 10px);
            width: calc(50% - 10px);
          }
        }
        @media (max-width: 600px) {
          .phil-card {
            flex: 0 0 80vw;
            width: 80vw;
          }
        }
      `}</style>

      <div className="phil-cards-scroll">
        {cards.map((card) => (
          <div key={card.letter} className={card.letter === "I" ? "phil-card phil-card--innovation" : "phil-card"}>
            <div className="phil-card-img">
              <img
                src={card.image}
                alt={`${card.letter} — ${card.description}`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="phil-card-body">
              <h3 className="phil-card-letter">{card.letter}<span className="phil-card-name">{card.letter && ` — ${card.name}`}</span></h3>
              <p className="phil-card-copy">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
