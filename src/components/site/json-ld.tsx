/**
 * JsonLd — renders a schema.org block as a `<script type="application/ld+json">`
 * tag. Server-component safe; JSON.stringify output only (no raw user input).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
