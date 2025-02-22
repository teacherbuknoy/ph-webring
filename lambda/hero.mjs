import { redirect, getRandomHero } from "./common/utils";

export const handler = function (event, context, callback) {
  const url = getRandomHero()

  callback(null, redirect(site))
}