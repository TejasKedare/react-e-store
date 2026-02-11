export const useNumericInput = (maxLength?: number) => {
  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/\D/g, "");

    if (maxLength) {
      value = value.slice(0, maxLength);
    }

    e.target.value = value;
  };

  return {
    type: "tel",
    inputMode: "numeric" as const,
    onChange: handleNumericChange,
    maxLength,
  };
};
