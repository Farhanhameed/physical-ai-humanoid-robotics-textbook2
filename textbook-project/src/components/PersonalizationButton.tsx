import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PersonalizationButton.module.css';

type PersonalizationOption = {
  title: string;
  description: string;
  icon: string;
};

const PersonalizationOptions: PersonalizationOption[] = [
  {
    title: 'Beginner',
    description: 'Focus on fundamental concepts',
    icon: '🎓',
  },
  {
    title: 'Intermediate',
    description: 'Include implementation details',
    icon: '⚙️',
  },
  {
    title: 'Advanced',
    description: 'Emphasize research aspects',
    icon: '🔬',
  },
  {
    title: 'Practitioner',
    description: 'Focus on real-world applications',
    icon: '🛠️',
  },
];

const PersonalizationOption: React.FC<PersonalizationOption> = ({ title, description, icon }) => {
  const handleClick = () => {
    handlePersonalization(title);
  };

  return (
    <div className={clsx('col col--3')}>
      <div className="text--center padding-horiz--md">
        <h3>{icon} {title}</h3>
        <p>{description}</p>
        <button
          className={clsx('button button--secondary button--sm')}
          onClick={handleClick}
        >
          Select
        </button>
      </div>
    </div>
  );
};

function handlePersonalization(level: string) {
  // Save user preference to localStorage
  localStorage.setItem('personalizationLevel', level);
  // Trigger content filtering/re-rendering
  window.dispatchEvent(new Event('personalizationChanged'));
}

export default function PersonalizationButton(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.buttonContainer}>
      <button
        className={clsx('button button--primary')}
        onClick={() => setShowModal(true)}
      >
        🎯 Personalize Content
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Customize Your Learning Experience</h2>
            <div className="row">
              {PersonalizationOptions.map((option, idx) => (
                <PersonalizationOption key={idx} {...option} />
              ))}
            </div>
            <button
              className={clsx('button button--outline')}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}