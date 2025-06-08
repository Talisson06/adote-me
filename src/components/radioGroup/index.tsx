import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>; // Corrigido: agora aceita campos aninhados
  options: { label: string; value: string }[]; // Opções do radio
  register: UseFormRegister<T>; // Registro tipado
  error?: string; // Mensagem de erro (validação)
}

export function RadioGroup<T extends FieldValues>({
  name,
  options,
  register,
  error,
}: RadioGroupProps<T>) {
  return (
    <div>
      <div className="flex gap-5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer text-lg"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)} // ← agora compatível com Path<T>
              className="hidden peer"
            />
            <span className="w-5 h-5 border-2 border-teal-500 rounded-full inline-block peer-checked:bg-teal-500 peer-checked:border-teal-500 peer-checked:ring-2 peer-checked:ring-teal-300 transition duration-300">
              <span className="block w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1 transition duration-300 peer-checked:bg-white"></span>
            </span>
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
}
