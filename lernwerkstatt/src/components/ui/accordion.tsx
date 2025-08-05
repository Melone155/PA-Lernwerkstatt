"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { ChevronDown } from "lucide-react"

type AccordionContextValue = {
    value: string | null
    onValueChange: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

export function Accordion({
                              type = "single",
                              collapsible = false,
                              defaultValue,
                              value,
                              onValueChange,
                              className = "",
                              children,
                              ...props
                          }: {
    type?: "single" | "multiple"
    collapsible?: boolean
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    className?: string
    children: React.ReactNode
}) {
    const [stateValue, setStateValue] = useState<string | null>(defaultValue || null)

    const contextValue =
        value !== undefined
            ? { value, onValueChange: (v: string) => onValueChange?.(v) }
            : {
                value: stateValue,
                onValueChange: (v: string) => {
                    if (v === stateValue && collapsible) {
                        setStateValue(null)
                    } else {
                        setStateValue(v)
                    }
                },
            }

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={`space-y-1 ${className}`} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
}

type AccordionItemContextValue = {
    value: string
    isOpen: boolean
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined)

export function AccordionItem({
                                  value,
                                  className = "",
                                  children,
                                  ...props
                              }: {
    value: string
    className?: string
    children: React.ReactNode
}) {
    const context = useContext(AccordionContext)
    if (!context) {
        throw new Error("AccordionItem must be used within an Accordion")
    }

    const isOpen = context.value === value

    return (
        <AccordionItemContext.Provider value={{ value, isOpen }}>
            <div className={`border-b border-white/10 ${className}`} {...props}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    )
}

export function AccordionTrigger({
                                     className = "",
                                     children,
                                     ...props
                                 }: {
    className?: string
    children: React.ReactNode
}) {
    const context = useContext(AccordionContext)
    if (!context) {
        throw new Error("AccordionTrigger must be used within an AccordionItem")
    }

    const { value: contextValue, onValueChange } = context
    const accordionItemContext = useContext(AccordionItemContext)
    if (!accordionItemContext) {
        throw new Error("AccordionTrigger must be used within an AccordionItem")
    }

    const { value } = accordionItemContext
    const isOpen = contextValue === value

    return (
        <button
            className={`flex w-full items-center justify-between py-4 font-medium transition-all hover:text-purple-500 ${className}`}
            onClick={() => onValueChange(value)}
            {...props}
        >
            {children}
            <ChevronDown
                className={`h-5 w-5 shrink-0 text-purple-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
        </button>
    )
}

export function AccordionContent({
                                     className = "",
                                     children,
                                     ...props
                                 }: {
    className?: string
    children: React.ReactNode
}) {
    const context = useContext(AccordionContext)
    if (!context) {
        throw new Error("AccordionContent must be used within an AccordionItem")
    }

    const accordionItemContext = useContext(AccordionItemContext)
    if (!accordionItemContext) {
        throw new Error("AccordionContent must be used within an AccordionItem")
    }

    const { value } = accordionItemContext
    const isOpen = context.value === value

    return (
        <div
            className={`overflow-hidden text-sm transition-all ${isOpen ? "max-h-[1000px] duration-500" : "max-h-0 duration-300"} ${className}`}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    )
}

