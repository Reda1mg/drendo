import styles from "./Filters.module.css";
import CreationTournoi from './CreateTournament';

const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
  searchQueryCity,
  setSearchQueryCity,
  searchQueryClub,
  setSearchQueryClub,
}) => {
  return (
    <div className={styles.filtersContainer}>
      {/* 🔎 Search by Name */}
      <div className={styles.filterItem}>
        <label htmlFor="search"><span>🔎</span> Rechercher par nom :</label>
        <input 
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nom du tournoi" 
        />
      </div>

      {/* 📍 Filter by City */}
      <div className={styles.filterItem}>
        <label htmlFor="cityFilter"><span>🏙️</span> Filtrer par ville :</label>
        <input 
          type="text"
          id="cityFilter"
          value={searchQueryCity}
          onChange={(e) => setSearchQueryCity(e.target.value)}
          placeholder="Ville" 
        />
      </div>

      {/* 🏫 Filter by Club */}
      <div className={styles.filterItem}>
        <label htmlFor="clubFilter"><span>🏫</span> Filtrer par club :</label>
        <input 
          type="text"
          id="clubFilter"
          value={searchQueryClub}
          onChange={(e) => setSearchQueryClub(e.target.value)}
          placeholder="Club" 
        />
      </div>

      {/* 📅 Filter by Date */}
      <div className={styles.filterItem}>
        <label htmlFor="dateFilter"><span>📅</span> Filtrer par date :</label>
        <input 
          type="date" 
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* ➕ Create Tournament Button */}
      <div className={styles.createBtn}>
        <CreationTournoi />
      </div>
    </div>
  );
};

export default Filters;
