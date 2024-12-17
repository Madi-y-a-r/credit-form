import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Полученные данные:", data);

    // Возвращаем успешный ответ
    return NextResponse.json({ message: "Форма успешно отправлена!" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    return NextResponse.json(
      { message: "Ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
