import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  badge = "Education",
  heading = "Education Database for Indonesia",
  description = "Explore comprehensive and accurate school information, including locations, available facilities, and statistical insights.",
  buttons = {
    primary: {
      text: "Start for free",
      url: "/dashboard",
    },
    secondary: {
      text: "Learn More",
      url: "#features",
    },
  },
  image = {
    src: "/images/hero.svg",
    alt: "Collaborative learning platform interface",
  },
}: Hero1Props) => {
  return (
    <section className="pb-16 pt-8" id="hero">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={image.src}
            alt={image.alt}
            priority
            width={500}
            height={500}
            className="w-full rounded-md"
            suppressHydrationWarning={true}
          />
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
