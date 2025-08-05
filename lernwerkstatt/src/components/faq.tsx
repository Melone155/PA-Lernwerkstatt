"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export type FAQItem = {
    id: string
    question: string
    answer: React.ReactNode
}

interface FAQProps {
    title?: string
    items: FAQItem[]
}

export function FAQ({ title = "Häufig gestellte Fragen", items }: FAQProps) {
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-black rounded-xl p-6 shadow-md">
            {title && <h2 className="text-xl font-semibold mb-6">{title}</h2>}
            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-black">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}