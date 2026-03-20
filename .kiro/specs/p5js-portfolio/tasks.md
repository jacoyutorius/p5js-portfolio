# Implementation Plan: p5js-portfolio

## Overview

Vue 3 + Vite + Vue Router による Portfolio_App と Node.js 製 Sketch_Generator、GitHub Actions CI/CD の3コンポーネントを段階的に実装する。
各ステップは前のステップの成果物を前提とし、最終的にすべてが統合された状態で動作する。

## Tasks

- [x] 1. プロジェクト基盤のセットアップ
  - `package.json` に Vite・Vue 3・Vue Router・Vitest・fast-check・@vue/test-utils・happy-dom の依存関係を定義する
  - `vite.config.js` を作成し、Vitest の DOM 環境（happy-dom）を設定する
  - `src/main.js` と `src/router/index.js` を作成し、Vue Router（`/` と `/sketch/:name` の2ルート）を設定する
  - `src/pages/IndexPage.vue` と `src/pages/DetailPage.vue` のスケルトンを作成する
  - _Requirements: 1.1, 2.1_

- [x] 2. データモデルと Sketch スキャンロジックの実装
  - [x] 2.1 `SketchMeta`・`SketchEntry` の型定義ファイル（`src/types.js` または JSDoc）を作成する
    - `meta.json` の読み込みと `SketchEntry` への変換ロジックを `src/sketches.js` に実装する
    - `import.meta.glob` で `sketches/*/meta.json` を静的スキャンし、`meta.json` 不在時はディレクトリ名を title にフォールバックする
    - 不正な JSON の場合はコンソール警告を出力してディレクトリ名で代替する
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 2.2 Property 8 のプロパティテストを書く（`src/sketches.test.js`）
    - **Property 8: ディレクトリスキャンの網羅性**
    - **Validates: Requirements 5.1, 5.2**

  - [ ]* 2.3 Property 9 のプロパティテストを書く（`src/sketches.test.js`）
    - **Property 9: meta.json ラウンドトリップ**
    - **Validates: Requirements 5.3**

  - [ ]* 2.4 Property 10 のプロパティテストを書く（`src/sketches.test.js`）
    - **Property 10: meta.json 不在時のフォールバック**
    - **Validates: Requirements 5.4**

- [x] 3. SketchCard コンポーネントの実装
  - [x] 3.1 `src/components/SketchCard.vue` を実装する
    - Props: `name: string`, `title: string`, `description?: string`
    - `/sketch/:name` へのリンクを含むカードレイアウトを実装する
    - _Requirements: 1.1_

- [x] 4. IndexPage の実装
  - [x] 4.1 `src/pages/IndexPage.vue` を実装する
    - `src/sketches.js` から SketchEntry リストを取得して `SketchCard` で一覧表示する
    - Sketch が0件の場合は空状態メッセージ（「作品がまだありません」）を表示する
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 4.2 Property 1 のプロパティテストを書く（`src/pages/IndexPage.test.js`）
    - **Property 1: 一覧レンダリングの網羅性**
    - **Validates: Requirements 1.1, 1.2**

  - [ ]* 4.3 IndexPage の空状態ユニットテストを書く（`src/pages/IndexPage.test.js`）
    - Sketch が0件のとき空状態メッセージが表示されることを検証する
    - _Requirements: 1.3_

- [x] 5. DetailPage の実装
  - [x] 5.1 `src/pages/DetailPage.vue` を実装する
    - `$route.params.name` で対象 Sketch を特定する
    - `<iframe src="/sketches/:name/index.html">` で p5.js キャンバスをレンダリングする
    - タイトル・説明文を表示し、`/` へ戻るナビゲーションリンクを提供する
    - 存在しない Sketch 名の場合は Vue Router の catch-all で 404 ページへ誘導する
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 5.2 Property 2 のプロパティテストを書く（`src/pages/DetailPage.test.js`）
    - **Property 2: Detail_Page の iframe src 正確性**
    - **Validates: Requirements 2.2**

  - [ ]* 5.3 Property 3 のプロパティテストを書く（`src/pages/DetailPage.test.js`）
    - **Property 3: Detail_Page のコンテンツ完全性**
    - **Validates: Requirements 2.3, 2.4**

- [x] 6. Checkpoint — フロントエンドの動作確認
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Sketch_Generator の実装
  - [x] 7.1 `scripts/new-sketch.js` を実装する
    - `--name=<sketch_name>` 引数のバリデーション（未指定時は stderr + exit 1）
    - `sketches/<name>/` の存在チェック（既存時は stderr + exit 1、既存ファイル変更なし）
    - `templates/sketch.js` と `templates/index.html` の存在確認、なければデフォルトテンプレートを使用
    - ディレクトリ作成・ファイルコピー／生成・生成パスを stdout に出力
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - `package.json` の `scripts` に `"new": "node scripts/new-sketch.js"` を追加する
  - `templates/sketch.js` と `templates/index.html` のデフォルトテンプレートファイルを作成する

  - [ ]* 7.2 Property 4 のプロパティテストを書く（`scripts/new-sketch.test.js`）
    - **Property 4: Sketch_Generator によるファイル生成**
    - **Validates: Requirements 4.1**

  - [ ]* 7.3 Property 5 のプロパティテストを書く（`scripts/new-sketch.test.js`）
    - **Property 5: テンプレートのコピー正確性**
    - **Validates: Requirements 4.2, 4.4**

  - [ ]* 7.4 Property 6 のプロパティテストを書く（`scripts/new-sketch.test.js`）
    - **Property 6: 既存ディレクトリへの上書き防止**
    - **Validates: Requirements 4.5**

  - [ ]* 7.5 Property 7 のプロパティテストを書く（`scripts/new-sketch.test.js`）
    - **Property 7: 生成パスの標準出力**
    - **Validates: Requirements 4.6**

  - [ ]* 7.6 デフォルトテンプレート使用のユニットテストを書く（`scripts/new-sketch.test.js`）
    - `templates/` が存在しない場合にデフォルトテンプレートが使用されることを検証する
    - _Requirements: 4.3_

- [x] 8. Checkpoint — Sketch_Generator の動作確認
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. CI/CD Pipeline の実装
  - [x] 9.1 `.github/workflows/deploy.yml` を作成する
    - トリガー: `push to main`
    - ステップ: checkout → pnpm setup + install → `pnpm build` → `actions/deploy-pages` で `dist/` を GitHub Pages へデプロイ
    - ビルド失敗時はエラーログをジョブサマリーに出力する設定を含める
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 9.2 deploy.yml のユニットテストを書く（`scripts/deploy.test.js` または YAML パース）
    - `on.push.branches` に `main` が含まれることを検証する
    - _Requirements: 3.1_

- [x] 10. 統合・最終 Checkpoint
  - [x] 10.1 すべてのコンポーネントを `src/main.js` で結線し、アプリとして動作することを確認する
    - `sketches/` サンプルディレクトリ（`sketches/hello/meta.json` など）を追加して動作確認用データを用意する
    - _Requirements: 1.1, 1.2, 2.1, 5.1, 5.2_

- [x] 11. Final Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- `*` 付きのサブタスクはオプションであり、MVP を優先する場合はスキップ可能
- 各タスクは対応する Requirements 番号を参照しており、トレーサビリティを確保している
- プロパティテストは fast-check + Vitest で実装し、最低 100 イテレーション実行する
- ユニットテストとプロパティテストは補完的に使用する
