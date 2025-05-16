# Next.js Udemy MyBlog

## 概要

Next.jsを用いて構築したブログアプリケーションです。ユーザー認証、記事投稿、編集、削除などの基本機能を備えています。

## 技術スタック

- Next.js（フレームワーク）
- React （ライブラリ）
- Auth.js（認証）
- Tailwind CSS（デザイン）
- Supabase（DB）
- Prisma（ORM）
- TypeScript（言語）

<!-- 技術スタックのロゴ画像を表示 -->
<p align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js" height="40" />
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" height="40" />
  <img src="https://next-auth.js.org/img/logo/logo-sm.png" alt="Auth.js" height="40" style="background:#fff;border-radius:8px;padding:2px;" />
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png" alt="Tailwind CSS" height="40" />
  <img src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.png" alt="Supabase" height="40" />
  <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" alt="Prisma" height="40" />
</p>

## 環境構築手順

1. リポジトリをクローン
   ```bash
   git clone https://github.com/your-username/nextjs-ud-myblog.git
   cd nextjs-ud-myblog
   ```

2. 依存パッケージのインストール
   ```bash
   npm install
   # または
   yarn install
   ```

3. 環境変数ファイルの作成  
   `.env.example` を参考に `.env` ファイルを作成し、必要な値を設定してください。

4. Prisma マイグレーション（DBセットアップ）
   ```bash
   npx prisma migrate dev
   ```

5. 開発サーバーの起動
   ```bash
   npm run dev
   # または
   yarn dev
   ```

6. ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作を確認

---