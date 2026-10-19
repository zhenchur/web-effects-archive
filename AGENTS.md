# Web effects archive

This is the standalone source for the user's «Веб архив» project.

- `main` contains editable sources; `gh-pages` contains generated demo output.
- Effects under `effects/` must be reusable without importing anything from `src/` or the original Euler project.
- Preserve approved motion, curves, transforms, fade and stagger. Change their character only when requested; do not silently optimize the Cinema 4D model.
- Add new effects through `src/registry.ts`, a dedicated `effects/<id>/` folder, documentation and a downloadable source package.
- Keep the archive as a white page with navigation and sequential effect sections. Each section has only its numbered heading (for example, «Эффект 1») and the effect itself.
- Drive effects from actual page scrolling, including reverse scrolling. Do not add settings panels, tabs, playback controls, progress sliders, descriptions or preset storage to the archive UI unless explicitly requested.
- Keep effect parameters in the integration code. Put usage instructions, technical descriptions and download details in documentation rather than in the effect sections.
- Keep exact dependency versions in the lockfile and include reproducible local startup instructions.
- Never copy private project files, credentials or commercial assets into this public repository.
- Run `npm test`, `npm run build`, and browser checks for changed interaction. Check reduced motion and reverse motion.
- Publish authorized changes with `npm run deploy` after committing and pushing source to `main`. Preserve public access to this user-authorized archive.
