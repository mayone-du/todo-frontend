import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { NotAuth } from "src/components/NotAuth";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";

const IndexPage: CustomNextPage = () => {
  const PAGE_NAME = "トップページ";

  const userInfo = useReactiveVar(userInfoVar);

  const handleClick = useCallback(() => {
    toast.success("ボタンがクリックされました。");
  }, []);

  return (
    <>
      <NextSeo title={PAGE_NAME} />

      {userInfo.isLoading ? (
        // ユーザー情報のローディング
        <UserLoading />
      ) : !userInfo.isLoading && !userInfo.isLogin ? (
        // 非ログイン時
        <NotAuth />
      ) : (
        // 通常時
        <div>
          <button className="block p-4 mx-auto rounded-md border" onClick={handleClick}>
            ボタン
          </button>
        </div>
      )}
    </>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
