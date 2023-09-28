import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  title: string;
  description: string;
};

export const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div className="bg-slate-500 h-screen w-screen flex justify-center items-center font-roboto">
      {/* Form */}
      <div className="h-fit w-1/3 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-slate-300 flex justify-center items-center">
          <h1 className="text-3xl text-slate-500">TODO</h1>
        </div>
        {/* Input */}
        <form className="h-full w-full flex flex-col items-center p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="h-10 w-3/4 border p-2 border-slate-300 rounded-md shadow-sm focus:outline-slate-300 text-slate-500"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>Please enter a title...</span>}

          <textarea
            className="w-3/4 border p-2 border-slate-300 rounded-md shadow-sm focus:outline-slate-300 text-slate-500 resize-none"
            placeholder="Description"
            rows={15}
            {...register("description", { required: true })}
          />
          {errors.description && <span>Please enter a description...</span>}

          {/* Buttons */}
          <div className="flex space-x-4 w-3/4">
            <button
              className="h-10 w-44 bg-slate-300 rounded-md text-slate-500 hover:bg-slate-600 hover:text-white"
              type="submit"
            >
              Submit
            </button>
            <button
              className="h-10 w-44 bg-red-500 hover:bg-red-700 rounded-md text-white"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
