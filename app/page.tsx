"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./components/common/ProgressBar";
import PersonalInfoStep from "./components/PersonalInfoStep";
import AddressInfoStep from "./components/AddressInfoStep";
import FinancialInfoStep from "./components/FinancialInfoStep";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
}

interface AddressInfoData {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

interface FinancialInfoData {
  income: number;
  creditAmount: number;
  creditTerm: number;
}

type FormData = PersonalInfoData & AddressInfoData & FinancialInfoData;

const Home = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    postalCode: "",
    income: 0,
    creditAmount: 20000,
    creditTerm: 12,
  });

  // Загружаем данные из localStorage при первом рендере
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem("creditForm") || "{}");
      setFormData((prev) => ({ ...prev, ...savedData }));
    }
  }, []);

  // Сохраняем данные в localStorage при их изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("creditForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Форма успешно отправлена!");
        localStorage.removeItem("creditForm");
      } else {
        const errorData = await response.json();
        alert(`Ошибка при отправке формы: ${errorData.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Ошибка сети при отправке формы.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar step={currentStep} />
      <div className="bg-gray-800 rounded-2xl p-4 register">
        {currentStep === 1 && (
          <PersonalInfoStep onNext={handleNext} initialData={formData} />
        )}
        {currentStep === 2 && (
          <AddressInfoStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        )}
        {currentStep === 3 && (
          <FinancialInfoStep
            onNext={handleSubmit}
            onBack={handleBack}
            initialData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
