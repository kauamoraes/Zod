import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const createUserShema = z.object({
  name: z.string() 
  .nonempty("Nome é obrigatório")
  .transform(name => name.trim() .split(" ") .map(word => {
    return word[0].toUpperCase().concat(word.substring(1))
  }).join(" ")),

  email: z.string()
  .nonempty("Email é obrigatório")
  .email("Email inválido"),
  password: z.string()
  .nonempty("Senha é obrigatória")
  .min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type CreateUserFormData = z.infer<typeof createUserShema>;

export function App() {
  const [output, setOutput] = useState("")
  const { register, handleSubmit, formState: {errors} } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserShema)
  })

  function CreateUser(data: unknown ) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen bg-slate-800">
        <form 
        className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded shadow w-full max-w-md h-full max-h-72"
        onSubmit={handleSubmit(CreateUser)}
        >
          <div className="w-full">
            <input type="text"
              placeholder="Digite seu Nome"
              className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="w-full">
            <input type="email"
              placeholder="Digite seu Email"
              className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="w-full">
            <input type="password"
              placeholder="Sua senha"
              className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button className="bg-emerald-500 w-full max-w-md p-2 rounded-md text-white font-semibold text-xl mt-2">Salvar</button>
        </form>

        <pre className="mt-4 text-white">{output}</pre>
      </main>
    </div>
  )
}

