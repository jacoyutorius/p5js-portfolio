# p5.js Portfolio

p5.js で作成したスケッチを一覧・詳細表示する SPA ポートフォリオサイト。

Vue 3 + Vite + Vue Router で構築し、GitHub Actions 経由で GitHub Pages に自動デプロイされる。

## セットアップ

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm dev
```

`http://localhost:5173/` でアクセスできる。

## ビルド

```bash
pnpm build
```

`dist/` に成果物が生成される。

## 新しいスケッチの追加

```bash
pnpm new --name=<sketch_name>
```

`sketches/<sketch_name>/` ディレクトリが作成され、以下のファイルが生成される。

```
sketches/<sketch_name>/
  ├── index.html   # p5.js を読み込む HTML
  └── sketch.js    # スケッチのエントリーポイント
```

ポートフォリオの一覧に表示するにはメタデータファイルを追加する。

```bash
# sketches/<sketch_name>/meta.json
{
  "title": "作品タイトル",
  "description": "作品の説明（省略可）"
}
```

`meta.json` がない場合はディレクトリ名がタイトルとして表示される。

## テンプレートのカスタマイズ

`templates/sketch.js` と `templates/index.html` を編集することで、`pnpm new` で生成されるファイルの雛形をカスタマイズできる。

## デプロイ

`main` ブランチへの push をトリガーに GitHub Actions が自動でビルド・デプロイを実行する。

## 技術スタック

| 用途 | ライブラリ |
|---|---|
| UI フレームワーク | Vue 3 |
| ビルドツール | Vite 5 |
| ルーティング | Vue Router 4 |
| スタイリング | Tailwind CSS v4 |
| テスト | Vitest + fast-check + @vue/test-utils |
| CI/CD | GitHub Actions → GitHub Pages |
