# Generates the original music + sound effects used by the LanguageFun video.
# Usage: python3 remotion/lingo/make_audio.py public/remotion/lingo
# (then convert music.wav to music.mp3 with: npx remotion ffmpeg -i music.wav music.mp3)
import sys, wave
import numpy as np

OUT = sys.argv[1]
SR = 44100
rng = np.random.default_rng(7)

def write(name, x):
    x = np.clip(x / max(1e-9, np.max(np.abs(x))) * 0.9, -1, 1)
    with wave.open(f"{OUT}/{name}.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def t(dur): return np.arange(int(SR * dur)) / SR
def env(n, a=0.002, d=0.2):
    tt = np.arange(n) / SR
    return np.minimum(1, tt / a) * np.exp(-tt / d)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def pulse(f, tt, duty=0.5): return np.where((f * tt) % 1 < duty, 1.0, -1.0)
def tri(f, tt): return 2 * np.abs(2 * ((f * tt) % 1) - 1) - 1

# ---------- Music: 120 BPM, 20 s ----------
BPM = 120; BEAT = 60 / BPM; DUR = 20.0
mix = np.zeros(int(SR * DUR))
def add(x, start, gain=1.0):
    i = int(start * SR); j = min(len(mix), i + len(x))
    if i < len(mix): mix[i:j] += x[: j - i] * gain

def kick():
    tt = t(0.35); f = 50 + 110 * np.exp(-tt * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.001, 0.12)
def snare():
    tt = t(0.25); n = rng.standard_normal(len(tt))
    n = n - np.concatenate([[0], n[:-1]])  # brighten
    return (n * 0.5 + np.sin(2 * np.pi * 190 * tt)) * env(len(tt), 0.001, 0.07)
def hat():
    tt = t(0.06); n = rng.standard_normal(len(tt))
    n = n - np.concatenate([[0], n[:-1]])
    return n * env(len(tt), 0.0005, 0.015)
def pluck(m, dur, kind="pulse", d=0.12):
    tt = t(dur); f = hz(m)
    w = pulse(f, tt, 0.25) if kind == "pulse" else tri(f, tt)
    return w * env(len(tt), 0.003, d)

# C - G - Am - F, one chord per bar (4 beats)
prog = [(48, [60, 64, 67, 72]), (43, [59, 62, 67, 71]), (45, [60, 64, 69, 72]), (41, [60, 65, 69, 72])]
penta = [72, 74, 76, 79, 81, 84]
nbeats = int(DUR / BEAT)
for b in range(nbeats):
    bar = b // 4
    root, chord = prog[bar % 4]
    s = b * BEAT
    final = s >= 18.0
    if not final:
        add(kick(), s, 0.9)
        if b % 2 == 1: add(snare(), s, 0.45)
        for e in range(2): add(hat(), s + e * BEAT / 2, 0.18 + 0.1 * e)
        # bouncy octave bass on 8ths
        add(pluck(root, BEAT / 2, "tri", 0.15), s, 0.55)
        add(pluck(root + 12, BEAT / 2, "tri", 0.1), s + BEAT / 2, 0.4)
        # melody: chord tones + pentatonic, 8ths with some rests
        if b >= 2:
            for e in range(2):
                if rng.random() < 0.8:
                    m = rng.choice(chord + penta[:3]) if e == 0 else rng.choice(penta)
                    add(pluck(int(m), BEAT / 2, "pulse", 0.09), s + e * BEAT / 2, 0.16)
# Ending: big C major hit at 18.4 s, ringing out
for m in [48, 60, 64, 67, 72, 76]:
    add(pluck(m, 1.5, "pulse", 0.5), 18.4, 0.18)
add(kick(), 18.4, 1.0); add(snare(), 18.4, 0.6)
fade = np.ones_like(mix); fl = int(SR * 0.4); fade[-fl:] = np.linspace(1, 0, fl)
write("music", mix * fade)

# ---------- Sound effects ----------
tt = t(0.12); f = 400 + 1400 * (tt / tt[-1]) ** 0.5
write("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.001, 0.04))

tt = t(0.6)
ding = sum(np.sin(2 * np.pi * hz(m) * tt) for m in (84, 88, 91)) * env(len(tt), 0.001, 0.25)
write("ding", ding)

tt = t(0.25)
clink = (np.sin(2 * np.pi * 2637 * tt) + 0.6 * np.sin(2 * np.pi * 3520 * tt)) * env(len(tt), 0.0005, 0.06)
write("clink", clink)

tt = t(0.35); n = rng.standard_normal(len(tt))
# whoosh: noise through a sweeping one-pole lowpass
cut = 0.02 + 0.5 * np.sin(np.pi * tt / tt[-1]) ** 2
y = np.zeros_like(n); acc = 0.0
for i in range(len(n)):
    acc += cut[i] * (n[i] - acc); y[i] = acc
write("whoosh", y * np.sin(np.pi * tt / tt[-1]))

tt = t(0.3); f = 200 + 600 * (tt / tt[-1])
write("boing", np.sin(2 * np.pi * np.cumsum(f + 60 * np.sin(2 * np.pi * 18 * tt)) / SR) * env(len(tt), 0.002, 0.12))
