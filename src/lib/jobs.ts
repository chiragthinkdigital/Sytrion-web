export interface JobOpening {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  summary: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  is_published: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface JobInput {
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  summary: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  is_published: boolean;
}

export type NormalizedJob = { value: JobInput } | { error: string };

function optionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeJobInput(
  body: unknown,
  defaultPublished = true
): NormalizedJob {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const title = optionalText(input.title);
  const description = optionalText(input.description);

  if (!title) return { error: "Job title is required." };
  if (title.length > 255) return { error: "Job title is too long." };
  if (!description) return { error: "Job description is required." };

  const publishedValue = input.is_published;
  const isPublished =
    typeof publishedValue === "boolean"
      ? publishedValue
      : typeof publishedValue === "number"
        ? publishedValue === 1
        : defaultPublished;

  return {
    value: {
      title,
      department: optionalText(input.department),
      location: optionalText(input.location),
      employment_type: optionalText(input.employment_type),
      experience_level: optionalText(input.experience_level),
      summary: optionalText(input.summary),
      description,
      responsibilities: optionalText(input.responsibilities),
      requirements: optionalText(input.requirements),
      is_published: isPublished,
    },
  };
}
