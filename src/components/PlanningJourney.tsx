import React from 'react';
import { Link } from 'react-router-dom';

type Props = { step: 1 | 2 | 3; title: string; description: string; context?: string[] };
export default function PlanningJourney({ step, title, description, context = [] }: Props) {
  return <header className="journey-hero">
    <div className="journey-container">
      <nav className="journey-steps" aria-label="Adventure planning progress">
        <ol>{['Choose', 'Personalize', 'Your Plan'].map((label, index) => <li key={label} aria-current={step === index + 1 ? 'step' : undefined} className={index + 1 <= step ? 'is-active' : ''}>
          <span className="journey-step-number" aria-hidden="true">{index + 1}</span>
          {index === 0 && step > 1 ? <Link to="/plan">{label}</Link> : <span>{label}</span>}
        </li>)}</ol>
      </nav>
      <p className="journey-eyebrow">Health &amp; Travels · Planning with Sage</p>
      <h1>{title}</h1>
      <p className="journey-description">{description}</p>
      {context.length > 0 && <ul className="journey-context" aria-label="Your current trip preferences">{context.map((item) => <li key={item}>{item}</li>)}</ul>}
    </div>
  </header>;
}
