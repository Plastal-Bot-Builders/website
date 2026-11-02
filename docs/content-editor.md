# Managing events and blogs

Use Admin → Blog Posts or Events. Fill in the title, introduction and cover image, then add sections. Each section can contain text with a heading, an image with an accessible description and caption, a quote with attribution, or a bullet list (one item per line). Move up/down changes reading order. Remove only removes an unsaved section until Save is pressed.

Preview public layout uses the same renderer as the website. Publish creates a public page immediately; there is no private draft workflow in this version. Edit loads an existing entry; Save changes updates it. Event URLs remain stable when titles change. Blog slugs follow the title for new posts until manually edited, and existing slugs are preserved during editing.

Pages are `/blogs/:slug` and `/events/:slug`. New posts appear under Latest stories, while the six existing external Medium articles remain intact below them. Existing hard-coded feature pages are not automatically migrated. Past events remain editable in Admin; public upcoming events and registration retain their existing date filtering.

Use permanent hosted image URLs in production. The existing file upload endpoint writes to the backend filesystem; it requires persistent disk/object storage to survive a Render redeploy. The editor accepts hosted URLs so publishing does not depend on ephemeral uploads.

Deploy the backend before the frontend: older schemas discard new fields. Existing records remain readable without migration. New story pages are currently client-rendered; they are not yet included in the static build-time sitemap/prerender manifest. Do not mistake this content-editing feature for complete dynamic-content SEO.

Checks: `node --test backend/models/StorySection.test.js`; frontend Story and events tests via react-scripts test; production build. Database tests use schema validation only and do not write live records.
