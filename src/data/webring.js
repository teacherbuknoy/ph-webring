import urlMetadata from "url-metadata";
import members from './members.json' with { type: 'json' }

async function unfurlMemberData() {
  const webring = await Promise.all(
    members.map(async member => {
      let metadata = {};
      try {
        metadata = await urlMetadata(member.url, { timeout: 3000 });
      } catch (error) {
        console.error(`Failed to fetch metadata for ${member.url}:`, error);
        metadata = {};
      }

      return {
        ...member,
        favicon: getFavicon(metadata),
        description: getDescription(metadata),
        image: getImage(metadata)
      }
    })
  )

  console.log(webring)
  return webring
}

function getImage(metadata) {
  return metadata?.image?.length > 1
    ? metadata?.image
    : metadata['og:image']?.length > 1
      ? metadata['og:image']
      : metadata['twitter:image']
}

function getDescription(metadata) {
  return metadata?.description?.length > 1
    ? metadata?.description
    : metadata['og:description']?.length > 1
      ? metadata['og:description']
      : metadata['twitter:description']
}

function getFavicon(metadata) {
  // get favicon from metadata
  const favicon = metadata?.favicons?.[0]?.href

  // check if favicon is a full URL or a relative path
  // if relative, prepend `url` property from metadata
  if (favicon && !favicon.startsWith('http')) {
    const baseUrl = metadata?.url
    if (baseUrl) {
      try {
        const url = new URL(favicon, baseUrl)
        return url.href
      } catch (error) {
        return null
      }
    }
  }
  return favicon
}

const webring = await unfurlMemberData();

export default webring;