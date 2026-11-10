<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Website design craft and anti-slop guidelines

For any website or responsive interface design, redesign, implementation, animation pass, or visual audit in this project:

1. Read [Website Design Craft](.agents/skills/website-design-craft/SKILL.md) and the references relevant to the task before making visual decisions.
2. Apply the 20 AI design slop indicators as an evidence-based review, not an absolute ban on individual visual elements. Use the purposeful motion playbook selectively.
3. Design around Gustav Voigts Centre's actual visitors, verified tenants, useful wayfinding, authentic photography and approved brand identity. Do not invent business details, statistics, services, events, testimonials, logos or integration outcomes.
4. Preserve the approved City Plaza-inspired editorial direction (charcoal, white/neutral and restrained yellow accents, authentic imagery, strong typography and varied page rhythm) without copying City Plaza's identity or content. Avoid generic SaaS layouts, repeated bordered cards, gratuitous badges, gradients, tiny labels and distracting animations.
5. Keep mobile, tablet, desktop, keyboard, touch, accessibility, reduced-motion and loading/empty/error states in scope. Verify behavior and layout before reporting success.
6. If the user asks for planning or auditing only, do not implement. If asked to build, follow the existing stack, preserve working behavior and run the relevant tests.

The main skill is **general-purpose**. These Gustav Voigts Centre-specific design decisions are scoped to this repository. Source files are in `.agents/skills/website-design-craft/`.

For Gustav Voigts Centre-specific interaction work, follow [the motion contract](docs/design/motion-system.md). Never add scroll pinning or an archival frame sequence before approved source imagery is available.
