# Mattia Verdecchi - Personal Website

The personal website of Mattia Verdecchi, a full-stack product engineer, founder, hacker, and rapid prototyper.

The site is a dark, interaction-focused portfolio built around a single scrolling page. It presents selected projects, professional experience, hackathons, and ways to get in touch, with English and Italian translations throughout.

## Highlights

- Responsive desktop and mobile page compositions
- Animated hero with interactive visual elements
- Project carousel with localized content, technology metadata, and external links
- Experience timeline with scroll-reveal animations
- Animated hackathon wall featuring attended events and project links
- Contact section with animated gradient waves, email CTA, and social links
- English and Italian locale switching
- Reduced-motion support in the animated visual components

## Tech Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Motion for React animations
- GSAP and OGL for interactive visual effects
- React Icons
- React Router
- Oxlint

## Project Structure

```text
src/
  components/       Reusable sections, animations, navigation, and UI primitives
  data/             Projects, experience, skills, and hackathon content
  i18n/             Locale configuration, provider, and English/Italian dictionaries
  pages/
    Home.tsx        Desktop page composition
    MobileHome.tsx  Mobile page composition
public/             Static images, avatars, project assets, and hackathon logos
```

The responsive entry point is `src/pages/Home.tsx`. It selects the desktop or mobile composition at the `1024px` breakpoint. Mobile sections intentionally have their own components where the desktop interaction or layout does not translate well to a small screen:

- `MobileProjectsSection`
- `MobileExperienceSection`
- `MobileHackathonsSection`
- `MobileContactSection`

The desktop components remain separate so changes to the mobile experience do not alter the desktop presentation.

## Localization

Translations live in:

- `src/i18n/dictionaries/en.ts`
- `src/i18n/dictionaries/it.ts`

Use `useI18n()` for translated values and `LocaleText` for content that should animate when the locale changes. Project, experience, and section labels are kept in the dictionaries or their respective data files.

## Getting Started

The project uses pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Commands

```bash
pnpm dev         # Start the Vite development server
pnpm build       # Type-check and create a production build
pnpm typecheck   # Run TypeScript checks without emitting files
pnpm lint        # Run Oxlint
pnpm preview      # Preview the production build locally
```

## Content Updates

- Projects: `src/data/projects.ts` and the `projects` dictionaries
- Experience: `src/data/experience.ts` and the `experience` dictionaries
- Hackathons: `src/data/hackathons.ts`
- Skills: `src/data/skills.ts` and the `skills` dictionaries
- Static assets: `public/`

Most content changes only require updating the relevant data file and both locale dictionaries. External project and hackathon URLs are stored alongside their content data.

## Development Notes

- Keep desktop and mobile section components independent when their interaction models differ.
- Check both English and Italian after changing translated content.
- Test touch-sized interactions on a narrow viewport; some desktop effects deliberately use different mobile settings.
- Run `pnpm build` before shipping changes.
