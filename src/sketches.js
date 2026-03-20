/**
 * @import { SketchEntry } from './types.js'
 */

// Static scan of all meta.json files under sketches/*/
const metaModules = import.meta.glob('/sketches/*/meta.json', { eager: true })

/**
 * Parse a raw meta module into a SketchEntry.
 * Falls back to `name` as title if meta is absent or invalid.
 *
 * @param {string} name - directory name (URL slug)
 * @param {unknown} raw - eagerly-imported module default export
 * @returns {SketchEntry}
 */
function parseEntry(name, raw) {
  if (raw && typeof raw === 'object' && typeof raw.title === 'string') {
    return {
      name,
      title: raw.title,
      ...(typeof raw.description === 'string' ? { description: raw.description } : {}),
    }
  }
  return { name, title: name }
}

/**
 * Returns the list of all SketchEntry objects discovered at build time.
 *
 * @returns {SketchEntry[]}
 */
export function getSketches() {
  return Object.entries(metaModules).map(([key, mod]) => {
    // key format: '/sketches/<name>/meta.json'
    const name = key.split('/')[2]

    // eager import gives the parsed JSON as the module's default export
    // (Vite wraps JSON as { default: <parsed> })
    let raw
    try {
      raw = mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod
    } catch (err) {
      console.warn(`[sketches] Failed to read meta for "${name}":`, err)
      raw = null
    }

    if (raw === null || raw === undefined) {
      return { name, title: name }
    }

    if (typeof raw !== 'object' || typeof raw.title !== 'string') {
      console.warn(`[sketches] Invalid meta.json for "${name}", falling back to directory name.`)
      return { name, title: name }
    }

    return parseEntry(name, raw)
  })
}
