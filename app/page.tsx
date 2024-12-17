"use client";
import { useState, useEffect } from "react";
import ProgressBar from "./components/common/ProgressBar";
import PersonalInfoStep from "./components/PersonalInfoStep";
import AddressInfoStep from "./components/AddressInfoStep";
import FinancialInfoStep from "./components/FinancialInfoStep";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem("creditForm") || "{}");
      setFormData(savedData);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("creditForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleNext = (data: any) => {
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
