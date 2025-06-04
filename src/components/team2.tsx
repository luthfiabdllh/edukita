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
    avatar: "/avatars/avatar1.svg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/dimal-karim-ahmad/",
    instagram: "#",
  },
  {
    id: "person-2",
    name: "Ahmad Luthfi Abdillah",
    role: "Frontend Developer & UI/UX Designer",
    description: "Develops responsive visual elements and creates intuitive user interfaces to enhance user experience.",
    avatar: "/avatars/avatar3.svg",
    github: "https://github.com/luthfiabdllh",
    linkedin: "http://linkedin.com/in/luthfi-abdllh/",
    instagram: "https://instagram.com/luthfi_abdllh",
  },
    {
    id: "person-3",
    name: "Asyifa Dzaky Maulana A",
    role: "Backend Developer",
    description: "Manages system architecture and database operations to support backend stability and performance.",
    avatar: "/avatars/avatar5.svg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/asyifa-dzaky-maulana-aditria/",
    instagram: "#",
  },
    {
    id: "person-4",
    name: "Muhammad Najwan Fadlillah",
    role: "Data Scientist & Paper Writer",
    description: "Analyzes data to generate insights and documents research findings through comprehensive papers.",
    avatar: "/avatars/avatar7.svg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/muhammadnajwanf/",
    instagram: "#",
  },
  {
    id: "person-5",
    name: "Rifqi Renaldo",
    role: "Videographer",
    description: "Captures high-quality video content to document and showcase the project's development and features.",
    avatar: "/avatars/avatar2.svg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/rifqi-renaldo-2439892b8/",
    instagram: "#",
  },
  {
    id: "person-6",
    name: "Devangga Arya Hartanta",
    role: "Graphic Designer",
    description: "Creates visual assets and illustrations to enhance the project's aesthetic appeal and branding.",
    avatar: "/avatars/avatar4.svg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/devangga-arya-747550229",
    instagram: "#",
  },
  {
    id: "person-7",
    name: "Aurelius Bevan Yudira P",
    role: "Video Editor",
    description: "Handles post-production of video content, ensuring high-quality final outputs with professional edits.",
    avatar: "/avatars/avatar6.svg",
    github: "#",
    linkedin: "#",
    instagram: "#",
  },
];

const Team2 = () => {
  return (
    <section className="py-32" id="team">
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
