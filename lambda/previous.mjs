import { redirect, getPrevious, getRandom } from "./common/utils";

export const handler = function (event, context, callback) {
  const { referer } = event.headers
  const site = getPrevious(referer) || getRandom()

  callback(null, redirect(site))
}