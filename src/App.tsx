import { Transition } from "@headlessui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Todo = {
  title: string;
  description: string;
};

export const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Todo>();

  const onSubmit: SubmitHandler<Todo> = (data) => {
    setTodos((prevTodos) => [...prevTodos, data]);
    reset();
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="bg-slate-500 h-screen w-screen flex items-center font-roboto flex-row">
      {/* Todo List */}
      <div className="h-fit w-1/3 p-4 space-y-4 flex flex-col items-center">
        {todos.map(todo => (<Transition
          appear={true}
          show={true}
          enter="transform transition ease-in-out duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          {/* ListItem */}
          <div className="h-fit min-h-44 w-96 bg-white rounded-md flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 bg-slate-300 flex justify-center items-center">
              <h1 className="text-3xl text-slate-500">{todo.title}</h1>
            </div>
            {/* Content */}
            <p className="p-4 break-words">
              {todo.description}
            </p>
          </div>
        </Transition>))}
      </div>
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
          {errors.title && <span className="text-red-500">Please enter a title</span>}

          <textarea
            className="w-3/4 border p-2 border-slate-300 rounded-md shadow-sm focus:outline-slate-300 text-slate-500 resize-none"
            placeholder="Description"
            rows={15}
            {...register("description", { required: true })}
          />
          {errors.description && <span className="text-red-500">Please enter a description</span>}

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
