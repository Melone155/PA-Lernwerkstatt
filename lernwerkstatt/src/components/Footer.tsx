import { Gamepad2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Gamepad2 className="h-8 w-8 text-purple-400" />
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GameZone
              </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Dein vertrauensvoller Partner für Gaming Hardware, Software und Zubehör.
                            Seit 2020 begeistern wir Gamer mit Top-Produkten und fairem Service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Kategorien</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">PC Gaming</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Konsolen</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Gaming Headsets</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Gaming Tastaturen</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Gaming Mäuse</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Zubehör</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Kundenservice</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Hilfe & Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Versandinformationen</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Rückgabe & Umtausch</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Garantie</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Kontakt</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Kontakt</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-purple-400" />
                                <div className="text-gray-400">
                                    <div>Gamer Straße 123</div>
                                    <div>12345 Berlin</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">+49 (0) 30 12345678</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">info@gamezone.de</span>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-purple-400">Öffnungszeiten</h4>
                            <div className="text-sm text-gray-400 space-y-1">
                                <div>Mo-Fr: 9:00 - 19:00</div>
                                <div>Sa: 10:00 - 18:00</div>
                                <div>So: 12:00 - 17:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 GameZone. Alle Rechte vorbehalten.
                        </div>
                        <div className="flex flex-wrap space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Datenschutz</a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">AGB</a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Impressum</a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Cookie-Einstellungen</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;