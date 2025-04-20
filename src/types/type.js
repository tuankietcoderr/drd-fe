/**
 * @typedef {Object} JobPosting
 * @property {number} id - Unique identifier for the job posting.
 * @property {number} recruiter_id - ID of the recruiter who posted the job.
 * @property {string} created_at - ISO timestamp of when the job was created.
 * @property {string} updated_at - ISO timestamp of the last update.
 * @property {number} views - Number of views the job posting has received.
 * @property {number} applicants - Number of applicants who have applied.
 * @property {string} title - Title of the job position.
 * @property {number} total_quantity - Total number of openings.
 * @property {number} male_quantity - Number of openings for male candidates.
 * @property {number} female_quantity - Number of openings for female candidates.
 * @property {string} description - Description of the job.
 * @property {string} benefit - Benefits offered with the job.
 * @property {string} health_condition_requirement - Health conditions required for the job.
 * @property {string} disability_requirement - Requirements or accommodations for candidates with disabilities.
 * @property {number} education_level - Required education level (e.g., 3 might correspond to a specific degree).
 * @property {string} professional_level - Required professional level (e.g., "Developer").
 * @property {string} working_time - Working hours (e.g., "8 tiếng/ngày").
 * @property {number} salary - Average or fixed salary offered.
 * @property {number} min_salary - Minimum salary range.
 * @property {number} max_salary - Maximum salary range.
 * @property {string} type - Job type (e.g., "Remote").
 * @property {boolean} status - Job availability status (true if active, false if inactive).
 */
