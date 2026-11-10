/*
 * EN / DE language switcher.
 *
 * - Adds an "EN | DE" toggle to the top right of the header.
 * - Translates the page in place from the DE dictionary below (keys are the
 *   English text exactly as it appears on the page, whitespace-collapsed).
 * - Keeps translating content that React or other scripts render later
 *   (industry tabs, article filters, callback / contact dialogs).
 * - Remembers the choice in localStorage ("ls-lang"); ?lang=de / ?lang=en
 *   in the URL overrides it.
 *
 * To add or fix a translation, edit DE. A key prefixed with "h1|" only
 * applies inside an <h1> (used where the same English word needs a
 * different German word in a heading).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ls-lang';
  var ATTRS = ['aria-label', 'alt', 'placeholder', 'title'];

  /*DICT*/
  var DE = {
    "LokalSterne — AI for more reviews and more customers": "LokalSterne — KI für mehr Bewertungen und mehr Kunden",
    "All articles — LokalSterne": "Alle Artikel — LokalSterne",
    "How to ask for a review without making it awkward — LokalSterne": "So bitten Sie um eine Bewertung, ohne dass es unangenehm wird — LokalSterne",
    "Terms and Conditions — LokalSterne": "Allgemeine Geschäftsbedingungen — LokalSterne",
    "Privacy Policy — LokalSterne": "Datenschutzerklärung — LokalSterne",

    "LokalSterne — home": "LokalSterne — Startseite",
    "Main": "Hauptnavigation",
    "Mobile": "Mobile Navigation",
    "Open menu": "Menü öffnen",
    "Close menu": "Menü schließen",
    "Features": "Funktionen",
    "Ready-to-use questionnaires": "Fertige Fragebögen",
    "Pricing": "Preise",
    "Contact us": "Kontakt",
    "Request a callback": "Rückruf anfordern",
    "Learn more": "Mehr erfahren",
    "Language": "Sprache",

    "AI for": "KI für",
    "more": "mehr",
    "reviews": "Bewertungen",
    "and": "und",
    "more customers": "mehr Kunden",
    "Reviews on": "Bewertungen auf",
    "and other platforms are not just a rating on cards": "und anderen Plattformen sind mehr als nur Sterne auf einer Karte",
    "Scroll down": "Nach unten scrollen",

    "More customers with": "Mehr Kunden durch",
    "intelligent reviews": "intelligente Bewertungen",
    "With LokalSterne, your business gets more reviews with keywords, which increases visibility on": "Mit LokalSterne erhält Ihr Unternehmen mehr Bewertungen mit relevanten Keywords – das erhöht Ihre Sichtbarkeit auf",
    "Google and Trustpilot": "Google und Trustpilot",
    "More visibility": "Mehr Sichtbarkeit",
    "More reviews improve local search presence and help businesses get discovered.": "Mehr Bewertungen stärken Ihre Präsenz in der lokalen Suche und sorgen dafür, dass Ihr Unternehmen gefunden wird.",
    "Powerful insights": "Wertvolle Einblicke",
    "Customer feedback is transformed into actionable insights that support better business": "Kundenfeedback wird zu konkreten Erkenntnissen, die bessere Geschäftsentscheidungen ermöglichen",
    "More customers": "Mehr Kunden",
    "Stronger social proof builds trust and increases conversions.": "Starker Social Proof schafft Vertrauen und steigert die Conversions.",

    "3 simple steps.": "3 einfache Schritte.",
    "One 5-star review": "Eine 5-Sterne-Bewertung",
    "From scan to published": "Vom Scan zur Veröffentlichung",
    "in seconds": "in Sekunden",
    "Scan QR code": "QR-Code scannen",
    "Customers scan the QR code and instantly": "Kunden scannen den QR-Code und öffnen",
    "open the survey": "sofort die Umfrage",
    "Answer & generate": "Antworten & generieren",
    "They answer 3 quick questions. AI writes a personalized review": "Sie beantworten 3 kurze Fragen. Die KI schreibt daraus eine persönliche Bewertung",
    "Paste & publish": "Einfügen & veröffentlichen",
    "They paste the review on Google and hit Post.": "Sie fügen die Bewertung bei Google ein und tippen auf „Posten“.",
    "Done!": "Fertig!",

    "Precustomized": "Vorgefertigte",
    "questions": "Fragen",
    "Questions": "Fragen",
    "Start with questions made for your industry. Make it easier for customers to share what made their experience unique.": "Starten Sie mit Fragen, die für Ihre Branche gemacht sind. So fällt es Kunden leichter zu erzählen, was ihr Erlebnis besonders gemacht hat.",
    "Industry": "Branche",
    "Dental Clinics": "Zahnarztpraxen",
    "Barbershops": "Barbershops",
    "Beauty Bars": "Beautysalons",
    "Restaurants": "Restaurants",
    "Auto Repair": "Autowerkstätten",
    "Retail Stores": "Einzelhandel",
    "Cafés": "Cafés",
    "Fitness Studios": "Fitnessstudios",
    "Hotels": "Hotels",
    "Benefits for": "Vorteile für",
    "Apply template": "Vorlage verwenden",
    "Apply this template and start collecting": "Verwenden Sie diese Vorlage und sammeln Sie Feedback von",
    "feedback in your free-trial onboarding flow.": "direkt beim Onboarding in Ihrer kostenlosen Testphase.",
    "patient": "Patienten",
    "client": "Kunden",
    "customer": "Kunden",
    "guest": "Gästen",
    "member": "Mitgliedern",
    "shopper": "Käufern",

    "How would you describe the dentist’s explanation of your treatment?": "Wie würden Sie die Erklärung Ihrer Behandlung durch die Zahnärztin bzw. den Zahnarzt beschreiben?",
    "Clear and easy to understand": "Klar und leicht verständlich",
    "Unclear or confusing": "Unklar oder verwirrend",
    "Mostly clear, but a few details were unclear": "Größtenteils klar, aber einige Details waren unklar",
    "Very detailed and reassuring": "Sehr ausführlich und beruhigend",
    "How would you describe the overall quality of care you received?": "Wie würden Sie die Qualität der Behandlung insgesamt beschreiben?",
    "Excellent — professional and thorough": "Ausgezeichnet — professionell und gründlich",
    "Fair — some room for improvement": "Mittelmäßig — noch Luft nach oben",
    "Good — met my expectations": "Gut — hat meine Erwartungen erfüllt",
    "Outstanding — beyond expectations": "Herausragend — über meinen Erwartungen",
    "Understand patient comfort": "Verstehen, wie wohl sich Patienten fühlen",
    "See what makes your care stand out": "Erkennen, was Ihre Behandlung auszeichnet",
    "Make the next visit better": "Den nächsten Besuch noch besser machen",
    "Start with ready-to-use questions": "Mit fertigen Fragen starten",

    "How happy are you with your new cut?": "Wie zufrieden sind Sie mit Ihrem neuen Haarschnitt?",
    "Exactly what I asked for": "Genau das, was ich wollte",
    "Not quite what I wanted": "Nicht ganz das, was ich wollte",
    "Close, with small adjustments needed": "Fast — kleine Anpassungen nötig",
    "Even better than expected": "Sogar besser als erwartet",
    "How was the atmosphere in the shop?": "Wie war die Atmosphäre im Laden?",
    "Relaxed and welcoming": "Entspannt und einladend",
    "Too busy or rushed": "Zu voll oder hektisch",
    "Fine — nothing special": "In Ordnung — nichts Besonderes",
    "Great vibe, I’ll be back": "Tolle Stimmung, ich komme wieder",
    "Learn what clients love about each barber": "Erfahren, was Kunden an jedem Barber schätzen",
    "Spot waiting-time issues early": "Probleme mit Wartezeiten früh erkennen",
    "Turn regulars into reviewers": "Stammkunden zu Rezensenten machen",

    "How satisfied are you with the result of your treatment?": "Wie zufrieden sind Sie mit dem Ergebnis Ihrer Behandlung?",
    "Love the result": "Ich liebe das Ergebnis",
    "Not what I expected": "Nicht das, was ich erwartet habe",
    "Good, with small details to improve": "Gut, mit kleinen Verbesserungsmöglichkeiten",
    "Better than I imagined": "Besser als ich es mir vorgestellt habe",
    "How comfortable did you feel during your visit?": "Wie wohl haben Sie sich während Ihres Besuchs gefühlt?",
    "Very comfortable and cared for": "Sehr wohl und gut umsorgt",
    "Uncomfortable at times": "Zeitweise unwohl",
    "Comfortable overall": "Insgesamt wohl",
    "Completely pampered": "Rundum verwöhnt",
    "Highlight your signature treatments": "Ihre Signature-Behandlungen hervorheben",
    "Understand client comfort": "Verstehen, wie wohl sich Kunden fühlen",
    "Encourage repeat bookings": "Folgebuchungen fördern",

    "How would you rate the food you ordered today?": "Wie bewerten Sie das Essen, das Sie heute bestellt haben?",
    "Delicious — would order again": "Köstlich — würde ich wieder bestellen",
    "Disappointing": "Enttäuschend",
    "Good, but not memorable": "Gut, aber nicht besonders",
    "One of the best meals I’ve had": "Eines der besten Essen, die ich je hatte",
    "How was the service during your visit?": "Wie war der Service während Ihres Besuchs?",
    "Friendly and attentive": "Freundlich und aufmerksam",
    "Slow or inattentive": "Langsam oder unaufmerksam",
    "Okay — did the job": "Okay — hat seinen Zweck erfüllt",
    "Exceptional from start to finish": "Von Anfang bis Ende außergewöhnlich",
    "Find out which dishes guests rave about": "Herausfinden, von welchen Gerichten Gäste schwärmen",
    "Catch service issues before they spread": "Serviceprobleme erkennen, bevor sie sich ausweiten",
    "Get reviews that mention your menu": "Bewertungen erhalten, die Ihre Speisekarte erwähnen",

    "How clearly were the repairs and costs explained to you?": "Wie klar wurden Ihnen die Reparaturen und Kosten erklärt?",
    "Clear and transparent": "Klar und transparent",
    "Unclear or surprising": "Unklar oder überraschend",
    "Mostly clear, a few questions left": "Größtenteils klar, ein paar Fragen offen",
    "Explained in great detail": "Sehr ausführlich erklärt",
    "Was your car ready when promised?": "War Ihr Auto zum vereinbarten Zeitpunkt fertig?",
    "Right on time": "Pünktlich",
    "Later than promised": "Später als versprochen",
    "Slightly delayed, but informed": "Etwas verspätet, aber ich wurde informiert",
    "Earlier than expected": "Früher als erwartet",
    "Build trust with transparent feedback": "Vertrauen durch transparentes Feedback aufbauen",
    "Show reliability in your reviews": "Zuverlässigkeit in Ihren Bewertungen zeigen",
    "Find delays in your workflow": "Verzögerungen in Ihren Abläufen finden",

    "Did you find what you were looking for today?": "Haben Sie heute gefunden, wonach Sie gesucht haben?",
    "Yes, easily": "Ja, ganz leicht",
    "No, I couldn’t find it": "Nein, ich habe es nicht gefunden",
    "Yes, with some help": "Ja, mit etwas Hilfe",
    "Found even more than I needed": "Sogar mehr gefunden, als ich brauchte",
    "How helpful was our team?": "Wie hilfsbereit war unser Team?",
    "Very helpful and friendly": "Sehr hilfsbereit und freundlich",
    "Not helpful": "Nicht hilfreich",
    "Helpful when asked": "Hilfsbereit, wenn ich gefragt habe",
    "Went above and beyond": "Hat sich besonders viel Mühe gegeben",
    "Understand the in-store experience": "Das Einkaufserlebnis im Laden verstehen",
    "Learn what shoppers miss": "Erfahren, was Kunden vermissen",
    "Recognize standout staff": "Herausragende Mitarbeitende erkennen",

    "How did you enjoy your coffee today?": "Wie hat Ihnen Ihr Kaffee heute geschmeckt?",
    "Perfect, just how I like it": "Perfekt, genau wie ich ihn mag",
    "Not to my taste": "Nicht mein Geschmack",
    "Good, nothing special": "Gut, nichts Besonderes",
    "Best coffee in town": "Bester Kaffee der Stadt",
    "How would you describe the atmosphere?": "Wie würden Sie die Atmosphäre beschreiben?",
    "Cozy and welcoming": "Gemütlich und einladend",
    "Too loud or crowded": "Zu laut oder zu voll",
    "Pleasant enough": "Ganz angenehm",
    "My new favorite spot": "Mein neuer Lieblingsort",
    "Hear what makes your café special": "Erfahren, was Ihr Café besonders macht",
    "Get reviews that mention your favorites": "Bewertungen erhalten, die Ihre Lieblingsprodukte erwähnen",
    "Turn regulars into fans": "Stammgäste zu Fans machen",

    "How motivating was your trainer today?": "Wie motivierend war Ihr Trainer heute?",
    "Very motivating": "Sehr motivierend",
    "Not motivating": "Nicht motivierend",
    "Okay — could push more": "Okay — hätte mehr fordern können",
    "Best class I’ve taken": "Der beste Kurs, den ich je hatte",
    "How would you rate the equipment and facilities?": "Wie bewerten Sie die Geräte und die Ausstattung?",
    "Clean and well-maintained": "Sauber und gepflegt",
    "Needs attention": "Verbesserungsbedürftig",
    "Good overall": "Insgesamt gut",
    "Keep members motivated and loyal": "Mitglieder motiviert und treu halten",
    "Spot facility issues early": "Probleme mit der Ausstattung früh erkennen",
    "Showcase your best trainers": "Ihre besten Trainer zeigen",

    "How comfortable was your room?": "Wie komfortabel war Ihr Zimmer?",
    "Very comfortable": "Sehr komfortabel",
    "Uncomfortable": "Unbequem",
    "Comfortable, with small issues": "Komfortabel, mit kleinen Mängeln",
    "Exceeded my expectations": "Hat meine Erwartungen übertroffen",
    "How was your check-in experience?": "Wie war Ihr Check-in?",
    "Quick and friendly": "Schnell und freundlich",
    "Slow or confusing": "Langsam oder umständlich",
    "Felt truly welcomed": "Ich habe mich wirklich willkommen gefühlt",
    "Understand the full guest stay": "Den gesamten Aufenthalt Ihrer Gäste verstehen",
    "Fix small issues before checkout": "Kleine Probleme vor dem Check-out beheben",
    "Get more reviews on Google": "Mehr Bewertungen auf Google erhalten",

    "Bring your QR code to life,": "Erwecken Sie Ihren QR-Code zum Leben –",
    "your way": "ganz nach Ihrem Stil",
    "Design a QR code that feels like your brand and turns more customers into 5-star reviews": "Gestalten Sie einen QR-Code, der zu Ihrer Marke passt und mehr Kunden zu 5-Sterne-Bewertungen bewegt",
    "QR code stand with your logo and call to action": "QR-Code-Aufsteller mit Ihrem Logo und Ihrer Handlungsaufforderung",
    "Colors & Style": "Farben & Stil",
    "Pick colors that match your brand so the stand fits naturally at your counter or table.": "Wählen Sie Farben passend zu Ihrer Marke, damit sich der Aufsteller natürlich in Theke oder Tisch einfügt.",
    "Your logo": "Ihr Logo",
    "Add your logo so customers instantly recognize who they are reviewing.": "Fügen Sie Ihr Logo hinzu, damit Kunden sofort sehen, wen sie bewerten.",
    "Custom text": "Eigener Text",
    "Write your own call to action — in your tone of voice and your customers’ language.": "Schreiben Sie Ihre eigene Handlungsaufforderung — in Ihrem Tonfall und in der Sprache Ihrer Kunden.",

    "Choose the plan that fits": "Wählen Sie den Tarif, der zu",
    "your goals": "Ihren Zielen passt",
    "Start with the essentials. Choose Pro when you need more AI assistance, more locations and more reviews.": "Starten Sie mit dem Wesentlichen. Wählen Sie Pro, wenn Sie mehr KI-Unterstützung, mehr Standorte und mehr Bewertungen brauchen.",
    "Free": "Free",
    "For getting started": "Für den Einstieg",
    "Start building your reputation": "Bauen Sie Ihren guten Ruf auf",
    "A simple way to start collecting customer reviews.": "Ein einfacher Einstieg, um Kundenbewertungen zu sammeln.",
    "Ready-to-use industry survey forms": "Fertige Umfrageformulare für Ihre Branche",
    "QR customization for your brand": "QR-Code im Design Ihrer Marke",
    "AI-assisted reviews with basic usage limits": "KI-gestützte Bewertungen mit Basis-Nutzungslimits",
    "Review collection for a single location": "Bewertungen für einen Standort sammeln",
    "Essential review volume to get started": "Grundlegendes Bewertungsvolumen für den Start",
    "Get started free": "Kostenlos starten",
    "Pro": "Pro",
    "For growing businesses": "Für wachsende Unternehmen",
    "Grow beyond the essentials": "Wachsen Sie über das Wesentliche hinaus",
    "More room to grow your reviews and your business.": "Mehr Spielraum für Ihre Bewertungen und Ihr Unternehmen.",
    "Everything in Free": "Alles aus Free",
    "Higher AI usage limits": "Höhere KI-Nutzungslimits",
    "Manage multiple business locations": "Mehrere Standorte verwalten",
    "Collect more customer reviews": "Mehr Kundenbewertungen sammeln",
    "Industry forms and branded QR codes across locations": "Branchenformulare und Marken-QR-Codes für alle Standorte",
    "Choose Pro": "Pro wählen",
    "Industry-ready forms": "Branchenfertige Formulare",
    "Your brand, your QR": "Ihre Marke, Ihr QR-Code",
    "AI-assisted reviews": "KI-gestützte Bewertungen",

    "Frequently asked": "Häufig gestellte",
    "Faq": "FAQ",
    "Everything you need to know about forms, QR codes and growing your customer reviews.": "Alles, was Sie über Formulare, QR-Codes und mehr Kundenbewertungen wissen müssen.",
    "How do industry-specific forms work?": "Wie funktionieren branchenspezifische Formulare?",
    "Start with a survey tailored to your business, such as a dentist clinic or barbershop. Relevant questions help customers describe their visit, the service they received and what stood out. Use the form as a starting point and adapt the wording to your business.": "Starten Sie mit einer Umfrage, die auf Ihr Unternehmen zugeschnitten ist – etwa eine Zahnarztpraxis oder einen Barbershop. Passende Fragen helfen Kunden, ihren Besuch, den erhaltenen Service und das, was ihnen besonders aufgefallen ist, zu beschreiben. Nutzen Sie das Formular als Ausgangspunkt und passen Sie die Formulierungen an Ihr Unternehmen an.",
    "Can I customize my QR code to match my brand?": "Kann ich meinen QR-Code an meine Marke anpassen?",
    "Yes. Choose your colors, add your logo and write your own call to action. You can print the QR code on table stands, receipts, posters or business cards.": "Ja. Wählen Sie Ihre Farben, fügen Sie Ihr Logo hinzu und schreiben Sie Ihre eigene Handlungsaufforderung. Sie können den QR-Code auf Tischaufsteller, Kassenbons, Poster oder Visitenkarten drucken.",
    "How does AI help customers write a review?": "Wie hilft die KI Kunden beim Schreiben einer Bewertung?",
    "After a few quick questions, AI turns your customer’s answers into a personal, well-written review draft. The customer can edit it, then copy and post it on Google or Trustpilot in a few taps.": "Nach ein paar kurzen Fragen macht die KI aus den Antworten Ihrer Kunden einen persönlichen, gut formulierten Bewertungsentwurf. Die Kunden können ihn bearbeiten und mit wenigen Klicks auf Google oder Trustpilot veröffentlichen.",
    "What is the difference between Free and Pro?": "Was ist der Unterschied zwischen Free und Pro?",
    "Free gives you industry forms, a branded QR code and AI-assisted reviews for one location with basic limits. Pro adds higher AI limits, more reviews and support for multiple business locations.": "Free bietet Ihnen Branchenformulare, einen QR-Code im Design Ihrer Marke und KI-gestützte Bewertungen für einen Standort mit Basislimits. Pro ergänzt höhere KI-Limits, mehr Bewertungen und die Unterstützung mehrerer Standorte.",
    "Can I use it for multiple business locations?": "Kann ich es für mehrere Standorte nutzen?",
    "Yes, with the Pro plan you can manage several locations, each with its own forms and branded QR codes, from one account.": "Ja, mit dem Pro-Tarif verwalten Sie mehrere Standorte – jeweils mit eigenen Formularen und Marken-QR-Codes – über ein einziges Konto.",

    "Useful": "Nützliche",
    "articles": "Artikel",
    "article": "Artikel",
    "Practical ideas to collect better feedback, grow your reputation and bring more customers through your door.": "Praktische Ideen, um besseres Feedback zu sammeln, Ihren Ruf zu stärken und mehr Kunden zu gewinnen.",
    "Read more": "Weiterlesen",
    "View all articles": "Alle Artikel ansehen",
    "All": "Alle",
    "All articles": "Alle Artikel",
    "Filter by topic": "Nach Thema filtern",
    "Promotions": "Werbung",
    "Customer reviews": "Kundenbewertungen",
    "QR tips": "QR-Tipps",
    "Reputation": "Reputation",
    "Local growth": "Lokales Wachstum",
    "Dental practices": "Zahnarztpraxen",
    "QR surveys": "QR-Umfragen",
    "Hospitality": "Gastronomie",
    "Local services": "Lokale Dienstleister",
    "Search articles by name": "Artikel nach Namen suchen",
    "Sort by": "Sortieren nach",
    "Newest": "Neueste",
    "Oldest": "Älteste",
    "A–Z": "A–Z",
    "Showing": "Angezeigt:",
    "No articles found": "Keine Artikel gefunden",
    "Try another topic or search term.": "Versuchen Sie ein anderes Thema oder einen anderen Suchbegriff.",
    "Pagination": "Seitennavigation",
    "Previous": "Zurück",
    "Next": "Weiter",

    "How to ask for a review without making it awkward": "So bitten Sie um eine Bewertung, ohne dass es unangenehm wird",
    "Find the right moment and the right words to invite honest feedback after a great customer experience.": "Finden Sie den richtigen Moment und die richtigen Worte, um nach einem tollen Kundenerlebnis um ehrliches Feedback zu bitten.",
    "Where to place your QR code for more customer reviews": "Wo Sie Ihren QR-Code für mehr Kundenbewertungen platzieren",
    "From reception to checkout, discover simple ways to make your review link easy to find and scan.": "Vom Empfang bis zur Kasse: Entdecken Sie einfache Wege, wie Ihr Bewertungslink leicht zu finden und zu scannen ist.",
    "Turn customer feedback into a better local business": "Mit Kundenfeedback zu einem besseren lokalen Unternehmen",
    "Learn how to spot recurring themes, respond thoughtfully and turn everyday feedback into practical improvements.": "Erfahren Sie, wie Sie wiederkehrende Themen erkennen, überlegt antworten und alltägliches Feedback in praktische Verbesserungen umsetzen.",
    "Make patient feedback part of everyday dental care": "Patientenfeedback zum festen Teil des Praxisalltags machen",
    "Invite feedback with care, protect patient privacy and help your team learn from each visit.": "Bitten Sie behutsam um Feedback, schützen Sie die Privatsphäre Ihrer Patienten und lernen Sie als Team aus jedem Besuch.",
    "Build a short QR survey customers want to finish": "Eine kurze QR-Umfrage, die Kunden gern ausfüllen",
    "Choose clear questions and a simple flow that makes sharing a recent experience feel effortless.": "Wählen Sie klare Fragen und einen einfachen Ablauf, damit das Teilen eines Erlebnisses ganz mühelos wirkt.",
    "Use AI to help customers find their own words": "Mit KI Kunden helfen, ihre eigenen Worte zu finden",
    "Offer a helpful starting point while keeping every review honest, personal and in the customer’s control.": "Bieten Sie einen hilfreichen Ausgangspunkt – und jede Bewertung bleibt ehrlich, persönlich und in der Hand der Kunden.",
    "Respond to a negative review with confidence": "Souverän auf eine negative Bewertung antworten",
    "Stay calm, acknowledge the concern and move the conversation towards a useful next step.": "Bleiben Sie ruhig, nehmen Sie das Anliegen ernst und führen Sie das Gespräch zu einem sinnvollen nächsten Schritt.",
    "Collect restaurant feedback beyond the receipt": "Restaurant-Feedback jenseits des Kassenbons sammeln",
    "Find natural moments to hear from diners, without interrupting the meal or putting them on the spot.": "Finden Sie natürliche Momente für Gästefeedback, ohne das Essen zu unterbrechen oder jemanden unter Druck zu setzen.",
    "Write a review invitation that sounds like you": "Eine Bewertungseinladung, die nach Ihnen klingt",
    "Create a friendly follow-up message with one clear link and no pressure to leave a glowing rating.": "Verfassen Sie eine freundliche Nachricht mit einem klaren Link – ohne Druck, eine Top-Bewertung abzugeben.",
    "Ask for salon feedback at the right moment": "Im richtigen Moment um Salon-Feedback bitten",
    "Make feedback a comfortable part of the appointment, from the final mirror check to the follow-up.": "Machen Sie Feedback zu einem angenehmen Teil des Termins – vom letzten Blick in den Spiegel bis zur Nachricht danach.",
    "Keep your business profiles ready for new reviews": "Halten Sie Ihre Unternehmensprofile bereit für neue Bewertungen",
    "Check your details, review links and replies so customers can find the right place to share feedback.": "Prüfen Sie Ihre Angaben, Bewertungslinks und Antworten, damit Kunden den richtigen Ort für ihr Feedback finden.",
    "Turn recurring feedback into a simple team plan": "Aus wiederkehrendem Feedback einen einfachen Teamplan machen",
    "Group similar comments, choose one improvement and give your team a clear way to follow through.": "Fassen Sie ähnliche Kommentare zusammen, wählen Sie eine Verbesserung und geben Sie Ihrem Team einen klaren Weg zur Umsetzung.",

    "Back to all articles": "Zurück zu allen Artikeln",
    "How to ask for a review": "So bitten Sie um eine Bewertung,",
    "without making it awkward": "ohne dass es unangenehm wird",
    "The LokalSterne guide": "Der LokalSterne-Ratgeber",
    "6 min read": "6 Min. Lesezeit",
    "Author": "Autor",
    "Product manager at Amazon": "Produktmanager bei Amazon",
    "In this article:": "In diesem Artikel:",
    "In this article": "In diesem Artikel",
    "Choose a natural moment": "Einen natürlichen Moment wählen",
    "Keep the invitation simple": "Die Einladung einfach halten",
    "Give people an easy next step": "Einen einfachen nächsten Schritt anbieten",
    "Make room for honest feedback": "Raum für ehrliches Feedback lassen",
    "Adapt the words to your business": "Die Worte an Ihr Unternehmen anpassen",
    "Follow up with care": "Behutsam nachfassen",
    "Invite, don’t pressure.": "Einladen, nicht drängen.",
    "A good review request makes it easy to say yes — and comfortable to say no.": "Eine gute Bewertungsanfrage macht es leicht, Ja zu sagen — und angenehm, Nein zu sagen.",
    "You’ve just helped a customer, finished an appointment or served a lovely meal. Asking for a review can feel like turning a genuine conversation into a sales pitch. It doesn’t have to. The best invitation is a small, optional next step: thank the person, ask for honest feedback and show them where to share it.": "Sie haben gerade einem Kunden geholfen, einen Termin abgeschlossen oder ein schönes Essen serviert. Um eine Bewertung zu bitten, kann sich anfühlen, als würde aus einem echten Gespräch ein Verkaufsgespräch. Das muss nicht sein. Die beste Einladung ist ein kleiner, freiwilliger nächster Schritt: Bedanken Sie sich, bitten Sie um ehrliches Feedback und zeigen Sie, wo man es teilen kann.",
    "Wait until the service is complete and the customer has a little breathing room. At a shop, that might be after checkout. At a salon, it could be after the final mirror check. At a dental practice, wait until the patient is comfortable and any immediate questions have been answered.": "Warten Sie, bis die Leistung abgeschlossen ist und die Kundin oder der Kunde etwas durchatmen kann. Im Laden kann das nach dem Bezahlen sein, im Salon nach dem letzten Blick in den Spiegel. In der Zahnarztpraxis warten Sie, bis sich die Patientin oder der Patient wohlfühlt und alle dringenden Fragen beantwortet sind.",
    "Avoid asking while someone is in a hurry, uncomfortable or waiting for an unresolved issue to be fixed. Deal with their needs first. Offer the same opportunity to share feedback to customers generally, rather than asking only those you expect to leave a positive rating.": "Fragen Sie nicht, wenn jemand in Eile ist, sich unwohl fühlt oder noch auf die Lösung eines Problems wartet. Kümmern Sie sich zuerst um die Anliegen. Bieten Sie allen Kunden gleichermaßen die Möglichkeit, Feedback zu geben – nicht nur denen, von denen Sie eine positive Bewertung erwarten.",
    "A short request sounds more natural than a rehearsed speech. Start with a thank-you, invite an honest account of the experience and make it clear that leaving a review is their choice. You don’t need to explain your whole marketing strategy.": "Eine kurze Bitte klingt natürlicher als eine einstudierte Rede. Beginnen Sie mit einem Dankeschön, bitten Sie um eine ehrliche Schilderung des Erlebnisses und machen Sie deutlich, dass eine Bewertung freiwillig ist. Sie müssen nicht Ihre ganze Marketingstrategie erklären.",
    "Try: “Thank you for coming in today. If you have a moment, we’d appreciate an honest review of your experience.” Then pause. Avoid asking for five stars, offering a reward or watching over someone’s shoulder while they write.": "Zum Beispiel: „Danke für Ihren Besuch heute. Wenn Sie einen Moment Zeit haben, würden wir uns über eine ehrliche Bewertung Ihres Erlebnisses freuen.“ Dann machen Sie eine Pause. Bitten Sie nicht um fünf Sterne, bieten Sie keine Belohnung an und schauen Sie niemandem beim Schreiben über die Schulter.",
    "Use one direct review link or a clearly labelled QR code. Put it on a small card, a receipt or a follow-up message so the customer can choose when to use it. Explain what it opens; a plain “Share your experience” label is more helpful than a mysterious code.": "Nutzen Sie einen direkten Bewertungslink oder einen klar beschrifteten QR-Code. Drucken Sie ihn auf eine kleine Karte, den Kassenbon oder fügen Sie ihn in eine Nachricht ein, damit Kunden selbst entscheiden können, wann sie ihn nutzen. Erklären Sie, was sich öffnet; ein schlichtes „Teilen Sie Ihr Erlebnis“ hilft mehr als ein rätselhafter Code.",
    "Test the link on a phone before sharing it. Check that it opens the correct business profile and doesn’t send people through unnecessary steps. If someone prefers not to scan, offer a short link instead. Keep the request to one destination, not a list of platforms.": "Testen Sie den Link auf einem Smartphone, bevor Sie ihn teilen. Prüfen Sie, ob er das richtige Unternehmensprofil öffnet und keine unnötigen Zwischenschritte enthält. Wer nicht scannen möchte, bekommt einen kurzen Link. Nennen Sie ein einziges Ziel, keine Liste von Plattformen.",
    "A review is the customer’s story, not a script you control. Welcome thoughtful criticism as well as praise. Don’t route only happy customers to public reviews or make a positive survey answer a condition for seeing the review link.": "Eine Bewertung ist die Geschichte der Kunden, kein Skript, das Sie steuern. Begrüßen Sie konstruktive Kritik genauso wie Lob. Leiten Sie nicht nur zufriedene Kunden zu öffentlichen Bewertungen weiter und machen Sie eine positive Umfrageantwort nicht zur Bedingung für den Bewertungslink.",
    "If someone mentions a problem, listen and help without making a review part of the resolution. For sensitive services such as dental care, remind people not to share private health information. When replying publicly, never confirm personal details they have disclosed.": "Wenn jemand ein Problem anspricht, hören Sie zu und helfen Sie – ohne eine Bewertung zum Teil der Lösung zu machen. Bei sensiblen Leistungen wie der Zahnmedizin erinnern Sie daran, keine privaten Gesundheitsdaten zu teilen. Bestätigen Sie in öffentlichen Antworten niemals persönliche Angaben, die jemand gemacht hat.",
    "Use these as starting points, not lines to memorise. Keep your usual tone and change the details to suit the visit.": "Nutzen Sie diese Sätze als Ausgangspunkt, nicht zum Auswendiglernen. Behalten Sie Ihren gewohnten Ton bei und passen Sie die Details an den Besuch an.",
    "At a café or shop": "Im Café oder Laden",
    "“Thanks for visiting us today. If you’d like to share your experience, you can leave a review using this QR code. We’d love to hear your thoughts.”": "„Danke für Ihren Besuch heute. Wenn Sie Ihr Erlebnis teilen möchten, können Sie über diesen QR-Code eine Bewertung abgeben. Wir freuen uns auf Ihre Meinung.“",
    "At a dental practice": "In der Zahnarztpraxis",
    "“Thank you for coming in. If you’d like to share feedback about your visit, the link is on this card. Please leave out any personal medical details.”": "„Danke für Ihren Besuch. Wenn Sie uns Feedback zu Ihrem Termin geben möchten, finden Sie den Link auf dieser Karte. Bitte lassen Sie persönliche medizinische Angaben weg.“",
    "In a follow-up message": "In einer Nachricht nach dem Besuch",
    "“Hi [first name], thank you for choosing [business]. If you have a moment, we’d appreciate your honest feedback about your visit: [review link]. Thank you for your time.”": "„Hallo [Vorname], danke, dass Sie sich für [Unternehmen] entschieden haben. Wenn Sie einen Moment Zeit haben, freuen wir uns über Ihr ehrliches Feedback zu Ihrem Besuch: [Bewertungslink]. Vielen Dank für Ihre Zeit.“",
    "If you use email or a message after the visit, send it only where you have an appropriate basis to contact the person. Keep it relevant, include a direct link and respect their communication preferences. A polite invitation is enough; repeated reminders can make an optional request feel like an obligation.": "Wenn Sie nach dem Besuch eine E-Mail oder Nachricht senden, tun Sie das nur, wenn Sie eine geeignete Grundlage für die Kontaktaufnahme haben. Halten Sie sie relevant, fügen Sie einen direkten Link ein und respektieren Sie die Kommunikationswünsche der Person. Eine höfliche Einladung genügt; wiederholte Erinnerungen lassen eine freiwillige Bitte wie eine Pflicht wirken.",
    "AI can help you shorten or clarify your invitation, but check the tone before sending. Don’t use it to invent customer experiences or publish reviews on someone’s behalf. The customer should always choose what to say and whether to share it.": "KI kann Ihnen helfen, Ihre Einladung zu kürzen oder klarer zu formulieren – prüfen Sie aber vor dem Senden den Ton. Nutzen Sie sie nicht, um Kundenerlebnisse zu erfinden oder Bewertungen im Namen anderer zu veröffentlichen. Die Kunden sollten immer selbst entscheiden, was sie sagen und ob sie es teilen.",
    "A thank-you, an honest invitation, one easy link.": "Ein Dankeschön, eine ehrliche Einladung, ein einfacher Link.",
    "That’s all you need to start. Pick one natural moment, practise a sentence that sounds like you and make the next step clear. Focus on making customers feel heard, not on collecting a particular rating.": "Mehr brauchen Sie für den Anfang nicht. Wählen Sie einen natürlichen Moment, üben Sie einen Satz, der nach Ihnen klingt, und machen Sie den nächsten Schritt klar. Konzentrieren Sie sich darauf, dass Kunden sich gehört fühlen – nicht auf eine bestimmte Bewertung.",
    "Frequently asked questions": "Häufig gestellte Fragen",
    "When is the best time to ask for a review?": "Wann ist der beste Zeitpunkt, um eine Bewertung zu bitten?",
    "Right after the service is complete and the customer has had a positive moment, such as at checkout, after a final check or once their questions have been answered. Avoid asking while they are in a hurry or still waiting for a problem to be fixed.": "Direkt nach Abschluss der Leistung, wenn die Kundin oder der Kunde einen positiven Moment erlebt hat – etwa beim Bezahlen, nach einer letzten Kontrolle oder wenn alle Fragen beantwortet sind. Fragen Sie nicht, wenn jemand in Eile ist oder noch auf die Lösung eines Problems wartet.",
    "Can I offer a discount or gift in exchange for a review?": "Darf ich einen Rabatt oder ein Geschenk für eine Bewertung anbieten?",
    "No. Rewards for reviews can bias what people write and break the rules of most review platforms, including Google. Thank customers for their time instead and keep the request optional.": "Nein. Belohnungen für Bewertungen können beeinflussen, was Menschen schreiben, und verstoßen gegen die Regeln der meisten Bewertungsplattformen, auch von Google. Bedanken Sie sich stattdessen für die Zeit Ihrer Kunden und halten Sie die Bitte freiwillig.",
    "Should I only ask customers who seem happy?": "Sollte ich nur Kunden fragen, die zufrieden wirken?",
    "No. Offer the same invitation to customers generally. Sending only satisfied customers to public reviews, or filtering people out with a survey first, is known as review gating and isn’t allowed on most platforms.": "Nein. Laden Sie alle Kunden gleichermaßen ein. Nur zufriedene Kunden zu öffentlichen Bewertungen zu leiten oder vorher per Umfrage auszusortieren, nennt man Review Gating – und das ist auf den meisten Plattformen nicht erlaubt.",
    "What should I do if a customer leaves a negative review?": "Was tue ich, wenn ein Kunde eine negative Bewertung hinterlässt?",
    "Reply calmly and politely, thank them for the feedback and offer to continue the conversation privately. Don’t confirm personal details, and focus on fixing the issue rather than winning the argument.": "Antworten Sie ruhig und höflich, bedanken Sie sich für das Feedback und bieten Sie an, das Gespräch privat fortzusetzen. Bestätigen Sie keine persönlichen Angaben und konzentrieren Sie sich darauf, das Problem zu lösen, statt recht zu behalten.",
    "How many times can I remind someone to leave a review?": "Wie oft darf ich an eine Bewertung erinnern?",
    "One polite follow-up is usually enough. Repeated reminders turn an optional request into pressure, so respect people’s communication preferences and let them decide.": "Eine höfliche Erinnerung reicht in der Regel. Wiederholte Erinnerungen machen aus einer freiwilligen Bitte Druck – respektieren Sie also die Kommunikationswünsche und lassen Sie die Menschen selbst entscheiden.",
    "Is it okay to use AI to write review requests?": "Darf ich KI nutzen, um Bewertungsanfragen zu schreiben?",
    "Yes, AI can help you shorten or clarify your invitation. Check the tone before sending, and never use it to invent customer experiences or post reviews on someone’s behalf.": "Ja, KI kann Ihnen helfen, Ihre Einladung zu kürzen oder klarer zu formulieren. Prüfen Sie vor dem Senden den Ton und nutzen Sie sie niemals, um Kundenerlebnisse zu erfinden oder Bewertungen im Namen anderer zu veröffentlichen.",
    "Useful for your team? Pass it on.": "Nützlich für Ihr Team? Teilen Sie es.",
    "Share on Facebook": "Auf Facebook teilen",
    "Copy link to share on Instagram": "Link kopieren, um ihn auf Instagram zu teilen",
    "Share on LinkedIn": "Auf LinkedIn teilen",

    "h1|Terms and": "Allgemeine",
    "h1|Conditions": "Geschäftsbedingungen",
    "Last updated: November 5, 2026": "Zuletzt aktualisiert: 5. November 2026",
    "1. Scope": "1. Geltungsbereich",
    "These Terms and Conditions govern the use of the LokalSterne website and services (the “Service”). By creating an account, ordering a plan or using the Service, you agree to these terms. If you use the Service on behalf of a business, you confirm that you are authorised to accept these terms for that business.": "Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der Website und der Dienste von LokalSterne (der „Dienst“). Indem Sie ein Konto erstellen, einen Tarif bestellen oder den Dienst nutzen, stimmen Sie diesen Bedingungen zu. Wenn Sie den Dienst im Namen eines Unternehmens nutzen, bestätigen Sie, dass Sie berechtigt sind, diese Bedingungen für dieses Unternehmen anzunehmen.",
    "2. The Service": "2. Der Dienst",
    "LokalSterne helps businesses collect customer feedback and invite customers to leave reviews on platforms such as Google and Trustpilot, for example through QR codes, questionnaires and review links.": "LokalSterne hilft Unternehmen, Kundenfeedback zu sammeln und Kunden zu Bewertungen auf Plattformen wie Google und Trustpilot einzuladen, zum Beispiel über QR-Codes, Fragebögen und Bewertungslinks.",
    "We may improve, change or extend features of the Service at any time, provided that the essential functions of your plan remain available.": "Wir können Funktionen des Dienstes jederzeit verbessern, ändern oder erweitern, sofern die wesentlichen Funktionen Ihres Tarifs erhalten bleiben.",
    "3. Account and plans": "3. Konto und Tarife",
    "You are responsible for keeping your login details confidential and for all activity in your account. The scope, price and term of each plan are shown on the pricing page at the time of ordering.": "Sie sind dafür verantwortlich, Ihre Zugangsdaten vertraulich zu behandeln, und für alle Aktivitäten in Ihrem Konto. Umfang, Preis und Laufzeit der Tarife werden zum Zeitpunkt der Bestellung auf der Preisseite angezeigt.",
    "Unless stated otherwise, plans renew automatically for the same term and can be cancelled at any time with effect from the end of the current billing period.": "Sofern nicht anders angegeben, verlängern sich Tarife automatisch um dieselbe Laufzeit und können jederzeit zum Ende des laufenden Abrechnungszeitraums gekündigt werden.",
    "4. Fair use and review guidelines": "4. Faire Nutzung und Bewertungsrichtlinien",
    "You agree to use the Service lawfully and in line with the guidelines of the review platforms you use. In particular, you must not buy, fake or incentivise reviews, filter customers so that only satisfied customers are asked for a review where this is prohibited, or post reviews on behalf of customers.": "Sie verpflichten sich, den Dienst rechtmäßig und im Einklang mit den Richtlinien der von Ihnen genutzten Bewertungsplattformen zu verwenden. Insbesondere dürfen Sie keine Bewertungen kaufen, fälschen oder durch Anreize beeinflussen, Kunden nicht so filtern, dass nur zufriedene Kunden um eine Bewertung gebeten werden, wo dies verboten ist, und keine Bewertungen im Namen von Kunden veröffentlichen.",
    "We may suspend accounts that seriously or repeatedly breach these rules.": "Wir können Konten sperren, die schwerwiegend oder wiederholt gegen diese Regeln verstoßen.",
    "5. Payment": "5. Zahlung",
    "Fees are payable in advance for each billing period. All prices are stated in euros. If a payment fails, we may restrict access to the Service until the outstanding amount has been paid.": "Die Gebühren sind für jeden Abrechnungszeitraum im Voraus zu zahlen. Alle Preise sind in Euro angegeben. Schlägt eine Zahlung fehl, können wir den Zugang zum Dienst einschränken, bis der offene Betrag beglichen ist.",
    "6. Liability": "6. Haftung",
    "We are liable without limitation for intent and gross negligence. For slight negligence, we are only liable for breaches of essential contractual obligations and limited to the foreseeable damage typical for this type of contract. We are not responsible for decisions taken by third-party review platforms, such as removing or not publishing a review.": "Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit haften wir nur für die Verletzung wesentlicher Vertragspflichten und begrenzt auf den vorhersehbaren, vertragstypischen Schaden. Für Entscheidungen von Bewertungsplattformen Dritter, etwa das Entfernen oder Nichtveröffentlichen einer Bewertung, sind wir nicht verantwortlich.",
    "7. Term and termination": "7. Laufzeit und Kündigung",
    "Either party may terminate the contract with effect from the end of the current billing period. The right to terminate for good cause remains unaffected. After termination, we delete your account data in accordance with our Privacy Policy.": "Jede Partei kann den Vertrag zum Ende des laufenden Abrechnungszeitraums kündigen. Das Recht zur Kündigung aus wichtigem Grund bleibt unberührt. Nach der Kündigung löschen wir Ihre Kontodaten gemäß unserer Datenschutzerklärung.",
    "8. Changes to these terms": "8. Änderungen dieser Bedingungen",
    "We may update these terms from time to time. We will inform you about material changes in advance by email. If you continue to use the Service after the changes take effect, the updated terms apply.": "Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Über wesentliche Änderungen informieren wir Sie vorab per E-Mail. Wenn Sie den Dienst nach Inkrafttreten der Änderungen weiter nutzen, gelten die aktualisierten Bedingungen.",
    "9. Contact": "9. Kontakt",
    "If you have any questions about these terms, please use the": "Bei Fragen zu diesen Bedingungen nutzen Sie bitte das",
    "contact form": "Kontaktformular",

    "h1|Privacy": "",
    "h1|Policy": "Datenschutzerklärung",
    "1. Who we are": "1. Wer wir sind",
    "This Privacy Policy explains how LokalSterne (“we”, “us”) processes personal data when you visit our website, contact us or use our services. We process personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable national data protection law.": "Diese Datenschutzerklärung erläutert, wie LokalSterne („wir“, „uns“) personenbezogene Daten verarbeitet, wenn Sie unsere Website besuchen, uns kontaktieren oder unsere Dienste nutzen. Wir verarbeiten personenbezogene Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) und dem geltenden nationalen Datenschutzrecht.",
    "2. Data we collect": "2. Welche Daten wir erheben",
    "When you visit our website, our hosting provider automatically processes technical data such as your IP address, browser type, date and time of access and the pages you visit. This is necessary to deliver the website securely (Art. 6(1)(f) GDPR).": "Wenn Sie unsere Website besuchen, verarbeitet unser Hosting-Anbieter automatisch technische Daten wie Ihre IP-Adresse, den Browsertyp, Datum und Uhrzeit des Zugriffs sowie die besuchten Seiten. Dies ist erforderlich, um die Website sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).",
    "When you use the contact form, we process your name, phone number, email address and message in order to answer your request (Art. 6(1)(b) and (f) GDPR).": "Wenn Sie das Kontaktformular nutzen, verarbeiten wir Ihren Namen, Ihre Telefonnummer, Ihre E-Mail-Adresse und Ihre Nachricht, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b und f DSGVO).",
    "When you use our services, we process the account, billing and usage data required to provide the services you have ordered (Art. 6(1)(b) GDPR).": "Wenn Sie unsere Dienste nutzen, verarbeiten wir die Konto-, Abrechnungs- und Nutzungsdaten, die zur Erbringung der bestellten Dienste erforderlich sind (Art. 6 Abs. 1 lit. b DSGVO).",
    "3. Customer feedback": "3. Kundenfeedback",
    "Businesses use LokalSterne to collect feedback from their customers. For this feedback, the business is the controller and we process the data on its behalf under a data processing agreement. Customers who submit feedback should contact the relevant business to exercise their rights.": "Unternehmen nutzen LokalSterne, um Feedback ihrer Kunden zu sammeln. Für dieses Feedback ist das jeweilige Unternehmen Verantwortlicher; wir verarbeiten die Daten in dessen Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags. Kunden, die Feedback abgeben, wenden sich zur Ausübung ihrer Rechte bitte an das betreffende Unternehmen.",
    "4. Sharing of data": "4. Weitergabe von Daten",
    "We only share personal data with service providers that help us run our website and services, such as hosting, email and payment providers. They are bound by data processing agreements and may only use the data on our instructions. We do not sell personal data.": "Wir geben personenbezogene Daten nur an Dienstleister weiter, die uns beim Betrieb unserer Website und Dienste unterstützen, etwa Hosting-, E-Mail- und Zahlungsanbieter. Sie sind durch Auftragsverarbeitungsverträge gebunden und dürfen die Daten nur nach unserer Weisung verwenden. Wir verkaufen keine personenbezogenen Daten.",
    "5. Storage period": "5. Speicherdauer",
    "We keep personal data only as long as it is needed for the purposes described above or as required by statutory retention obligations. Contact requests are deleted once they have been fully handled, unless a longer retention period is required by law.": "Wir speichern personenbezogene Daten nur so lange, wie es für die oben genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten es verlangen. Kontaktanfragen werden gelöscht, sobald sie vollständig bearbeitet sind, sofern keine längere gesetzliche Aufbewahrungsfrist besteht.",
    "6. Cookies": "6. Cookies",
    "Our website only uses technically necessary cookies and similar technologies. If we introduce analytics or marketing tools in the future, we will ask for your consent beforehand.": "Unsere Website verwendet ausschließlich technisch notwendige Cookies und ähnliche Technologien. Sollten wir künftig Analyse- oder Marketing-Tools einsetzen, holen wir vorher Ihre Einwilligung ein.",
    "7. Your rights": "7. Ihre Rechte",
    "You have the right to access, rectify and erase your personal data, to restrict or object to its processing and to data portability. Where processing is based on your consent, you can withdraw it at any time with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority.": "Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten, auf Einschränkung der Verarbeitung, auf Widerspruch gegen die Verarbeitung sowie auf Datenübertragbarkeit. Beruht die Verarbeitung auf Ihrer Einwilligung, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.",
    "8. Contact": "8. Kontakt",
    "To exercise your rights or if you have any questions about data protection, please use the": "Um Ihre Rechte auszuüben oder bei Fragen zum Datenschutz nutzen Sie bitte das",

    "404: This page could not be found.": "404: Diese Seite wurde nicht gefunden.",
    "This page could not be found.": "Diese Seite wurde nicht gefunden.",

    "LokalSterne on Instagram": "LokalSterne auf Instagram",
    "LokalSterne on LinkedIn": "LokalSterne auf LinkedIn",
    "LokalSterne on Facebook": "LokalSterne auf Facebook",
    "Company": "Unternehmen",
    "About": "Über uns",
    "Knowledge": "Wissen",
    "FAQ": "FAQ",
    "Articles": "Artikel",
    "Information": "Informationen",
    "Terms and Conditions": "AGB",
    "Privacy": "Datenschutz",

    "Close": "Schließen",
    "15 min meeting": "15-Minuten-Termin",
    "30m": "30 Min.",
    "Time zone": "Zeitzone",
    "Time format": "Zeitformat",
    "Europe · Berlin": "Europa · Berlin",
    "Europe · Kyiv": "Europa · Kyjiw",
    "Europe · Madrid": "Europa · Madrid",
    "Europe · London": "Europa · London",
    "Europe · Warsaw": "Europa · Warschau",
    "Europe/Berlin": "Europa/Berlin",
    "Europe/Kyiv": "Europa/Kyjiw",
    "Europe/Madrid": "Europa/Madrid",
    "Europe/London": "Europa/London",
    "Europe/Warsaw": "Europa/Warschau",
    "View previous month": "Vorheriger Monat",
    "View next month": "Nächster Monat",
    "Sun": "So",
    "Mon": "Mo",
    "Tue": "Di",
    "Wed": "Mi",
    "Thu": "Do",
    "Fri": "Fr",
    "Sat": "Sa",
    "Your name *": "Ihr Name *",
    "Phone number *": "Telefonnummer *",
    "Email": "E-Mail",
    "Business name": "Name des Unternehmens",
    "Back": "Zurück",
    "Confirm callback": "Rückruf bestätigen",
    "We’ll call you back": "Wir rufen Sie zurück",

    "Contact form": "Kontaktformular",
    "Name *": "Name *",
    "Phone *": "Telefon *",
    "E-Mail-Adresse *": "E-Mail-Adresse *",
    "Message": "Nachricht",
    "I declare that I have read the": "Ich erkläre, dass ich die",
    "terms and conditions": "Allgemeinen Geschäftsbedingungen",
    "and accept their provisions.": "gelesen habe und ihre Bestimmungen akzeptiere.",
    "Send": "Senden",
    "Thank you": "Vielen Dank",
    "Thank you! Your message has been sent. We will get back to you soon.": "Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns in Kürze bei Ihnen.",
    "Something went wrong. Please try again.": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
  };
  /*END*/

  var MONTHS = {
    January: 'Januar', February: 'Februar', March: 'März', April: 'April', May: 'Mai', June: 'Juni',
    July: 'Juli', August: 'August', September: 'September', October: 'Oktober', November: 'November', December: 'Dezember'
  };
  var WEEKDAYS = {
    Monday: 'Montag', Tuesday: 'Dienstag', Wednesday: 'Mittwoch', Thursday: 'Donnerstag',
    Friday: 'Freitag', Saturday: 'Samstag', Sunday: 'Sonntag'
  };
  var M = Object.keys(MONTHS).join('|');
  var W = Object.keys(WEEKDAYS).join('|');
  // "Wednesday, 12 November 2026", "Wednesday 12 November", "12 November 2026"
  var DATE_RE = new RegExp('^(?:(' + W + '),? )?(\\d{1,2}) (' + M + ')(?: (\\d{4}))?$');
  var STEP_RE = /^Step (\d+) of (\d+)$/;

  // Text that is not in the dictionary but follows a known pattern
  function pattern(s) {
    var m = STEP_RE.exec(s);
    if (m) return 'Schritt ' + m[1] + ' von ' + m[2];
    m = DATE_RE.exec(s);
    if (m) return (m[1] ? WEEKDAYS[m[1]] + ', ' : '') + m[2] + '. ' + MONTHS[m[3]] + (m[4] ? ' ' + m[4] : '');
    if (MONTHS[s]) return MONTHS[s];
    if (WEEKDAYS[s]) return WEEKDAYS[s];
    return null;
  }

  function lookup(key, el) {
    if (!key) return null;
    if (el && el.closest && el.closest('h1') && ('h1|' + key) in DE) return DE['h1|' + key];
    if (key in DE) return DE[key];
    return pattern(key);
  }

  var lang = 'en';
  var textOrig = new WeakMap(); // text node -> English text
  var textSet = new WeakMap();  // text node -> text we last wrote
  var attrState = new WeakMap(); // element -> { attr: { orig, set } }

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function skip(el) {
    return !el || el.closest('script, style, noscript, .ls-lang, [data-no-i18n]');
  }

  function doText(node) {
    var cur = node.nodeValue;
    if (textSet.get(node) !== cur) textOrig.set(node, cur); // new or changed by someone else
    var orig = textOrig.get(node);
    if (orig == null || !/[A-Za-z]/.test(orig)) return;
    var parent = node.parentElement;
    if (skip(parent)) return;
    var next = orig;
    if (lang === 'de') {
      var t = lookup(norm(orig), parent);
      if (t == null) return restore();
      var lead = orig.match(/^\s*/)[0];
      var trail = orig.match(/\s*$/)[0];
      next = lead + t + trail;
    }
    if (next !== cur) { textSet.set(node, next); node.nodeValue = next; }
    else textSet.set(node, cur);
    function restore() { if (cur !== orig) { textSet.set(node, orig); node.nodeValue = orig; } }
  }

  function doAttrs(el) {
    if (skip(el)) return;
    var state = attrState.get(el);
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      if (!state) { state = {}; attrState.set(el, state); }
      var s = state[a] || (state[a] = {});
      if (s.set !== cur) s.orig = cur;
      var next = s.orig;
      if (lang === 'de') {
        var t = lookup(norm(s.orig), el);
        if (t != null) next = t;
      }
      s.set = next;
      if (next !== cur) el.setAttribute(a, next);
    }
  }

  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    doAttrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) doText(n);
      else doAttrs(n);
    }
  }

  var titleOrig = null;
  function doTitle() {
    var cur = document.title;
    if (cur !== doTitle.set) titleOrig = cur;
    var next = lang === 'de' ? (lookup(norm(titleOrig)) || titleOrig) : titleOrig;
    doTitle.set = next;
    if (next !== cur) document.title = next;
  }

  /* ---------- switcher ---------- */

  function switcher(mod) {
    var el = document.createElement('div');
    el.className = 'ls-lang ls-lang--' + mod;
    el.setAttribute('role', 'group');
    el.innerHTML =
      '<button type="button" data-lang="en" lang="en" aria-label="English">EN</button>' +
      '<button type="button" data-lang="de" lang="de" aria-label="Deutsch">DE</button>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) setLang(b.getAttribute('data-lang'), true);
    });
    return el;
  }

  function syncSwitchers() {
    var groups = document.querySelectorAll('.ls-lang');
    for (var i = 0; i < groups.length; i++) {
      groups[i].setAttribute('aria-label', lang === 'de' ? 'Sprache' : 'Language');
      var bs = groups[i].querySelectorAll('button');
      for (var j = 0; j < bs.length; j++) {
        bs[j].setAttribute('aria-pressed', String(bs[j].getAttribute('data-lang') === lang));
      }
    }
  }

  function mountSwitchers() {
    var header = document.querySelector('header');
    if (!header) return;
    var bar = header.firstElementChild;
    if (!bar) return;
    var burger = bar.querySelector(':scope > button[aria-controls="mobile-menu"]');
    // the desktop button group ("Contact us" / "Request a callback")
    var right = burger && bar.querySelector(':scope > div[class*="lg:flex"]:not(.ls-lang)');
    var changed = false;
    if (right && !right.querySelector('.ls-lang')) {
      right.appendChild(switcher('desktop'));
      changed = true;
    }
    if (burger && !bar.querySelector(':scope > .ls-lang')) {
      bar.insertBefore(switcher('mobile'), burger);
      changed = true;
    }
    if (changed) syncSwitchers();
  }

  /* ---------- state ---------- */

  function setLang(next, save) {
    if (next !== 'de') next = 'en';
    lang = next;
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked */ }
    }
    document.documentElement.lang = lang;
    walk(document.body);
    doTitle();
    syncSwitchers();
  }

  function initialLang() {
    var q = /[?&]lang=(en|de)\b/.exec(location.search);
    if (q) {
      try { localStorage.setItem(STORAGE_KEY, q[1]); } catch (e) { /* storage blocked */ }
      return q[1];
    }
    try { return localStorage.getItem(STORAGE_KEY) === 'de' ? 'de' : 'en'; } catch (e) { return 'en'; }
  }

  function observe() {
    var mo = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        if (r.type === 'characterData') doText(r.target);
        else if (r.type === 'attributes') doAttrs(r.target);
        else {
          for (var j = 0; j < r.addedNodes.length; j++) walk(r.addedNodes[j]);
        }
      }
      mountSwitchers();
      if (document.title !== doTitle.set) doTitle();
    });
    mo.observe(document.body, {
      subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
    var title = document.querySelector('title');
    if (title) {
      new MutationObserver(doTitle).observe(title, { childList: true, characterData: true, subtree: true });
    }
  }

  // React must finish hydrating before we touch its DOM, otherwise it sees a
  // mismatch and re-renders the page. Hydrated nodes get a __reactFiber key.
  function hydrated() {
    var el = document.querySelector('header') || document.body.firstElementChild;
    if (!el) return true;
    for (var k in el) if (k.indexOf('__reactFiber') === 0) return true;
    return false;
  }

  function start() {
    mountSwitchers();
    setLang(initialLang(), false);
    observe();
    document.documentElement.classList.remove('i18n-wait');
  }

  var t0 = Date.now();
  (function wait() {
    if (hydrated() || Date.now() - t0 > 4000) start();
    else setTimeout(wait, 30);
  })();
})();
