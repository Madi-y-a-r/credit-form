import { useState } from "react";
import Input from "./common/Input";
import Select from "./common/Select";

const AddressInfoStep = ({ onNext, onBack, initialData }: any) => {
  const [data, setData] = useState({
    country: initialData.country || "",
    city: initialData.city || "",
    street: initialData.street || "",
    postalCode: initialData.postalCode || "",
  });

  const [errors, setErrors] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const countries = ["Казахстан", "Россия", "США", "Германия", "Китай"];

  const validate = () => {
    const newErrors = { country: "", city: "", street: "", postalCode: "" };
    let isValid = true;

    if (!data.country) {
      newErrors.country = "Пожалуйста, выберите страну.";
      isValid = false;
    }
    if (!data.city) {
      newErrors.city = "Город обязателен для заполнения.";
      isValid = false;
    }
    if (!data.street) {
      newErrors.street = "Улица обязательна для заполнения.";
      isValid = false;
    }
    if (!/^\d{5,10}$/.test(data.postalCode)) {
      newErrors.postalCode = "Почтовый индекс должен содержать от 5 до 10 цифр.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h2 className="text-2xl text-white font-bold">Адресная информация</h2>
      <p className="text-gray-500 mb-4">
        Укажите ваш адрес для продолжения оформления.
      </p>

      <Select
        id="country"
        label="Страна"
        options={countries}
        value={data.country}
        onChange={(e) => setData({ ...data, country: e.target.value })}
        error={errors.country || "" }
      />

      <Input
        id="city"
        label="Город"
        placeholder="Введите ваш город"
        value={data.city}
        onChange={(e) => setData({ ...data, city: e.target.value })}
        error={errors.city}
      />

      <Input
        id="street"
        label="Улица"
        placeholder="Введите вашу улицу"
        value={data.street}
        onChange={(e) => setData({ ...data, street: e.target.value })}
        error={errors.street}
      />

      <Input
        id="postalCode"
        label="Почтовый индекс"
        placeholder="Введите почтовый индекс (5-10 цифр)"
        value={data.postalCode}
        onChange={(e) => setData({ ...data, postalCode: e.target.value })}
        error={errors.postalCode}
      />

      <div className="flex justify-between w-[300px] mt-4">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-red-500 hover:to-orange-500"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default AddressInfoStep;
