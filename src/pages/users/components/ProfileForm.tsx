import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateProfileMutation } from "src/graphql/schemas/schema";

type ProfileInputs = {
  profileName: string;
};

export const ProfileForm: React.VFC = () => {
  const [createProfile, { loading: isLoading }] = useCreateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileInputs>();

  // プロフィールの作成用関数
  const handleCreateTask = async (formData: ProfileInputs) => {
    try {
      // プロフィールを作成したらこのユーザーの情報を再取得
      const { errors } = await createProfile({
        variables: {
          profileName: formData.profileName,
        },
      });
      // エラーがあれば例外処理を発生
      if (errors) {
        throw errors;
      }
      setValue("profileName", "");
      toast.success("送信");
    } catch (error) {
      console.error(error);
      toast.error("失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTask)}>
      <input
        type="text"
        className="p-2 rounded border"
        placeholder="プロフィールネーム"
        {...register("profileName", { required: true, maxLength: 20 })}
      />
      {errors.profileName && (
        <p className="pb-4 text-sm text-gray-500">
          {errors.profileName.type === "required" ? "必須です。" : "最大20文字です。"}
        </p>
      )}
      {/* mutationのローディング中は無効化する */}
      <button
        type="submit"
        disabled={isLoading}
        className="p-2 disabled:bg-gray-500 rounded border"
      >
        作成
      </button>
    </form>
  );
};