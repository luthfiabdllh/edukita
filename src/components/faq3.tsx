import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
}

const faqItems = [
  {
    id: "faq-1",
    question: "What is Edukita?",
    answer: (
      <div>
        <p>Edukita is a prototype open-data interoperability system developed under this project to map and monitor educational infrastructure in Yogyakarta. It features:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Interactive GIS Dashboard: Real-time visualization of school distribution, facility gaps, and regional disparities.</li>
          <li>API Integration: Seamless data exchange with Dapodik, BPS, and Mapbox.</li>
          <li>Stakeholder Tools: Supports decision-making for local governments and educators.</li>
        </ul>
        <p className="mt-2">The system aligns with SDG 4 (Quality Education) and serves as a scalable model for national adoption.</p>
      </div>
    ),
  },
  {
    id: "faq-3",
    question: "Is the data provided accurate?",
    answer: "The system integrates data from official sources with a documented accuracy rate of 95% during testing. Discrepancies (e.g., missing coordinates, outdated facility records) are flagged for review. Users may report inaccuracies via the dashboard's Feedback feature, triggering a 48-hour verification process by the project team.",
  },
  {
    id: "faq-4",
    question: "How can school data be updated?",
    answer: (
      <div>
        <p>School data is primarily sourced from open-data portals and synchronized automatically via RESTful APIs. Authorized administrators (e.g., local education offices) may submit update requests through:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Web Portal: Log in to the dashboard and navigate to Data Management &gt; Submit Updates.</li>
          <li>Manual Verification: Submit validated data via CSV/Excel templates to the technical team for review.</li>
        </ul>
        <p className="mt-2">All updates undergo automated validation and manual approval to ensure accuracy.</p>
      </div>
    ),
  },
  {
    id: "faq-5",
    question: "What privacy policy applies?",
    answer: "The privacy policy governing this system adheres to Indonesia's data protection regulations, including the alignment with the Ministry of Education and Culture's (Kemdikbud) guidelines for educational data management. The system processes open data from verified sources while ensuring sensitive information is anonymized. User data collected during system interactions (e.g., login credentials, query logs) is protected under strict confidentiality protocols and used solely for analytical and operational purposes.",
  },
  {
    id: "faq-6",
    question: "How can I contact customer service?",
    answer: (
      <div>
        <p>For inquiries or technical support, stakeholders may reach the project team via:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Email: edukita.support@gmail.com</li>
          <li>Phone: ‪+62 (274) 123456‬ (ext. 123)</li>
          <li>
            Office Address: Department of Electrical and Information Engineering, Universitas Gadjah Mada, Yogyakarta, Indonesia.
          </li>
          <li>
            Operating hours: 09:00–16:00 WIB (Monday–Friday).
          </li>
        </ul>
      </div>
    ),
  },
];

const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
}: Faq3Props) => {
  return (
    <section className="py-20" id="faq">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
};

export { Faq3 };
