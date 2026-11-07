"""Prepare images (crop, tint, rounded corners) and draw icons/decor for the deck."""
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, 'src')
OUT = os.path.join(BASE, 'assets')
os.makedirs(OUT, exist_ok=True)
DPI = 200
WINE = (110, 44, 63)
BLUSH = (246, 220, 220)


def crop_to(img, w_in, h_in, fx=0.5, fy=0.5):
    tw, th = int(w_in * DPI), int(h_in * DPI)
    r = tw / th
    W, H = img.size
    if W / H > r:
        cw, ch = int(H * r), H
    else:
        cw, ch = W, int(W / r)
    x = int(max(0, min(W - cw, fx * W - cw / 2)))
    y = int(max(0, min(H - ch, fy * H - ch / 2)))
    return img.crop((x, y, x + cw, y + ch)).resize((tw, th), Image.LANCZOS)


def tint(img, amount=0.07):
    over = Image.new('RGB', img.size, BLUSH)
    return Image.blend(img.convert('RGB'), over, amount)


def rounded(img, radius_in=0.18):
    rad = int(radius_in * DPI)
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.size[0] - 1, img.size[1] - 1), rad, fill=255)
    out = img.convert('RGBA')
    out.putalpha(mask)
    return out


def photo(name, src, w, h, fx=0.5, fy=0.5, radius=0.18, amount=0.07, region=None):
    img = Image.open(os.path.join(SRC, src)).convert('RGB')
    if region:
        img = img.crop(region)
    img = tint(crop_to(img, w, h, fx, fy), amount)
    if radius:
        img = rounded(img, radius)
        img.save(os.path.join(OUT, name + '.png'))
    else:
        img.save(os.path.join(OUT, name + '.jpg'), quality=88)


def blob(name, w=1800, h=1800):
    """Soft blush/sage gradient orb (decorative), fully faded at the edges."""
    im = Image.new('RGBA', (w, h), (247, 196, 199, 0))
    d = ImageDraw.Draw(im)
    d.ellipse((380, 380, w - 380, h - 380), fill=(247, 196, 199, 210))
    d.ellipse((w * 0.5, h * 0.52, w - 360, h - 360), fill=(225, 230, 196, 170))
    d.ellipse((420, 420, w * 0.6, h * 0.6), fill=(250, 214, 214, 200))
    im = im.filter(ImageFilter.GaussianBlur(120))
    im.save(os.path.join(OUT, name + '.png'))


def divider(name):
    s = 4
    W, H = 900 * s, 90 * s
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cy = H // 2
    st = 3 * s
    # wavy line left and right of a heart
    for side in (-1, 1):
        pts = []
        for i in range(0, 380 * s, s):
            x = W // 2 + side * (60 * s + i)
            y = cy + math.sin(i / (38.0 * s)) * 9 * s * (1 - i / (380 * s))
            pts.append((x, y))
        d.line(pts, fill=WINE + (255,), width=st)
    # heart outline
    hp = []
    for t in range(0, 360, 3):
        a = math.radians(t)
        x = 16 * math.sin(a) ** 3
        y = 13 * math.cos(a) - 5 * math.cos(2 * a) - 2 * math.cos(3 * a) - math.cos(4 * a)
        hp.append((W // 2 + x * 2.1 * s, cy - y * 2.1 * s))
    d.line(hp + [hp[0]], fill=WINE + (255,), width=st)
    im.resize((W // s, H // s), Image.LANCZOS).save(os.path.join(OUT, name + '.png'))


def icon(name, kind, color=WINE):
    s = 4
    N = 200 * s
    im = Image.new('RGBA', (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c = color + (255,)
    w = 9 * s
    S = lambda *v: [x * s for x in v]
    if kind == 'cup':
        body = [(40, 84), (130, 84), (130, 125)]
        body += [(85 + 45 * math.cos(math.radians(a)), 125 + 35 * math.sin(math.radians(a))) for a in range(0, 181, 5)]
        body += [(40, 84)]
        d.line([(x * s, y * s) for x, y in body], fill=c, width=w, joint='curve')
        d.arc(S(116, 92, 160, 136), -90, 90, fill=c, width=w)
        d.line(S(25, 178, 145, 178), fill=c, width=w)
        for x in (65, 88, 111):
            pts = [((x + 6 * math.sin(t / 5.0)) * s, (66 - t) * s) for t in [i / 2 for i in range(0, 64)]]
            d.line(pts, fill=c, width=int(w * 0.75), joint='curve')
    elif kind == 'books':
        d.rounded_rectangle(S(30, 130, 170, 165), 8 * s, outline=c, width=w)
        d.rounded_rectangle(S(42, 92, 160, 128), 8 * s, outline=c, width=w)
        d.rounded_rectangle(S(36, 54, 150, 90), 8 * s, outline=c, width=w)
        for y in (147, 110, 72):
            d.line(S(55, y, 120, y), fill=c, width=int(w * 0.6))
    elif kind == 'heart':
        hp = []
        for t in range(0, 360, 2):
            a = math.radians(t)
            x = 16 * math.sin(a) ** 3
            y = 13 * math.cos(a) - 5 * math.cos(2 * a) - 2 * math.cos(3 * a) - math.cos(4 * a)
            hp.append(((100 + x * 5.2) * s, (95 - y * 5.2) * s))
        d.line(hp + [hp[0]], fill=c, width=w, joint='curve')
        d.line(S(28, 100, 70, 100, 82, 72, 98, 128, 112, 88, 122, 100, 172, 100), fill=c, width=int(w * 0.85), joint='curve')
    elif kind == 'gift':
        d.rectangle(S(38, 95, 162, 172), outline=c, width=w)
        d.rectangle(S(28, 70, 172, 97), outline=c, width=w)
        d.line(S(100, 70, 100, 172), fill=c, width=w)
        d.ellipse(S(62, 36, 100, 70), outline=c, width=w)
        d.ellipse(S(100, 36, 138, 70), outline=c, width=w)
    elif kind == 'plane':
        pts = [(0, -78), (9, -60), (9, -18), (78, 18), (78, 32), (9, 14), (9, 52), (28, 68), (28, 78),
               (0, 68), (-28, 78), (-28, 68), (-9, 52), (-9, 14), (-78, 32), (-78, 18), (-9, -18), (-9, -60)]
        a = math.radians(45)
        rot = [((100 + x * math.cos(a) - y * math.sin(a)) * s, (100 + x * math.sin(a) + y * math.cos(a)) * s) for x, y in pts]
        d.line(rot + [rot[0]], fill=c, width=w, joint='curve')
    elif kind == 'palette':
        d.ellipse(S(25, 35, 175, 170), outline=c, width=w)
        d.ellipse(S(110, 110, 150, 148), fill=(0, 0, 0, 0), outline=c, width=w)
        for (x, y) in ((65, 70), (100, 58), (135, 72), (58, 112)):
            d.ellipse(S(x - 11, y - 11, x + 11, y + 11), outline=c, width=int(w * 0.8))
    elif kind == 'check':
        d.ellipse(S(15, 15, 185, 185), fill=color + (255,))
        d.line(S(58, 102, 88, 132, 145, 72), fill=(255, 255, 255, 255), width=16 * s, joint='curve')
    im.resize((N // s, N // s), Image.LANCZOS).save(os.path.join(OUT, 'icon_' + name + '.png'))


if __name__ == '__main__':
    # user photos
    photo('s1_cover', 'cover_dinner.jpg', 6.1, 7.5, fx=0.5, fy=0.55, radius=0, amount=0.05)
    photo('s3_tea', 'tea_gathering.jpg', 4.7, 6.1, fx=0.5, fy=0.5, radius=0.22, amount=0.04)
    photo('s8_books', 'tea_gathering.jpg', 2.9, 2.35, fx=0.5, fy=1.0, radius=0.16, amount=0.04)
    photo('s10_arms', 'mosque_group.jpg', 5.9, 5.0, fx=0.5, fy=0.74, radius=0.22, amount=0.05)
    # stock
    photo('s2_blossom', '1522383225653-ed111181a951.jpg', 13.333, 7.5, radius=0, amount=0.10)
    photo('s4_tulips', '1561181286-d3fee7d55364.jpg', 3.6, 3.0, fx=0.5, fy=0.62, radius=0.2)
    photo('s5_bouquet', '1563241527-3004b7be0ffd.jpg', 4.3, 6.0, fx=0.5, fy=0.55, radius=0.22)
    photo('s7_coffee', '1509042239860-f550ce710b93.jpg', 4.6, 3.05, fx=0.5, fy=0.55, radius=0.2)
    photo('s8_forest', '1441974231531-c6227db76b6e.jpg', 2.9, 2.35, radius=0.16)
    photo('s8_brushes', '1513364776144-60967b0f800f.jpg', 2.9, 2.35, fx=0.6, radius=0.16)
    photo('s8_blossom', '1462275646964-a0e3386b89fa.jpg', 2.9, 2.35, radius=0.16)
    photo('s10_bouquet', '1487530811176-3780de880c2d.jpg', 1.7, 1.7, radius=0.85)
    blob('blob')
    divider('divider')
    for k in ('cup', 'books', 'heart', 'gift', 'plane', 'palette'):
        icon(k, k)
    icon('check', 'check', (201, 123, 132))
    print('assets ok')
