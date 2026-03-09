import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    // Parse body
    let data: Record<string, unknown>;
    try {
        data = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: "Cuerpo inválido" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Validación server-side
    const { name, email, message, phone } = data;
    if (!name || !email || !message || !phone) {
        return new Response(
            JSON.stringify({ error: "Nombre, correo, telefono y mensaje son requeridos" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const webhookUrl = import.meta.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error("N8N_WEBHOOK_URL no está definida en .env");
        return new Response(
            JSON.stringify({ error: "Configuración del servidor incompleta" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    // Llamada al webhook de n8n
    try {
        const n8nResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!n8nResponse.ok) {
            throw new Error(`n8n respondió con status ${n8nResponse.status}`);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al llamar al webhook de n8n:", error);
        return new Response(
            JSON.stringify({ error: "Error al enviar el mensaje" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};