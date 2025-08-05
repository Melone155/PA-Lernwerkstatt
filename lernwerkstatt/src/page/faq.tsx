"use client"
import { FAQ } from "../components/faq"

export default function FAQPage() {
    return (
            <div className="min-h-screen text-black">
                {/* Hero Section */}
                <div className="relative py-12">
                    <div className="absolute inset-0 bg-purple-400 mix-blend-multiply" />
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold">FAQ</h1>
                                </div>
                                <p className="text-white/70 mt-1">Häufig gestellte Fragen und Antworten</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 pb-12">
                    <div className="space-y-6">
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
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mt-8">
                            <h2 className="text-xl font-semibold mb-4">Noch Fragen?</h2>
                            <p className="text-white/70 mb-4">
                                Wenn Sie weitere Fragen haben oder Unterstützung benötigen, zögern Sie nicht, uns zu kontaktieren. Unser
                                Support-Team steht Ihnen rund um die Uhr zur Verfügung.
                            </p>
                            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors flex items-center gap-2">
                                Kontakt aufnehmen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

