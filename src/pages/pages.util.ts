import { ProfileDescriptor } from "../model/profileDescriptor.type";

export function getProfileList(gameId: string) : Array<ProfileDescriptor> {
  const profiles = require("./../assets/descriptors/componentDescriptors/profilesDescriptor.json");
  if (profiles[gameId] !== undefined) {
    return profiles[gameId];
  }
  return [];
}