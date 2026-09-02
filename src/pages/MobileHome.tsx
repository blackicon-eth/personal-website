import { motion } from "motion/react";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HackathonsSection } from "@/components/HackathonsSection";
import { ContactSection } from "@/components/ContactSection";
import { SideNav } from "@/components/SideNav";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { Socials } from "@/components/Socials";
import { LocationPill } from "@/components/LocationPill";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

export function MobileHome() {
  const { t } = useI18n();

  const menuItems = [
    { label: t.nav.home, href: "#hero", ariaLabel: t.nav.home, hoverStyles: { bgColor: "#7cff67", textColor: "#09090b" } },
    { label: t.nav.projects, href: "#projects", ariaLabel: t.nav.projects, hoverStyles: { bgColor: "#5227FF", textColor: "#ffffff" } },
    { label: t.nav.experience, href: "#experience", ariaLabel: t.nav.experience, hoverStyles: { bgColor: "#EAB308", textColor: "#09090b" } },
    { label: t.nav.hackathons, href: "#hackathons", ariaLabel: t.nav.hackathons, hoverStyles: { bgColor: "#f97316", textColor: "#ffffff" } },
    { label: t.nav.contact, href: "#contact", ariaLabel: t.nav.contact, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
  ];

  return (
    <main className="bg-zinc-950 text-zinc-100">
      <SideNav />
      <StaggeredMenu
        items={menuItems.map((item) => ({
          label: item.label,
          ariaLabel: item.ariaLabel,
          link: item.href,
        }))}
        position="right"
        colors={["#242424", "#141414"]}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#e4e4e7"
        openMenuButtonColor="#ffffff"
        accentColor="#000000"
        isFixed
        menuExtra={<LocaleSwitcher />}
        locationContent={
          <div>
            <p className="sm-location-label"><LocaleText>{t.location.label}</LocaleText></p>
            <LocationPill plain />
          </div>
        }
        socialTitle={t.menu.socials}
        socialContent={<Socials showEmail={false} size="md" />}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HeroSection
          showSocialsPill={false}
          showLocationPill={false}
          showLanguageSwitcher={false}
          mobileLayout
        />
        <ProjectsSection />
        <ExperienceSection />
        <HackathonsSection />
        <ContactSection />
      </motion.div>
    </main>
  );
}
