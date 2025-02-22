import members from '../../src/data/members.json'

export const redirect = site => {
  const statusMessage = `[REDIRECT] ${site.url}`
  console.log(statusMessage)

  return {
    statusCode: 303,
    headers: { Location: site.url },
    body: statusMessage
  }
}

export const getIndex = url =>
  url ? members.findIndex(site => url.includes(site.url)) : -1

export const getNext = url => {
  const index = getIndex(url)
  if (index !== -1) {
    const nextIndex = index < members.length - 1 ? index + 1 : 0
    return members[nextIndex]
  }

  console.log('[NEXT] Referrer position not found')
  return null
}

export const getPrevious = url => {
  const index = getIndex(url)
  if (index !== -1) {
    const previousIndex = index > 0 ? index - 1 : members.length - 1
    return members[previousIndex]
  }

  console.log('[PREVIOUS] Referrer position not found')
  return null
}

export const getRandom = url => {
  const selection = url
    ? members.filter(site => !url.includes(site.url))
    : members


  const randomIndex = Math.floor(Math.random() * selection.length)
  console.log({ selection: selection.map(item => item.url), random: selection[randomIndex].url })
  return selection[randomIndex]
}

export const getRandomHero = () => {
  const selection = [
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/gala-night-2024/10.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/hero.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/gala-night-2024/9.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/gala-night-2024/22.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/gala-night-2024/5.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/13.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/10.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/12.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/25.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/8.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2024/19.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2023/2.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2023/6.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/pride-2023/28.jpg',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/gallery/a-studios-shoot-03-26-2023/DSCF0112.JPG',
    'https://ik.imagekit.io/8jjzxcl9p/tr:w-600,f-webp/DSCF0303.JPG'
  ]

  const randomIndex = Math.floor(Math.random() * selection.length)
  return selection[randomIndex]
}