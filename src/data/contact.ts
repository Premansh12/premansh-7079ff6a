// Single source of truth for contact + social identity.
// Update values here only — all components import from this file.

export const EMAIL = "typeonecivilized@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const LOCATION_FOOTER = "Haldia, India";
export const LOCATION_CONTACT = "Jagdalpur / Remote · Available Q3 onward";

export const LINKEDIN_URL = "https://www.linkedin.com/in/premanshpanigrahi/";
export const GITHUB_URL = "https://github.com/Premansh12";
export const X_URL = "https://x.com/Pr3mansh";
export const INSTAGRAM_URL = "https://www.instagram.com/premansh_panigrahi/";
export const INSTAGRAM_PHOTO_URL = "https://www.instagram.com/suturedpxl/";

export type SocialKey = "linkedin" | "github" | "x" | "instagram";

export type SocialLink = {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
};

export const SOCIALS: SocialLink[] = [
  { key: "linkedin", label: "LinkedIn", handle: "in/premanshpanigrahi", href: LINKEDIN_URL },
  { key: "github", label: "GitHub", handle: "@Premansh12", href: GITHUB_URL },
  { key: "x", label: "X", handle: "@Pr3mansh", href: X_URL },
  { key: "instagram", label: "Instagram", handle: "@premansh_panigrahi", href: INSTAGRAM_URL },
];
