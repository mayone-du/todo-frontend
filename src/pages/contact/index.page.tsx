import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import { Layout } from "src/layouts";

type ContactInputs = {
  title: string;
  content: string;
};

const ContactIndexPage: CustomNextPage = () => {
  const PAGE_NAME = "お問い合わせ";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactInputs>();
  const onSubmit = (formData: ContactInputs) => {
    alert(JSON.stringify(formData));
  };
  return (
    <>
      <NextSeo title={PAGE_NAME} />
      <div>
        <h1>お問い合わせ</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="block border"
            placeholder="タイトル"
            {...register("title", { required: true, maxLength: 20 })}
          />
          {/* タイトルのエラーハンドリング */}
          {errors.title && (
            <p className="pb-4 text-sm text-gray-500">
              {errors.title.type === "required" ? "必須です。" : "20文字までです。"}
            </p>
          )}

          <textarea
            placeholder="お問い合わせ内容"
            className="border resize-none"
            {...register("content", { required: true })}
          ></textarea>
          <button type="submit" className="block text-center rounded-md border">
            送信
          </button>
        </form>
      </div>
    </>
  );
};
export default ContactIndexPage;

ContactIndexPage.getLayout = Layout;
