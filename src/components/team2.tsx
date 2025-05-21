import { Github, Instagram, Linkedin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const people = [
  {
    id: "person-1",
    name: "Dimal Karim Ahmad",
    role: "Supervisor",
    description:
      "Oversees project execution, ensuring that all aspects run smoothly and meet quality standards.",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    github: "#",
    linkedin: "https://www.linkedin.com/in/dimal-karim-ahmad/",
    instagram: "#",
  },
  {
    id: "person-2",
    name: "Rifqi Renaldo",
    role: "UI/UX Designer",
    description: "Designs user-friendly interfaces to provide an optimal and seamless user experience.",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    github: "#",
    linkedin: "https://www.linkedin.com/in/rifqi-renaldo-2439892b8/",
    instagram: "#",
  },
  {
    id: "person-3",
    name: "Ahmad Luthfi Abdillah",
    role: "Frontend Developer",
    description: "Develops responsive visual elements and interactions to enhance application performance.",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    github: "https://github.com/luthfiabdllh",
    linkedin: "http://linkedin.com/in/luthfi-abdllh/",
    instagram: "https://instagram.com/luthfi_abdllh",
  },
  {
    id: "person-4",
    name: "Devangga Arya Hartanta",
    role: "Frontend Developer",
    description: "Builds functional UI components while ensuring an appealing and efficient design",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    github: "#",
    linkedin: "https://www.linkedin.com/in/devangga-arya-747550229",
    instagram: "#",
  },
  {
    id: "person-5",
    name: "Asyifa Dzaky Maulana A",
    role: "Backend Developer",
    description: "Manages system architecture and database operations to support backend stability.",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    github: "#",
    linkedin: "https://www.linkedin.com/in/asyifa-dzaky-maulana-aditria/",
    instagram: "#",
  },
  {
    id: "person-6",
    name: "Aurelius Bevan Yudira P",
    role: "Backend Developer",
    description: "Develops business logic and APIs to ensure a scalable and reliable system.",
    avatar: "https://shadcnblocks.com/images/block/avatar-7.webp",
    github: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    id: "person-7",
    name: "Muhammad Najwan Fadlillah",
    role: "Data Scientist",
    description: "Analyzes and processes data to generate insights that aid decision-making within the project.",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    github: "#",
    linkedin: "https://www.linkedin.com/in/muhammadnajwanf/",
    instagram: "#",
  },
];

const Team2 = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-start text-left">
        <p className="semibold">Meet Our team</p>
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          The contributors in this project bring expertise and dedication to success.
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          We are committed to collaboration, ensuring innovation, efficiency, and high-quality outcomes.
        </p>
      </div>
      <div className="container mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-start">
            <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{person.name}</p>
            <p className="text-muted-foreground">{person.role}</p>
            <p className="py-3 text-sm text-muted-foreground">
              {person.description}
            </p>
            <div className="mt-2 flex gap-4">
              <Link href={person.github}>
                <Github className="size-5 text-muted-foreground" />
              </Link>
              <Link href={person.linkedin}>
                <Linkedin className="size-5 text-muted-foreground" />
              </Link>
              <Link href={person.instagram}>
                <Instagram className="size-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Team2 };
