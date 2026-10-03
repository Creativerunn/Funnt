export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>{eyebrow && <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-[#728078]">{eyebrow.toUpperCase()}</p>}<h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#758079] sm:text-base">{description}</p>}</div>
    {action}
  </div>;
}
