import { useEffect, useRef, useState } from "react";
import { challenges } from "./challenges";
import "./style.css";

const CONTACT = "rags to riches 240-xxx-xxxx";
function ContactMenu() {
  const ref = useRef(null);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const close = (event) => {
      if (
        event.type === "keydown"
          ? event.key === "Escape"
          : !ref.current?.contains(event.target)
      )
        ref.current?.removeAttribute("open");
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  async function copyContact() {
    try {
      await navigator.clipboard.writeText(CONTACT);
      setStatus("Contact copied");
    } catch {
      setStatus("Select and copy the contact above.");
    }
  }
  return (
    <details className="contact" ref={ref}>
      <summary>
        Contact us <span>⌄</span>
      </summary>
      <div className="contact-panel">
        <span className="eyebrow">LET’S CONNECT</span>
        <strong>{CONTACT}</strong>
        <button id="copy" className="copy" onClick={copyContact}>
          Copy contact <span>⧉</span>
        </button>
        <span id="copy-status" role="status">
          {status}
        </span>
      </div>
    </details>
  );
}

function ChallengeExplorer({ filter, setFilter, query, setQuery, onSelect }) {
  const visible = challenges.filter(
    (c) =>
      (filter === "all" || c.level === filter) &&
      (c.title + " " + c.skill).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="filters" role="group" aria-label="Filter challenges">
        {[
          ["all", "All challenges"],
          ["beginner", "Just getting started"],
          ["intermediate", "Leveling up"],
        ].map(([value, label]) => (
          <button
            key={value}
            data-filter={value}
            className={filter === value ? "active" : ""}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
        <label className="search">
          <span>⌕</span>
          <input
            id="search"
            type="search"
            placeholder="Find a skill…"
            aria-label="Search challenges"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div id="challenge-grid" className="challenge-grid">
        {visible.map((c) => (
          <button
            key={c.title}
            className="challenge-card"
            onClick={() => onSelect(c)}
          >
            <div className="card-top">
              <span className="skill-icon">{c.icon}</span>
              <span className={"level " + c.level}>
                {c.level === "beginner" ? "Beginner" : "Intermediate"}{" "}
                <span>●</span>
              </span>
            </div>
            <div className="card-skill">
              {c.skill} <span>· {c.time}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <div className="card-bottom">
              Try a challenge <span>↗</span>
            </div>
          </button>
        ))}
      </div>
      {visible.length === 0 && (
        <p id="empty" role="status">
          No challenges found. Try a different skill or filter.
        </p>
      )}
    </>
  );
}

function ChallengeDialog({ challenge, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (challenge && !ref.current.open) ref.current.showModal();
    else if (!challenge && ref.current.open) ref.current.close();
  }, [challenge]);
  return (
    <dialog
      ref={ref}
      id="challenge-dialog"
      aria-labelledby="challenge-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="close" aria-label="Close dialog" onClick={onClose}>
        ×
      </button>
      {challenge && (
        <div key={challenge.title} id="dialog-content">
          <div className="eyebrow">
            {challenge.skill} · {challenge.time} · PRACTICE PREVIEW
          </div>
          <h2 id="challenge-title">{challenge.title}</h2>
          <p>{challenge.prompt}</p>
          <label className="solution-label" htmlFor="answer">
            Your solution
          </label>
          <textarea
            id="answer"
            spellCheck={false}
            placeholder="Write your solution here…"
          />
          <details className="solution">
            <summary>Show example solution</summary>
            <pre>{challenge.solution}</pre>
            <p>
              Compare your approach with this example. This practice preview
              does not execute code.
            </p>
          </details>
        </div>
      )}
    </dialog>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  function startBeginnerPath() {
    setFilter("beginner");
    setQuery("");
    document
      .getElementById("explore")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <>
      {"\n"}
      <header className="border-b border-stone-200 bg-white">
        <nav
          className="shell flex items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <a className="brand" href="#">
            <span className="brand-icon">
              {"g"}
              <span>{"↗"}</span>
            </span>
            {"Grandline Talent"}
            <span className="brand-dot">{"."}</span>
          </a>
          <div className="navlinks flex items-center gap-8">
            <a href="#explore">{"Practice"}</a>
            <a href="#paths">{"Learning paths"}</a>
            <a href="#how">{"How it works"}</a>
          </div>
          <div className="flex items-center gap-5">
            <ContactMenu />
            <a className="button dark nav-start" href="#explore">
              {"Start practicing "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
          </div>
        </nav>
      </header>
      {"\n"}
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="pill">
              <span className="live-dot"></span>
              {" A little practice. A lot of possibility."}
            </div>
            <h1>
              {"Big ambitions."}
              <br />
              {"Small steps."}
              <br />
              <em>{"Better code."}</em>
            </h1>
            <p>
              {
                "Your next chapter starts with a single challenge. Build real skills, find your rhythm, and turn “I think I can” into “I just did.”"
              }
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="button green" href="#explore">
                {"Find your first challenge "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a className="button white" href="#paths">
                {"Explore learning paths "}
                <span>{"→"}</span>
              </a>
            </div>
            <div className="hero-note">
              <span className="check">{"✓"}</span>
              {" No sign-up needed to explore "}
              <span className="note-divider">{"/"}</span>
              {" Learn at your own pace"}
            </div>
          </div>
          {"\n"}
          <div
            className="hero-art"
            aria-label="Illustration of a coding challenge"
          >
            <div className="orbit-label">{"LESS SCROLLING. MORE SOLVING."}</div>
            <div className="editor">
              <div className="editor-top">
                <span className="window-dots">{"● ● ●"}</span>
                <span>{"your-next-step.ts"}</span>
                <span>{"⌘"}</span>
              </div>
              <div className="editor-body">
                <div className="editor-label">
                  <span className="live-dot"></span>
                  {" CHALLENGE 001 "}
                  <span className="easy">{"Beginner friendly"}</span>
                </div>
                <h2>
                  {"Every great developer"}
                  <br />
                  {"starts somewhere."}
                </h2>
                <div className="code">
                  <div>
                    <i>{"01"}</i>
                    <span className="purple">{"const"}</span>
                    {" journey = {"}
                  </div>
                  <div>
                    <i>{"02"}</i>
                    {"  curiosity: "}
                    <span className="lime">{"true"}</span>
                    {","}
                  </div>
                  <div>
                    <i>{"03"}</i>
                    {"  practice: "}
                    <span className="amber">{"'a little every day'"}</span>
                    {","}
                  </div>
                  <div>
                    <i>{"04"}</i>
                    {"  possibilities: "}
                    <span className="lime">{"Infinity"}</span>
                  </div>
                  <div>
                    <i>{"05"}</i>
                    {"};"}
                  </div>
                  <div>
                    <i>{"06"}</i>
                  </div>
                  <div>
                    <i>{"07"}</i>
                    <span className="purple">{"function"}</span>{" "}
                    <span className="lime">{"grow"}</span>
                    {"() {"}
                  </div>
                  <div>
                    <i>{"08"}</i>
                    {"  "}
                    <span className="purple">{"return"}</span>
                    {" you."}
                    <span className="lime">{"takeTheNextStep"}</span>
                    {"();"}
                  </div>
                  <div>
                    <i>{"09"}</i>
                    {"}"}
                  </div>
                </div>
                <div className="editor-footer">
                  <span>
                    {"TypeScript "}
                    <span className="tiny-dot">{"●"}</span>
                  </span>
                  <span>{"All you need is a little curiosity"}</span>
                </div>
              </div>
            </div>
            <div className="success-card">
              <span className="success-check">{"✓"}</span>
              <div>
                <strong>{"That’s progress."}</strong>
                <small>{"One step closer to your next big thing."}</small>
              </div>
              <span className="spark">{"✧"}</span>
            </div>
            <div className="art-caption">
              <span>{"↳"}</span>
              {" Your potential. In progress."}
            </div>
          </div>
        </section>
        {"\n"}
        <section className="strip">
          <div className="shell flex flex-wrap justify-between gap-5">
            <span>
              {"A SPACE TO "}
              <strong>{"learn by doing."}</strong>
            </span>
            <span>{"⌘   Real-world challenges"}</span>
            <span>{"↗   Clear learning paths"}</span>
            <span>{"◎   Progress at your pace"}</span>
          </div>
        </section>
        {"\n"}
        <section id="explore" className="shell section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{"FIND YOUR STARTING POINT"}</div>
              <h2>{"A challenge for every chapter."}</h2>
              <p>{"Start where you are. We’ll help you take the next step."}</p>
            </div>
            <a className="text-link" href="#challenge-grid">
              {"Explore challenges "}
              <span>{"↗"}</span>
            </a>
          </div>
          <ChallengeExplorer
            filter={filter}
            setFilter={setFilter}
            query={query}
            setQuery={setQuery}
            onSelect={setSelected}
          />
        </section>
        {"\n"}
        <section id="paths" className="shell path-section">
          <div>
            <div className="eyebrow">
              {"A LITTLE DIRECTION GOES A LONG WAY"}
            </div>
            <h2>
              {"Less “where do I start?”"}
              <br />
              {"More “look how far I’ve come.”"}
            </h2>
            <p>
              {
                "Pick a path, build one skill at a time, and connect the dots as you go."
              }
            </p>
            <button
              className="button dark"
              id="path-button"
              onClick={startBeginnerPath}
            >
              {"Explore the beginner path "}
              <span aria-hidden="true">{"↗"}</span>
            </button>
          </div>
          <div className="path-steps">
            <div>
              <span>{"01"}</span>
              <section>
                <strong>{"Get the fundamentals"}</strong>
                <p>{"Variables, loops, and your first small wins."}</p>
              </section>
              <b>{"↗"}</b>
            </div>
            <div>
              <span>{"02"}</span>
              <section>
                <strong>{"Put your skills to work"}</strong>
                <p>{"Solve practical problems with confidence."}</p>
              </section>
              <b>{"↗"}</b>
            </div>
            <div>
              <span>{"03"}</span>
              <section>
                <strong>{"Make something your own"}</strong>
                <p>{"Bring it together in a hands-on project."}</p>
              </section>
              <b>{"↗"}</b>
            </div>
          </div>
        </section>
        {"\n"}
        <section id="how" className="shell section how">
          <div className="eyebrow">{"SIMPLE BY DESIGN"}</div>
          <h2>{"Your next step is the only one that matters."}</h2>
          <div className="how-grid">
            <div>
              <span>{"01 / EXPLORE"}</span>
              <h3>{"Find your fit."}</h3>
              <p>{"Choose a skill and difficulty that feel right for you."}</p>
            </div>
            <div>
              <span>{"02 / PRACTICE"}</span>
              <h3>{"Give it a go."}</h3>
              <p>{"Open a challenge, think it through, and try a solution."}</p>
            </div>
            <div>
              <span>{"03 / GROW"}</span>
              <h3>{"Keep moving."}</h3>
              <p>
                {"Use the explanation to learn, then try your next challenge."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell">
        <a className="brand" href="#">
          {"Grandline Talent"}
          <span className="brand-dot">{"."}</span>
        </a>
        <span>{"A little better, every day."}</span>
        <span>
          {"© "}
          {new Date().getFullYear()}
          {" Grandline Talent"}
        </span>
      </footer>
      {"\n"}
      <ChallengeDialog challenge={selected} onClose={() => setSelected(null)} />
    </>
  );
}
