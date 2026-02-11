export const numericField = (maxLength: number) => ({
  inputProps: {
    type: "tel",
    inputMode: "numeric" as const,
    maxLength,
    onInput: (e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
    },
  },

  registerProps: {
    setValueAs: (value: unknown) =>
      String(value ?? "")
        .replace(/\D/g, "")
        .slice(0, maxLength),
  },
});
