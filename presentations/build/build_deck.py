"""Build the Arabic (RTL) 10-slide deck for ملتقى نساء منتصف العمر الجميل."""
import os, sys
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from lxml import etree

BASE = os.path.dirname(os.path.abspath(__file__))
A = lambda n: os.path.join(BASE, 'assets', n)
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(BASE, 'deck.pptx')

CREAM = RGBColor(0xFB, 0xF4, 0xF1)
BLUSH = RGBColor(0xF6, 0xDC, 0xDC)
BLUSH2 = RGBColor(0xFD, 0xEC, 0xEB)
ROSE = RGBColor(0xC9, 0x7B, 0x84)
WINE = RGBColor(0x6E, 0x2C, 0x3F)
TEXT = RGBColor(0x5A, 0x3E, 0x45)
MUTED = RGBColor(0x8A, 0x6A, 0x70)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
SAGE = RGBColor(0xA8, 0xB8, 0x9A)

HEAD = 'Times New Roman'   # Arabic naskh glyphs on Windows & macOS
BODY = 'Tahoma'            # clear Arabic sans on Windows & macOS
CLUB = 'ملتقى نساء منتصف العمر الجميل'

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]
SW, SH = 13.333, 7.5


# ---------- helpers ----------
def bg(slide, color=CREAM):
    f = slide.background.fill
    f.solid()
    f.fore_color.rgb = color


def set_alpha(shape, alpha):
    """alpha 0-100 (opacity %) on a solid-filled shape."""
    clr = shape.fill._xPr.find(qn('a:solidFill'))[0]
    a = etree.SubElement(clr, qn('a:alpha'))
    a.set('val', str(int(alpha * 1000)))


def box(slide, x, y, w, h, color, radius=0.12, alpha=None, line=None, shape=MSO_SHAPE.ROUNDED_RECTANGLE):
    s = slide.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    s.shadow.inherit = False
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        s.adjustments[0] = min(0.5, radius / min(w, h))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    if alpha is not None:
        set_alpha(s, alpha)
    if line:
        s.line.color.rgb = line
        s.line.width = Pt(1)
    else:
        s.line.fill.background()
    s.text_frame.text = ''
    return s


def pic(slide, name, x, y, w=None, h=None):
    return slide.shapes.add_picture(A(name), Inches(x), Inches(y),
                                    Inches(w) if w else None, Inches(h) if h else None)


def text(slide, x, y, w, h, paras, anchor=MSO_ANCHOR.TOP, shape=None):
    """paras: list of (text, dict) — dict keys: size, color, bold, font, align, after, before, line."""
    if shape is None:
        shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = shape.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    tf.vertical_anchor = anchor
    for side in ('left', 'right', 'top', 'bottom'):
        setattr(tf, 'margin_' + side, 0)
    first = True
    for t, o in paras:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.alignment = o.get('align', PP_ALIGN.RIGHT)
        p._pPr if p._p.pPr is not None else p._p.get_or_add_pPr()
        p._p.get_or_add_pPr().set('rtl', '1')
        p.space_after = Pt(o.get('after', 6))
        p.space_before = Pt(o.get('before', 0))
        p.line_spacing = o.get('line', 1.15)
        r = p.add_run()
        r.text = t
        f = r.font
        f.size = Pt(o.get('size', 16))
        f.bold = o.get('bold', False)
        f.color.rgb = o.get('color', TEXT)
        fn = o.get('font', BODY)
        f.name = fn
        rPr = r._r.get_or_add_rPr()
        rPr.set('lang', 'ar-SA')
        rPr.set('altLang', 'en-US')
        cs = etree.SubElement(rPr, qn('a:cs'))
        cs.set('typeface', fn)
    return shape


def H(size=40, color=WINE, **k):
    d = dict(size=size, color=color, bold=True, font=HEAD, after=4, line=1.0)
    d.update(k)
    return d


def P(size=16, color=TEXT, **k):
    d = dict(size=size, color=color, font=BODY, after=6, line=1.3)
    d.update(k)
    return d


def chrome(slide, num):
    """Thin header line with club name (right) and heart divider (left) + page number."""
    line = slide.shapes.add_connector(1, Inches(0.7), Inches(0.62), Inches(SW - 0.7), Inches(0.62))
    line.line.color.rgb = ROSE
    line.line.width = Pt(0.75)
    text(slide, SW - 5.2, 0.3, 4.5, 0.3, [(CLUB, P(11, MUTED, after=0))])
    pic(slide, 'divider.png', 0.7, 0.4, w=1.6)
    text(slide, 0.7, SH - 0.55, 1.0, 0.3, [(f'{num:02d}', P(11, ROSE, align=PP_ALIGN.LEFT, after=0, bold=True))])


def title_block(slide, x, y, w, kicker, title, size=40):
    text(slide, x, y, w, 0.35, [(kicker, P(13, ROSE, bold=True, after=0))])
    text(slide, x, y + 0.38, w, 1.0, [(title, H(size))])


def pill(slide, x, y, w, label, fill=BLUSH, color=WINE, h=0.46, size=13):
    s = box(slide, x, y, w, h, fill, radius=h / 2)
    text(slide, 0, 0, 0, 0, [(label, P(size, color, bold=True, align=PP_ALIGN.CENTER, after=0, line=1.0))],
         anchor=MSO_ANCHOR.MIDDLE, shape=s)
    return s


# ---------- 1. Cover ----------
s = prs.slides.add_slide(BLANK); bg(s)
pic(s, 'blob.png', 5.6, -1.2, w=7.0)
pic(s, 's1_cover.jpg', 0, 0, w=6.1, h=7.5)
text(s, 6.7, 1.15, 5.9, 0.4, [('نادي تعارف نساء القلمون', P(16, ROSE, bold=True, after=0))])
text(s, 6.7, 1.7, 5.9, 2.4, [('ملتقى نساء', H(58, after=0)), ('منتصف العمر الجميل', H(58))])
pic(s, 'divider.png', 9.35, 4.05, w=3.2)
text(s, 6.7, 4.55, 5.9, 1.1, [('معًا نلتقي، نتعلّم، نضحك، نسافر، نعطي…', P(19, TEXT, after=2)),
                              ('ونعيش أجمل سنوات عمرنا', P(19, TEXT, bold=True))])
pill(s, 9.0, 6.05, 3.6, 'مساحة لكِ… ولصداقات جديدة', fill=WINE, color=WHITE, h=0.55, size=14)

# ---------- 2. Slogan ----------
s = prs.slides.add_slide(BLANK); bg(s)
pic(s, 's2_blossom.jpg', 0, 0, w=SW, h=SH)
panel = box(s, 2.4, 1.35, 8.53, 4.8, CREAM, radius=0.35, alpha=88)
text(s, 2.9, 1.8, 7.53, 0.4, [('شعارنا', P(16, ROSE, bold=True, align=PP_ALIGN.CENTER, after=0))])
text(s, 2.9, 2.35, 7.53, 1.9, [('منتصف العمر ليس منتصف الحكاية…', H(40, align=PP_ALIGN.CENTER, after=6)),
                               ('بل بداية فصل أجمل', H(46, ROSE, align=PP_ALIGN.CENTER))])
pic(s, 'divider.png', 5.07, 4.3, w=3.2)
text(s, 2.9, 4.8, 7.53, 0.9, [('معًا نلتقي، نتعلّم، نضحك، نسافر، نعطي… ونعيش أجمل سنوات عمرنا', P(17, TEXT, align=PP_ALIGN.CENTER))])

# ---------- 3. Mission ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 3)
pic(s, 'blob.png', -1.6, 3.2, w=5.5)
pic(s, 's3_tea.png', 0.9, 0.95, w=4.7, h=6.1)
title_block(s, 6.2, 1.15, 6.4, 'من نحن', 'رسالتنا')
text(s, 6.2, 2.55, 6.4, 3.0, [
    ('الملتقى مساحة دافئة وآمنة تجمع نساء منتصف العمر في أجواء من الألفة والاحترام والتقدير، لنحتفي معًا بهذه المرحلة الجميلة من الحياة.', P(17, after=12)),
    ('نؤمن أن منتصف العمر ليس مرحلة للتراجع، بل بداية جديدة مليئة بالنضج والوعي والاختيارات الجميلة؛ ومن هنا جاء النادي ليمنح المرأة حياة أكثر توازنًا ورضا وإشراقًا وسلامًا.', P(17)),
])
for i, lab in enumerate(['صداقة وتعارف', 'متعة وترفيه', 'تبادل خبرات', 'مبادرات اجتماعية']):
    pill(s, 12.6 - (i + 1) * 1.62 + 0.0, 5.95, 1.5, lab, size=12)

# ---------- 4. Why ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 4)
pic(s, 's4_tulips.png', 0.9, 0.95, w=3.6, h=3.0)
title_block(s, 5.2, 1.0, 7.4, 'لماذا الملتقى؟', 'لأن كل امرأة تستحق مساحتها')
text(s, 5.2, 2.45, 7.4, 1.4, [('في زحمة الحياة ومسؤولياتها، تحتاج المرأة إلى مكان تشعر فيه بالترحيب والانتماء، وإلى صديقات يشاركنها الضحكة والتجربة. الصداقة في هذه المرحلة تمنح الحياة توازنًا ورضا وإشراقًا.', P(16))])
cards = [('١', 'كسر العزلة', 'تعزيز التواصل بين النساء وبناء علاقات اجتماعية إيجابية ودائمة.'),
         ('٢', 'الانتماء والترحيب', 'بيئة آمنة تحتضن كل امرأة وتحتفي بها كما هي، دون أحكام.'),
         ('٣', 'النضج والوعي', 'نحتفي بمنتصف العمر كبداية جديدة مليئة بالاختيارات الجميلة.')]
cw, gap, cy = 3.7, 0.2, 4.35
for i, (n, t, d) in enumerate(cards):
    x = SW - 0.7 - (i + 1) * cw - i * gap
    c = box(s, x, cy, cw, 2.45, BLUSH2, radius=0.22)
    text(s, x + 0.3, cy + 0.25, cw - 0.6, 0.6, [(n, H(30, ROSE))])
    text(s, x + 0.3, cy + 0.85, cw - 0.6, 0.5, [(t, H(22))])
    text(s, x + 0.3, cy + 1.4, cw - 0.6, 1.0, [(d, P(14))])

# ---------- 5. Goals ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 5)
pic(s, 'blob.png', -1.0, -1.0, w=5.5)
pic(s, 's5_bouquet.png', 0.9, 0.95, w=4.3, h=6.0)
title_block(s, 5.8, 0.95, 6.8, 'إلى أين نمضي', 'أهداف الملتقى')
text(s, 5.8, 2.3, 6.8, 0.5, [('أهدافنا تنطلق من رغبتنا في حياة أكثر توازنًا وصحة وفرحًا لكل امرأة.', P(16))])
goals = [('مجتمع نسائي متماسك', 'صداقات وعلاقات إيجابية، وبيئة تشعر فيها كل امرأة بالانتماء.'),
         ('صحة وعافية', 'الاهتمام بالذات والصحة الجسدية والنفسية، وتشجيع الحركة والعادات الصحية.'),
         ('تجارب وذكريات', 'لقاءات ورحلات ونزهات، واكتشاف أماكن وتجارب جديدة تعزز روح الصداقة.'),
         ('عطاء ومشاركة', 'مبادرات اجتماعية ومشاركة مجتمعية تنشر الخير وتعمّق معنى العطاء.')]
gw, gh = 3.3, 1.85
for i, (t, d) in enumerate(goals):
    col, row = i % 2, i // 2
    x = SW - 0.7 - (col + 1) * gw - col * 0.2
    y = 3.05 + row * (gh + 0.2)
    box(s, x, y, gw, gh, BLUSH2 if (col + row) % 2 == 0 else BLUSH, radius=0.2)
    box(s, x + gw - 0.32, y + 0.32, 0.12, 0.42, ROSE, radius=0.06)
    text(s, x + 0.25, y + 0.25, gw - 0.7, 0.5, [(t, H(19))])
    text(s, x + 0.25, y + 0.8, gw - 0.5, 1.0, [(d, P(13, line=1.25))])

# ---------- 6. Six pillars ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 6)
pic(s, 'blob.png', 9.5, 3.8, w=5.0)
text(s, 0.7, 0.95, SW - 1.4, 0.35, [('ماذا نقدّم', P(13, ROSE, bold=True, align=PP_ALIGN.CENTER, after=0))])
text(s, 0.7, 1.32, SW - 1.4, 0.8, [('محاور الملتقى', H(40, align=PP_ALIGN.CENTER))])
text(s, 0.7, 2.12, SW - 1.4, 0.5, [('ستة محاور تشكّل روح الملتقى وأنشطته على مدار العام.', P(16, align=PP_ALIGN.CENTER))])
tiles = [('cup', 'لقاءات اجتماعية', 'قهوة وأحاديث وصداقات جديدة'),
         ('books', 'ثقافة وتطوير', 'نقاشات وكتب وتبادل للمعرفة'),
         ('heart', 'صحة وعافية', 'مشي جماعي وعادات صحية'),
         ('gift', 'عطاء ومبادرات', 'مبادرات تخدم مجتمعنا'),
         ('plane', 'رحلات وتجارب', 'نزهات ورحلات قصيرة'),
         ('palette', 'هوايات وإبداع', 'مواهب ومهارات ومشاريع')]
tw, th = 3.75, 1.85
x0 = (SW - (3 * tw + 2 * 0.3)) / 2
for i, (ic, t, d) in enumerate(tiles):
    col, row = i % 3, i // 3
    x = SW - x0 - (col + 1) * tw - col * 0.3
    y = 2.85 + row * (th + 0.3)
    box(s, x, y, tw, th, WHITE, radius=0.25, line=BLUSH)
    box(s, x + 0.3, y + 0.38, 1.1, 1.1, BLUSH2, radius=0.55)
    pic(s, f'icon_{ic}.png', x + 0.42, y + 0.5, w=0.86)
    text(s, x + 1.6, y + 0.45, tw - 1.9, 0.5, [(t, H(21))])
    text(s, x + 1.6, y + 1.0, tw - 1.9, 0.7, [(d, P(13, MUTED))])

# ---------- 7. Monthly meeting ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 7)
pic(s, 's7_coffee.png', 0.9, 0.95, w=4.6, h=3.05)
title_block(s, 6.0, 1.0, 6.6, 'كيف نلتقي', 'رحلة اللقاء الشهري')
text(s, 6.0, 2.45, 6.6, 1.5, [('لقاء رئيسي مرة كل شهر، نلتقي فيه بقلوب مفتوحة لنتعارف ونتحاور ونصنع معًا ذكريات جميلة، في أجواء يسودها الاحترام والدفء.', P(16))])
steps = [('١', 'استقبال وتعارف', 'ترحيب بالعضوات والتعرّف على الصديقات الجديدات.'),
         ('٢', 'قهوة وصداقة', 'أحاديث دافئة حول فنجان قهوة.'),
         ('٣', 'موضوع اللقاء', 'نقاش ومشاركة حول موضوع رئيسي نختاره معًا.'),
         ('٤', 'ضيافة ووقت مفتوح', 'وقت اجتماعي حر ولحظات من الفرح.')]
sw_, y = 2.85, 4.55
ln = s.shapes.add_connector(1, Inches(1.6), Inches(y + 0.35), Inches(SW - 1.6), Inches(y + 0.35))
ln.line.color.rgb = ROSE; ln.line.width = Pt(1.25); ln.line.dash_style = 4
for i, (n, t, d) in enumerate(steps):
    x = SW - 0.7 - (i + 1) * sw_ - i * 0.1
    cx = x + sw_ / 2
    c = box(s, cx - 0.35, y, 0.7, 0.7, WINE if i == 0 else ROSE, shape=MSO_SHAPE.OVAL)
    text(s, 0, 0, 0, 0, [(n, H(20, WHITE, align=PP_ALIGN.CENTER, after=0))], anchor=MSO_ANCHOR.MIDDLE, shape=c)
    text(s, x + 0.1, y + 0.9, sw_ - 0.2, 0.45, [(t, H(20, align=PP_ALIGN.CENTER))])
    text(s, x + 0.2, y + 1.4, sw_ - 0.4, 0.9, [(d, P(13, MUTED, align=PP_ALIGN.CENTER))])

# ---------- 8. Activities ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 8)
grid = [('s8_books.png', 'ثقافة وكتب'), ('s8_forest.png', 'مشي ونزهات'),
        ('s8_brushes.png', 'هوايات وإبداع'), ('s8_blossom.png', 'رحلات وفعاليات موسمية')]
for i, (img, lab) in enumerate(grid):
    col, row = i % 2, i // 2
    x = 0.9 + (1 - col) * 3.1
    y = 1.0 + row * 2.55
    pic(s, img, x, y, w=2.9, h=2.35)
    pill(s, x + 0.15, y + 1.8, 2.6, lab, fill=CREAM, size=12, h=0.4)
title_block(s, 7.3, 1.0, 5.3, 'نعيش التجربة', 'أنشطة وفعاليات')
text(s, 7.3, 2.45, 5.3, 1.2, [('إلى جانب اللقاء الشهري، نعيش معًا تجارب متنوعة تثري أرواحنا وتجدد طاقتنا وتكشف لنا اهتمامات جديدة.', P(16))])
acts = [('مشي جماعي ونزهات في الطبيعة', ''),
        ('زيارة معرض أو متحف', ''),
        ('امرأة تلهم امرأة', 'فرصة لكل عضوة لتعرّف بموهبتها أو مهارتها أو مشروعها.'),
        ('رحلات قصيرة وفعاليات موسمية', 'ومناسبات خاصة بالنادي نحتفل بها معًا.')]
y = 3.75
for t, d in acts:
    box(s, 12.42, y + 0.1, 0.18, 0.18, ROSE, shape=MSO_SHAPE.OVAL)
    paras = [(t, P(16, WINE, bold=True, after=0))]
    if d:
        paras.append((d, P(13, MUTED, after=0)))
    text(s, 7.3, y, 4.95, 0.8, paras)
    y += 0.82 if d else 0.5

# ---------- 9. Membership ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 9)
pic(s, 'blob.png', 8.4, 2.0, w=5.8)
title_block(s, 8.0, 1.0, 4.6, 'العضوية', 'من يمكنها الانضمام؟', size=34)
text(s, 8.0, 2.35, 4.6, 3.0, [('النادي مفتوح للنساء في مرحلة منتصف العمر من القلمون، ولكل امرأة تجد نفسها منسجمة مع رسالة النادي، وترغب في بناء حياة اجتماعية وثقافية وصحية أكثر جمالًا وحيوية.', P(17))])
pill(s, 9.4, 5.2, 3.2, 'أهلًا بكِ بيننا', fill=WINE, color=WHITE, h=0.55, size=15)
box(s, 0.7, 1.0, 6.9, 5.85, WHITE, radius=0.3, line=BLUSH)
text(s, 1.0, 1.25, 6.3, 0.6, [('مبادئ العضوية', H(28))])
text(s, 1.0, 1.85, 6.3, 0.4, [('نلتزم جميعًا بـ:', P(15, MUTED))])
pr = ['الاحترام المتبادل', 'الخصوصية وعدم نقل الأحاديث الشخصية خارج النادي', 'تقبّل الاختلاف',
      'عدم إصدار الأحكام على الآخرين', 'نشر الطاقة الإيجابية وتشجيع بعضنا بعضًا', 'المحافظة على روح الأخوّة والصداقة']
for i, t in enumerate(pr):
    y = 2.45 + i * 0.68
    pic(s, 'icon_check.png', 6.75, y + 0.04, w=0.42)
    text(s, 1.0, y, 5.6, 0.6, [(t, P(15, TEXT, after=0))], anchor=MSO_ANCHOR.MIDDLE)

# ---------- 10. Vision & closing ----------
s = prs.slides.add_slide(BLANK); bg(s); chrome(s, 10)
pic(s, 's10_arms.png', 0.9, 0.95, w=5.9, h=5.0)
pic(s, 's10_bouquet.png', 5.6, 4.85, w=1.7, h=1.7)
title_block(s, 7.4, 1.0, 5.2, 'إلى أين نطمح', 'رؤيتنا')
text(s, 7.4, 2.45, 5.2, 2.6, [('أن يصبح ملتقى نساء منتصف العمر الجميل مجتمعًا نسائيًا مميزًا، تجد فيه المرأة الصداقة والمعرفة والمتعة والدعم، وتكتشف أن أجمل الفصول قد تبدأ عندما نمنح أنفسنا فرصة جديدة.', P(18, line=1.35))])
band = box(s, 7.4, 5.15, 5.2, 1.3, WINE, radius=0.25)
text(s, 0, 0, 0, 0, [('مساحة لكِ… ولصداقات جديدة… ولحياة أجمل', H(22, WHITE, align=PP_ALIGN.CENTER, after=2)),
                     ('شكرًا لكُنّ 🌷'.replace(' 🌷', ''), P(14, BLUSH, align=PP_ALIGN.CENTER, after=0))],
     anchor=MSO_ANCHOR.MIDDLE, shape=band)

# strip theme shadows from every shape/connector
for sl in prs.slides:
    for sh in sl.shapes:
        spPr = sh._element.find(qn('p:spPr'))
        if spPr is not None and spPr.find(qn('a:effectLst')) is None:
            eff = etree.SubElement(spPr, qn('a:effectLst'))
            # effectLst must precede scene3d/sp3d/extLst; move before them if present
            for tag in ('a:scene3d', 'a:sp3d', 'a:extLst'):
                el = spPr.find(qn(tag))
                if el is not None:
                    el.addprevious(eff); break
        st = sh._element.find(qn('p:style'))
        if st is not None:
            sh._element.remove(st)
prs.save(OUT)
print('saved', OUT, len(prs.slides), 'slides')
