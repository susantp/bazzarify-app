import {
  retrieveStorage,
  setStorage,
} from "@/modules/core/utils/secureStore";

const ANONYMOUS_ACTOR_ID_KEY = "anonymous_actor_id";

export async function getAnonymousActorId() {
  return retrieveStorage(ANONYMOUS_ACTOR_ID_KEY);
}

export async function syncAnonymousActorId(actorId: string, actorType: string) {
  if (actorType !== "anonymous") {
    return;
  }

  await setStorage(ANONYMOUS_ACTOR_ID_KEY, actorId);
}
