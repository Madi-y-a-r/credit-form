import { useState } from "react";
import Input from "./common/Input";

const PersonalInfoStep = ({ onNext, initialData }: any) => {
  const [data, setData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    birthDate: initialData.birthDate || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
  });

  const validate = () => {
    const newErrors = { firstName: "", lastName: "", birthDate: "", phone: "", email: "" };
    let isValid = true;

    if (!data.firstName) {
      newErrors.firstName = "Имя обязательно для заполнения.";
      isValid = false;
    }
    if (!data.lastName) {
      newErrors.lastName = "Фамилия обязательна для заполнения.";
      isValid = false;
    }
    if (!data.birthDate) {
      newErrors.birthDate = "Дата рождения обязательна.";
      isValid = false;
    }
    if (!/^\+77\d{9}$/.test(data.phone)) {
      newErrors.phone = "Телефон должен быть в формате +77XXXXXXXXX.";
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Введите корректный Email.";
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
      <h2 className="text-2xl text-white font-bold">Персональная информация</h2>
      <p className="text-gray-500 mb-4 text-center">
        Пожалуйста, заполните все поля правильно, чтобы мы могли продолжить составление заявки.
      </p>

      <Input
        id="firstName"
        label="Имя"
        placeholder="Введите ваше имя"
        value={data.firstName}
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
        error={errors.firstName }
      />

      <Input
        id="lastName"
        label="Фамилия"
        placeholder="Введите вашу фамилию"
        value={data.lastName}
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
        error={errors.lastName}
      />
      <Input
        id="birthDate"
        label="Дата рождения"
        placeholder="Дата рождения"
        type="date"
        value={data.birthDate}
        onChange={(e) => setData({ ...data, birthDate: e.target.value })}
        error={errors.birthDate}
      />
      

      <Input
        id="phone"
        label="Телефон"
        placeholder="Phone: +77XXXXXXXXX"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        error={errors.phone}
      />

      <Input
        id="email"
        label="Email"
        placeholder="Введите ваш Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        error={errors.email}
      />
    

      <button
        onClick={handleNext}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-red-500 hover:to-orange-500"
      >
        Далее
      </button>
    </div>
  );
};

export default PersonalInfoStep;
