import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { idTokenVar, userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetMyUserInfoQuery, GetMyUserInfoQueryVariables } from "src/graphql/schemas/schema";
import { GetMyUserInfoDocument } from "src/graphql/schemas/schema";
import { Footer } from "src/layouts/Footer";
import { Header } from "src/layouts/Header";
import { LayoutErrorBoundary } from "src/layouts/LayoutErrorBoundary";

// pagesのgetLayoutで指定されたページで呼ばれる。ページのリロード時に呼ばれ、ページ遷移時には呼ばれない。
export const Layout = (page: NextPage) => {
  const idToken = useReactiveVar(idTokenVar);

  // 初回マウント時にユーザー情報を取得し、ReactiveVariablesでグローバル管理して、_appで値を参照する
  useEffect(() => {
    // idTokenが設定されていなければsessionからidTokenを取得し、セットする
    if (idToken === "") {
      (async () => {
        const session = await getSession();
        // nextauthのapiでsessionにidTokenをセットしているためstring型を強制
        const idToken = session?.idToken as string;
        idTokenVar(idToken);

        // ユーザー情報を取得し、Reactive Variablesでグローバル管理
        const apolloClient = initializeApollo(null, idToken);
        const { data } = await apolloClient.query<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>({
          query: GetMyUserInfoDocument,
        });

        // グローバル管理しているユーザー情報を更新
        userInfoVar({
          isLoading: false,
          isLogin: session && data.myUserInfo?.id ? true : false,
          userId: data.myUserInfo?.id ?? "",
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <main>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
