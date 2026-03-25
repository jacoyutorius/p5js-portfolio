/**
 * @typedef {Object} SketchMeta
 * @property {string} title - 表示タイトル
 * @property {string} [description] - 説明文（省略可）
 * @property {boolean} [visible] - 一覧への表示・非表示（省略時は表示）
 */

/**
 * @typedef {Object} SketchEntry
 * @property {string} name - ディレクトリ名（URLスラッグ）
 * @property {string} title - meta.json の title、なければ name
 * @property {string} [description] - meta.json の description
 * @property {boolean} [visible] - 一覧への表示・非表示（省略時は表示）
 */
