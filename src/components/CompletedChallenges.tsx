import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
  return (
    <div className={styles.completedChalengesContainer}>
      <span>Desafios Completos</span>
      <span>5</span>
    </div>
  );
}