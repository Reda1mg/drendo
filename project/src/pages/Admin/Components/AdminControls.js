import React from 'react';
import styles from './AdminControl.module.css'

const AdminControls = () => {
  return (
    <div className={styles.controls}>
      <div className={styles.controlCard}>
        <h2>Gérer les Utilisateurs</h2>
        <button>Ajouter Utilisateur</button>
        <button>Supprimer Utilisateur</button>
        <button>Modifier Utilisateur</button>
      </div>
      <div className={styles.controlCard}>
        <h2>Gérer les Compétiteurs</h2>
        <button>Ajouter Compétiteur</button>
        <button>Supprimer Compétiteur</button>
        <button>Modifier Compétiteur</button>
      </div>
      <div className={styles.controlCard}>
        <h2>Gérer les Tournois</h2>
        <button>Créer Tournoi</button>
        <button>Mettre à Jour Tournoi</button>
        <button>Clôturer Tournoi</button>
      </div>
    </div>
  );
};

export default AdminControls;
