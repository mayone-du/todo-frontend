# Template Repository

## Packages

- Next.js
- TypeScript
- Tailwind CSS
- Headless UI
- React Hot Toast
- React Icons
- NextAuth
- NextSeo
- GraphQL
- Apollo Client
- GraphQL Code Generator
- Jest
- ESLint
- Prettier

## SetUp

- Create /.env.local
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
- npm build
- npm start

GCP のコンソールから色々設定を済ます。リダイレクト URL は http://localhost:3000/api/auth/callback/google

## 設計的なコーディング規約的な？

- page ファイルではデータの取得とコンポーネントの出し分けのみ行う。ローディング ・データ（正常取得時）の 2 種類のコンポーネントをそれぞれのページで保持しておき、エラーと非ログイン時の 2 種類のみ共通化。
- ログインしているかの判定は、 useSession の loading が終わった段階で session が存在するかによって Layout コンポーネントで決め、Reactive Variables でグローバル管理している。全ての箇所で、ユーザーのログイン・ローディングの管理は Reactive Variables を参照して行う。
- 各ページで Reactive Variables からユーザーのログイン・ローディング状態を受け取り、コンポーネントの出し分けを行う。
- ページによってはユーザー情報の読み込みと、別で取得したいデータ自体のローディング状態があるため注意
- ログインしているユーザー情報が必要ない場合は、ユーザー情報のローディングと、そのページで必要なローディングをまとめて一つのローディングコンポーネントを出す。

### 認証用モーダル

useAuthModal にモーダル自体や状態をカプセル化している
handleOpenModal と renderModal を受け取り、呼び出したい側でその 2 つを使用するだけで実装可能。
