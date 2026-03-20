# Requirements Document

## Introduction

p5.jsの学習環境を改善するためのツール群。
Vue 3 + Vite + Vue RouterによるSPAポートフォリオサイト（作品の一覧・詳細表示）と、VSCode上でp5.jsコードを素早く始めるためのボイラープレート生成スクリプトの2つのコンポーネントで構成される。
GitHubへのpushをトリガーにGitHub Actions経由でGitHub Pagesへ自動デプロイされ、作品を継続的に公開できる。
新規Sketch生成は `pnpm run new --name=<sketch_name>` コマンドで行い、リポジトリ内のテンプレートファイルをコピーして雛形を作成する。

## Glossary

- **Portfolio_App**: p5.jsの作品を一覧・詳細表示するSPA（Vue 3 + Vite + Vue Router製）
- **Sketch**: p5.jsで実装された1つの作品。`sketch.js`と`index.html`のペアで構成される
- **Sketch_Generator**: pnpmスクリプトで呼び出されるボイラープレート生成ツール
- **Sketch_Template**: `templates/` ディレクトリに配置された`sketch.js`と`index.html`の雛形ファイル。ユーザーが編集することで生成内容をカスタマイズできる
- **Template_Directory**: リポジトリルートの `templates/` ディレクトリ。`sketch.js`と`index.html`のSketch_Templateを格納する
- **Index_Page**: 全Sketchの一覧を表示するPortfolio_Appのトップページ
- **Detail_Page**: 個別のSketchを表示するPortfolio_Appの詳細ページ
- **CI/CD_Pipeline**: GitHubへのpushをトリガーにGitHub Actions経由でGitHub PagesへPortfolio_Appを自動デプロイする仕組み

---

## Requirements

### Requirement 1: 作品一覧の表示

**User Story:** 学習者として、作成したp5.js作品の一覧を見たい。そうすることで、自分の制作物を振り返り、進捗を確認できる。

#### Acceptance Criteria

1. THE Portfolio_App SHALL Index_Pageで全Sketchのタイトルとサムネイル（またはプレビュー情報）を一覧表示する
2. WHEN ユーザーがIndex_Pageにアクセスしたとき、THE Portfolio_App SHALL 登録済みの全Sketchをリスト形式で表示する
3. IF 登録済みのSketchが存在しない場合、THEN THE Portfolio_App SHALL 「作品がまだありません」などの空状態メッセージを表示する

---

### Requirement 2: 作品詳細の表示

**User Story:** 学習者として、個別のp5.js作品をブラウザ上で動作確認したい。そうすることで、コードの実行結果をすぐに確認できる。

#### Acceptance Criteria

1. WHEN ユーザーがIndex_PageでSketchをクリックしたとき、THE Portfolio_App SHALL 対応するDetail_Pageへ遷移する
2. THE Detail_Page SHALL 対象Sketchのp5.jsキャンバスをiframeまたは同等の手段でレンダリングする
3. THE Detail_Page SHALL Sketchのタイトルと説明文を表示する
4. THE Detail_Page SHALL Index_Pageへ戻るナビゲーションリンクを提供する

---

### Requirement 3: GitHubへのpushによる自動デプロイ

**User Story:** 学習者として、GitHubにコードをpushするだけで作品サイトを更新したい。そうすることで、デプロイ作業を意識せず制作に集中できる。

#### Acceptance Criteria

1. WHEN mainブランチへのpushが発生したとき、THE CI/CD_Pipeline SHALL GitHub Actions経由でPortfolio_AppをGitHub Pagesへビルドおよびデプロイを自動実行する
2. WHEN CI/CD_Pipelineのデプロイが完了したとき、THE Portfolio_App SHALL 最新のSketch一覧を反映した状態で公開される
3. IF CI/CD_Pipelineのビルドが失敗した場合、THEN THE CI/CD_Pipeline SHALL エラーログをGitHub Actionsのジョブサマリーに出力する

---

### Requirement 4: ボイラープレートの自動生成

**User Story:** 学習者として、コマンド1つで新しいp5.js作品の雛形ファイルを生成したい。そうすることで、毎回同じセットアップ作業を繰り返さずに制作を始められる。

#### Acceptance Criteria

1. WHEN ユーザーが `pnpm run new --name=<sketch_name>` を実行したとき、THE Sketch_Generator SHALL 指定された名前のディレクトリを作成し、その中に`sketch.js`と`index.html`を生成する
2. THE Sketch_Generator SHALL Template_Directory内のSketch_Templateをコピーして新しいSketchの`sketch.js`と`index.html`を生成する
3. THE Sketch_Generator SHALL Template_Directoryに`templates/sketch.js`と`templates/index.html`が存在しない場合、デフォルトのSketch_Templateを使用してファイルを生成する
4. WHEN ユーザーが`templates/sketch.js`または`templates/index.html`を編集したとき、THE Sketch_Generator SHALL 次回の`pnpm run new`実行時にその編集済みSketch_Templateを使用する
5. IF 同名のディレクトリが既に存在する場合、THEN THE Sketch_Generator SHALL 上書きせずにエラーメッセージを表示して処理を中断する
6. WHEN ボイラープレートの生成が完了したとき、THE Sketch_Generator SHALL 生成されたファイルのパスを標準出力に表示する

---

### Requirement 5: Sketchのポートフォリオへの登録

**User Story:** 学習者として、作成したSketchをPortfolio_Appの一覧に追加したい。そうすることで、新しい作品を公開できる。

#### Acceptance Criteria

1. THE Portfolio_App SHALL 所定のディレクトリ構造（例：`sketches/<sketch_name>/sketch.js`）に配置されたSketchを自動的に一覧に含める
2. WHEN 新しいSketchディレクトリが追加されてビルドが実行されたとき、THE Portfolio_App SHALL そのSketchをIndex_Pageの一覧に表示する
3. THE Portfolio_App SHALL 各Sketchのメタデータ（タイトル・説明文）をSketchディレクトリ内の設定ファイル（例：`meta.json`）から読み込む
4. IF `meta.json`が存在しない場合、THEN THE Portfolio_App SHALL ディレクトリ名をタイトルとして代替表示する
