export const formatPhoneNumber = (rawDigits: string): string => {
  const digits = rawDigits.replace(/\D/g, "").slice(1, 12); // Убираем первую 7, так как она уже в шаблоне
  let formattedValue = "+7 ";

  if (digits.length > 0) {
    formattedValue += `(${digits.substring(0, 3)}`;
  }
  if (digits.length > 3) {
    formattedValue += `) ${digits.substring(3, 6)}`;
  }
  if (digits.length > 6) {
    formattedValue += `-${digits.substring(6, 8)}`;
  }
  if (digits.length > 8) {
    formattedValue += `-${digits.substring(8, 10)}`;
  }

  return formattedValue;
};

export const getPhoneDigits = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, "").slice(0, 11);
};

export const validatePhoneNumber = (phone: string): boolean => {
  return getPhoneDigits(phone).length === 11;
};

export const processPhoneInput = (
  input: string,
  previousValue: string
): string => {
  // Если пользователь удаляет символы
  if (input.length < previousValue.length) {
    // Сохраняем только цифры и сравниваем длины
    const currentDigits = input.replace(/\D/g, "");
    const previousDigits = previousValue.replace(/\D/g, "");

    // Если действительно удаляются цифры (а не просто форматирующие символы)
    if (currentDigits.length < previousDigits.length) {
      return formatPhoneNumber(currentDigits);
    }
    return input; // Возвращаем как есть, если удаляются только форматирующие символы
  }

  // Для нового ввода
  const digits = input.replace(/\D/g, "");
  if (digits.length === 0) return "+7 ";
  if (digits.length > 11) return previousValue;

  return formatPhoneNumber(digits);
};

export const isPhoneKeyValid = (e: React.KeyboardEvent): boolean => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  return (
    allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || /^\d$/.test(e.key)
  );
};
