import { nowIso } from "@/shared/lib/time";

type RawProgress = Record<string, unknown>;

function migrateV1toV2(raw: RawProgress): RawProgress {
  return {
    ...raw,
    schemaVersion: 2,
    interactionResults: raw["interactionResults"] ?? {},
    assessmentResults: raw["assessmentResults"] ?? [],
    updatedAt: raw["updatedAt"] ?? nowIso(),
  };
}

const MIGRATIONS: Record<number, (raw: RawProgress) => RawProgress> = {
  1: migrateV1toV2,
};

const CURRENT_VERSION = 2;

export function runMigrations(raw: unknown): unknown {
  if (typeof raw !== "object" || raw === null) return raw;

  let data = raw as RawProgress;
  const version =
    typeof data["schemaVersion"] === "number" ? data["schemaVersion"] : 1;

  let current = version;
  while (current < CURRENT_VERSION) {
    const migrate = MIGRATIONS[current];
    if (!migrate) break;
    data = migrate(data);
    current++;
  }
  return data;
}
