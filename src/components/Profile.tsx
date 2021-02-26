import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const {level} = useContext(ChallengeContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/rayllanderson.png" alt="Rayllanderson"/>
      <div>
          <strong>Rayllanderson Gonçalves</strong>
          <p>
             <img src="icons/level.svg" alt="level" />
             Level {level}
          </p>
      </div>
    </div>
  );
}