import type { Dictionary } from "../dictionaries";

export const it: Dictionary = {
  metadata: {
    title: "Mattia Verdecchi",
    description:
      "Mattia Verdecchi — Ingegnere Full-Stack che crea prodotti amati dagli utenti. Fondatore, hacker e prototipatore rapido.",
  },
  nav: {
    home: "Home",
    projects: "Progetti",
    experience: "Esperienza",
    hackathons: "Hackathon",
    contact: "Contatti",
  },
  hero: {
    findMeOn: "Trovami su",
    intro: "Ingegnere Full-Stack focalizzato sulla creazione di prodotti che gli utenti possano apprezzare e usare.",
    blurb:
      "Fondatore, hacker e prototipatore rapido. Esperto nel portare idee da zero a produzione con TypeScript, React, Next.js e sviluppo assistito dall'IA.",
    viewMyWork: "I miei progetti",
    getInTouch: "Contattami",
    mySkills: "Le mie competenze",
  },
  location: {
    city: "Roma, Italia",
  },
  projects: {
    techUsed: "Tecnologie usate",
    relatedLinks: "Link correlati",
    goToProject: "Vai al progetto",
    previous: "Progetto precedente",
    next: "Progetto successivo",
    links: {
      launchApp: "Apri l'app",
      visitSite: "Visita il sito",
    },
    items: {
      "itm-id": {
        description:
          "La Farcaster mini app di ITM, che consente agli utenti di consultare il feed degli Echoes, esplorare i Moments passati e futuri, visualizzare il proprio profilo e disporre di un QR code unico per il check-in agli eventi dal vivo.\n\nUn client prevalentemente in sola lettura alimentato da query GraphQL verso il backend di ITM, con login OTP via telefono, feed paginati ed Echoes interattivi.\n\nLa sfida è stata replicare un'esperienza mobile nativa nel browser: pull-to-refresh, animazioni fluide e transizioni di pagina a scorrimento, facendola sembrare un'app nativa anziché una pagina web.",
      },
      brewlog: {
        description:
          "Un diario del caffè per dispositivi mobili, con un assistente IA offline. Registra caffè ed estrazioni in un registro comodo ed elegante; dose, rapporti, macinatura, temperatura, note di degustazione e ricette per ogni metodo che utilizzi.\n\nL'assistente (QVAC) gira interamente on-device e ragiona sui tuoi dati per parlare del tuo brewing, compilare i moduli a partire da linguaggio naturale, diagnosticare estrazioni e proporre la ricetta migliore per ogni caffè.\n\nNiente cloud, nessun account, tutto locale.\nCostruita come app mobile pura su SQLite, con strumenti offline deterministici come il Brew Ratio, il metodo 4:6 e il Coffee Compass.",
      },
      glider: {
        description:
          "La mini app ufficiale di Glider. Un client Next.js che gira all'interno degli host mini-app di Farcaster, Base App e Worldcoin. Trasforma il prodotto di portafogli onchain automatizzati di Glider in un'esperienza mobile.\n\nPorta l'intero prodotto Glider su piccolo schermo: sfoglia portafogli onchain automatizzati, fai trading, esplora e gestisci gli asset, con metodo di accesso che si adatta all'host da cui l'hai aperta.\n\nResta sincronizzata con Glider in tempo reale, mantenendo l'esperienza leggera e sicura.",
      },
      savelli: {
        description:
          "Sito web per la Residenza Savelli, un boutique bed and breakfast a Roma, a pochi passi dal Vaticano e da Villa Doria Pamphili. Un sito single-page in stile editoriale che guida gli ospiti attraverso la residenza, le camere, i servizi e la posizione.\n\nRealizzato con animazioni scroll-reveal, transizioni fluide e un caldo stile da rivista stampata, con prenotazioni gestite direttamente tramite WhatsApp ed email.\n\nCompletamente multilingue, con metadati SEO, dati strutturati JSON-LD e una sitemap.",
      },
    },
  },
  experience: {
    items: {
      "builders-garden": {
        role: "Fullstack Developer",
        period: "Mag. 2024 - Oggi",
        description:
          "Ho lavorato come sviluppatore fullstack presso [Builders Garden](https://builders.garden), la mia azienda. Mi sono occupato della gestione e dello sviluppo frontend e backend di dApp utilizzando Next.js, TypeScript e tecnologie Web3, con attenzione all'integrazione di wallet e smart contracts. Ho sviluppato soluzioni su misura per clienti internazionali operanti nel settore della blockchain.",
      },
      "start-and-go": {
        role: "Junior Software Engineer",
        period: "Dic. 2023 - Mag. 2024",
        description:
          "Ho sviluppato la prima iterazione di un sistema CRM proprietario presso [Start&Go](https://www.startegois.com/en). Ottimo riscontro da parte del cliente e riconoscimento da parte del team tecnico di riferimento. L'esperienza si è conclusa, su mia richiesta, per intraprendere un percorso focalizzato sullo sviluppo software in ambito blockchain.",
      },
      freelancer: {
        role: "Consulente e sviluppatore di bot per Trading",
        period: "Ott. 2021 - Gen. 2023",
        description:
          "Ho lavorato come consulente e sviluppatore Pine Script, trovando clienti da solo o su [Fiverr](https://www.fiverr.com/algorithm_matt), ottenendo una recensione media a 5 stelle sulla piattaforma. Ho creato bot di trading e indicatori tecnici, seguendo le istruzioni dei clienti per fornire loro il prodotto desiderato. Ho imparato a gestire clientela internazionale, ad aggiornare software scritto da altri sviluppatori e a lavorare sotto la pressione di una scadenza non prorogabile.",
      },
    },
  },
  skills: {
    whereLearned: "Dove l'ho imparato?",
    items: {
      TypeScript: "Negli hackathon e perfezionato lavorando in Builders Garden",
      JavaScript: "All'università, negli hackathon e perfezionato lavorando in Builders Garden",
      Python: "All'università e perfezionato lavorando in Start&Go",
      Java: "All'università",
      Scala: "All'università",
      C: "All'università",
      Solidity: "Da autodidatta per progetti personali",
      "Pine Script": "Come freelance su Fiverr",
      HTML: "All'università, negli hackathon e perfezionato lavorando in Builders Garden",
      CSS: "All'università, negli hackathon e perfezionato lavorando in Builders Garden",
      React: "Negli hackathon e perfezionato lavorando in Builders Garden",
      "Next.js": "Negli hackathon e perfezionato lavorando in Builders Garden",
      "Node.js": "Negli hackathon e perfezionato lavorando in Builders Garden e Start&Go",
      "Tailwind CSS": "Negli hackathon e perfezionato lavorando in Builders Garden",
      Vite: "Da autodidatta per progetti personali e perfezionato lavorando come freelance",
      GraphQL: "Lavorando in Builders Garden",
      "Drizzle ORM": "Lavorando in Builders Garden",
      EVM: "Da autodidatta, durante gli hackathon e perfezionato lavorando in Builders Garden",
      "ethers.js": "Durante gli hackathon e perfezionato lavorando in Builders Garden",
      Wagmi: "Durante gli hackathon e perfezionato lavorando in Builders Garden",
      PostgreSQL: "All'università e perfezionato lavorando in Start&Go",
      Redis: "Lavorando in Builders Garden e usato in molti progetti personali",
      IPFS: "Durante gli hackathon e perfezionato lavorando in Builders Garden",
      Docker: "Lavorando in Start&Go e usato in alcuni progetti personali",
      Linux: "All'università e usato da allora",
      Vercel: "Lavorando in Builders Garden e usato in molti progetti personali",
      Git: "Da Start&Go e usato da allora",
      Bash: "All'università e usato da allora",
      "AI coding": "Negli hackathon e perfezionato lavorando in Builders Garden",
    },
  },
  contact: {
    eyebrow: "Contattami",
    titleLine1: "Costruiamo",
    titleLine2: "qualcosa insieme",
    bodyLine1: "Hai un progetto in mente o vuoi solo salutare?",
    bodyLine2: "La mia casella è sempre aperta.",
  },
};
