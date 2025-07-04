import React from "react";

interface FilterSidebarProps {
  skills: string[];
  onSkillChange: (skill: string) => void;
  onIndustryChange: (industry: string) => void;
}

const FilterSidebar = ({
  skills,
  onSkillChange,
  onIndustryChange,
}: FilterSidebarProps) => {
  const styles = {
    sidebar: {
      width: "250px",
      padding: "1rem",
      background: "#f9f9f9",
      borderRight: "1px solid #ddd",
    },
    filterGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
      display: "block",
    },
    select: {
      width: "100%",
      padding: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
    },
  };

  return (
    <div style={styles.sidebar}>
      <h4>Filter Mentors</h4>
      <div style={styles.filterGroup}>
        <label htmlFor="skill-filter" style={styles.label}>
          By Skill:
        </label>
        <select
          id="skill-filter"
          onChange={(e) => onSkillChange(e.target.value)}
          style={styles.select}
        >
          <option value="">All Skills</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.filterGroup}>
        <label htmlFor="industry-filter" style={styles.label}>
          By Industry:
        </label>
        <input
          id="industry-filter"
          type="text"
          placeholder="e.g., Technology"
          onChange={(e) => onIndustryChange(e.target.value)}
          style={styles.input}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
