"use client"

import { useRef } from "react"
import Image from "next/image"

export default function Features() {
  const ref = useRef(null)

  const features = [
    {
      icon: "/icon/icon-school.svg",
      title: "Comprehensive Database",
      description: "Gain access to a detailed database covering schools across Indonesia, including locations, facilities, academic programs, and enrollment statistics.",
    },
    {
      icon: "/icon/icon-statistic.svg",
      title: "Latest Data",
      description: "Ensure accuracy with continuously updated school information, reflecting the latest trends, facility availability, and institutional changes.",
    },
    {
      icon: "/icon/icon-pin.svg",
      title: "School Mapping",
      description: "Easily locate schools and explore surrounding facilities with an intuitive mapping system designed for effortless navigation and decision-making.Let me know if you.",
    },
  ]

  return (
    <section className="py-12 px-4 bg-opacity-60" id="features">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text font-bold ">
            Our Services
          </span>
        </h2>

        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          style={{
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-(--card) rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 flex flex-col items-center hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="mb-6 w-24 h-24 rounded-full bg-(--card-foreground) flex justify-center items-center mx-auto">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-12 h-12"
                  suppressHydrationWarning={true}
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-center text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
