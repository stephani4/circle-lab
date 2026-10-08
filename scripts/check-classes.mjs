/**
 * Проверка: все ли классы из шаблонов попали в собранный CSS.
 * Tailwind молча игнорирует неизвестные классы, поэтому опечатки легко пропустить.
 *
 * Запуск: node scripts/check-classes.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const CSS = '.output/public/_nuxt'
const SRC = 'app'

const escape = (name) =>
  name.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')

/* ── собираем CSS ───────────────────────────────────────────────────────── */
const cssDir = join(process.cwd(), CSS)
const css = readdirSync(cssDir)
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(join(cssDir, file), 'utf8'))
  .join('\n')

/* ── собираем классы из .vue ────────────────────────────────────────────── */
const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.vue') ? [path] : []
  })

const classes = new Set()

/** Допустимые символы в имени Tailwind-класса (с учётом вариантов и произвольных значений) */
const VALID = /^!?[a-zA-Z0-9_-]+(:[a-zA-Z0-9_-]+)*(\/[0-9.]+)?(\[[^\]]*\])?$/

const add = (raw) => {
  const token = raw.replace(/['"`]/g, '')
  if (token && VALID.test(token)) classes.add(token)
}

for (const file of walk(join(process.cwd(), SRC))) {
  const source = readFileSync(file, 'utf8')

  for (const match of source.matchAll(/class="([^"]*)"/g)) {
    for (const token of match[1].split(/\s+/)) add(token)
  }
  for (const match of source.matchAll(/:class="([^"]*)"/g)) {
    for (const token of match[1].split(/\s+/)) add(token)
  }
}

/* Слова из условий внутри :class (не классы) */
const IGNORE = new Set(['active', 'align', 'center', 'menuOpen', 'scrolled', 'user'])

/* ── сверяем ────────────────────────────────────────────────────────────── */
const missing = [...classes]
  .filter((name) => !IGNORE.has(name) && !css.includes('.' + escape(name)))
  .sort()

if (missing.length === 0) {
  console.log(`OK: все ${classes.size - IGNORE.size} классов найдены в CSS`)
} else {
  console.log(`Не найдено в CSS (${missing.length} из ${classes.size}):`)
  for (const name of missing) console.log('  ' + name)
  process.exitCode = 1
}
