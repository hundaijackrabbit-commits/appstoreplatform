# StartOva mobile hero fix

This update fixes the mobile top-of-page problems shown in the screenshot:

- Prevents horizontal overflow on the whole page.
- Adds `min-w-0` and tighter max-width controls to the hero grid/content so text wraps correctly on iPhone Safari.
- Makes the hero feature chips stack cleanly on mobile instead of spilling off screen.
- Makes hero CTA buttons full-width on mobile with proper font sizing.
- Reduces and constrains the hero Lottie browser frame on mobile so it no longer dominates or clips awkwardly.
- Tightens mobile nav spacing and button text sizing.

Copy these files into the same paths in your project, then run:

```bash
npm run dev
```

Then commit and push:

```bash
git add .
git commit -m "Fix mobile hero responsiveness and prevent overflow"
git push origin main
```
