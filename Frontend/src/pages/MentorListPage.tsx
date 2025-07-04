import React, { useEffect, useState } from "react";
import apiClient from "../api/axios"; // Use the pre-configured apiClient
import MentorCard from "../components/MentorCard";
import FilterSidebar from "../components/FilterSidebar";

const MentorListPage = () => {
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");

  useEffect(() => {
    // Corrected API endpoints
    apiClient.get("/users/mentors").then((res) => setMentors(res.data));
    apiClient.get("/users/skills").then((res) => setSkills(res.data));
  }, []);

  const filteredMentors = mentors.filter(
    (m: any) =>
      (filterSkill === "" || m.profile.skills.includes(filterSkill)) &&
      (filterIndustry === "" ||
        m.profile.industry
          ?.toLowerCase()
          .includes(filterIndustry.toLowerCase()))
  );

  const styles = {
    pageContainer: {
      display: "flex",
    },
    mentorList: {
      flex: 1,
      padding: "1rem",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <FilterSidebar
        skills={skills}
        onSkillChange={setFilterSkill}
        onIndustryChange={setFilterIndustry}
      />
      <div style={styles.mentorList}>
        <h2>Find a Mentor</h2>
        {filteredMentors.map((mentor: any) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorListPage;
