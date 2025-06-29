
import { useApplicantProfile } from '@/hooks/useApplicantProfile';


const ApplicantProfile = () => {
  const { data: profile, isLoading, isError } = useApplicantProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !profile) return <div>Error loading profile</div>;

  console.log('Profile data:', profile);

  return (
    <div className="display flex flex-col items-start justify-start gap-4">
      <h2>Candidate Profile</h2>
      <p>This is where the candidate's profile information will be displayed.</p>
      <div>
        <h1>Personal Info</h1>
        <ul>
          <li>Email: {profile.email}</li>
          <li>Phone: {profile.phoneNumber}</li>
          <li>Desired Job: {profile.desiredJob}</li>
        </ul>
      </div>
      <div>
        <h1>Work Experience</h1>
        <ul>
          {profile.jobs.map((job: { title: string; company: string; description: string }, index: number) => (
            <li key={index}>
              <h2>{job.title}</h2>
              <p>Company: {job.company}</p>
              <p>Description: {job.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Projects</h1>
        <ul className=''>
          {profile.projects.map((project: { name: string; technologies: string[], classification: string }, index: number) => (
            <li key={index} className='mb-4'>
              <h2>{project.name}</h2>
              <p>Technologies: {project.technologies.join(", ")}</p>
              <p>Classification: {project.classification}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Education</h1>
        <ul>
          {profile.education.map((edu: { institution: string; degree: string; courseWork: string; graduationYear: string, graduated: boolean }, index: number) => (
            <li key={index}>
              <h2>{edu.degree} in {edu.courseWork}</h2>
              <p>Institution: {edu.institution}</p>
              <p>Year: {edu.graduationYear}</p>
              <p>Graduated: {edu.graduated ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Skills</h1>
        <ul>
          {profile.skills.map((skill: { name: string; yearsOfExperience: string; classification: string }, index: number) => (
            <li key={index}>
              {skill.name} - {skill.yearsOfExperience} ({skill.classification})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicantProfile;