import * as db from "../data/dbService";

export async function createSpec(name: string, userId: string) {
  return await db.createSpec(name, userId);
}

export async function updateSpec(
  specId: string,
  prevSnapshotId: string,
  content: string,
  userId: string,
) {
  return await db.updateSpec(specId, prevSnapshotId, content, userId);
}

export async function getSpecs(userId: string) {
  return await db.getSpecs(userId);
}

export async function getLatestSpecById(specId: string) {
  return await db.getLatestSpecSnapshotBySpecId(specId);
}
