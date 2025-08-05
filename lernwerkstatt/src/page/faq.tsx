"use client"
import { FAQ } from "../components/faq"

export default function FAQPage() {
    return (
            <div className="min-h-screen bg-gradient-to-br from-purple-200/40 to-cyan-100/30 text-black">
                {/* Hero Section */}
                <div className="relative py-16 mb-8 bg-purple-500 rounded-b-3xl shadow-lg">
                    <div className="relative container mx-auto px-4 z-10">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg">
                                        <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 14v.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
                                    </span>
                                    <h1 className="text-4xl font-extrabold text-white drop-shadow">FAQ</h1>
                                </div>
                                <p className="text-white/90 mt-2 text-lg font-medium">Häufig gestellte Fragen und Antworten</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 pb-16">
                    <div className="space-y-10">
                        {/* Allgemeine Fragen */}
                        <FAQ
                            title="Allgemeine Fragen"
                            items={[
                                {
                                    id: "was-ist-Fuchs-Host",
                                    question: "Was ist Fuchs-Host?",
                                    answer: (
                                        <p>
                                            Fuchs-Host ist ein Anbieter für Server Hosting. Wir bieten verschiedene
                                            Hosting-Lösungen an, darunter Root-Server, Web-Hosting, Cloud-Speicher und Domains. Unser Ziel
                                            ist es, zuverlässige, leistungsstarke und Kosten Künstige Lösung anzubieten.
                                        </p>
                                    ),
                                },
                                {
                                    id: "wie-kontaktiere-ich-support",
                                    question: "Wie kann ich den Kundensupport kontaktieren?",
                                    answer: (
                                        <div>
                                            <p>Sie können unseren Kundensupport auf verschiedene Weise erreichen:</p>
                                            <ul className="list-disc pl-6 mt-2">
                                                <li>Per E-Mail: support@hoster.de</li>
                                                <li>Über das Support-Ticket-System in Ihrem Kundenbereich</li>
                                            </ul>
                                        </div>
                                    ),
                                },
                                {
                                    id: "zahlungsmethoden",
                                    question: "Welche Zahlungsmethoden werden akzeptiert?",
                                    answer:
                                        "Wir akzeptieren verschiedene Zahlungsmethoden, darunter Kreditkarten (Visa, MasterCard, American Express), PayPal, Banküberweisung und SEPA-Lastschrift.",
                                },
                                {
                                    id: "service-time",
                                    question: "Wann sind unsere Service Zeiten?",
                                    answer:
                                        "Wir sind von Montag - Sonntag, 8-23 Uhr (mitteleuropäische Zeit) verfügbar Systeamwartungen werden.",
                                },
                                {
                                    id: "hilfe",
                                    question: "Was ist wenn ich Hilfe oder Beratung Brauche?",
                                    answer:
                                        "Wenn sie Hilfe brauchen helfen wir ihnen gerne Kontaktieren sie uns einfach über unser Ticket Systeam und wir Führen die schritt für Schritt bis zur einer Passenden Lösung",
                                },
                            ]}
                        />

                        {/* Server-Fragen */}
                        <FAQ
                            title="Server & Hosting"
                            items={[
                                {
                                    id: "server-unterschiede",
                                    question: "Was sind Root-Server?",
                                    answer: (
                                        <div>
                                            <p className="mt-2">
                                                Ein <strong>Root-Server</strong> ist meine virtuelle Server auf einer physischer Maschiene bei dennen sie ihre gebuchte leistung garantierte haben und somit sicher sind das Ihr Server Problemlos lauft
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    id: "betriebssysteme",
                                    question: "Welche Betriebssysteme kann ich für meinen Server wählen?",
                                    answer: (
                                        <div>
                                            <p>Wir bieten verschiedene Linux-Distributionen und Windows Server an:</p>
                                            <ul className="list-disc pl-6 mt-2">
                                                <li>Ubuntu Server</li>
                                                <li>Debian</li>
                                                <li>Windows Server 2019/2022</li>
                                            </ul>
                                        </div>
                                    ),
                                },
                                {
                                    id: "root-zugriff",
                                    question: "Habe ich Root-Zugriff auf meinen Server?",
                                    answer:
                                        "Ja, bei unseren Root-Servern erhalten Sie vollen Root-Zugriff. Bei unseren Shared Hosting leistungen ist der Root-Zugriff aus Sicherheitsgründen eingeschränkt.",
                                },
                                {
                                    id: "kündigen",
                                    question: "Wie Kündige ich meinen Server?",
                                    answer:
                                        "Unsere Dienste sind Prepaid somit wird hier kein Abo Abgeschlossen wenn sie ihren Server behalten wollen müssen sie diesen selbständig ernuern ansonsten verfällt dieser Automatisch.",
                                },
                                {
                                    id: "server-zugang-teilen",
                                    question: "Server Zugang Teilen",
                                    answer:
                                        "Sie können ihren Server mit Freunden und Kollegen Teilen. diese brauchen nur bei uns einen Account und in Server Dashbord können sie ihnen zugriff geben.",
                                },
                            ]}
                        />

                        {/* Kontakt-Hinweis */}
                        <div className="bg-gradient-to-r from-cyan-100/80 to-purple-100/60 border border-cyan-200/60 rounded-2xl p-8 mt-12 shadow-lg flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold mb-3 text-purple-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 14v.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
                                Noch Fragen?
                            </h2>
                            <p className="text-purple-900/70 mb-6 text-lg max-w-2xl">
                                Wenn Sie weitere Fragen haben oder Unterstützung benötigen, zögern Sie nicht, uns zu kontaktieren. Unser Support-Team steht Ihnen rund um die Uhr zur Verfügung.
                            </p>
                            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-lg font-semibold shadow-md transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25V6a2.25 2.25 0 00-2.25-2.25h-13.5A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-2.25M17.25 15.75L21 12m0 0l-3.75-3.75M21 12H9" /></svg>
                                Kontakt aufnehmen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

