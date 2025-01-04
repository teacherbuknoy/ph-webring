import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import timeToRead from 'eleventy-plugin-time-to-read'
import toc from 'eleventy-plugin-toc'
import rss from '@11ty/eleventy-plugin-rss'
import unfurl from 'eleventy-plugin-unfurl'

export default {
  syntaxHighlight: () => ({ plugin: syntaxHighlight }),
  timeToRead: () => ({
    plugin: timeToRead,
    options: {
      output: data => {
        const includeHours = data.hours != null
        const includeMinutes = data.minutes != null && !includeHours

        const hrs = includeHours ? data.hours : 0
        const min = includeMinutes ? data.minutes : 0

        const formatter = new Intl.PluralRules('en-US')
        const hrsUnit = formatter.select(hrs) === 'one' ? 'hour' : 'hours'
        const minUnit = formatter.select(min) === 'one' ? 'minute' : 'minutes'

        const strHours = `${hrs} ${hrsUnit}`
        const strMinutes = `${min} ${minUnit}`

        const timing = [strHours, strMinutes].filter(s => s.length > 0)
        const listFormatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' })

        return `${listFormatter.format(timing)} read`
      }
    }
  }),
  toc: () => ({
    plugin: toc,
    options: {
      wrapperClass: 'article__toc sidebar',
      tags: ['h2']
    }
  }),
  rss: () => ({ plugin: rss }),
  unfurl: () => ({ plugin: unfurl })
}