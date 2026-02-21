export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const technicalSkills: SkillCategory[] = [
  {
    title: "Project Management",
    skills: [
      { name: "Agile Scrum", level: 95 },
      { name: "Waterfall", level: 85 },
      { name: "SDLC", level: 95 },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "Bootstrap / Tailwind", level: 90 },
      { name: "MySQL", level: 80 },
      { name: "React.js", level: 75 },
      { name: "PHP/Laravel", level: 75 },
      { name: "JavaScript", level: 70 },
      { name: "Python", level: 70 },
      { name: "Java", level: 60 },
    ],
  },
];

export const tools = [
  "Jira", "Trello", "Notion", "GitHub", "Docker", "VS Code", "XAMPP", "Laragon", "Google Colab", "Ollama"
];

export const softSkills = [
  { icon: "🎯", name: "Project & Stakeholder Management" },
  { icon: "⚠️", name: "Risk Management" },
  { icon: "📊", name: "Strategic Planning" },
  { icon: "👥", name: "Leadership" },
  { icon: "🔗", name: "Cross-functional Team Collaboration" },
  { icon: "💬", name: "Communication" },
];
