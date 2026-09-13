"""Build the fictional portfolio email concepts.

Each brand gets its own layout grammar and type pairing on purpose. An earlier
version shared one set of helpers (label, centred headline, photo, three
columns, footer), and all six came out as the same email in different colours.
Only the document shell is shared here.

Table layout and inline styles, so the markup stays close to what email clients
accept. A few flourishes (web fonts, border-radius, rotated stickers,
background images) degrade to plain colour and system fonts where unsupported.
Replace example.com links before sending anything.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'public' / 'email-templates'
URL = 'https://example.com'

BASE_CSS = (
    'body{margin:0;padding:0;-webkit-text-size-adjust:100%;}'
    'img{display:block;border:0;outline:none;text-decoration:none;}'
    'table{border-collapse:collapse;}'
    'a:focus-visible{outline:3px solid currentColor;outline-offset:3px;}'
    '@media (max-width:480px){'
    '.col{display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;}'
    '.col img{width:100%!important;height:auto!important;}'
    '.pad{padding-left:22px!important;padding-right:22px!important;}'
    '.hide-m{display:none!important;}'
    # Absolute sizes: a percentage here would resolve against the parent, not the headline.
    '.m-hero{font-size:52px!important;letter-spacing:-1px!important;}'
    '.m-poster{font-size:110px!important;}'
    '.m-mast{font-size:54px!important;}'
    '.m-word{font-size:64px!important;}'
    '.m-aure{font-size:56px!important;letter-spacing:14px!important;text-indent:14px!important;}'
    '}'
)


def shell(name, title, preheader, bg, fonts, body):
    font_link = (
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        f'<link href="https://fonts.googleapis.com/css2?{fonts}&display=swap" rel="stylesheet">'
    )
    html = (
        '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">'
        '<meta name="color-scheme" content="light"><title>' + title + '</title>'
        + font_link + '<style>' + BASE_CSS + '</style></head>'
        '<body style="margin:0;padding:0;background:' + bg + ';">'
        '<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">' + preheader + '</div>'
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:' + bg + ';">'
        '<tr><td align="center" style="padding:0;">'
        '<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;table-layout:fixed;">'
        + body +
        '</table></td></tr></table></body></html>'
    )
    (OUT / f'{name}.html').write_text(html)


def T(inner, style=''):
    """A presentation table, since nearly every block needs one."""
    return f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="{style}">{inner}</table>'


# ---------------------------------------------------------------------------
# STILL: a sleep and meditation app's first-week email. Product-led rather than
# atmospheric: the week's plan, real sessions and the in-app reminder screen.
# One sans (Manrope), warm paper, ink and a single slate accent.
# ---------------------------------------------------------------------------
sans = "Inter,Arial,Helvetica,sans-serif"  # also used by later sections
manrope = "Manrope,'Helvetica Neue',Arial,sans-serif"
S_PAGE, S_CARD, S_INK, S_MUTED, S_LINE, S_ACCENT, S_TINT = '#f2f0eb', '#ffffff', '#1b1d1c', '#686d6a', '#e6e2da', '#33475b', '#edf0f2'


def still_day(day, title, length, kind, today=False):
    bg = f'background:{S_TINT};' if today else ''
    tag = (f'<span style="display:inline-block;margin-left:8px;padding:2px 8px;border-radius:999px;background:{S_ACCENT};color:#ffffff;'
           f'font-family:{manrope};font-size:10px;font-weight:700;vertical-align:2px;">Today</span>') if today else ''
    cell = f'padding:14px 16px;border-top:1px solid {S_LINE};{bg}'
    return (f'<tr><td width="54" valign="top" style="{cell}font-family:{manrope};font-size:11px;font-weight:700;letter-spacing:1px;color:{S_MUTED};padding-top:17px;">{day}</td>'
            f'<td valign="top" style="{cell}font-family:{manrope};font-size:15px;font-weight:600;color:{S_INK};">{title}{tag}'
            f'<div style="margin-top:2px;font-size:12px;font-weight:500;color:{S_MUTED};">{kind}</div></td>'
            f'<td align="right" valign="top" style="{cell}font-family:{manrope};font-size:13px;font-weight:600;color:{S_INK};white-space:nowrap;">{length}</td></tr>')


def still_sound(src, title, length, alt):
    return (f'<td class="col" width="33%" valign="top" style="padding:0 6px 16px;">'
            f'<img src="{src}" width="165" height="165" alt="{alt}" style="width:100%;height:auto;border-radius:10px;">'
            f'<div style="margin-top:10px;font-family:{manrope};font-size:14px;font-weight:600;color:{S_INK};">{title}</div>'
            f'<div style="margin-top:2px;font-family:{manrope};font-size:12px;color:{S_MUTED};">{length}</div></td>')


def still_pill(letter, on):
    tone = f'background:{S_ACCENT};color:#ffffff;' if on else f'background:{S_TINT};color:{S_MUTED};'
    return (f'<td align="center" style="padding:0 2px;"><div style="width:26px;height:26px;line-height:26px;border-radius:50%;{tone}'
            f'font-family:{manrope};font-size:11px;font-weight:700;text-align:center;">{letter}</div></td>')


# Padding, not a margin on the knob: a child's top margin collapses through the
# track and pushes the whole switch down, leaving the knob hanging off its edge.
still_toggle = (f'<div style="box-sizing:border-box;width:40px;height:24px;padding:3px;margin-left:auto;border-radius:999px;background:{S_ACCENT};">'
                '<div style="width:18px;height:18px;margin-left:16px;border-radius:50%;background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,.25);"></div></div>')
still_h2 = f'font-family:{manrope};font-size:20px;font-weight:700;letter-spacing:-.3px;color:{S_INK};'

still = ''.join([
    f'<tr><td class="pad" style="background:{S_PAGE};padding:28px 34px 20px;">' + T(
        f'<tr><td style="font-family:{manrope};font-size:20px;font-weight:700;letter-spacing:-.4px;color:{S_INK};">'
        f'<span style="display:inline-block;width:10px;height:10px;margin-right:8px;border-radius:50%;background:{S_ACCENT};vertical-align:1px;"></span>still</td>'
        f'<td align="right" style="font-family:{manrope};font-size:12px;font-weight:600;color:{S_MUTED};">Week 1 of 4</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{S_CARD};padding:44px 34px 36px;border-radius:16px 16px 0 0;">'
    f'<h1 style="margin:0;font-family:{manrope};font-weight:700;font-size:40px;line-height:1.1;letter-spacing:-1.2px;color:{S_INK};">Three minutes a day is enough to start.</h1>'
    f'<p style="margin:16px 0 26px;font-family:{manrope};font-size:16px;line-height:1.65;color:{S_MUTED};">Hi Maya, your plan is ready. We built it around the goal you chose, falling asleep faster, so the first week is short sessions you can do in bed.</p>'
    + T(f'<tr><td style="padding-right:18px;"><a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{S_ACCENT};color:#ffffff;padding:14px 22px;border-radius:10px;'
        f'font-family:{manrope};font-size:14px;font-weight:700;text-decoration:none;">Start today’s session</a></td>'
        f'<td style="font-family:{manrope};font-size:14px;font-weight:600;"><a href="{URL}" style="color:{S_ACCENT};">Adjust my plan</a></td></tr>', 'width:auto;')
    + '</td></tr>',

    '<tr><td style="background:#ffffff;padding:0;"><img src="still-dawn.webp" width="600" alt="A woman sitting cross-legged on an unmade bed at dawn with her eyes closed" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:{S_CARD};padding:40px 34px 12px;">'
    f'<p style="margin:0;{still_h2}">Your plan this week</p>'
    f'<p style="margin:6px 0 18px;font-family:{manrope};font-size:14px;color:{S_MUTED};">Five sessions. Skip a day and the plan simply moves forward.</p>'
    + T(still_day('MON', 'Arriving', '3 min', 'Breathing', True) + still_day('TUE', 'Body scan for sleep', '8 min', 'Sleep')
        + still_day('WED', 'Noticing thoughts', '5 min', 'Focus') + still_day('THU', 'Night rain', '20 min', 'Soundscape')
        + still_day('FRI', 'Letting the day go', '10 min', 'Sleep'), f'border-bottom:1px solid {S_LINE};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{S_CARD};padding:32px 28px 20px;">'
    f'<p style="margin:0 6px 16px;{still_h2}">Sleep sounds to try</p>'
    + T('<tr>' + still_sound('still-fog.webp', 'Lake at dawn', '12 min · Ambient', 'Fog over a still lake at dawn')
        + still_sound('still-rain.webp', 'Night rain', '45 min · Rain', 'Raindrops on a window at night')
        + still_sound('still-linen.webp', 'Open window', '20 min · Breeze', 'Sheer curtains moving in afternoon light') + '</tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{S_TINT};padding:40px 34px;">' + T(
        '<tr><td class="col" width="52%" valign="middle" style="padding-right:24px;">'
        f'<p style="margin:0;font-family:{manrope};font-size:22px;font-weight:700;line-height:1.25;letter-spacing:-.4px;color:{S_INK};">Pick a time. We’ll handle the nudge.</p>'
        f'<p style="margin:12px 0 0;font-family:{manrope};font-size:14px;line-height:1.65;color:{S_MUTED};">A gentle reminder 30 minutes before bed, only on the days you pick. Change it any time in Settings.</p></td>'
        '<td class="col" width="48%" valign="middle" style="padding-top:16px;">'
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border:1px solid {S_LINE};border-radius:20px;box-shadow:0 12px 30px rgba(27,29,28,.08);">'
        '<tr><td style="padding:20px 18px 18px;">'
        + T(f'<tr><td style="font-family:{manrope};font-size:13px;font-weight:700;color:{S_INK};">Wind-down reminder</td><td align="right">{still_toggle}</td></tr>')
        + f'<div style="margin:14px 0 2px;font-family:{manrope};font-size:40px;font-weight:700;letter-spacing:-1.5px;color:{S_INK};">22:30</div>'
        f'<div style="margin-bottom:14px;font-family:{manrope};font-size:12px;color:{S_MUTED};">30 min before your bedtime</div>'
        '<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>'
        + ''.join(still_pill(day, on) for day, on in [('M', 1), ('T', 1), ('W', 1), ('T', 1), ('F', 1), ('S', 0), ('S', 0)])
        + '</tr></table></td></tr></table></td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{S_CARD};padding:36px 34px 40px;border-radius:0 0 16px 16px;">'
    f'<p style="margin:0 0 6px;{still_h2}">Good to know</p>'
    + T(''.join(f'<tr><td style="padding:14px 0;border-bottom:1px solid {S_LINE};font-family:{manrope};font-size:14px;line-height:1.5;color:{S_INK};">'
                f'<strong style="font-weight:700;">{q}</strong> <span style="color:{S_MUTED};">{a}</span></td></tr>'
                for q, a in [('Missed a day?', 'Your plan shifts forward. There are no streaks to lose.'),
                             ('No headphones?', 'Every session works through your phone speaker.'),
                             ('Offline?', 'Download any session and listen without a connection.')]))
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{S_PAGE};padding:28px 34px 36px;">'
    + T(f'<tr><td valign="top" style="font-family:{manrope};font-size:12px;line-height:1.7;color:{S_MUTED};">Still for iOS and Android<br>'
        f'<a href="{URL}" style="color:{S_INK};font-weight:600;">App Store</a> &nbsp;·&nbsp; <a href="{URL}" style="color:{S_INK};font-weight:600;">Google Play</a></td>'
        f'<td align="right" valign="top" style="font-family:{manrope};font-size:12px;line-height:1.7;color:{S_MUTED};">'
        f'<a href="{URL}" style="color:inherit;">Email preferences</a><br><a href="{URL}" style="color:inherit;">Unsubscribe</a></td></tr>')
    + f'<p style="margin:18px 0 0;font-family:{manrope};font-size:11px;line-height:1.6;color:#8d918e;">You’re receiving this because you created a Still account. An independent email design concept.</p></td></tr>',
])
shell('still', 'Still | Your first week', 'Your plan is ready. Three minutes a day is enough to start.', S_PAGE,
      'family=Manrope:wght@400;500;600;700', still)


# ---------------------------------------------------------------------------
# FORM: a brutalist sports poster. Anton and Inter. Terracotta, black, sand.
# The hero band matches the photo's wall colour so headline and athlete read
# as one poster.
# ---------------------------------------------------------------------------
anton = "Anton,Impact,'Arial Narrow Bold',sans-serif"
TERRA, BLACK, SAND, CREAM = '#d55c32', '#141010', '#eadccb', '#fff6ed'


def spec(n, text):
    return (f'<tr><td style="padding:13px 0;border-top:1px solid #3a302c;">'
            f'<span style="font-family:{sans};font-size:10px;font-weight:800;color:{TERRA};letter-spacing:1px;">{n}</span>&nbsp;&nbsp;'
            f'<span style="font-family:{anton};font-size:25px;line-height:1;color:{CREAM};letter-spacing:.5px;">{text}</span></td></tr>')


marquee = ' '.join([f'15% OFF <span style="color:{TERRA};">&#10022;</span> FIRSTMOVE15 <span style="color:{TERRA};">&#10022;</span>'] * 5)

form = ''.join([
    f'<tr><td class="pad" style="background:{BLACK};padding:18px 28px;">' + T(
        f'<tr><td style="font-family:{anton};font-size:28px;line-height:1;color:{CREAM};letter-spacing:1px;">FORM<sup style="font-size:11px;">&reg;</sup></td>'
        f'<td align="right" style="font-family:{sans};font-size:10px;font-weight:800;letter-spacing:2px;color:{TERRA};">DROP 01 &nbsp;/&nbsp; MOVE. REST. REPEAT.</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{TERRA};padding:34px 28px 0;">'
    f'<p style="margin:0;font-family:{sans};font-size:10px;font-weight:800;letter-spacing:3px;color:{BLACK};">GOOD TO HAVE YOU HERE</p>'
    f'<h1 class="m-poster" style="margin:12px 0 0;font-family:{anton};font-weight:400;font-size:190px;line-height:.8;letter-spacing:-2px;color:{CREAM};">YOUR<br>PACE.</h1></td></tr>',

    '<tr><td style="padding:0;"><img src="form-sprint.webp" width="600" alt="An athlete in espresso and terracotta activewear sprinting against a terracotta wall under hard flash" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td style="background:{BLACK};padding:15px 0;"><div style="width:100%;max-width:600px;white-space:nowrap;overflow:hidden;font-family:{anton};font-size:24px;letter-spacing:1px;color:{CREAM};">{marquee}</div></td></tr>',

    f'<tr><td class="pad" style="background:{SAND};padding:48px 28px;">' + T(
        f'<tr><td class="col" width="50%" valign="middle" style="font-family:{anton};font-size:236px;line-height:.78;letter-spacing:-8px;color:{TERRA};">'
        '15<span style="font-size:92px;vertical-align:top;letter-spacing:0;">%</span></td>'
        '<td class="col" width="50%" valign="middle" style="padding-left:14px;">'
        f'<p style="margin:0;font-family:{sans};font-size:28px;line-height:1.02;font-weight:800;letter-spacing:-1px;color:{BLACK};">Your first move is on us.</p>'
        f'<p style="margin:12px 0 18px;font-family:{sans};font-size:14px;line-height:1.6;color:#54413a;">For the early starts, the last reps, and the days you just show up.</p>'
        + T(f'<tr><td style="background:{BLACK};color:{SAND};padding:11px 12px;font-family:{sans};font-size:9px;font-weight:800;letter-spacing:2px;">CODE</td>'
            f'<td style="padding:8px 14px;font-family:{anton};font-size:23px;letter-spacing:3px;color:{BLACK};">FIRSTMOVE15</td></tr>', f'border:2px solid {BLACK};')
        + f'<a href="{URL}" target="_blank" rel="noopener" style="display:block;margin-top:14px;padding:17px 0;text-align:center;background:{BLACK};color:{CREAM};'
        f'font-family:{sans};font-size:12px;font-weight:800;letter-spacing:2px;text-decoration:none;">FIND YOUR FORM &nbsp;&#8594;</a></td></tr>') + '</td></tr>',

    f'<tr><td style="background:{BLACK};padding:0;">' + T(
        '<tr><td class="col" width="300" valign="top"><img src="form-fabric.webp" width="300" height="300" alt="Close-up of espresso performance fabric stretched over a knee" style="width:300px;height:auto;"></td>'
        '<td class="col pad" width="300" valign="middle" style="padding:24px 28px;">'
        f'<p style="margin:0 0 10px;font-family:{sans};font-size:10px;font-weight:800;letter-spacing:2.5px;color:{TERRA};">TECH SHEET &nbsp;/&nbsp; 03</p>'
        + T(spec('01', 'STAY-PUT WAISTBAND') + spec('02', 'FOUR-WAY STRETCH') + spec('03', 'SQUAT-PROOF KNIT')) + '</td></tr>') + '</td></tr>',

    f'<tr><td valign="top" height="750" background="form.webp" style="height:750px;padding:28px;background-color:{BLACK};background-image:url(form.webp);background-size:cover;background-position:center;vertical-align:top;">'
    f'<span style="display:inline-block;background:{CREAM};color:{BLACK};font-family:{anton};font-size:66px;line-height:.88;padding:14px 18px 10px;">YOUR<br>PEOPLE.</span>'
    '<span style="display:block;width:1px;height:1px;overflow:hidden;">Three athletes in espresso, terracotta and sand activewear in a sunlit concrete studio.</span></td></tr>',

    f'<tr><td class="pad" style="background:{TERRA};padding:44px 28px;">'
    f'<p style="margin:0;font-family:{anton};font-size:58px;line-height:.9;color:{BLACK};">MOVEMENT LOOKS DIFFERENT ON EVERYONE.</p>'
    f'<p style="margin:18px 0 0;font-family:{sans};font-size:12px;font-weight:800;letter-spacing:2px;color:{CREAM};">TAG YOUR FIRST SESSION &nbsp;#FINDYOURFORM</p></td></tr>',

    f'<tr><td class="pad" style="background:{BLACK};padding:36px 28px 30px;">'
    f'<div class="m-poster" style="font-family:{anton};font-size:150px;line-height:.8;color:#2a2220;-webkit-text-stroke:1.5px {CREAM};letter-spacing:2px;">FORM&reg;</div>'
    + T(f'<tr><td style="padding-top:26px;font-family:{sans};font-size:10px;font-weight:800;letter-spacing:2px;color:{SAND};">'
        f'<a href="{URL}" style="color:inherit;text-decoration:none;">JOURNAL</a> &nbsp;/&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">INSTAGRAM</a> &nbsp;/&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">CONTACT</a></td>'
        f'<td align="right" style="padding-top:26px;font-family:{sans};font-size:10px;color:#9b8c83;">Concept email &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Unsubscribe</a></td></tr>')
    + '</td></tr>',
])
shell('form', 'FORM | Your pace. Your people.', 'Your first move is on us. 15% off, today.', BLACK,
      'family=Anton&family=Inter:wght@400;800', form)


# ---------------------------------------------------------------------------
# AURE: an apothecary product launch in the quiet catalogue register. One sans
# at small sizes, straight product photography and a spec table instead of
# adjectives. Hanken Grotesk.
# ---------------------------------------------------------------------------
hanken = "'Hanken Grotesk','Helvetica Neue',Arial,sans-serif"
A_PAPER, A_INK, A_MUTED, A_LINE, A_PANEL = '#efebe4', '#252320', '#6f6a61', '#d6d0c4', '#e6e1d8'


def aure_spec(label, value):
    return (f'<tr><td width="34%" valign="top" style="padding:13px 12px 13px 0;border-top:1px solid {A_LINE};font-family:{hanken};font-size:12px;color:{A_MUTED};">{label}</td>'
            f'<td valign="top" style="padding:13px 0;border-top:1px solid {A_LINE};font-family:{hanken};font-size:13px;line-height:1.55;color:{A_INK};">{value}</td></tr>')


def aure_plate(src, alt, label, text):
    return (f'<td class="col" width="50%" valign="top" style="padding:0 6px 20px;">'
            f'<img src="{src}" width="258" height="258" alt="{alt}" style="width:100%;height:auto;">'
            f'<p style="margin:12px 0 0;font-family:{hanken};font-size:12px;line-height:1.6;color:{A_INK};"><span style="color:{A_MUTED};">{label}</span><br>{text}</p></td>')


aure = ''.join([
    f'<tr><td class="pad" align="center" style="background:{A_PAPER};padding:30px 36px 0;">'
    f'<div style="font-family:{hanken};font-size:17px;font-weight:600;letter-spacing:7px;text-indent:7px;color:{A_INK};">AURE</div>'
    + T(f'<tr><td align="center" style="padding:14px 0;font-family:{hanken};font-size:12px;color:{A_INK};">'
        + ' &nbsp;&nbsp;&nbsp; '.join(f'<a href="{URL}" style="color:inherit;text-decoration:none;">{n}</a>' for n in ['Body', 'Hand', 'Face', 'Hair', 'Home'])
        + '</td></tr>', f'margin-top:16px;border-top:1px solid {A_LINE};border-bottom:1px solid {A_LINE};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{A_PAPER};padding:28px 36px 0;"><img src="aure-bottles.webp" width="528" alt="AURE Daily Milk pump bottle and jar on a plain grey backdrop" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:{A_PAPER};padding:40px 36px 8px;">' + T(
        f'<tr><td class="col" width="36%" valign="top" style="padding:6px 20px 16px 0;font-family:{hanken};font-size:12px;line-height:1.6;color:{A_MUTED};">New formulation<br>Body care</td>'
        '<td class="col" width="64%" valign="top">'
        f'<h1 style="margin:0;font-family:{hanken};font-weight:500;font-size:30px;line-height:1.2;letter-spacing:-.4px;color:{A_INK};">Daily Milk Body Cream</h1>'
        f'<p style="margin:14px 0 0;font-family:{hanken};font-size:15px;line-height:1.7;color:{A_INK};">A light cream for daily use after bathing. Colloidal oat and unrefined shea soften dry skin, and the finish stays soft rather than slick, so you can dress straight away.</p>'
        f'<p style="margin:18px 0 22px;font-family:{hanken};font-size:13px;color:{A_MUTED};">200 mL &nbsp;·&nbsp; $38</p>'
        f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{A_INK};color:{A_PAPER};padding:15px 26px;font-family:{hanken};font-size:13px;font-weight:500;text-decoration:none;">Discover Daily Milk</a>'
        '</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{A_PAPER};padding:36px 36px 44px;">' + T(
        aure_spec('Suits', 'Dry and normal skin, including sensitive')
        + aure_spec('Skin feel', 'Softened, comfortable, non-greasy')
        + aure_spec('Aroma', 'Faint and clean. Oat, with a trace of cedar')
        + aure_spec('Key ingredients', 'Colloidal oat, unrefined shea butter, squalane')
        + aure_spec('Size', '200 mL pump bottle, 60 mL travel jar'), f'border-bottom:1px solid {A_LINE};') + '</td></tr>',

    f'<tr><td class="pad" style="background:{A_PANEL};padding:40px 30px 22px;">' + T(
        '<tr>' + aure_plate('aure-texture.webp', 'A flat swatch of ivory body cream on grey paper', 'Texture', 'Light cream with a soft, dry finish.')
        + aure_plate('aure-ingredients.webp', 'Rolled oats, raw shea butter and a dish of oil on linen', 'Ingredients', 'Colloidal oat, unrefined shea, plant squalane.') + '</tr>')
    + '</td></tr>',

    f'<tr><td style="background:{A_PAPER};padding:0;">' + T(
        '<tr><td class="col" width="300" valign="top"><img src="aure-hands.webp" width="300" height="372" alt="Hands working a small amount of cream together over a white sink" style="width:300px;height:auto;"></td>'
        '<td class="col pad" width="300" valign="middle" style="padding:30px 36px 30px 32px;">'
        f'<p style="margin:0 0 16px;font-family:{hanken};font-size:12px;color:{A_MUTED};">Application</p>'
        + T(''.join(f'<tr><td width="30" valign="top" style="padding:12px 0;border-top:1px solid {A_LINE};font-family:{hanken};font-size:12px;color:{A_MUTED};">{n}</td>'
                    f'<td valign="top" style="padding:12px 0;border-top:1px solid {A_LINE};font-family:{hanken};font-size:14px;line-height:1.5;color:{A_INK};">{t}</td></tr>'
                    for n, t in [('01', 'Apply to damp skin after bathing.'), ('02', 'Warm a small amount between the palms.'), ('03', 'Massage in with long strokes until absorbed.')]))
        + '</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{A_PAPER};padding:36px;">' + T(
        '<tr>' + ''.join(f'<td class="col" width="33%" valign="top" style="padding:14px 14px 14px 0;border-top:1px solid {A_INK};font-family:{hanken};font-size:12px;line-height:1.55;color:{A_INK};">{t}</td>'
                         for t in ['Complimentary samples with every order', 'Free returns within 30 days', 'Gift wrapping on request']) + '</tr>') + '</td></tr>',

    f'<tr><td class="pad" align="center" style="background:{A_INK};padding:40px 36px;">'
    f'<div style="font-family:{hanken};font-size:15px;font-weight:600;letter-spacing:6px;text-indent:6px;color:{A_PAPER};">AURE</div>'
    f'<p style="margin:16px 0 0;font-family:{hanken};font-size:12px;line-height:1.9;color:#b9b3a8;">'
    f'<a href="{URL}" style="color:inherit;text-decoration:none;">Stores</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">Consultations</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">Contact</a></p>'
    f'<p style="margin:14px 0 0;font-family:{hanken};font-size:11px;line-height:1.7;color:#8f897e;">An independent email design concept.<br>'
    f'<a href="{URL}" style="color:inherit;">Preferences</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Unsubscribe</a></p></td></tr>',
])
shell('aure', 'AURE | Daily Milk Body Cream', 'A light cream for daily use after bathing.', A_PAPER,
      'family=Hanken+Grotesk:wght@400;500;600', aure)


# ---------------------------------------------------------------------------
# OFFDAY: a Y2K zine with stickers, a checkerboard and a receipt for a
# weekend with no plans. Bricolage Grotesque and Space Mono.
# ---------------------------------------------------------------------------
grot = "'Bricolage Grotesque','Arial Black',Arial,sans-serif"
mono = "'Space Mono','Courier New',monospace"
COBALT, BUTTER, PAPER, INK, TOMATO = '#124897', '#ffe36e', '#fff7db', '#0d0d0d', '#ff5b3a'

checker = ''.join(
    '<tr>' + ''.join(f'<td width="15" height="15" style="width:15px;height:15px;font-size:0;line-height:0;background:{COBALT if (r + c) % 2 else BUTTER};">&nbsp;</td>' for c in range(40)) + '</tr>'
    for r in range(2))


def receipt_row(time, what):
    return (f'<tr><td style="padding:7px 0;font-family:{mono};font-size:13px;color:{INK};">{time}</td>'
            f'<td style="padding:7px 0;font-family:{mono};font-size:13px;color:{INK};">{what}</td>'
            f'<td align="right" style="padding:7px 0;font-family:{mono};font-size:13px;font-weight:700;color:{COBALT};">&#10003;</td></tr>')


barcode = ''.join(f'<td width="{w}" height="38" style="width:{w}px;height:38px;font-size:0;background:{INK if i % 2 == 0 else PAPER};">&nbsp;</td>'
                  for i, w in enumerate([3, 2, 1, 3, 1, 1, 4, 2, 1, 2, 3, 1, 2, 4, 1, 1, 3, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 2, 3, 1, 1, 4, 2, 1, 3]))

offday = ''.join([
    f'<tr><td class="pad" style="background:{BUTTER};padding:28px 28px 16px;">' + T(
        f'<tr><td class="m-word" valign="middle" style="font-family:{grot};font-weight:800;font-size:96px;line-height:.8;letter-spacing:-5px;color:{COBALT};">offday<sup style="font-size:22px;letter-spacing:0;">&reg;</sup></td>'
        f'<td align="right" valign="middle" width="120"><div style="display:inline-block;width:106px;height:106px;border-radius:50%;background:{TOMATO};border:2px solid {INK};'
        f'transform:rotate(-14deg);text-align:center;color:{PAPER};"><div style="padding-top:28px;font-family:{mono};font-weight:700;font-size:13px;line-height:1.15;letter-spacing:1px;">NO<br>PLANS<br>CLUB</div></div></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{BUTTER};padding:0 28px 22px;">' + T(
        f'<tr><td style="padding:8px 0;font-family:{mono};font-weight:700;font-size:10px;letter-spacing:1px;color:{INK};">ISSUE #004</td>'
        f'<td align="center" style="padding:8px 0;font-family:{mono};font-weight:700;font-size:10px;letter-spacing:1px;color:{INK};">&#9733; THE DO-NOTHING TEE &#9733;</td>'
        f'<td align="right" style="padding:8px 0;font-family:{mono};font-weight:700;font-size:10px;letter-spacing:1px;color:{INK};">SAT + SUN</td></tr>',
        f'border-top:2px solid {INK};border-bottom:2px solid {INK};') + '</td></tr>',

    f'<tr><td style="padding:0;font-size:0;line-height:0;">' + T(checker) + '</td></tr>',

    f'<tr><td class="pad" style="background:{COBALT};padding:28px 28px 34px;">'
    f'<img src="offday.webp" width="538" alt="Two friends laughing in butter-yellow and cream cotton tees against a cobalt backdrop" style="width:100%;max-width:538px;height:auto;border:3px solid {INK};border-radius:28px;"></td></tr>',

    f'<tr><td class="pad" style="background:{COBALT};padding:0 28px 50px;">'
    f'<h1 class="m-hero" style="margin:0;font-family:{grot};font-weight:800;font-size:84px;line-height:.84;letter-spacing:-4px;color:{BUTTER};">big comfort.<br>small plans.</h1>'
    f'<p style="margin:22px 0 28px;max-width:430px;font-family:{mono};font-size:14px;line-height:1.7;color:{PAPER};">The coffee can wait. So can everything else. Soft cotton, a little extra room, and absolutely nothing to prove.</p>'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{BUTTER};color:{INK};border:2px solid {INK};box-shadow:5px 5px 0 {INK};'
    f'padding:15px 26px;border-radius:999px;font-family:{grot};font-weight:800;font-size:18px;text-decoration:none;">take the day off &#8594;</a></td></tr>',

    f'<tr><td class="pad" align="center" style="background:{BUTTER};padding:54px 28px;">'
    + f'<table role="presentation" width="380" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:380px;background:{PAPER};border:2px solid {INK};box-shadow:8px 8px 0 {COBALT};transform:rotate(-1.5deg);">'
    f'<tr><td style="padding:26px 26px 22px;text-align:left;">'
    f'<p style="margin:0;text-align:center;font-family:{mono};font-weight:700;font-size:12px;letter-spacing:2px;color:{INK};">YOUR WEEKEND ITINERARY</p>'
    f'<p style="margin:4px 0 14px;text-align:center;font-family:{mono};font-size:10px;color:#6b6b6b;">OFFDAY HQ · TABLE FOR ONE · SOFA 03</p>'
    + T(receipt_row('09:00', 'Sleep in') + receipt_row('11:30', 'Still in bed') + receipt_row('13:00', 'Snacks, horizontal') + receipt_row('16:00', 'Nothing, specifically'),
        f'border-top:2px dashed {INK};border-bottom:2px dashed {INK};')
    + T(f'<tr><td style="padding-top:14px;font-family:{mono};font-weight:700;font-size:13px;color:{INK};">TOTAL PLANS</td>'
        f'<td align="right" style="padding-top:6px;font-family:{grot};font-weight:800;font-size:46px;line-height:1;color:{TOMATO};">0</td></tr>')
    + '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:18px auto 8px;"><tr>' + barcode + '</tr></table>'
    f'<p style="margin:0;text-align:center;font-family:{mono};font-size:10px;letter-spacing:1px;color:{INK};">THANK YOU FOR DOING NOTHING</p>'
    '</td></tr></table></td></tr>',

    f'<tr><td style="background:{PAPER};padding:0;">' + T(
        '<tr><td class="col" width="300" valign="top"><img src="offday-flatlay.webp" width="300" height="300" alt="Folded butter and cream tees with sunglasses, iced coffee and a paperback on cobalt" style="width:300px;height:auto;"></td>'
        '<td class="col pad" width="300" valign="middle" style="padding:26px 28px;">'
        f'<p style="margin:0;font-family:{grot};font-weight:800;font-size:44px;line-height:.9;letter-spacing:-2px;color:{COBALT};">wear.<br>wash.<br>wear again.</p>'
        f'<p style="margin:14px 0 14px;font-family:{mono};font-size:12px;line-height:1.7;color:{INK};">Heavyweight cotton. Relaxed fit. Soft from the first wear.</p>'
        + ''.join(f'<span style="display:inline-block;margin:0 4px 6px 0;padding:4px 10px;border:2px solid {INK};border-radius:999px;background:{bg};font-family:{mono};font-weight:700;font-size:10px;color:{INK};">{t}</span>'
                  for t, bg in [('BUTTER', BUTTER), ('CREAM', PAPER), ('XS–XXL', '#ffffff')])
        + '</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{COBALT};padding:26px 28px 22px;">'
    f'<p style="margin:0;font-family:{mono};font-weight:700;font-size:11px;letter-spacing:1px;color:{BUTTER};">STATUS UPDATE:</p>'
    f'<p style="margin:6px 0 0;font-family:{grot};font-weight:800;font-size:40px;line-height:1;letter-spacing:-2px;color:{PAPER};">horizontal since 10am.</p></td></tr>',

    '<tr><td style="padding:0;"><img src="offday-sofa.webp" width="600" alt="A man napping happily on a cobalt sofa under a butter blanket with his dog" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:{INK};padding:34px 28px 30px;">' + T(
        f'<tr><td valign="bottom" style="font-family:{grot};font-weight:800;font-size:54px;line-height:.85;letter-spacing:-3px;color:{BUTTER};">offday<sup style="font-size:16px;letter-spacing:0;">&reg;</sup>'
        f'<div style="margin-top:10px;font-family:{mono};font-weight:400;font-size:11px;letter-spacing:0;color:{PAPER};">For the beautifully uneventful.</div></td>'
        f'<td align="right" valign="bottom" style="font-family:{mono};font-size:10px;line-height:2;color:{PAPER};">'
        f'<a href="{URL}" style="color:inherit;text-decoration:none;">instagram</a><br><a href="{URL}" style="color:inherit;text-decoration:none;">returns</a><br>'
        f'<a href="{URL}" style="color:inherit;">unsubscribe</a></td></tr>')
    + f'<p style="margin:20px 0 0;font-family:{mono};font-size:10px;color:#8c8c8c;">An independent email design concept.</p></td></tr>',
])
shell('offday', 'offday | Big comfort. Small plans.', 'Meet the tee you will make plans to stay in.', BUTTER,
      'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Space+Mono:wght@400;700', offday)


# ---------------------------------------------------------------------------
# SUNDAY TABLE: a supper-club invitation and printed menu inside a framed card.
# Fraunces and Inter.
# ---------------------------------------------------------------------------
fraunces = "Fraunces,Georgia,serif"
PAPRIKA, BROWN, CREAMY, MUSTARD, CLAY = '#b8432f', '#5e2319', '#f8ecd9', '#ebc396', '#8a4a3c'


def course(label, dish, note):
    return (f'<tr><td width="96" valign="baseline" style="padding:15px 0;border-bottom:1px dotted #c9a58a;font-family:{sans};font-size:9px;letter-spacing:2.5px;font-weight:600;color:{PAPRIKA};">{label}</td>'
            f'<td valign="baseline" style="padding:15px 0;border-bottom:1px dotted #c9a58a;font-family:{fraunces};font-size:21px;color:{BROWN};">{dish}</td>'
            f'<td align="right" valign="baseline" style="padding:15px 0;border-bottom:1px dotted #c9a58a;font-family:{fraunces};font-style:italic;font-size:14px;color:{CLAY};">{note}</td></tr>')


def detail(label, value, first=False):
    rule = '' if first else 'border-left:1px solid #d9b99a;'
    return (f'<td class="col" width="33%" align="center" style="padding:16px 8px;{rule}">'
            f'<div style="font-family:{sans};font-size:9px;letter-spacing:2.5px;font-weight:600;color:{CLAY};">{label}</div>'
            f'<div style="margin-top:6px;font-family:{fraunces};font-size:19px;color:{BROWN};">{value}</div></td>')


card = ''.join([
    f'<tr><td align="center" style="padding:38px 32px 26px;">'
    f'<div style="font-size:12px;letter-spacing:8px;color:{PAPRIKA};">&#10022; &#10022; &#10022;</div>'
    f'<div style="margin:14px 0 8px;font-family:{fraunces};font-style:italic;font-size:56px;line-height:1;color:{BROWN};">sunday table.</div>'
    f'<div style="font-family:{sans};font-size:9px;letter-spacing:3px;font-weight:600;color:{CLAY};">SUPPER CLUB &nbsp;·&nbsp; EVERY WEEK &nbsp;·&nbsp; SINCE ALWAYS</div></td></tr>',

    f'<tr><td align="center" style="padding:6px 32px 34px;">'
    f'<div style="width:60px;border-top:1px solid {BROWN};margin:0 auto 26px;"></div>'
    f'<p style="margin:0;font-family:{sans};font-size:10px;letter-spacing:3px;font-weight:600;color:{CLAY};">YOU ARE CORDIALLY INVITED TO</p>'
    f'<h1 style="margin:14px 0 0;font-family:{fraunces};font-weight:400;color:{BROWN};line-height:.9;">'
    f'<span style="display:block;font-style:italic;font-size:104px;letter-spacing:-3px;color:{PAPRIKA};">Dinner</span>'
    f'<span style="display:block;margin-top:6px;font-size:38px;letter-spacing:-.5px;">is the occasion.</span></h1></td></tr>',

    '<tr><td style="padding:0 24px;">' + T('<tr>' + detail('WHEN', 'Sunday, 7-ish', True) + detail('WHERE', 'Your kitchen') + detail('DRESS', 'Come comfy') + '</tr>',
                                          f'border-top:1px solid {BROWN};border-bottom:1px solid {BROWN};') + '</td></tr>',

    f'<tr><td align="center" style="padding:40px 32px 10px;"><img src="supper-plate.webp" width="440" height="440" alt="A plate of tomato rigatoni with basil and parmesan, seen from above" style="width:440px;max-width:100%;height:auto;margin:0 auto;"></td></tr>'
    f'<tr><td align="center" style="padding:0 32px 36px;font-family:{fraunces};font-style:italic;font-size:16px;color:{CLAY};">Slow tomato rigatoni. Basil. Far too much parmesan.</td></tr>',

    f'<tr><td class="pad" style="padding:0 40px 44px;">'
    f'<p style="margin:0 0 6px;text-align:center;font-family:{fraunces};font-style:italic;font-size:32px;color:{BROWN};">Tonight’s menu</p>'
    + T(course('TO START', 'Burrata, blistered tomatoes', 'to share') + course('THE MAIN', 'Slow tomato rigatoni', 'seconds, please')
        + course('ON THE SIDE', 'Charred lemon greens', 'for balance') + course('TO FINISH', 'Olive oil cake', 'one more slice'))
    + '</td></tr>',

    '<tr><td style="padding:0;"><img src="supper-ingredients.webp" width="544" alt="Vine tomatoes, garlic, basil, parmesan, rigatoni and olive oil on a paprika table" style="width:100%;height:auto;"></td></tr>'
    f'<tr><td align="center" style="padding:14px 32px;font-family:{fraunces};font-style:italic;font-size:16px;color:{CLAY};">Seven ingredients. Zero fuss. The recipe card is inside.</td></tr>',

    f'<tr><td style="background:{BROWN};padding:0;">' + T(
        '<tr><td class="col" width="272" valign="top"><img src="supper-party.webp" width="272" height="338" alt="Friends passing pasta along a candlelit dinner table" style="width:272px;height:auto;"></td>'
        '<td class="col pad" width="272" valign="middle" style="padding:28px 26px;">'
        f'<p style="margin:0;font-family:{fraunces};font-style:italic;font-size:44px;line-height:.98;color:{CREAMY};">Good food.<br>Better company.</p>'
        f'<p style="margin:16px 0 0;font-family:{sans};font-size:13px;line-height:1.7;color:{MUSTARD};">A table for two, a house full of friends, or a quiet dinner for one. There’s always room here.</p></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="padding:38px 32px 30px;">'
    f'<div style="margin:0 0 8px;font-family:{sans};font-size:13px;color:{PAPRIKA};">&#9986;</div>'
    + T(f'<tr><td valign="middle" style="padding:22px 24px;"><div style="font-family:{fraunces};font-size:34px;line-height:1;color:{BROWN};">RSVP</div>'
        f'<div style="margin-top:6px;font-family:{sans};font-size:12px;color:{CLAY};">Kindly reply by Sunday noon.</div></td>'
        f'<td align="right" valign="middle" style="padding:22px 24px;"><a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{PAPRIKA};color:{CREAMY};'
        f'padding:15px 24px;border-radius:999px;font-family:{sans};font-weight:600;font-size:11px;letter-spacing:2px;text-decoration:none;">SET YOUR TABLE</a></td></tr>',
        f'border:2px dashed {PAPRIKA};')
    + '</td></tr>',

    f'<tr><td align="center" style="padding:6px 32px 32px;">'
    f'<div style="font-family:{fraunces};font-style:italic;font-size:24px;color:{BROWN};">sunday table.</div>'
    f'<p style="margin:10px 0 0;font-family:{sans};font-size:10px;letter-spacing:2px;line-height:2;color:{CLAY};">'
    f'<a href="{URL}" style="color:inherit;text-decoration:none;">RECIPES</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">INSTAGRAM</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Unsubscribe</a></p>'
    f'<p style="margin:4px 0 0;font-family:{sans};font-size:10px;color:{CLAY};">An independent email design concept.</p></td></tr>',
])

supper = (
    f'<tr><td style="background:{PAPRIKA};padding:22px;">'
    f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:{CREAMY};border:1px solid {BROWN};">'
    f'<tr><td style="padding:6px;">' + T(card, f'border:1px solid {BROWN};') + '</td></tr></table>'
    f'<p style="margin:18px 0 0;text-align:center;font-family:{fraunces};font-style:italic;font-size:17px;color:{CREAMY};">Make a meal of the everyday.</p></td></tr>'
)
shell('supper', 'Sunday Table | Dinner is the occasion', 'Pull up a chair. Dinner is the occasion.', PAPRIKA,
      'family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;600', supper)


# ---------------------------------------------------------------------------
# FIELDWORK: a farm almanac. Newspaper masthead, seed-packet produce cards,
# a rubber stamp offer and a harvest calendar. Zilla Slab and IBM Plex Mono.
# ---------------------------------------------------------------------------
slab = "'Zilla Slab',Rockwell,Georgia,serif"
plex = "'IBM Plex Mono','Courier New',monospace"
FIELD, SOIL, OLIVE, OCHRE, STAMP, FADED = '#f3ead2', '#2f2716', '#4d5a2a', '#e2a93b', '#b5452a', '#5b5033'


def packet(src, n, name, note, alt):
    return (f'<td class="col" width="33%" valign="top" style="padding:0 5px 10px;">'
            f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:2px solid {SOIL};background:#fffaf0;">'
            f'<tr><td style="padding:0;"><img src="{src}" width="166" height="166" alt="{alt}" style="width:100%;height:auto;"></td></tr>'
            f'<tr><td style="padding:10px 10px 12px;border-top:2px solid {SOIL};">'
            f'<div style="font-family:{plex};font-size:9px;font-weight:600;letter-spacing:1.5px;color:{STAMP};">Nº {n}</div>'
            f'<div style="margin:2px 0 3px;font-family:{slab};font-weight:700;font-size:22px;line-height:1;color:{SOIL};">{name}</div>'
            f'<div style="font-family:{plex};font-size:10px;line-height:1.4;color:{FADED};">{note}</div></td></tr></table></td>')


def season(name, marks):
    cells = ''.join(f'<td align="center" style="padding:9px 0;border-bottom:1px dotted #b8ad8c;font-size:15px;color:{OLIVE if m else "#c4b996"};">{"&#9679;" if m else "&#9675;"}</td>' for m in marks)
    return f'<tr><td style="padding:9px 0;border-bottom:1px dotted #b8ad8c;font-family:{plex};font-size:12px;color:{SOIL};">{name}</td>{cells}</tr>'


def box_item(text, done=True):
    return (f'<tr><td style="padding:8px 0;border-bottom:1px solid rgba(243,234,210,.18);font-family:{plex};font-size:12px;color:{FIELD};">'
            f'<span style="color:{OCHRE};">{"&#9745;" if done else "&#9744;"}</span>&nbsp; {text}</td></tr>')


mast_cell = f'padding:9px 0;font-family:{plex};font-size:9px;font-weight:600;letter-spacing:1.5px;color:{SOIL};'
fieldwork = ''.join([
    f'<tr><td class="pad" style="background:{FIELD};padding:22px 30px 0;">'
    + T(f'<tr><td style="{mast_cell}padding-top:0;">VOL. 03 · Nº 38</td><td class="hide-m" align="center" style="{mast_cell}padding-top:0;">HARVEST WEEK</td><td align="right" style="{mast_cell}padding-top:0;">FREE WITH EVERY BOX</td></tr>')
    + f'<div class="m-mast" style="border-top:4px solid {SOIL};border-bottom:1px solid {SOIL};padding:10px 0 4px;text-align:center;font-family:{slab};font-weight:700;font-size:96px;line-height:1;letter-spacing:-2px;color:{SOIL};">FIELDWORK</div>'
    + T(f'<tr><td style="{mast_cell}">FORECAST: SUN, 24°C</td><td class="hide-m" align="center" style="{mast_cell}">SOIL: HAPPY</td><td align="right" style="{mast_cell}">PICKED: THIS MORNING</td></tr>',
        f'border-bottom:3px solid {SOIL};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{FIELD};padding:30px 30px 28px;">' + T(
        f'<tr><td class="col" width="68%" valign="bottom">'
        f'<h1 class="m-hero" style="margin:0;font-family:{slab};font-weight:700;font-size:58px;line-height:.9;letter-spacing:-1.5px;color:{SOIL};">Good things.<br>Grown slow.</h1></td>'
        f'<td class="col" width="32%" valign="bottom" style="padding:12px 0 6px 16px;font-family:{plex};font-size:12px;line-height:1.7;color:{FADED};">'
        f'<span style="background:{OCHRE};color:{SOIL};padding:1px 4px;">A box of the season’s best,</span> a little closer to where it all begins.</td></tr>') + '</td></tr>',

    f'<tr><td style="background:{OLIVE};padding:0;">' + T(
        '<tr><td class="col" width="330" valign="top"><img src="fieldwork.webp" width="330" height="412" alt="A farmer holding freshly harvested carrots, beets and kale in a sunny field" style="width:330px;height:auto;"></td>'
        '<td class="col pad" width="270" valign="top" style="padding:26px 24px;">'
        f'<p style="margin:0 0 8px;font-family:{plex};font-size:10px;font-weight:600;letter-spacing:2px;color:{OCHRE};">IN THIS WEEK’S BOX</p>'
        + T(box_item('Nantes carrots') + box_item('Chioggia beets') + box_item('Heirloom tomatoes') + box_item('Lacinato kale') + box_item('French radishes') + box_item('One surprise', False))
        + f'<p style="margin:24px 0 0;font-family:{slab};font-weight:700;font-size:40px;line-height:.95;color:{OCHRE};">1 farm.<br>0 middlemen.</p></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{FIELD};padding:40px 25px 30px;">'
    f'<p style="margin:0 5px 16px;font-family:{plex};font-size:10px;font-weight:600;letter-spacing:2px;color:{SOIL};">FIELD NOTES &nbsp;/&nbsp; THREE TO KNOW</p>'
    + T('<tr>' + packet('fieldwork-carrots.webp', '01', 'Carrot', 'Nantes. Sweet, snappy.', 'A bunch of carrots with leafy tops on ochre')
        + packet('fieldwork-beets.webp', '02', 'Beet', 'Chioggia. Candy-striped.', 'A whole and a halved beetroot with leaves on olive')
        + packet('fieldwork-tomatoes.webp', '03', 'Tomato', 'Heirloom. Ugly, perfect.', 'A cluster of red, yellow and green heirloom tomatoes') + '</tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{OCHRE};padding:44px 30px;">' + T(
        '<tr><td class="col" valign="middle" style="padding-right:16px;">'
        f'<p style="margin:0;font-family:{plex};font-size:10px;font-weight:600;letter-spacing:2px;color:{SOIL};">FIRST HARVEST OFFER</p>'
        f'<p style="margin:10px 0 12px;font-family:{slab};font-weight:700;font-size:48px;line-height:.92;color:{SOIL};">Bring the harvest home.</p>'
        f'<p style="margin:0 0 22px;font-family:{plex};font-size:13px;line-height:1.6;color:{SOIL};">Your first box, 20% lighter. Use <strong>GROW20</strong> at checkout.</p>'
        f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{SOIL};color:{FIELD};padding:15px 22px;font-family:{plex};font-weight:600;font-size:12px;letter-spacing:1.5px;text-decoration:none;">CLAIM YOUR BOX &#8594;</a></td>'
        '<td class="col" width="200" align="center" valign="middle" style="padding-top:10px;">'
        f'<div style="width:176px;height:176px;margin:0 auto;border-radius:50%;border:3px solid {STAMP};transform:rotate(-12deg);text-align:center;color:{STAMP};">'
        f'<div style="width:156px;height:156px;margin:7px auto 0;border-radius:50%;border:1px dashed {STAMP};">'
        f'<div style="padding-top:28px;font-family:{plex};font-weight:600;font-size:10px;letter-spacing:2px;">GROW20</div>'
        f'<div style="font-family:{slab};font-weight:700;font-size:62px;line-height:.95;">20%</div>'
        f'<div style="margin-top:2px;font-family:{plex};font-weight:600;font-size:9px;letter-spacing:1.5px;">OFF FIRST BOX</div></div></div></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{FIELD};padding:42px 30px;">'
    f'<p style="margin:0 0 4px;font-family:{slab};font-weight:700;font-size:32px;color:{SOIL};">What’s coming up</p>'
    f'<p style="margin:0 0 18px;font-family:{plex};font-size:11px;color:{FADED};">The harvest calendar, as far as the weather allows.</p>'
    + T(f'<tr><td style="padding:8px 0;border-bottom:2px solid {SOIL};font-family:{plex};font-size:10px;font-weight:600;letter-spacing:1.5px;color:{SOIL};">CROP</td>'
        + ''.join(f'<td align="center" width="17%" style="padding:8px 0;border-bottom:2px solid {SOIL};font-family:{plex};font-size:10px;font-weight:600;letter-spacing:1.5px;color:{SOIL};">{m}</td>' for m in ['SEP', 'OCT', 'NOV', 'DEC'])
        + '</tr>' + season('Tomatoes', [1, 0, 0, 0]) + season('Apples', [1, 1, 0, 0]) + season('Kale', [1, 1, 1, 1]) + season('Squash', [0, 1, 1, 1]) + season('Parsnips', [0, 0, 1, 1]))
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{SOIL};padding:34px 30px 28px;">' + T(
        f'<tr><td valign="top" style="font-family:{slab};font-weight:700;font-size:32px;line-height:1;color:{FIELD};">FIELDWORK<span style="color:{OCHRE};">&#10035;</span>'
        f'<div style="margin-top:8px;font-family:{plex};font-weight:400;font-size:11px;color:#cdbf98;">Eat with the seasons. Stay a little grounded.</div></td>'
        f'<td align="right" valign="top" style="font-family:{plex};font-size:10px;line-height:2;letter-spacing:1px;color:{FIELD};">'
        f'<a href="{URL}" style="color:inherit;text-decoration:none;">THE FARM</a><br><a href="{URL}" style="color:inherit;text-decoration:none;">RECIPES</a><br>'
        f'<a href="{URL}" style="color:inherit;">Unsubscribe</a></td></tr>')
    + f'<p style="margin:20px 0 0;font-family:{plex};font-size:10px;color:#9d916f;">An independent email design concept.</p></td></tr>',
])
shell('fieldwork', 'Fieldwork | Good things, grown slow', 'Harvest week. Your first box, 20% lighter.', FIELD,
      'family=Zilla+Slab:wght@500;700&family=IBM+Plex+Mono:wght@400;600', fieldwork)

# ---------------------------------------------------------------------------
# HALDEN HEALTH: an appointment confirmation. A deep navy-to-harbour-blue hero
# carries the visit card; everything after it answers "what do I need to do
# before Thursday". Source Serif 4 and Source Sans 3.
# ---------------------------------------------------------------------------
hserif = "'Source Serif 4',Georgia,serif"
hsans = "'Source Sans 3','Segoe UI',Arial,sans-serif"
H_PAGE, H_NAVY, H_BLUE, H_SKY, H_LINE, H_MUTED, H_GREEN = '#eef3f6', '#0f2e4a', '#1d5c8f', '#e3eef6', '#d6e0e8', '#566878', '#2e7d5b'
H_HERO = ('background-color:#0f2e4a;background-image:radial-gradient(circle at 88% 0%,rgba(110,196,222,.55) 0%,rgba(110,196,222,0) 42%),'
          'linear-gradient(155deg,#0a223b 0%,#15426b 55%,#2176a8 100%);')
H_BUTTON = 'background-color:#1d5c8f;background-image:linear-gradient(135deg,#2a7fbd 0%,#15507f 100%);'


def halden_step(n, title, body, extra=''):
    return (f'<tr><td width="46" valign="top" style="padding:16px 0;border-top:1px solid {H_LINE};">'
            f'<div style="width:32px;height:32px;line-height:32px;border-radius:50%;background-color:{H_BLUE};background-image:linear-gradient(135deg,#46a9cc 0%,#1d5c8f 100%);'
            f'color:#ffffff;text-align:center;font-family:{hsans};font-size:14px;font-weight:700;">{n}</div></td>'
            f'<td valign="top" style="padding:16px 0;border-top:1px solid {H_LINE};font-family:{hsans};font-size:15px;line-height:1.55;color:{H_MUTED};">'
            f'<strong style="display:block;margin-bottom:2px;color:{H_NAVY};font-weight:600;font-size:16px;">{title}</strong>{body}{extra}</td></tr>')


def halden_chip(text):
    return (f'<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 11px;border-radius:999px;background:#ffffff;border:1px solid {H_LINE};'
            f'font-family:{hsans};font-size:13px;font-weight:600;color:{H_NAVY};">{text}</span>')


halden = ''.join([
    f'<tr><td class="pad" style="background:#ffffff;padding:22px 36px;">' + T(
        f'<tr><td style="font-family:{hsans};font-size:18px;font-weight:700;color:{H_NAVY};">'
        f'<span style="display:inline-block;width:28px;height:28px;line-height:28px;margin-right:10px;border-radius:7px;{H_HERO}color:#ffffff;text-align:center;font-family:{hserif};font-size:17px;vertical-align:middle;">H</span>'
        '<span style="vertical-align:middle;">Halden Health</span></td>'
        f'<td align="right" style="font-family:{hsans};font-size:14px;font-weight:600;"><a href="{URL}" style="color:{H_BLUE};text-decoration:none;">Patient portal &#8594;</a></td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="{H_HERO}padding:36px 36px 40px;">'
    '<span style="display:inline-block;padding:6px 14px 6px 8px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);'
    f'font-family:{hsans};font-size:13px;color:#ffffff;">'
    f'<span style="display:inline-block;width:18px;height:18px;line-height:18px;margin-right:8px;border-radius:50%;background:#43b27f;text-align:center;font-size:11px;font-weight:700;">&#10003;</span>'
    'Appointment confirmed &nbsp;·&nbsp; Ref. HH-48213</span>'
    f'<h1 style="margin:22px 0 0;font-family:{hserif};font-weight:600;font-size:36px;line-height:1.18;letter-spacing:-.4px;color:#ffffff;">Your annual physical is on Thursday, 18 September.</h1>'
    f'<p style="margin:14px 0 30px;font-family:{hsans};font-size:17px;line-height:1.6;color:#cfe1ee;">Hi Daniel, here’s everything you need before your visit with Dr. Ruth Okafor.</p>'

    f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:16px;box-shadow:0 20px 44px rgba(4,20,38,.38);">'
    f'<tr><td class="col" width="116" align="center" valign="middle" style="background-color:{H_NAVY};background-image:linear-gradient(165deg,#2a7fbd 0%,#0f2e4a 100%);'
    f'color:#ffffff;padding:24px 10px;border-radius:16px 0 0 0;font-family:{hsans};">'
    '<div style="font-size:13px;font-weight:700;letter-spacing:2px;opacity:.85;">SEP</div>'
    f'<div style="margin:4px 0;font-family:{hserif};font-size:50px;font-weight:600;line-height:1;">18</div>'
    '<div style="font-size:13px;letter-spacing:.5px;opacity:.85;">Thursday</div></td>'
    '<td class="col" valign="top" style="padding:22px 24px;">'
    f'<div style="font-family:{hsans};font-size:19px;font-weight:700;color:{H_NAVY};">Annual physical</div>'
    f'<div style="margin-top:4px;font-family:{hsans};font-size:15px;color:{H_MUTED};">9:40 AM &nbsp;·&nbsp; about 40 minutes</div>'
    + T(f'<tr><td style="padding-top:14px;font-family:{hsans};font-size:14px;line-height:1.55;color:{H_NAVY};"><span style="color:{H_MUTED};">Clinician</span><br>Dr. Ruth Okafor, MD &nbsp;·&nbsp; Family medicine</td></tr>'
        f'<tr><td style="padding-top:10px;font-family:{hsans};font-size:14px;line-height:1.55;color:{H_NAVY};"><span style="color:{H_MUTED};">Location</span><br>Riverside clinic, 220 Harbor Street, Floor 3</td></tr>')
    + '</td></tr>'
    f'<tr><td colspan="2" style="padding:14px 24px 18px;border-top:1px solid {H_LINE};">'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;margin:4px 8px 4px 0;{H_BUTTON}color:#ffffff;padding:12px 20px;border-radius:8px;font-family:{hsans};font-size:15px;font-weight:600;text-decoration:none;">Add to calendar</a>'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;margin:4px 16px 4px 0;border:1px solid {H_LINE};color:{H_NAVY};padding:11px 19px;border-radius:8px;font-family:{hsans};font-size:15px;font-weight:600;text-decoration:none;">Reschedule</a>'
    f'<a href="{URL}" style="font-family:{hsans};font-size:15px;color:{H_BLUE};">Cancel visit</a></td></tr>'
    '</table></td></tr>',

    f'<tr><td class="pad" style="background-color:{H_SKY};background-image:linear-gradient(180deg,#dcebf5 0%,#f6fafc 100%);padding:40px 36px;">' + T(
        '<tr><td class="col" width="200" valign="top" style="padding-right:26px;">'
        '<img src="halden-doctor.webp" width="200" height="250" alt="Dr. Ruth Okafor smiling in a bright clinic corridor" style="width:200px;height:auto;border-radius:14px;box-shadow:0 12px 28px rgba(15,46,74,.18);"></td>'
        '<td class="col" valign="middle" style="padding-top:10px;">'
        f'<p style="margin:0;font-family:{hsans};font-size:13px;font-weight:700;letter-spacing:1px;color:{H_BLUE};">MEET YOUR DOCTOR</p>'
        f'<p style="margin:8px 0 0;font-family:{hserif};font-size:26px;font-weight:600;color:{H_NAVY};">Dr. Ruth Okafor</p>'
        f'<p style="margin:10px 0 14px;font-family:{hsans};font-size:15px;line-height:1.6;color:{H_MUTED};">Family physician with a focus on preventive care and long-term conditions. She’ll review your history, check your vitals and talk through any screenings due this year.</p>'
        + halden_chip('Family medicine') + halden_chip('English, Yoruba') + halden_chip('Accepting new patients')
        + '</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:38px 36px 30px;">'
    f'<p style="margin:0 0 6px;font-family:{hserif};font-size:26px;font-weight:600;color:{H_NAVY};">Before your visit</p>'
    + T(halden_step('1', 'Complete your health questionnaire', 'It takes about 5 minutes and saves time at check-in.',
                    f'<br><a href="{URL}" style="display:inline-block;margin-top:8px;color:{H_BLUE};font-weight:600;">Start questionnaire &#8594;</a>')
        + halden_step('2', 'Fast for 8 hours if you’re having blood work', 'Water and your usual medications are fine unless you’ve been told otherwise.')
        + halden_step('3', 'Bring your medication list', 'Include vitamins and supplements. A photo of the labels works too.')
        + halden_step('4', 'Arrive 10 minutes early', 'Check in at the Floor 3 desk, or at the kiosk with your reference number.'),
        f'border-bottom:1px solid {H_LINE};')
    + '</td></tr>',

    '<tr><td style="background:#ffffff;padding:0;"><img src="halden-clinic.webp" width="600" alt="The bright waiting area at the Riverside clinic" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:18px 36px 34px;">' + T(
        '<tr>' + ''.join(f'<td class="col" width="33%" valign="top" style="padding:8px 12px 8px 0;font-family:{hsans};font-size:14px;line-height:1.5;color:{H_NAVY};"><span style="color:{H_MUTED};">{a}</span><br>{b}</td>'
                         for a, b in [('Parking', 'Free on level B1'), ('Access', 'Step-free, lifts to all floors'), ('Transit', 'Bus 14 and 22, Harbor St')]) + '</tr>') + '</td></tr>',

    f'<tr><td class="pad" style="background:{H_PAGE};padding:32px 36px 20px;">'
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#e3eef6;background-image:linear-gradient(135deg,#dbeaf6 0%,#d6f0ee 100%);border-radius:16px;">'
    f'<tr><td style="padding:22px 24px;font-family:{hsans};font-size:15px;line-height:1.6;color:{H_MUTED};">'
    f'<strong style="color:{H_NAVY};font-size:17px;">Questions about your visit?</strong><br>Call the care team on <a href="{URL}" style="color:{H_BLUE};font-weight:600;">555 0142</a>, weekdays 8 AM to 6 PM, or send a message in the patient portal. '
    f'<strong style="color:{H_NAVY};font-weight:600;">If you need urgent help, call your local emergency number.</strong></td></tr></table></td></tr>',

    f'<tr><td class="pad" style="background:{H_PAGE};padding:10px 36px 36px;font-family:{hsans};font-size:12px;line-height:1.7;color:{H_MUTED};">'
    'Halden Health will never ask for your password or payment details by email.<br>'
    f'<a href="{URL}" style="color:inherit;">Notification settings</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Privacy notice</a><br>'
    'An independent email design concept. Halden Health and its clinicians are fictional.</td></tr>',
])
shell('halden', 'Halden Health | Appointment confirmed', 'Thursday 18 September, 9:40 AM with Dr. Ruth Okafor.', H_PAGE,
      'family=Source+Serif+4:opsz,wght@8..60,600&family=Source+Sans+3:wght@400;600;700', halden)


# ---------------------------------------------------------------------------
# FAIRHAVEN ROW: a residential launch. Architectural photography does the
# selling; type stays in a strict grid of facts, a price table and a drawn
# floor plan. Archivo and Archivo Narrow, charcoal and stone.
# ---------------------------------------------------------------------------
archivo = "Archivo,'Helvetica Neue',Arial,sans-serif"
narrow = "'Archivo Narrow','Arial Narrow',Arial,sans-serif"
F_STONE, F_CHAR, F_WHITE, F_MUTED, F_LINE, F_DIM, F_SOFT = '#ebe7e0', '#161616', '#ffffff', '#6d6a64', '#d3cdc3', '#a39e94', '#bdb7ac'


def fh_fact(value, label):
    return (f'<td class="col" width="25%" valign="top" style="padding:14px 14px 4px 0;border-top:1px solid {F_CHAR};">'
            f'<div style="font-family:{narrow};font-size:24px;font-weight:600;line-height:1.1;color:{F_CHAR};white-space:nowrap;">{value}</div>'
            f'<div style="margin-top:4px;font-family:{archivo};font-size:12px;color:{F_MUTED};">{label}</div></td>')


def fh_cell(text, align='left', hide=False, head=False, extra=''):
    cls = ' class="hide-m"' if hide else ''
    if head:
        style = f'padding:22px 0 10px;font-family:{archivo};font-size:11px;letter-spacing:1px;color:{F_MUTED};'
    else:
        style = f'padding:14px 0;border-top:1px solid {F_LINE};font-family:{archivo};font-size:14px;{extra}'
    return f'<td align="{align}"{cls} style="{style}">{text}</td>'


def fh_row(name, beds, area, garden, price, reserved=False):
    ink = f'color:{F_DIM};' if reserved else f'color:{F_CHAR};'
    price_cell = (f'<span style="display:inline-block;padding:3px 8px;border:1px solid {F_DIM};font-size:11px;letter-spacing:1px;color:{F_MUTED};">RESERVED</span>'
                  if reserved else price)
    return ('<tr>' + fh_cell(name, extra=ink + 'font-weight:600;') + fh_cell(beds, 'center', extra=ink)
            + fh_cell(area, 'center', True, extra=ink) + fh_cell(garden, 'center', True, extra=ink)
            + fh_cell(price_cell, 'right', extra=ink + f'font-family:{narrow};font-size:16px;font-weight:600;') + '</tr>')


fh_h2 = f'font-family:{archivo};font-size:22px;font-weight:600;letter-spacing:-.4px;color:{F_CHAR};'

fairhaven = ''.join([
    f'<tr><td class="pad" style="background:{F_CHAR};padding:22px 32px;">' + T(
        f'<tr><td style="font-family:{archivo};font-size:13px;font-weight:600;letter-spacing:4px;color:{F_WHITE};">FAIRHAVEN ROW</td>'
        f'<td align="right" style="font-family:{archivo};font-size:12px;color:{F_DIM};">Hollins Bridge &nbsp;·&nbsp; Release 01</td></tr>') + '</td></tr>',

    f'<tr><td style="background:{F_CHAR};padding:0;"><img src="fairhaven-exterior.webp" width="600" alt="A row of pale brick townhouses with tall black windows lit at dusk" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:{F_CHAR};padding:40px 32px 44px;">'
    f'<h1 style="margin:0;font-family:{archivo};font-weight:500;font-size:50px;line-height:1.02;letter-spacing:-1.8px;color:{F_WHITE};">Twelve townhouses.<br>One quiet square.</h1>'
    f'<p style="margin:18px 0 28px;max-width:470px;font-family:{archivo};font-size:15px;line-height:1.65;color:{F_SOFT};">The first four homes on Fairhaven Row are now released: a new terrace of three- and four-bedroom houses facing Hollins Square, each with a private garden.</p>'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;margin:0 18px 10px 0;background:{F_WHITE};color:{F_CHAR};padding:15px 24px;font-family:{archivo};font-size:14px;font-weight:600;text-decoration:none;">Book a private viewing</a>'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;font-family:{archivo};font-size:14px;color:{F_WHITE};">Download brochure (PDF)</a></td></tr>',

    f'<tr><td class="pad" style="background:{F_STONE};padding:34px 32px 30px;">' + T(
        '<tr>' + fh_fact('3–4', 'Bedrooms') + fh_fact('142–188 m²', 'Internal area') + fh_fact('38–60 m²', 'Private garden') + fh_fact('Q3 2027', 'Completion') + '</tr>')
    + '</td></tr>',

    '<tr><td style="padding:0;"><img src="fairhaven-interior.webp" width="600" alt="Open-plan living room and kitchen with oak floors, a limestone island and a steel-framed garden window" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:{F_WHITE};padding:40px 32px 36px;">'
    + T(f'<tr><td style="{fh_h2}">Available now</td><td align="right" style="font-family:{archivo};font-size:13px;"><a href="{URL}" style="color:{F_CHAR};">All residences &#8594;</a></td></tr>')
    + T('<tr>' + fh_cell('RESIDENCE', head=True) + fh_cell('BEDS', 'center', head=True) + fh_cell('AREA', 'center', True, True)
        + fh_cell('GARDEN', 'center', True, True) + fh_cell('PRICE FROM', 'right', head=True) + '</tr>'
        + fh_row('No. 1', '3', '142 m²', '38 m²', '£1,150,000') + fh_row('No. 2', '3', '146 m²', '41 m²', '£1,195,000')
        + fh_row('No. 3', '4', '172 m²', '52 m²', '£1,380,000') + fh_row('No. 4', '4', '188 m²', '60 m²', '', True),
        f'border-bottom:1px solid {F_LINE};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{F_STONE};padding:40px 32px 34px;">'
    + T(f'<tr><td style="{fh_h2}">No. 3, ground floor</td><td align="right" style="font-family:{archivo};font-size:13px;color:{F_MUTED};">4 bed &nbsp;·&nbsp; 172 m²</td></tr>')
    + '<img src="fairhaven-plan.webp" width="536" alt="Ground floor plan of No. 3 with kitchen and dining, living room, entry, stair and WC" style="width:100%;height:auto;margin-top:20px;">'
    + f'<p style="margin:14px 0 0;font-family:{archivo};font-size:13px;"><a href="{URL}" style="color:{F_CHAR};">View all floor plans &#8594;</a></p></td></tr>',

    f'<tr><td style="background:{F_WHITE};padding:0 0 8px;">' + T(
        '<tr><td class="col" width="300" valign="top"><img src="fairhaven-stair.webp" width="300" height="300" alt="An oak staircase with a black steel handrail in daylight" style="width:300px;height:auto;">'
        f'<p style="margin:12px 16px 14px 32px;font-family:{archivo};font-size:12px;color:{F_MUTED};">Oak stair, steel balustrade</p></td>'
        '<td class="col" width="300" valign="top"><img src="fairhaven-square.webp" width="300" height="300" alt="A tree-lined square with a café and benches" style="width:300px;height:auto;">'
        f'<p style="margin:12px 32px 14px 16px;font-family:{archivo};font-size:12px;color:{F_MUTED};">Hollins Square, two minutes away</p></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{F_WHITE};padding:28px 32px 40px;">'
    f'<p style="margin:0 0 8px;{fh_h2}">The neighbourhood</p>'
    + T(''.join(f'<tr><td style="padding:13px 0;border-top:1px solid {F_LINE};font-family:{archivo};font-size:14px;color:{F_CHAR};">{a}</td>'
                f'<td align="right" style="padding:13px 0;border-top:1px solid {F_LINE};font-family:{narrow};font-size:15px;font-weight:600;color:{F_CHAR};white-space:nowrap;">{b}</td></tr>'
                for a, b in [('Hollins Square and park', '2 min walk'), ('Hollins Bridge station', '6 min walk'),
                             ('Primary and secondary schools', '8 min walk'), ('City centre', '18 min by train')]),
        f'border-bottom:1px solid {F_LINE};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{F_CHAR};padding:40px 32px;">' + T(
        '<tr><td class="col" valign="middle" style="padding-right:20px;">'
        f'<p style="margin:0;font-family:{archivo};font-size:12px;letter-spacing:2px;color:{F_DIM};">SHOW HOME</p>'
        f'<p style="margin:8px 0 6px;font-family:{archivo};font-size:26px;font-weight:500;line-height:1.15;letter-spacing:-.6px;color:{F_WHITE};">Opens Saturday 4 October</p>'
        f'<p style="margin:0;font-family:{archivo};font-size:14px;color:{F_SOFT};">Viewings by appointment, 10 am to 5 pm.</p></td>'
        f'<td class="col" align="right" valign="middle" style="padding-top:16px;"><a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{F_WHITE};color:{F_CHAR};padding:15px 22px;'
        f'font-family:{archivo};font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap;">Reserve a time</a></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:{F_STONE};padding:28px 32px 34px;font-family:{archivo};font-size:11px;line-height:1.7;color:{F_MUTED};">'
    f'<strong style="color:{F_CHAR};letter-spacing:3px;font-weight:600;">FAIRHAVEN ROW</strong><br>'
    'A fictional development created for a design portfolio. Images are illustrative. Prices, areas and dates are examples.<br>'
    f'<a href="{URL}" style="color:inherit;">Preferences</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Unsubscribe</a></td></tr>',
])
shell('fairhaven', 'Fairhaven Row | Release 01 now available', 'The first four townhouses on Fairhaven Row are now released.', F_STONE,
      'family=Archivo:wght@400;500;600&family=Archivo+Narrow:wght@600', fairhaven)


# ---------------------------------------------------------------------------
# PENNANT: a monthly money summary. A deep green hero with the card and the
# month's headline number, then the numbers as design: category bars, a
# savings goal and the largest payments. Every figure adds up.
# Geist and Geist Mono, forest green with a lime signal.
# ---------------------------------------------------------------------------
geist = "Geist,'Helvetica Neue',Arial,sans-serif"
gmono = "'Geist Mono',SFMono-Regular,Menlo,monospace"
P_PAGE, P_INK, P_MUTED, P_LINE, P_GREEN, P_LIME, P_TRACK = '#f3f4f1', '#0c0f0d', '#5d635f', '#e2e5e0', '#0f5c3e', '#b8f28c', '#eceee9'
P_HERO = ('background-color:#0a3324;background-image:radial-gradient(circle at 92% 8%,rgba(184,242,140,.38) 0%,rgba(184,242,140,0) 38%),'
          'radial-gradient(circle at 0% 100%,rgba(45,160,110,.5) 0%,rgba(45,160,110,0) 55%),linear-gradient(165deg,#062016 0%,#0f5c3e 100%);')
P_FILLS = {
    'ink': 'background-color:#0c0f0d;background-image:linear-gradient(90deg,#0c0f0d 0%,#3b4a41 100%);',
    'green': 'background-color:#0f5c3e;background-image:linear-gradient(90deg,#0f5c3e 0%,#2da06e 100%);',
    'sage': 'background-color:#8fb8a1;background-image:linear-gradient(90deg,#6fae8c 0%,#c4ecb0 100%);',
    'grey': 'background-color:#b9bfb8;',
}


def pn_bar(label, amount, pct, fill):
    rest = f'<td width="{100 - pct}%" style="font-size:0;line-height:0;">&nbsp;</td>' if pct < 100 else ''
    return (f'<tr><td style="padding:12px 0 6px;font-family:{geist};font-size:14px;color:{P_INK};">{label}</td>'
            f'<td align="right" style="padding:12px 0 6px;font-family:{gmono};font-size:13px;color:{P_INK};">{amount}</td></tr>'
            '<tr><td colspan="2" style="padding:0;">'
            f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;background:{P_TRACK};border-radius:5px;"><tr>'
            f'<td width="{pct}%" height="10" style="height:10px;font-size:0;line-height:0;{P_FILLS[fill]}border-radius:5px;">&nbsp;</td>{rest}</tr></table></td></tr>')


def pn_payment(initials, name, meta, amount, tint):
    cell = f'padding:12px 0;border-top:1px solid {P_LINE};'
    return (f'<tr><td width="50" valign="middle" style="{cell}">'
            f'<div style="width:38px;height:38px;line-height:38px;border-radius:50%;{tint}text-align:center;font-family:{geist};font-size:12px;font-weight:600;color:#ffffff;">{initials}</div></td>'
            f'<td valign="middle" style="{cell}font-family:{geist};font-size:14px;font-weight:500;color:{P_INK};">{name}'
            f'<div style="font-size:12px;font-weight:400;color:{P_MUTED};">{meta}</div></td>'
            f'<td align="right" valign="middle" style="{cell}font-family:{gmono};font-size:14px;color:{P_INK};white-space:nowrap;">{amount}</td></tr>')


def pn_stat(label, value, colour='#ffffff', first=False):
    edge = 'padding:0 10px 0 0;' if first else 'padding:0 10px 0 16px;border-left:1px solid rgba(255,255,255,.16);'
    return (f'<td width="33%" valign="top" style="{edge}">'
            f'<div style="font-family:{geist};font-size:12px;color:#9fcdb3;">{label}</div>'
            f'<div style="margin-top:6px;font-family:{gmono};font-size:20px;font-weight:500;letter-spacing:-.5px;color:{colour};">{value}</div></td>')


pn_flag = ('<span style="display:inline-block;width:0;height:0;margin-right:8px;border-top:9px solid transparent;border-bottom:9px solid transparent;'
           f'border-left:15px solid {P_LIME};vertical-align:-2px;"></span>')
pn_h2 = f'font-family:{geist};font-size:18px;font-weight:600;letter-spacing:-.4px;color:{P_INK};'

pn_card = (
    '<table role="presentation" width="190" cellspacing="0" cellpadding="0" border="0" align="right" '
    'style="width:190px;border-radius:14px;background-color:#0f5c3e;'
    'background-image:radial-gradient(circle at 100% 0%,rgba(184,242,140,.75) 0%,rgba(184,242,140,0) 55%),linear-gradient(135deg,#1b7a52 0%,#0a2f21 70%);'
    'border:1px solid rgba(255,255,255,.18);box-shadow:0 18px 36px rgba(0,0,0,.35);transform:rotate(-7deg);">'
    '<tr><td height="118" valign="top" style="height:118px;padding:14px 16px;">'
    + T(f'<tr><td style="font-family:{geist};font-size:13px;font-weight:600;color:#ffffff;">{pn_flag}pennant</td>'
        '<td align="right"><div style="width:26px;height:18px;border-radius:4px;background-color:#d9c27a;background-image:linear-gradient(135deg,#f1e2a6 0%,#b99a4a 100%);"></div></td></tr>')
    + f'<div style="margin-top:44px;font-family:{gmono};font-size:13px;letter-spacing:2px;color:#e6f7ea;">•••• 4821</div>'
    '</td></tr></table>'
)

pennant = ''.join([
    f'<tr><td class="pad" style="background:#062016;padding:24px 32px;">' + T(
        f'<tr><td style="font-family:{geist};font-size:20px;font-weight:600;letter-spacing:-.6px;color:#ffffff;">{pn_flag}pennant</td>'
        f'<td align="right" style="font-family:{gmono};font-size:12px;color:#9fcdb3;">AUGUST 2026</td></tr>') + '</td></tr>',

    f'<tr><td class="pad" style="{P_HERO}padding:36px 32px 34px;">' + T(
        '<tr><td class="col" valign="top" style="padding-right:12px;">'
        f'<p style="margin:0;font-family:{geist};font-size:14px;color:#9fcdb3;">Your monthly summary</p>'
        f'<h1 style="margin:10px 0 0;font-family:{geist};font-weight:600;font-size:42px;line-height:1.05;letter-spacing:-1.8px;color:#ffffff;">You saved <span style="color:{P_LIME};">£412</span> in August.</h1>'
        f'<p style="margin:14px 0 0;font-family:{geist};font-size:15px;line-height:1.6;color:#c4e3d2;">That’s 18% of what came in, and your best month since you joined.</p></td>'
        f'<td class="col hide-m" width="200" valign="middle" style="padding:18px 6px 0 0;">{pn_card}</td></tr>')

    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:30px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:16px;">'
    '<tr><td style="padding:20px;">' + T('<tr>' + pn_stat('Money in', '£2,280', first=True) + pn_stat('Money out', '£1,868') + pn_stat('Saved', '£412', P_LIME) + '</tr>') + '</td></tr>'
    '<tr><td style="padding:18px 20px 20px;border-top:1px solid rgba(255,255,255,.14);">'
    + T(f'<tr><td style="font-family:{geist};font-size:14px;font-weight:500;color:#ffffff;">Emergency fund</td>'
        f'<td align="right" style="font-family:{gmono};font-size:13px;color:#ffffff;">£3,240 <span style="color:#9fcdb3;">/ £5,000</span></td></tr>')
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:12px 0 10px;table-layout:fixed;background:rgba(255,255,255,.14);border-radius:6px;"><tr>'
    '<td width="65%" height="10" style="height:10px;font-size:0;line-height:0;background-color:#2da06e;background-image:linear-gradient(90deg,#2da06e 0%,#b8f28c 100%);border-radius:6px;">&nbsp;</td>'
    '<td width="35%" style="font-size:0;line-height:0;">&nbsp;</td></tr></table>'
    f'<div style="font-family:{geist};font-size:12px;color:#9fcdb3;">65% there. At this pace you’ll reach it in January.</div>'
    '</td></tr></table></td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:36px 32px 30px;">'
    + T(f'<tr><td style="{pn_h2}">Where the rest went</td><td align="right" style="font-family:{gmono};font-size:13px;color:{P_MUTED};">£1,868</td></tr>')
    + T(pn_bar('Rent and bills', '£980', 100, 'ink') + pn_bar('Groceries', '£312', 32, 'green') + pn_bar('Eating out', '£188', 19, 'green')
        + pn_bar('Transport', '£146', 15, 'sage') + pn_bar('Shopping', '£122', 12, 'sage') + pn_bar('Everything else', '£120', 12, 'grey'))
    + '</td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:0 32px 32px;">'
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#d9f2e3;background-image:linear-gradient(120deg,#d4f1df 0%,#eefad6 100%);border-radius:16px;">'
    f'<tr><td style="padding:20px 22px;font-family:{geist};font-size:14px;line-height:1.55;color:{P_INK};">'
    f'<div style="font-family:{gmono};font-size:26px;font-weight:500;letter-spacing:-.8px;color:{P_GREEN};">+£23.40</div>'
    '<strong style="font-weight:600;">added to savings from round-ups</strong><br><span style="color:#3c5a49;">142 card payments, each rounded up to the nearest pound.</span></td>'
    f'<td align="right" valign="bottom" style="padding:20px 22px;"><a href="{URL}" style="font-family:{geist};font-size:14px;font-weight:600;color:{P_GREEN};white-space:nowrap;">Details &#8594;</a></td></tr></table></td></tr>',

    '<tr><td style="background:#ffffff;padding:0;"><img src="pennant-morning.webp" width="600" alt="A man at a kitchen table checking his phone beside a cup of coffee" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:32px;">' + T(
        '<tr><td class="col" valign="middle" style="padding-right:24px;">'
        f'<p style="margin:0;font-family:{gmono};font-size:11px;letter-spacing:1px;color:{P_GREEN};">NEW IN THE APP</p>'
        f'<p style="margin:8px 0;font-family:{geist};font-size:22px;font-weight:600;line-height:1.2;letter-spacing:-.6px;color:{P_INK};">Travel mode for your card</p>'
        f'<p style="margin:0 0 18px;font-family:{geist};font-size:14px;line-height:1.6;color:{P_MUTED};">No fees on card payments abroad, and every payment shown in both currencies. Switch it on before you fly.</p>'
        f'<a href="{URL}" target="_blank" rel="noopener" style="display:inline-block;background:{P_INK};color:#ffffff;padding:12px 18px;border-radius:999px;font-family:{geist};font-size:14px;font-weight:500;text-decoration:none;">Turn on travel mode</a></td>'
        '<td class="col" width="200" valign="middle" style="padding-top:16px;"><img src="pennant-tap.webp" width="200" height="200" alt="A hand tapping a green card on a café card reader" style="width:200px;height:auto;border-radius:14px;"></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:6px 32px 12px;">'
    f'<p style="margin:0 0 6px;{pn_h2}">Largest payments</p>'
    + T(pn_payment('HL', 'Harbor Lettings', 'Rent · 1 Aug', '−£850.00', P_FILLS['ink'])
        + pn_payment('GE', 'Grid Energy', 'Bills · 3 Aug', '−£84.20', P_FILLS['green'])
        + pn_payment('MH', 'Market Hall', 'Groceries · 16 Aug', '−£61.35', 'background-color:#6fae8c;background-image:linear-gradient(135deg,#8cc9a4 0%,#3f8a63 100%);'),
        f'border-bottom:1px solid {P_LINE};')
    + '</td></tr>',

    f'<tr><td class="pad" style="background:#ffffff;padding:28px 32px 40px;">'
    f'<a href="{URL}" target="_blank" rel="noopener" style="display:block;background-color:{P_GREEN};background-image:linear-gradient(135deg,#0f5c3e 0%,#22945f 100%);color:#ffffff;padding:16px 0;border-radius:12px;'
    f'text-align:center;font-family:{geist};font-size:15px;font-weight:600;text-decoration:none;">See your full August report</a></td></tr>',

    f'<tr><td class="pad" style="background:{P_PAGE};padding:26px 32px 36px;font-family:{geist};font-size:12px;line-height:1.7;color:{P_MUTED};">'
    'Pennant will never ask for your passcode or card PIN by email, text or phone.<br>'
    f'<a href="{URL}" style="color:inherit;">Notification settings</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Help centre</a><br>'
    'An independent email design concept. Pennant is fictional; figures are illustrative and not financial advice.</td></tr>',
])
shell('pennant', 'Pennant | Your August summary', 'You saved £412 in August, your best month yet.', P_PAGE,
      'family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500', pennant)


# ---------------------------------------------------------------------------
# WAGGLE: a playful pet-shop welcome. Cut-out pets on saturated colour blocks,
# scalloped section edges, a welcome code, product cards and a polaroid wall.
# Titan One and Nunito. Coral, deep teal, sunshine and cream.
# The scallops, cut-outs and polaroids are composited into images at the exact
# section colours, so the playful edges survive clients that ignore CSS.
# ---------------------------------------------------------------------------
titan = "'Titan One','Arial Rounded MT Bold','Arial Black',sans-serif"
nunito = "Nunito,'Helvetica Neue',Arial,sans-serif"
W_CORAL, W_TEAL, W_TEAL_DK, W_SUN, W_CREAM, W_INK, W_ROSE = '#ff6b8b', '#0d5c55', '#0a4540', '#ffc94a', '#fff5e8', '#1f2a29', '#c2385a'


def waggle_pill(label, bg, ink, size=15, block=False):
    display = 'display:block;text-align:center;' if block else 'display:inline-block;'
    return (f'<a href="{URL}" target="_blank" rel="noopener" style="{display}background:{bg};color:{ink};padding:14px 26px;border-radius:999px;'
            f'font-family:{nunito};font-size:{size}px;font-weight:800;text-decoration:none;">{label}</a>')


def waggle_scallop(name, alt=''):
    return f'<tr><td style="padding:0;font-size:0;line-height:0;"><img src="{name}.webp" width="600" height="28" alt="{alt}" style="width:100%;height:auto;"></td></tr>'


def waggle_product(src, name, price, alt):
    return (f'<td class="col" width="33%" valign="top" style="padding:0 6px 14px;">'
            f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:20px;">'
            f'<tr><td style="padding:10px 10px 16px;text-align:center;">'
            f'<img src="{src}" width="160" height="160" alt="{alt}" style="width:100%;height:auto;border-radius:14px;">'
            f'<div style="margin-top:12px;font-family:{nunito};font-size:16px;font-weight:800;color:{W_INK};">{name}</div>'
            f'<div style="margin:2px 0 12px;font-family:{nunito};font-size:14px;font-weight:700;color:{W_TEAL};">{price}</div>'
            + waggle_pill('Add to bag', W_CORAL, '#ffffff', 13) + '</td></tr></table></td>')


waggle_marquee = ' &nbsp; '.join(['Free delivery over €40', '<span style="color:#ff9bb0;">&#10033;</span>', 'Happy-tail guarantee',
                                  '<span style="color:#ff9bb0;">&#10033;</span>', 'Vet-approved treats', '<span style="color:#ff9bb0;">&#10033;</span>'] * 3)

waggle = ''.join([
    f'<tr><td class="pad" align="center" style="background:{W_TEAL_DK};padding:10px 24px;font-family:{nunito};font-size:12px;font-weight:700;color:{W_CREAM};">'
    'Free delivery over €40 &nbsp;·&nbsp; Vet-approved treats</td></tr>',

    f'<tr><td class="pad" align="center" style="background:{W_CORAL};padding:30px 32px 0;">'
    f'<div style="font-family:{titan};font-size:30px;line-height:1;color:{W_TEAL_DK};">waggle<span style="color:{W_SUN};">&#9679;</span></div>'
    f'<h1 style="margin:22px 0 0;font-family:{titan};font-weight:400;font-size:64px;line-height:.98;letter-spacing:-.5px;color:{W_TEAL_DK};">Treats worth<br>sitting for.</h1>'
    f'<p style="margin:14px 0 22px;font-family:{nunito};font-size:18px;font-weight:700;color:{W_TEAL_DK};">Hand-baked, vet-approved and gone in seconds.</p>'
    + waggle_pill('Shop the treat drawer &#8594;', W_TEAL_DK, W_CREAM, 16) + '</td></tr>',

    f'<tr><td style="background:{W_CORAL};padding:12px 0 0;font-size:0;line-height:0;"><img src="waggle-hero.webp" width="600" height="500" alt="A French bulldog puppy in a teal bandana tilting its head" style="width:100%;height:auto;"></td></tr>',
    waggle_scallop('waggle-scallop-coral'),

    f'<tr><td style="background:{W_CREAM};padding:0;">' + T(
        '<tr><td class="col hide-m" width="200" valign="top" style="padding:28px 0 0;font-size:0;line-height:0;">'
        '<img src="waggle-cat.webp" width="200" alt="A ginger tabby cat peeking in from the side" style="width:200px;height:auto;"></td>'
        '<td class="col pad" valign="top" style="padding:34px 32px 44px 12px;">'
        f'<h2 style="margin:0;font-family:{titan};font-weight:400;font-size:34px;line-height:1.08;color:{W_TEAL_DK};">Welcome to the <span style="background:linear-gradient(transparent 60%,{W_SUN} 60%);">pack!</span></h2>'
        f'<p style="margin:14px 0 18px;font-family:{nunito};font-size:16px;line-height:1.6;color:{W_INK};">We’re so glad you’re here. Take <strong>15% off</strong> your first order, for the good boys, the good girls and the gloriously chaotic ones.</p>'
        f'<p style="margin:0 0 8px;font-family:{nunito};font-size:14px;font-weight:700;color:{W_TEAL};">Use this code at checkout:</p>'
        f'<div style="display:inline-block;margin-bottom:20px;padding:8px 20px;border:3px dashed {W_CORAL};border-radius:18px;font-family:{titan};font-size:46px;line-height:1.1;letter-spacing:1px;color:{W_ROSE};">WAGGLE15</div><br>'
        + waggle_pill('Claim 15% off &#8594;', W_CORAL, '#ffffff') + '</td></tr>') + '</td></tr>',

    f'<tr><td style="background:{W_TEAL_DK};padding:14px 0;"><div style="width:100%;max-width:600px;white-space:nowrap;overflow:hidden;font-family:{titan};font-size:18px;color:{W_SUN};">{waggle_marquee}</div></td></tr>',

    f'<tr><td class="pad" style="background:{W_TEAL};padding:44px 22px 34px;">'
    f'<h2 style="margin:0;text-align:center;font-family:{titan};font-weight:400;font-size:38px;line-height:1.05;color:{W_CREAM};">The good stuff</h2>'
    f'<p style="margin:10px 0 26px;text-align:center;font-family:{nunito};font-size:16px;font-weight:600;color:#cfe8e3;">This month’s most-loved picks, chosen by very picky testers.</p>'
    + T('<tr>' + waggle_product('waggle-treats.webp', 'Salmon Bites', '€8.50', 'A kraft pouch of salmon dog treats with a coral paw label')
        + waggle_product('waggle-bowl.webp', 'Paw Print Bowl', '€18.00', 'A glossy coral ceramic pet bowl with an embossed paw')
        + waggle_product('waggle-rope.webp', 'Tug Rope', '€12.00', 'A braided teal and cream rope toy') + '</tr>')
    + '</td></tr>',
    waggle_scallop('waggle-scallop-teal'),

    f'<tr><td style="background:{W_SUN};padding:0;">' + T(
        '<tr><td class="col pad" valign="middle" style="padding:30px 8px 34px 32px;">'
        f'<span style="display:inline-block;padding:6px 14px;border-radius:999px;background:{W_TEAL_DK};font-family:{nunito};font-size:12px;font-weight:800;letter-spacing:1px;color:{W_CREAM};">TOY BOX REFRESH</span>'
        f'<h2 style="margin:16px 0 12px;font-family:{titan};font-weight:400;font-size:46px;line-height:1;color:{W_TEAL_DK};">Any 2 toys<br>for €20</h2>'
        f'<p style="margin:0 0 22px;font-family:{nunito};font-size:16px;line-height:1.6;color:{W_INK};">Squeakers, tuggers and ball-chasers. Mix, match and let them choose.</p>'
        + waggle_pill('Pick their favourites &#8594;', W_TEAL_DK, W_CREAM) + '</td>'
        '<td class="col" width="290" valign="bottom" style="font-size:0;line-height:0;"><img src="waggle-retriever.webp" width="290" height="309" alt="A golden retriever leaping to catch a pink ball" style="width:290px;height:auto;"></td></tr>')
    + '</td></tr>',
    waggle_scallop('waggle-scallop-sun'),

    f'<tr><td class="pad" align="center" style="background:{W_CREAM};padding:34px 28px 0;">'
    f'<h2 style="margin:0;font-family:{titan};font-weight:400;font-size:38px;line-height:1.05;color:{W_TEAL_DK};">Meet the pack</h2>'
    f'<p style="margin:10px 0 0;font-family:{nunito};font-size:16px;line-height:1.6;color:{W_INK};">Tag your photos with <strong style="color:{W_ROSE};">#WagglePack</strong>. Every month we feature our favourites right here.</p></td></tr>'
    f'<tr><td style="background:{W_CREAM};padding:6px 0 18px;font-size:0;line-height:0;"><img src="waggle-pack.webp" width="600" height="320" alt="Polaroids of a woman hugging a corgi, a man holding a tabby cat, and a girl with a samoyed puppy" style="width:100%;height:auto;"></td></tr>',

    f'<tr><td style="background:{W_CORAL};padding:0;">' + T(
        '<tr><td class="col pad" valign="middle" style="padding:40px 8px 40px 32px;">'
        f'<h2 style="margin:0 0 12px;font-family:{titan};font-weight:400;font-size:34px;line-height:1.05;color:{W_TEAL_DK};">Every order feeds a rescue pup</h2>'
        f'<p style="margin:0 0 22px;font-family:{nunito};font-size:16px;line-height:1.6;color:{W_INK};">This month, every order sends a meal to Harbour Paws Rescue, where 80 dogs are waiting to meet their people.</p>'
        + waggle_pill('Meet the rescue &#8594;', W_CREAM, W_TEAL_DK) + '</td>'
        '<td class="col" width="260" valign="middle" style="font-size:0;line-height:0;"><img src="waggle-rescue.webp" width="260" height="316" alt="A shelter volunteer hugging a scruffy brown rescue dog" style="width:260px;height:auto;"></td></tr>')
    + '</td></tr>',

    f'<tr><td class="pad" align="center" style="background:{W_TEAL_DK};padding:38px 32px 36px;">'
    f'<div style="font-family:{titan};font-size:34px;line-height:1;color:{W_SUN};">waggle<span style="color:{W_CORAL};">&#9679;</span></div>'
    f'<p style="margin:16px 0 0;font-family:{nunito};font-size:14px;font-weight:700;color:{W_CREAM};">'
    f'<a href="{URL}" style="color:inherit;text-decoration:none;">Shop</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">Rescue</a> &nbsp;·&nbsp; '
    f'<a href="{URL}" style="color:inherit;text-decoration:none;">Instagram</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;text-decoration:none;">TikTok</a></p>'
    f'<p style="margin:16px 0 0;font-family:{nunito};font-size:12px;line-height:1.7;color:#a9cbc6;">An independent email design concept. Waggle and Harbour Paws Rescue are fictional.<br>'
    f'<a href="{URL}" style="color:inherit;">Preferences</a> &nbsp;·&nbsp; <a href="{URL}" style="color:inherit;">Unsubscribe</a></p></td></tr>',
])
shell('waggle', 'Waggle | Welcome to the pack', 'Take 15% off your first order with WAGGLE15.', W_TEAL_DK,
      'family=Titan+One&family=Nunito:wght@600;700;800', waggle)


print('Built ten HTML email concepts.')
