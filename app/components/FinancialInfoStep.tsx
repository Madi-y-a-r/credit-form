import { useState } from "react";
import Input from "./common/Input";
import RangeInput from "./common/RangeInput";

const FinancialInfoStep = ({ onNext, onBack, initialData }: any) => {
  const [data, setData] = useState({
    income: initialData.income || "",
    creditAmount: initialData.creditAmount || 20000,
    creditTerm: initialData.creditTerm || 12,
  });

  const [errors, setErrors] = useState({
    income: "",
    creditAmount: "",
    creditTerm: "",
  });

  const validate = () => {
    const newErrors = { income: "", creditAmount: "", creditTerm: "" };
    let isValid = true;

    if (!data.income || data.income <= 0) {
      newErrors.income = "Ежемесячный доход должен быть больше 0.";
      isValid = false;
    }
    if (data.creditAmount < 20000 || data.creditAmount > 1000000) {
      newErrors.creditAmount = "Сумма кредита должна быть от 20,000 до 1,000,000.";
      isValid = false;
    }
    if (!data.creditTerm || data.creditTerm <= 0) {
      newErrors.creditTerm = "Срок кредита должен быть больше 0 месяцев.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h2 className="text-2xl text-white font-bold">Финансовая информация</h2>

      <Input
        id="income"
        label="Ежемесячный доход"
        placeholder="Введите ваш доход"
        type="number"
        value={data.income}
        onChange={(e) => setData({ ...data, income: +e.target.value })}
        error={errors.income}
      />

      <RangeInput
        id="creditAmount"
        label="Сумма кредита"
        min={20000}
        max={1000000}
        step={1000}
        value={data.creditAmount}
        onChange={(e) => setData({ ...data, creditAmount: +e.target.value })}
        error={errors.creditAmount}
      />

      <Input
        id="creditTerm"
        label="Срок кредита (в месяцах)"
        placeholder="Введите срок кредита"
        type="number"
        value={data.creditTerm}
        onChange={(e) => setData({ ...data, creditTerm: +e.target.value })}
        error={errors.creditTerm}
      />

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Назад
        </button>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-red-500 hover:to-orange-500"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default FinancialInfoStep;
