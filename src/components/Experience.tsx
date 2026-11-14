import Image from "next/image";

const clients = [
  {
    name: "NASA",
    category: "Aerospace & Government",
    description:
      "Helped establish accountability for cloud spend during NASA's early adoption of AWS.",
    url: "https://www.nasa.gov",
    logo: "/logos/nasa.svg",
  },
  {
    name: "Deutsche Bank",
    category: "Financial Services",
    description:
      "Shaped a strategy balancing U.S. operational independence with the ability to respond to global organizational directives.",
    url: "https://www.db.com",
    logo: "/logos/deutschebank.png",
  },
  {
    name: "McDonald's",
    category: "Retail & Consumer",
    description:
      "Supported cloud transformation at global scale, enabling faster innovation and improved customer experiences.",
    url: "https://www.mcdonalds.com",
    logo: "/logos/mcdonalds.svg",
  },
  {
    name: "Brookfield",
    category: "Asset Management",
    description:
      "Supported the migration of three data centers to the cloud.",
    url: "https://www.brookfield.com",
    logo: "/assets/brookfield.png",
  },
  {
    name: "WorkSafeBC",
    category: "Public Sector",
    description:
      "Supported cloud migration and helped address a fragmented landscape of container platforms and operating approaches.",
    url: "https://www.worksafebc.com",
    logo: "/logos/worksafebc.jpg",
  },
  {
    name: "BlueCross BlueShield",
    category: "Healthcare",
    description:
      "Advised on data privacy and HIPAA-compliant data pipelines across cloud and hybrid environments.",
    url: "https://www.bcbs.com",
    logo: "/logos/bcbs.png",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <h2 className="section-heading">
        <span className="font-mono text-accent text-base">02.</span>
        Experience
      </h2>

      <p className="text-muted max-w-2xl mb-12 leading-relaxed">
        Trusted by global enterprises across industries to navigate complex cloud
        and AI transformations. Here are some of the organizations I&apos;ve
        had the privilege of helping.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface rounded-lg p-6 border border-surface2 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
          >
            <div className="experience-category"><span>{client.category}</span></div>
            <div className="experience-header">
              <Image src={client.logo} alt={client.name + " logo"} width={44} height={44} className="experience-logo" />
              <h3 className="text-bright font-bold text-lg group-hover:text-accent transition-colors">{client.name}</h3>
            </div>
            <p className="text-muted text-sm leading-relaxed mt-auto">
              {client.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
