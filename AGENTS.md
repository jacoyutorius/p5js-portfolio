# AGENTS.md

AI エージェントがこのリポジトリで作業する際のガイドライン。

## プロジェクト概要

p5.js スケッチのポートフォリオサイト。Vue 3 + Vite + Vue Router による SPA と、Node.js 製スケッチ生成スクリプトで構成される。

## コマンド

```bash
pnpm install        # 依存関係のインストール
pnpm dev            # 開発サーバー起動（http://localhost:5173/）
pnpm build          # プロダクションビルド（dist/ に出力）
pnpm test           # テスト実行
pnpm new --name=<sketch_name>  # 新規スケッチの雛形生成
```

## ディレクトリ構成

```
├── src/
│   ├── main.js             # エントリーポイント
│   ├── App.vue             # ルートコンポーネント
│   ├── style.css           # Tailwind CSS のエントリー
│   ├── sketches.js         # import.meta.glob によるスケッチスキャン
│   ├── types.js            # JSDoc 型定義
│   ├── router/index.js     # Vue Router 設定
│   ├── components/
│   │   └── SketchCard.vue  # スケッチカードコンポーネント
│   └── pages/
│       ├── IndexPage.vue   # 一覧ページ
│       ├── DetailPage.vue  # 詳細ページ（iframe で p5.js をレンダリング）
│       └── NotFoundPage.vue
├── sketches/               # 各スケッチのディレクトリ
│   └── <name>/
│       ├── sketch.js       # p5.js スケッチ本体
│       ├── index.html      # スケッチ用 HTML（p5.js を CDN から読み込む）
│       └── meta.json       # タイトル・説明文（省略可）
├── templates/              # pnpm new で使うテンプレート
│   ├── sketch.js
│   └── index.html
├── scripts/
│   └── new-sketch.js       # スケッチ生成スクリプト
└── .github/workflows/
    └── deploy.yml          # GitHub Pages 自動デプロイ
```

## アーキテクチャの重要ポイント

### スケッチのスキャン

`src/sketches.js` で `import.meta.glob('/sketches/*/meta.json', { eager: true })` を使い、ビルド時に静的スキャンする。`meta.json` が存在しない場合はディレクトリ名をタイトルとしてフォールバックする。

### スケッチの表示

`DetailPage.vue` では `<iframe>` を使って各スケッチを表示する。`src` には `import.meta.env.BASE_URL` を使って GitHub Pages のサブパスに対応している。

### ビルド設定

`vite.config.js` の `base` は `command === 'build'` のときのみ `/p5js-portfolio/` を設定する。開発時は `/` を使用する。`vite-plugin-static-copy` で `sketches/` ディレクトリを `dist/` にコピーするが、dev モードでは無効にしている（`import.meta.glob` との MIME タイプ競合を避けるため）。

## コーディング規約

- コンポーネントは `<script setup>` を使う
- スタイリングは Tailwind CSS のユーティリティクラスを使う（`<style scoped>` は使わない）
- 新しいスケッチは `pnpm new --name=<name>` で生成し、`meta.json` を追加してポートフォリオに登録する
- コミットメッセージは日本語で書く
