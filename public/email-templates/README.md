# Email design concepts

Ten fictional brands created for the portfolio's Email Templates gallery. These are original concepts, not commissioned client work. Each `*.html` is editable; `*-preview.webp` is its full-page browser rendering at 600 CSS px, 2x.

Every brand has its own layout and type pairing, so they read as different emails rather than one template in different colours:

| Brand | Industry | Direction | Type |
| --- | --- | --- | --- |
| Waggle | Pet shop | Playful welcome: cut-out pets on colour blocks, scalloped edges, welcome code, product cards, polaroid wall, rescue donation | Titan One, Nunito |
| Still | Wellness app | First-week onboarding: weekly plan, sessions, an in-app reminder screen built in HTML | Manrope |
| Pennant | Fintech | Monthly money summary: stats card, savings goal, category bars, largest payments | Geist, Geist Mono |
| FORM | Activewear | Brutalist sports poster, marquee, tech sheet | Anton, Inter |
| AURE | Skincare | Quiet apothecary catalogue: straight product photography and a spec table | Hanken Grotesk |
| Halden Health | Healthcare | Appointment confirmation: visit card, doctor, preparation steps, access details | Source Serif 4, Source Sans 3 |
| Offday | Apparel | Y2K zine with stickers, checkerboard, a receipt for a weekend with no plans | Bricolage Grotesque, Space Mono |
| Fairhaven Row | Real estate | Residential launch: architectural photography, key facts, price table, drawn floor plan | Archivo, Archivo Narrow |
| Sunday Table | Food | Supper-club invitation and printed menu inside a framed card | Fraunces, Inter |
| Fieldwork | Farm to door | Farm almanac with seed-packet cards, rubber stamp offer, harvest calendar | Zilla Slab, IBM Plex Mono |

Rebuild markup with `python3 scripts/build-email-templates.py` from the project root. Regenerate the browser captures after changing markup and update their heights in `src/data/emailTemplates.ts`.

These are portfolio concepts, not a validated email sending package. Web fonts, rotated stickers, border-radius and background images fall back to system fonts and flat colour in clients that don't support them. Before sending: replace example.com links, configure unsubscribe and preference URLs and sender details, host images at absolute URLs, choose email-client-compatible image formats (JPEG/PNG), add VML fallbacks for background images in Outlook, and test in your target email clients. No emails were sent.

Every brand, person, address, phone number, price and figure is fictional. Pennant's numbers are internally consistent (money in minus money out equals savings; the category bars sum to money out) so the design can be read as a real statement.

## Images

The first FORM, Offday, Sunday Table and Fieldwork images came from the built-in image generation tool. Later images were generated with Nano Banana 2 (FORM, Offday, Sunday Table and Fieldwork supporting shots) or Nano Banana Pro (Still, AURE, Halden Health, Fairhaven Row, Pennant), then cropped and converted to WebP. `supper-plate.webp` is a circular crop of `supper.webp`. `fairhaven-plan.webp` is drawn with Pillow, not generated, so its dimensions and labels are exact.

### waggle

Generated with Nano Banana Pro, then composited with Pillow onto the exact section colours. The bulldog, cat and retriever had their backgrounds removed first. The scalloped edges are drawn, not generated.

- `waggle-hero.webp`: Studio pet portrait of a fawn French bulldog puppy tilting its head, tongue slightly out, in a knitted teal bandana, isolated on white. Placed on coral over a lighter disc.
- `waggle-cat.webp`: A ginger tabby cat peeking in from the side with its paws up, isolated on white. Trimmed so its cut edge meets the email's left edge.
- `waggle-retriever.webp`: A golden retriever leaping to catch a bright pink rubber ball, isolated on white. Placed on sunshine yellow.
- `waggle-treats.webp`, `waggle-bowl.webp`, `waggle-rope.webp`: E-commerce product shots on light warm grey: a kraft treat pouch with a coral paw-print label and no text, a coral ceramic bowl with an embossed paw, a teal and cream braided rope toy.
- `waggle-pack.webp`: Three candid photos in white polaroid frames: a woman laughing while hugging a corgi, a bearded man holding a grey tabby cat, a girl with a samoyed puppy licking her cheek.
- `waggle-rescue.webp`: A smiling shelter volunteer hugging a scruffy brown rescue dog in a shelter yard, in a polaroid frame on coral.

### still

- `still-dawn.webp`: Candid documentary photograph, 35mm film look with fine grain: an adult woman in her 30s in a plain grey t-shirt sitting cross-legged on an unmade bed at dawn, eyes closed, soft cool window light, lived-in apartment, muted natural colours.
- `still-fog.webp`: Early morning fog over a still lake with a faint line of pine trees, desaturated blue-grey tones, real photograph, film grain.
- `still-rain.webp`: Raindrops on a window pane at night with soft out-of-focus warm city lights behind, muted, film grain.
- `still-linen.webp`: Sheer white linen curtains moving in a breeze with soft afternoon sunlight behind, warm neutral tones.

### pennant

- `pennant-morning.webp`: Candid lifestyle photograph of a man in his early 30s in a knit sweater at a wooden kitchen table in the morning, looking at his phone with a relaxed half smile, coffee beside him, natural window light, film grain. Screen not visible.
- `pennant-tap.webp`: A hand tapping a plain dark green payment card with no printing on a café card reader, soft daylight, shallow depth of field.

### form

- `form.webp`: Fashion campaign photograph for fictional activewear brand FORM. Three adult female athletes in espresso, terracotta and sand sports bras and leggings in a sunlit brutalist studio. Portrait 4:5.
- `form-sprint.webp`: An adult female athlete mid-sprint in espresso and terracotta activewear against a flat terracotta studio wall, hard direct flash, crisp shadow.
- `form-fabric.webp`: Extreme close-up of matte espresso performance legging fabric stretched over a knee, visible knit texture and seam, warm raking side light.

### aure

- `aure-bottles.webp`: Clean catalogue product photograph, straight-on: a tall matte ivory ceramic pump bottle and a small ivory jar on a plain warm light-grey paper sweep, soft even diffused light. Label reads only "AURE" and "DAILY MILK · 200 ML".
- `aure-texture.webp`: Top-down catalogue photograph of a flat swatch of thick ivory body cream on plain warm grey paper, soft even daylight.
- `aure-ingredients.webp`: Top-down documentary photograph of rolled oats, a chunk of raw shea butter and a small glass dish of oil on unbleached linen, window daylight.
- `aure-hands.webp`: Candid close-up of hands rubbing a little white cream together over a white bathroom sink, overcast window light, real skin texture.

### halden

- `halden-doctor.webp`: Environmental portrait of an approachable female family physician in her 50s with short grey hair, navy cardigan over a light blue shirt, stethoscope, in a bright clinic corridor.
- `halden-clinic.webp`: Architectural interior of a calm primary care clinic waiting area: light oak, white walls, sage upholstered chairs, large daylight window, a plant, no people, no signage.

### offday

- `offday.webp`: Casual clothing campaign for fictional brand OFFDAY. Two adults smiling in oversized butter-yellow and cream cotton tees and jeans on a cobalt seamless background. 3:2.
- `offday-flatlay.webp`: Overhead flat lay on saturated cobalt: folded butter and cream tees, retro sunglasses, iced coffee, a paperback, a houseplant leaf. Hard sunlight.
- `offday-sofa.webp`: A man lounging on a cobalt sofa under a butter-yellow throw in an oversized cream tee, eyes closed and smiling, a dog asleep at his feet.

### fairhaven

- `fairhaven-exterior.webp`: Architectural photograph at blue hour of a row of four contemporary three-storey townhouses in pale brick with tall black steel-framed windows, interior lights on, young street trees, corrected verticals.
- `fairhaven-interior.webp`: Open-plan townhouse living room and kitchen: pale oak floors, limestone island, white plaster, a tall black steel window onto a small garden, a low linen sofa, daylight.
- `fairhaven-stair.webp`: A floating oak staircase against white plaster with a slim black steel handrail and a slice of daylight across the treads.
- `fairhaven-square.webp`: Documentary street photograph of a leafy residential square with a small park, benches, plane trees and a corner café, soft morning light.

### supper

- `supper.webp`: Editorial food photograph for fictional supper club SUNDAY TABLE. Tomato rigatoni with basil and parmesan on an ivory plate on a terracotta tabletop, late-afternoon sun. Square.
- `supper-ingredients.webp`: Overhead raw ingredients on a paprika red table: vine tomatoes, garlic, basil, parmesan, dried rigatoni, olive oil and flaky salt.
- `supper-party.webp`: Candlelit dinner party on a long rustic table, friends passing pasta and pouring wine, cream linen, terracotta ceramics, taper candles.

### fieldwork

- `fieldwork.webp`: Farm-to-door campaign photograph for fictional brand FIELDWORK. A cheerful woman farmer in an ochre work shirt holding a wooden crate of carrots, beets, kale and radishes in a sunlit field. Portrait 4:5.
- `fieldwork-carrots.webp`, `fieldwork-beets.webp`, `fieldwork-tomatoes.webp`: Studio produce portraits in a graphic seed-catalogue style: carrots on ochre paper, beetroots (one halved) on olive, heirloom tomatoes (one cut open) on cream. Soft top light.
