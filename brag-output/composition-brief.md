# Hyperframes Composition Brief: Reverse Sales Tax Calculator

## Objective
Create a short, polished, Apple-style launch video for the Reverse Sales Tax Calculator.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080 (30 fps)
- Duration: 25.0 seconds

## Source Material
- Project root: `C:\All Websites\reverse-tax-calculator`
- Primary files read: `src/app/(site)/page.tsx`, `src/app/globals.css`, `src/components/calculator/CalculatorCard.tsx`, `src/components/calculator/BasicTab.tsx`, `src/lib/taxCalc.ts`, `src/data/stateTaxRates.ts`
- Product name: Reverse Sales Tax Calculator
- Tagline / strongest claim: "Find the pre-tax price from any receipt total instantly. 100% Client-Side Private."
- Key UI to recreate: The interactive `CalculatorCard` with the 3-card result breakdown (`Original price: $100.00`, `Tax amount: $8.25`, `Total paid: $108.25`), the state selector, and quick percentage chips (`6%`, `7%`, `8.25%`, `10%`).
- Copy that must appear verbatim:
  - "Reverse Sales Tax Calculator"
  - "$108.25"
  - "8.25%"
  - "$100.00"
  - "$8.25"
  - "salestaxreversecalculator.com"

## Creative Direction
- Tone preset: `polished`
- Creative direction: Clean, elegant, premium Apple-style product film
- Interpretation: Restraint, precision, clean white space, rich emerald accents, smooth cubic-bezier easing, and crystal-clear tabular typography.
- Angle: Even a utility tool can feel like high-end craftsmanship when built with speed, privacy, and zero friction.
- Hook: A receipt total of $108.25 posing the question: "You know what you paid. But what was the real price?"
- Outro: The bold emerald brand lockup with the free tool domain `salestaxreversecalculator.com`.
- Avoid:
  - Generic SaaS buzzwords
  - Abstract 3D filler shapes
  - Cluttered screens or tiny unreadable text

## Visual Identity
- Background: Canvas Soft `#f7f7f7` and Pure Canvas `#ffffff` for UI scenes; Deep Emerald `#00482f` / `#005a36` for cinematic intro & outro.
- Text: Deep Ink `#111827`, White `#ffffff`, and Muted Gray `#52525b`.
- Accent: Brand Emerald `#008254` with Lime Highlight `#a8ea4c`.
- Result Highlight Card: `#008254` border (2px) and `#effcf8` soft mint surface.
- Display font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Body & Number font: Inter, SF Pro, tabular numerals

## Storyboard
Contract from `brag-plan.md`:
1. **Scene 1 (0.0s – 5.0s, 5s)**: Hook — Deep spruce studio backdrop. Receipt total `$108.25` appears. Text: "You know what you paid. But backing out sales tax shouldn't require guesswork."
2. **Scene 2 (5.0s – 12.0s, 7s)**: Core Reveal — Soft canvas. Floating `CalculatorCard`. `$108.25` typed in. `8.25%` chip pressed with emerald glow. The 3 result cards animate in with pre-tax price `$100.00` prominently featured.
3. **Scene 3 (12.0s – 19.0s, 7s)**: Capabilities — State rate auto-fill (California, Texas, New York), Canada GST/HST, and VAT badges glide in. Privacy trust badge: "100% Client-Side Private · Zero Data Sent to Servers".
4. **Scene 4 (19.0s – 25.0s, 6s)**: Outro — Bold emerald brand lockup. "Reverse Sales Tax Calculator · Pre-tax clarity. Instantly free." Domain: `salestaxreversecalculator.com`.

## Audio
- Audio role: Warm, elegant tech bed with tactile UI interaction sounds and clear narration.
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` placed in `assets/music/` at -16dB under voice, fading out cleanly at 24.5s.
- Voice: Kokoro TTS audio track `voiceover.wav` placed in `assets/` and timed to scenes.
- SFX: Tactile keystroke ticks (`keypress-012.wav`), button click (`click1.ogg`), and gentle settlement accent.
- Audio files: Copied into `composition/assets/`.
